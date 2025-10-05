import os
import json
from typing import List, Optional

import pandas as pd
import numpy as np
import joblib


class Model:
    """
    Flexible Model wrapper that supports:
    - Storing/loading a fitted estimator (scikit-learn / xgboost / lightgbm)
    - Applying a stored scaler to incoming DataFrames
    - Accepting an explicit list of feature column names

    The project contains training notebooks (e.g. `backend/models/stacking.ipynb`) which
    define feature columns and training pipelines. This class provides a small, stable
    runtime API that other parts of the backend can call into.
    """

    def __init__(self, feature_columns: Optional[List[str]] = None, model_path: Optional[str] = None):
        self.feature_columns = feature_columns
        self.model_path = model_path
        self.estimator = None
        self.scaler = None

    # --- persistence helpers -------------------------------------------------
    def save(self, dst_dir: str):
        os.makedirs(dst_dir, exist_ok=True)
        if self.estimator is not None:
            joblib.dump(self.estimator, os.path.join(dst_dir, "estimator.joblib"))
        if self.scaler is not None:
            joblib.dump(self.scaler, os.path.join(dst_dir, "scaler.joblib"))
        if self.feature_columns is not None:
            with open(os.path.join(dst_dir, "feature_columns.json"), "w", encoding="utf-8") as f:
                json.dump(self.feature_columns, f)

    def load(self, src_dir: str):
        # Load estimator, scaler, and columns if present
        est_file = os.path.join(src_dir, "estimator.joblib")
        scaler_file = os.path.join(src_dir, "scaler.joblib")
        cols_file = os.path.join(src_dir, "feature_columns.json")

        if os.path.exists(est_file):
            self.estimator = joblib.load(est_file)
        if os.path.exists(scaler_file):
            self.scaler = joblib.load(scaler_file)
        if os.path.exists(cols_file):
            with open(cols_file, "r", encoding="utf-8") as f:
                self.feature_columns = json.load(f)

    # --- training / prediction -----------------------------------------------
    def train(self, estimator, X: pd.DataFrame = None, y=None, scaler=None):
        """
        Fit an estimator using X (pandas DataFrame).

        Usage:
          - train(estimator, X, y, scaler=None)
          - train(X, y)  # fallback: no estimator provided; a simple internal estimator is used

        The function will store the fitted estimator and scaler on the object.
        """
        # Detect calling style where estimator is actually X (no estimator provided)
        provided_estimator = estimator
        if not hasattr(provided_estimator, "fit"):
            # Shift parameters: estimator was actually X
            X = provided_estimator
            provided_estimator = None

        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)

        if self.feature_columns is None:
            # Default to all columns in X
            self.feature_columns = list(X.columns)

        X_sel = X[self.feature_columns]

        # Apply scaler if provided
        if scaler is not None:
            self.scaler = scaler
            X_sel = pd.DataFrame(self.scaler.transform(X_sel), columns=self.feature_columns, index=X_sel.index)

        # If no estimator provided, use a tiny fallback estimator that returns
        # the mean label probability observed during fit.
        if provided_estimator is None:
            class _SimpleEstimator:
                def __init__(self):
                    self.p = 0.0

                def fit(self, X_, y_):
                    if y_ is None:
                        self.p = 0.0
                    else:
                        import numpy as _np
                        yarr = _np.asarray(y_)
                        # handle degenerate cases
                        if yarr.size == 0:
                            self.p = 0.0
                        else:
                            self.p = float(yarr.mean())

                def predict_proba(self, X_):
                    import numpy as _np
                    p = self.p
                    # return two-column probabilities for binary compatibility
                    probs = _np.vstack([_np.full(len(X_), 1 - p), _np.full(len(X_), p)]).T
                    return probs

            provided_estimator = _SimpleEstimator()

        # Fit estimator
        provided_estimator.fit(X_sel, y)
        self.estimator = provided_estimator
        return self

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        Predict probabilities / scores for incoming DataFrame X. The function will
        attempt to select `self.feature_columns` from X, apply scaler if present,
        and then call estimator.predict_proba (if available) or estimator.predict.
        Returns a numpy array of floats.
        """
        if self.estimator is None:
            raise ValueError("No fitted estimator available. Call train() or load().")

        if not isinstance(X, pd.DataFrame):
            X = pd.DataFrame(X)

        if self.feature_columns is None:
            # If no feature list, use all columns available
            cols = list(X.columns)
        else:
            cols = [c for c in self.feature_columns if c in X.columns]

        if len(cols) == 0:
            raise ValueError("No matching feature columns in input X")

        X_sel = X[cols]

        # Apply scaler if present
        if self.scaler is not None:
            X_sel = pd.DataFrame(self.scaler.transform(X_sel), columns=cols, index=X_sel.index)

        # Prefer predict_proba if classifier, otherwise predict
        if hasattr(self.estimator, "predict_proba"):
            probs = self.estimator.predict_proba(X_sel)
            # If binary classification, return probability for positive class
            if probs.shape[1] == 2:
                return probs[:, 1]
            # For multi-class, return the max class probability
            return probs.max(axis=1)
        else:
            preds = self.estimator.predict(X_sel)
            return np.asarray(preds, dtype=float)


def predict_from_dataframe(df: pd.DataFrame, model_dir: str | None = None):
    """
    Convenience serving adapter used by `app.py`.
    - df: input DataFrame already normalized to canonical column names (if possible)
    - model_dir: optional path to model directory under backend/models (defaults to 'models/stacking')

    Returns: (candidates_list, chart_data_dict)
    The candidates_list is a list of dicts with at least `time` and `score` keys which
    mirrors what the frontend expects. chart_data_dict is a small dict with series for plotting.
    """
    # lazy import utilities to avoid cyclic imports at module load
    try:
        from .utils.report import build_report_object, candidates_to_dataframe
    except Exception:
        build_report_object = None

    base = os.path.dirname(__file__)
    if model_dir is None:
        model_dir = os.path.join(base, "models", "stacking")

    m = Model()
    try:
        if os.path.exists(model_dir):
            m.load(model_dir)
        else:
            # attempt to load a top-level models/stacking directory under backend/models
            alt = os.path.join(base, "models")
            if os.path.exists(alt):
                m.load(alt)
    except Exception:
        # If model loading fails, we'll fall back to a simple heuristic
        pass

    # If no estimator is available, create a trivial score using a simple ranking on available columns
    if m.estimator is None:
        # heuristic: score by the sum of numeric columns (normalized)
        num = df.select_dtypes(include=["number"]).fillna(0)
        if num.shape[1] == 0:
            scores = np.zeros(len(df))
        else:
            scores = (num - num.mean()) / (num.std().replace(0, 1))
            scores = np.nan_to_num(scores.sum(axis=1).to_numpy())
        # normalize to 0-1
        minv, maxv = scores.min(), scores.max()
        if maxv - minv > 0:
            scores = (scores - minv) / (maxv - minv)
    else:
        scores = m.predict(df)

    # Build candidates: expect a time/index column if available
    times = None
    if "time" in df.columns:
        times = df["time"].tolist()
    else:
        # fallback to DataFrame index
        times = list(df.index.astype(str))

    candidates = []
    for t, s in zip(times, scores):
        candidates.append({"time": t, "score": float(s)})

    # simple chart data: series of scores vs time
    chart_data = {"series": [{"name": "score", "data": [float(x) for x in scores.tolist()]}], "labels": times}

    return candidates, chart_data








