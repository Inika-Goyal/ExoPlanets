"""
Dataset parsing and cleaning utilities.

Uses pandas to read CSV or JSON content and returns a cleaned DataFrame with
at least time and flux-like columns.
"""
from typing import Tuple
import pandas as pd
import io
import json


def parse_dataset(filename: str, content: bytes) -> pd.DataFrame:
    """
    Parse uploaded dataset bytes. Supports CSV and JSON.

    Returns a pandas DataFrame.
    Raises ValueError on unsupported format or parsing errors.
    """
    fname = filename.lower()
    try:
        if fname.endswith(".csv") or b"," in content[:200]:
            # Try CSV first
            df = pd.read_csv(io.BytesIO(content))
        elif fname.endswith(".json") or content.strip().startswith(b"{") or content.strip().startswith(b"["):
            obj = json.loads(content.decode("utf-8"))
            df = pd.json_normalize(obj)
        else:
            # Fallback: try CSV
            df = pd.read_csv(io.BytesIO(content))
    except Exception as e:
        raise ValueError(f"Failed to parse dataset: {e}")

    # Basic cleaning: drop fully empty columns and duplicate rows
    df = df.dropna(axis=1, how="all")
    df = df.drop_duplicates()

    if df.empty:
        raise ValueError("Uploaded dataset is empty after parsing")

    return df
