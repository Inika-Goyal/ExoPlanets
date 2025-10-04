# ExoPlanets Backend

FastAPI backend for processing light curve files, running a simple ML pipeline, and returning planet candidate predictions.

Features:
- File upload endpoint (CSV/JSON)
- Parse dataset and run an ML model (scikit-learn/PyTorch compatible)
- Compare predictions to an optional baseline dataset
- Return JSON with candidates, confidence scores, and chart-ready data
- Generate downloadable CSV/JSON reports
- Dockerfile and deployment notes for Render/Railway/Vercel

Quick start
```
python -m venv .venv
.\.venv\Scripts\Activate.ps1; pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API endpoints
- POST /upload - Upload a file and optional baseline file
- GET /health - health check
- GET /report/{report_id} - download generated report

Notes
- This is a scaffold with a simple example ML model (random forest). Replace model code in `app/model.py` with your own PyTorch model if desired.
