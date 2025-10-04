"""
StarFinder FastAPI backend main application.

Run with:
    uvicorn app:app --reload --port 8000

This file defines the HTTP routes and wires together the parser, model and report utils.
"""
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import io
import json
import tempfile
import pathlib

from model import analyze_timeseries
from utils import parser, compare, report


app = FastAPI(title="StarFinder - Lost Planet Recovery Tool")

# Allow common frontend origins (Next.js typically runs on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
async def root():
    """Root route to check that the backend is live."""
    return JSONResponse({"message": "StarFinder backend is live!"})


@app.post("/analyze", tags=["analysis"])
async def analyze(file: UploadFile = File(...)):
    """
    Accept an uploaded CSV or JSON file (time vs brightness), parse and analyze it.

    Response JSON includes a list of candidate planets with confidence scores.
    """
    try:
        contents = await file.read()
        df = parser.parse_dataset(file.filename, contents)
        candidates = analyze_timeseries(df)

        return JSONResponse({
            "status": "success",
            "count": len(candidates),
            "candidates": candidates,
        })
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")


@app.post("/compare", tags=["compare"])
async def compare_endpoint(candidates: List[dict], nasa_baseline: Optional[List[dict]] = None):
    """
    Compare AI-detected candidates with a NASA baseline dataset.

    - `candidates`: list of dicts produced by /analyze
    - `nasa_baseline`: optional list of known objects (time, id, etc.) to compare against
    """
    try:
        result = compare.compare_with_nasa(candidates, nasa_baseline or [])
        return JSONResponse({"status": "success", "result": result})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compare failed: {e}")


@app.post("/report", tags=["report"])
async def report_endpoint(candidates: List[dict], format: str = Query("csv", regex="^(csv|json)$")):
    """
    Generate a downloadable report for the given candidates.

    - `format`: 'csv' (default) or 'json'
    Returns a StreamingResponse with attached file.
    """
    try:
        if format == "csv":
            stream = report.generate_csv(candidates)
            headers = {"Content-Disposition": "attachment; filename=starfinder_report.csv"}
            return StreamingResponse(stream, media_type="text/csv", headers=headers)
        else:
            data = report.generate_json(candidates)
            headers = {"Content-Disposition": "attachment; filename=starfinder_report.json"}
            return StreamingResponse(io.BytesIO(data.encode("utf-8")), media_type="application/json", headers=headers)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {e}")

