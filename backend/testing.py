"""Smoke test that uses the real CSV training and test files (if present).

This script will:
- load `backend/data/train_labeled_scaled.csv` and `backend/data/test_labeled_scaled.csv`
- attempt to load a saved model from `backend/models/stacking` (or `backend/models`)
- if no saved estimator exists, train a simple model on the training CSV and save it
- run predictions on the first few rows of the test set and print results

Run from the repository root with:
  python -u backend\testing.py
"""

import os
import json
import pandas as pd
import numpy as np
from model import Model, predict_from_dataframe


DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")


def load_csv(name: str) -> pd.DataFrame:
	path = os.path.join(DATA_DIR, name)
	if not os.path.exists(path):
		raise FileNotFoundError(f"Expected data file not found: {path}")
	return pd.read_csv(path)


def test_with_csvs():
	train = load_csv("train_labeled_scaled.csv")
	test = load_csv("test_labeled_scaled.csv")

	# The preprocessing notebooks use a 'feature_cols' list; try to load it if present
	feature_cols_path = os.path.join(MODELS_DIR, "feature_columns.json")
	feature_cols = None
	if os.path.exists(feature_cols_path):
		feature_cols = json.load(open(feature_cols_path, "r", encoding="utf-8"))

	m = Model(feature_columns=feature_cols)

	# Attempt to load pre-saved estimator (stacking)
	stacking_dir = os.path.join(MODELS_DIR, "stacking")
	if os.path.exists(stacking_dir):
		try:
			m.load(stacking_dir)
			print("Loaded model from", stacking_dir)
		except Exception as e:
			print("Failed loading model from stacking dir:", e)

	# If no estimator exists on disk, train a small fallback estimator using sklearn's LogisticRegression
	if m.estimator is None:
		print("No pre-trained estimator found. Attempting to train a small model on the training CSV...")
		# Prepare X/y from train CSV
		if "label" in train.columns:
			y = train["label"].values
			X = train.drop(columns=["label"]).fillna(0)
		else:
			numeric = train.select_dtypes(include=["number"]).columns.tolist()
			if len(numeric) == 0:
				raise RuntimeError("Train CSV contains no numeric columns to derive labels")
			y = (train[numeric[0]] > train[numeric[0]].median()).astype(int).values
			X = train[numeric].fillna(0)

		if feature_cols is not None:
			X = X[[c for c in feature_cols if c in X.columns]]

		# Prefer to use scikit-learn if available, otherwise use Model.train fallback
		try:
			from sklearn.linear_model import LogisticRegression

			clf = LogisticRegression(max_iter=200)
			m.train(clf, X, y)
			print("Trained LogisticRegression using scikit-learn")
		except Exception as exc:
			print("scikit-learn not available or failed to import; using Model.train fallback. Error:", exc)
			# Model.train supports calling as train(X, y) to use an internal simple estimator
			m.train(X, y)
			print("Trained fallback internal estimator")

		# save under models/stacking for subsequent runs
		try:
			os.makedirs(stacking_dir, exist_ok=True)
			m.save(stacking_dir)
			print("Saved model to", stacking_dir)
		except Exception as e:
			print("Warning: failed to save model to disk:", e)

	# Predict using predict_from_dataframe on the test set
	sample = test.head(10)
	# make sure numeric columns are present and no NaNs
	sample = sample.fillna(0)

	candidates, chart = predict_from_dataframe(sample, model_dir=stacking_dir)
	print("Candidates (first 10):")
	for c in candidates[:10]:
		print(c)


def print_project_plan():
	plan = r"""
Hackathon Project Plan – StarFinder (Lost Planet Recovery Tool)
Overview
StarFinder is a web application that helps scientists recover “lost” exoplanets from telescope data. Using AI, the tool identifies faint planetary signals in light curve datasets (time vs brightness) that traditional pipelines may miss. The app should be visually stunning (space-themed, 3D, immersive) while also providing clear, intuitive tools for dataset upload, analysis, and results visualization.

Core Features
Landing Page: Futuristic 3D space theme with planets, stars, parallax effects.

Dataset Upload: CSV/JSON upload, progress bar, sample dataset option.

AI Analysis: Backend runs ML model (signal detection in light curves).

Interactive Graphs: Light curve plots with AI-highlighted dips vs NASA data.

Sensitivity Controls: Slider to adjust detection sensitivity.

Planet Counter & Report: Displays recovered planets, downloaded as CSV/JSON.


Frontend Responsibilities
Stack: Next.js + React + TailwindCSS (or plain CSS if preferred) + Three.js / React Three Fiber for 3D elements.
Build landing page with immersive space background, floating planets, and “Explore Now” CTA.

Design step-by-step explanation section with icons/illustrations.

Implement file upload interface with drag-and-drop and progress bar.

Create interactive chart section (use Plotly.js, Chart.js, or D3.js).

Add sensitivity slider with smooth UI controls.

Display planet counter + report download button.

Ensure responsive design (desktop and mobile).


Backend Responsibilities
Stack: Python + FastAPI + scikit-learn / PyTorch + Pandas/Numpy.
Build API endpoint for file upload (CSV/JSON).

Parse dataset, run AI/ML model on uploaded light curve.

Compare AI predictions with baseline (NASA dataset if provided).

Return processed results (planet candidates, confidence scores, chart data).

Implement report generation (CSV/JSON downloadable).

Deploy backend to Render, Railway, or Vercel serverless functions.


Integration Plan
Frontend ↔ Backend:

Frontend sends uploaded data → API

API returns analysis results → Frontend renders graphs + counters

Data flow:

User uploads dataset

Backend processes and sends results

Frontend updates chart, counters, and download report


Stretch Goals (if time allows)
Add gamification (users “collect planets” visually in a 3D space scene).

Real-time collaboration: allow multiple users to analyze datasets together.

Export to interactive 3D solar system map (using Three.js).


Roles
Frontend Lead: Builds UI/UX, charts, and animations.

Shanmukh, Bhumika,

Backend Lead: Handles AI model, API, and data pipeline.
Sara, Albert , Nika, lukas

Integrator / Floater: Connects frontend + backend, handles deployment.
For all 


Designer (optional): Polishes UI, ensures immersive visuals.


Note for the team: This project balances wow factor (visuals) + real science (ML backend). Even if some parts are simplified, focus on making it functional, beautiful, and demo-friendly. Please feel free to add or remove as many ideas/features as you’d like! Let’s get creative =)
"""
	print(plan)


if __name__ == "__main__":
	test_with_csvs()
	print("CSV smoke test completed")
