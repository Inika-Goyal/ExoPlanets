import pandas as pd
import numpy as np


# Simple Model class used as a minimal, syntactically-correct placeholder.
# Expects input arrays/dataframes with at least three columns:
# [temperature, period, radius] (or similarly ordered features).


class Model:
    def __init__(self, model_path: str | None = None):
        # Placeholder for training logic
        # e.g., self.model_params = {...}
        self.threshold = 0.5
        self.model_path = model_path
        self.model = None  # will hold learned summary stats or params

    def train(self, X_train, y_train=None):
        """Train a minimal model by computing per-feature summary statistics.
        This function does not fit a real ML model; it just computes means
        used by `predict` for a simple heuristic. Replace with real training
        code when available.
        """
        # Accept pandas DataFrame or numpy array
        if isinstance(X_train, pd.DataFrame):
            arr = X_train.to_numpy()
        else:
            arr = np.asarray(X_train)

        # Ensure we have at least 3 columns
        if arr.ndim != 2 or arr.shape[1] < 3:
            raise ValueError("X_train must be 2D with at least 3 columns")

        # Store simple summary statistics for three primary features
        # Protect against zero means to avoid division by zero later
        mean_temp = float(np.mean(arr[:, 0]))
        mean_period = float(np.mean(arr[:, 1]))
        mean_radius = float(np.mean(arr[:, 2]))
        self.model = {
            "mean_temp": mean_temp if mean_temp != 0 else 1.0,
            "mean_period": mean_period if mean_period != 0 else 1.0,
            "mean_radius": mean_radius if mean_radius != 0 else 1.0,
        }
        return self

    def predict(self, X):
        """Return heuristic prediction scores for input X.

        X may be a pandas DataFrame or a numpy array. The returned value is a
        numpy array of floats (scores in [0, inf), not bounded to [0,1]).
        """
        if self.model is None:
            raise ValueError("Model has not been trained yet.")

        # Normalize input to numpy array
        if isinstance(X, pd.DataFrame):
            X_array = X.to_numpy()
        else:
            X_array = np.asarray(X)

        if X_array.ndim == 1:
            X_array = X_array.reshape(1, -1)

        if X_array.shape[1] < 3:
            raise ValueError("Input X must have at least 3 columns")

        # Compute a weighted score using the stored means
        scores = (
            0.3 * (X_array[:, 0] / self.model["mean_temp"]) +
            0.4 * (X_array[:, 1] / self.model["mean_period"]) +
            0.3 * (X_array[:, 2] / self.model["mean_radius"])
        )

        # Optional: clip negative values and return
        scores = np.asarray(scores, dtype=float)
        print("[PREDICT] Generated dummy predictions.")
        return scores







