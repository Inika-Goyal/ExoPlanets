import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler


# Simple example pipeline: featurize a light curve and run RF classifier
# Replace or extend with PyTorch-based model as needed.

FEATURE_COLS = ["time", "flux"]


def featurize(df: pd.DataFrame) -> pd.DataFrame:
    # Expect time, flux. Create basic features: flux mean, std, slopes
    x = df.copy()
    x['flux_mean'] = x['flux'].rolling(window=5, min_periods=1).mean()
    x['flux_std'] = x['flux'].rolling(window=5, min_periods=1).std().fillna(0)
    x['flux_diff'] = x['flux'].diff().fillna(0)
    return x[['flux_mean', 'flux_std', 'flux_diff']].fillna(0)


# For demo we'll train a tiny model on synthetic data on first call and cache it
_MODEL = None
_SCA = None


def _train_dummy_model():
    global _MODEL, _SCA
    # synthetic training data
    rng = np.random.RandomState(0)
    X = rng.normal(size=(200, 3))
    y = rng.randint(0, 2, size=(200,))
    _SCA = StandardScaler().fit(X)
    Xs = _SCA.transform(X)
    _MODEL = RandomForestClassifier(n_estimators=20, random_state=0)
    _MODEL.fit(Xs, y)


def predict_from_dataframe(df: pd.DataFrame):
    global _MODEL, _SCA

    if _MODEL is None:
        _train_dummy_model()

    feats = featurize(df)
    X = feats.values
    Xs = _SCA.transform(X)
    probs = _MODEL.predict_proba(Xs)[:, 1]

    # Simple thresholding to pick candidate events
    candidates = []
    chart_data = {"time": df['time'].tolist(), "flux": df['flux'].tolist(), "probabilities": probs.tolist()}
    for i, p in enumerate(probs):
        if p > 0.8:
            candidates.append({"index": int(i), "time": float(df.iloc[i]['time']), "score": float(p)})

    return candidates, chart_data
