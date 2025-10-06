"""Helpers to build and save reports from prediction results.

Provides functions to convert candidate lists to pandas DataFrames and to
save them as CSV/JSON files. These are small utilities used by the main
application to persist and serve generated reports.
"""

from typing import List, Dict, Any
import pandas as pd
import os


def candidates_to_dataframe(candidates: List[Dict[str, Any]]) -> pd.DataFrame:
	"""Convert a list of candidate dicts into a DataFrame.
	"""
	if not candidates:
		return pd.DataFrame()
	return pd.DataFrame(candidates)


def save_report(candidates: List[Dict[str, Any]], csv_path: str, json_path: str) -> None:
	"""Save candidates to CSV and JSON files.

	Paths directories will be created if they don't exist.
	"""
	# Ensure dirs exist
	os.makedirs(os.path.dirname(csv_path) or '.', exist_ok=True)
	os.makedirs(os.path.dirname(json_path) or '.', exist_ok=True)

	df = candidates_to_dataframe(candidates)
	df.to_csv(csv_path, index=False)
	df.to_json(json_path, orient="records")


def build_report_object(candidates: List[Dict[str, Any]], comparison: Dict[str, Any] | None = None) -> Dict[str, Any]:
	"""Return a JSON-serializable report object summarizing predictions.
	"""
	df = candidates_to_dataframe(candidates)
	return {
		"count": int(len(df)),
		"candidates": candidates,
		"comparison": comparison or {},
	}
