import pandas as pd
import numpy as np
import io
from typing import Any


def read_uploaded_file(upload_file) -> pd.DataFrame:
    contents = upload_file.file.read()
    upload_file.file.seek(0)
    try:
        if upload_file.content_type == "application/json":
            df = pd.read_json(io.BytesIO(contents))
        else:
            # fallback to CSV
            df = pd.read_csv(io.BytesIO(contents))
    except Exception:
        # try to decode as text then parse
        text = contents.decode("utf-8", errors="ignore")
        try:
            df = pd.read_csv(io.StringIO(text))
        except Exception as e:
            raise
    return df


def compare_with_baseline(candidates: list[dict], baseline_df: pd.DataFrame) -> dict:
    # naive comparison: count overlapping timestamps / periods
    baseline_candidates = []
    # Placeholder: the baseline format will vary. We return a simple summary.
    return {"baseline_count": len(baseline_df), "predicted_count": len(candidates)}


def save_report(candidates: list[dict], csv_path: str, json_path: str) -> None:
    df = pd.DataFrame(candidates)
    df.to_csv(csv_path, index=False)
    df.to_json(json_path, orient='records')
