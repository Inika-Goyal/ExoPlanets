"""Utilities package exports.

Provides a small shim so `from . import utils` works and exposes a
convenience `read_uploaded_file` function used by `app.py`.
"""

from .parser import parse_from_uploadfile, load_column_mapping, normalize_columns
from .report import save_report, build_report_object, candidates_to_dataframe
from .compare import match_candidates_to_baseline

__all__ = [
    "parse_from_uploadfile",
    "load_column_mapping",
    "normalize_columns",
    "save_report",
    "build_report_object",
    "candidates_to_dataframe",
    "match_candidates_to_baseline",
]


async def read_uploaded_file(upload_file, mapping_name: str | None = None):
    """Read a FastAPI UploadFile and optionally normalize columns using a saved mapping.

    If `mapping_name` is provided, the function will try to load a mapping file
    (e.g. `backend/models/kepler_columns.json`) and apply `normalize_columns`.
    """
    df = parse_from_uploadfile(upload_file)
    if mapping_name:
        mapping = load_column_mapping(mapping_name)
        if mapping:
            df = normalize_columns(df, mapping)
    return df
