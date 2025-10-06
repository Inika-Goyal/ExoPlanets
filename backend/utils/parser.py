"""File parsing helpers.

This module provides a small API used by the FastAPI backend to accept
CSV/JSON uploads coming from the frontend. It also supports registering
and persisting per-source column mappings so different survey files can be
normalized to a common schema.
"""

import io
import json
import os
from typing import Dict, Optional

import pandas as pd

MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
os.makedirs(MODELS_DIR, exist_ok=True)


def parse_file(file_bytes: bytes, content_type: Optional[str] = None) -> pd.DataFrame:
    """Parse uploaded bytes into a DataFrame (CSV or JSON)."""
    buf = io.BytesIO(file_bytes)

    # Use content type hint where available
    if content_type and "json" in content_type.lower():
        try:
            return pd.read_json(buf)
        except Exception as e:
            raise ValueError(f"Failed to parse JSON: {e}")

    if content_type and ("csv" in content_type.lower() or "text" in content_type.lower()):
        try:
            buf.seek(0)
            return pd.read_csv(buf)
        except Exception as e:
            raise ValueError(f"Failed to parse CSV: {e}")

    # No hint: try JSON first then CSV
    buf.seek(0)
    try:
        return pd.read_json(buf)
    except Exception:
        buf.seek(0)
        try:
            return pd.read_csv(buf)
        except Exception as e:
            raise ValueError(f"Unable to parse file as JSON or CSV: {e}")


def register_column_mapping(name: str, mapping: Dict[str, str]):
    """Persist a column mapping (source name -> mapping dict) under `backend/models`.

    The mapping should be a dict mapping source column names to normalized column
    names (for example produced by preprocessing notebooks). These mappings are
    used to normalize incoming files before they are passed to training/prediction.
    """
    dst = os.path.join(MODELS_DIR, f"{name}_columns.json")
    with open(dst, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)


def load_column_mapping(name: str) -> Optional[Dict[str, str]]:
    path = os.path.join(MODELS_DIR, f"{name}_columns.json")
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_columns(df: pd.DataFrame, mapping: Dict[str, str]) -> pd.DataFrame:
    """Rename and return only the mapped columns present in df.

    Any missing source columns are ignored; the returned DataFrame will contain
    only the normalized column names (the values of mapping) for keys that existed
    in the input DataFrame.
    """
    # create a reduced mapping containing only columns present in df
    available = {src: dst for src, dst in mapping.items() if src in df.columns}
    if not available:
        raise ValueError("No mapped columns found in provided DataFrame")
    df_selected = df[list(available.keys())].rename(columns=available)
    return df_selected


def parse_from_uploadfile(upload_file) -> pd.DataFrame:
    contents = upload_file.file.read()
    upload_file.file.seek(0)
    return parse_file(contents, getattr(upload_file, "content_type", None))