"""Small smoke test for the dummy Model class.

Run this file with `python testing.py` to exercise training and prediction.
"""

import numpy as np
from model import Model


def generate_synthetic_data(n=100):
	# synthetic features: temp, period, radius
	rng = np.random.RandomState(42)
	temps = rng.normal(loc=5000, scale=300, size=(n,))
	periods = rng.normal(loc=10, scale=2, size=(n,))
	radii = rng.normal(loc=1.0, scale=0.2, size=(n,))
	X = np.vstack([temps, periods, radii]).T
	# dummy labels (not used by train but kept for API parity)
	y = (radii > 1.05).astype(int)
	return X, y


def test_model_train_and_predict():
	X, y = generate_synthetic_data(200)
	m = Model(model_path=None)
	m.train(X, y)

	# Predict on a few examples
	scores = m.predict(X[:5])
	assert len(scores) == 5, "Expected 5 prediction scores"
	print("Prediction scores:", scores)

	# Basic sanity: values should be finite
	assert np.all(np.isfinite(scores)), "Scores must be finite"


if __name__ == "__main__":
	test_model_train_and_predict()
	print("Smoke test passed")
