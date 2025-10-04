# parser

import pandas as pd
import io
from typing import Union


def parse_file(file_bytes: bytes, content_type: str | None = None) -> pd.DataFrame:
    """Parse uploaded file bytes into a pandas DataFrame.

    Supports CSV and JSON content. If `content_type` is provided it will be
    used as a hint; otherwise the function will try JSON first then CSV.

    Args:
        file_bytes: Raw bytes of the uploaded file.
        content_type: Optional content type hint, e.g. 'application/json' or 'text/csv'.

    Returns:
        pd.DataFrame

    Raises:
        ValueError: If file cannot be parsed.
    """
    # Try to use content_type hint first
    buf = io.BytesIO(file_bytes)

    # JSON hint
    if content_type and "json" in content_type.lower():
        try:
            return pd.read_json(buf)
        except Exception as e:
            raise ValueError(f"Failed to parse JSON: {e}")

    # Try CSV if content type hints at CSV
    if content_type and ("csv" in content_type.lower() or "text" in content_type.lower()):
        try:
            buf.seek(0)
            return pd.read_csv(buf)
        except Exception as e:
            raise ValueError(f"Failed to parse CSV: {e}")

    # No reliable hint: try JSON first, then CSV
    buf.seek(0)
    try:
        return pd.read_json(buf)
    except Exception:
        buf.seek(0)
        try:
            return pd.read_csv(buf)
        except Exception as e:
            raise ValueError(f"Unable to parse file as JSON or CSV: {e}")


def parse_from_uploadfile(upload_file) -> pd.DataFrame:
    """Convenience wrapper for FastAPI UploadFile objects.

    Reads bytes and passes through to `parse_file` using the upload_file.content_type
    as a hint.
    """
    contents = upload_file.file.read()
    upload_file.file.seek(0)
    return parse_file(contents, getattr(upload_file, "content_type", None))