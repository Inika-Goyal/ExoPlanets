"""Utilities for comparing model predictions with a baseline dataset.

This module provides a simple time-based matching routine to compare
predicted candidate events (with timestamps) to baseline events (e.g.,
confirmed transits from a NASA catalog). The matching strategy is:

- For each predicted candidate, check if any baseline event occurs within a
  configurable time window (seconds or same units as the timestamps).
- Return per-candidate match flag and a small summary.

The real baseline format will vary; adjust the `extract_times` helper to
match your baseline data schema.
"""

from typing import List, Dict, Any
import pandas as pd
import numpy as np


def extract_times(baseline: pd.DataFrame, time_col: str = "time") -> np.ndarray:
	"""Extract numeric times from a baseline DataFrame.

	This helper assumes baseline has a column containing event times. Modify
	as needed for differing baseline formats.
	"""
	if time_col not in baseline.columns:
		raise ValueError(f"Baseline dataframe has no '{time_col}' column")
	return baseline[time_col].to_numpy(dtype=float)


def match_candidates_to_baseline(candidates: List[Dict[str, Any]], baseline_df: pd.DataFrame, time_col: str = "time", tol: float = 0.1) -> Dict[str, Any]:
	"""Match predicted candidates to baseline events.

	Args:
		candidates: list of dicts with at least a 'time' key (numeric)
		baseline_df: DataFrame containing baseline events with a column named `time_col`
		time_col: name of column in baseline_df to use as event time
		tol: tolerance (same units as time) within which two times are considered a match

	Returns:
		summary dict containing per-candidate match info and totals
	"""
	baseline_times = extract_times(baseline_df, time_col=time_col)
	results = []
	matched = 0

	for cand in candidates:
		t = float(cand.get("time", np.nan))
		if np.isnan(t):
			results.append({**cand, "matched": False, "match_delta": None})
			continue

		# compute absolute time differences
		deltas = np.abs(baseline_times - t)
		min_delta = float(np.min(deltas)) if deltas.size > 0 else float("inf")
		is_match = min_delta <= tol
		if is_match:
			matched += 1
		results.append({**cand, "matched": bool(is_match), "match_delta": min_delta})

	summary = {
		"total_predictions": len(candidates),
		"matched_predictions": matched,
		"details": results,
	}
	return summary

