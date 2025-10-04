"""StarFinder model: simple, clean dip detector.

This file contains a self-contained, minimal implementation with predictable
behavior for testing. It intentionally avoids optional ML deps.
"""

from typing import List, Dict, Tuple
import numpy as np
import pandas as pd


def _normalize_flux(flux: pd.Series) -> pd.Series:
    """Normalize flux to zero mean and unit variance safely."""
    return (flux - flux.mean()) / (flux.std() + 1e-9)


def _detect_dips(flux: pd.Series, window: int = 3, depth_fraction: float = 0.15) -> List[int]:
    """Detect indices where flux is a local minimum and drops below local median by depth_fraction.

    This uses the raw (smoothed) flux series rather than normalized values to
    make small absolute dips detectable when the baseline is near 1.0.
    """
    candidates: List[int] = []
    n = len(flux)
    for i in range(window, n - window):
        seg = flux.iloc[i - window : i + window + 1]
        center = float(flux.iloc[i])
        local_med = float(seg.median())
        if center == float(seg.min()) and center < local_med * (1.0 - float(depth_fraction)):
            candidates.append(int(i))
    return candidates


def analyze_timeseries(df: pd.DataFrame) -> List[Dict]:
    """Analyze a numeric time series DataFrame and return candidate events.

    Expects a DataFrame with time-like and flux-like columns. The function will
    try to infer columns named like 'time' and 'flux' (case-insensitive) and
    will fall back to the first two numeric columns.

    Returns a list of dicts: {time, depth, confidence}.
    """
    if df is None or df.empty:
        return []

    # infer columns
    time_col = None
    flux_col = None
    for c in df.columns:
        cl = c.lower()
        if cl in ("time", "t", "jd", "bjd", "timestamp"):
            time_col = c
        if cl in ("flux", "brightness", "f", "flux_normalized"):
            flux_col = c

    if time_col is None or flux_col is None:
        numeric = df.select_dtypes(include=[np.number]).columns.tolist()
        if len(numeric) >= 2:
            time_col, flux_col = numeric[0], numeric[1]
        else:
            raise ValueError("Could not find suitable time and flux columns in dataset")

    time = df[time_col].reset_index(drop=True)
    flux = df[flux_col].reset_index(drop=True)

    # for small datasets we avoid smoothing so single-point dips remain visible
    flux_smooth = flux
    flux_norm = _normalize_flux(flux_smooth)

    # detect dips using the raw (or minimally processed) flux
    indices = _detect_dips(flux_smooth, window=1, depth_fraction=0.20)

    candidates: List[Dict] = []
    for idx in indices:
        center_time = float(time.iloc[idx])
        # depth relative to baseline mean
        depth = float(flux.mean() - flux.iloc[idx])
        # map normalized depth to [0,1]
        confidence = float(min(max(-float(flux_norm.iloc[idx]) / 1.5, 0.0), 1.0))
        candidates.append({"time": center_time, "depth": depth, "confidence": confidence})

    return candidates


def predict_from_dataframe(df: pd.DataFrame) -> Tuple[List[Dict], Dict]:
    """Return (candidates, chart_data) for frontend consumption."""
    candidates = analyze_timeseries(df)
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if len(numeric_cols) >= 2:
        t_col, f_col = numeric_cols[0], numeric_cols[1]
        chart_data = {"time": df[t_col].tolist(), "flux": df[f_col].tolist()}
    else:
        chart_data = {"time": [], "flux": []}
    return candidates, chart_data
