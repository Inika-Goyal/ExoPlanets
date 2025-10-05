from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, Form
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
import os
from utils import parser, report  # import the specific modules you need
import model

# Initialize FastAPI app
app = FastAPI(title="ExoPlanets Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pre-trained model if available
REPORT_DIR = os.path.join(os.path.dirname(__file__), "reports")
os.makedirs(REPORT_DIR, exist_ok=True)



 # Load or initialize model
@app.get("/health")
async def health():
    return {"status": "ok"}


# Upload endpoint to accept survey data and optional baseline for comparison
@app.post("/upload")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...), baseline: UploadFile | None = None, mapping: str | None = Form(None)):
    if file.content_type not in ("text/csv", "application/json", "application/octet-stream"):
        raise HTTPException(status_code=400, detail="Unsupported file type. Upload CSV or JSON.")
    # Read and optionally normalize columns according to mapping name
    data = await utils.read_uploaded_file(file, mapping_name=mapping)
    baseline_data = None
    if baseline:
        baseline_data = await utils.read_uploaded_file(baseline, mapping_name=mapping)

    # Run model synchronously here (could be offloaded to background tasks)
    candidates, chart_data = model.predict_from_dataframe(data)

    # Compare with baseline if provided
    comparison = None
    if baseline_data is not None:
        comparison = utils.compare_with_baseline(candidates, baseline_data)

    report_id = str(uuid4())
    report_path_csv = os.path.join(REPORT_DIR, f"{report_id}.csv")
    report_path_json = os.path.join(REPORT_DIR, f"{report_id}.json")

    # Save report files in background
    utils.save_report(candidates, report_path_csv, report_path_json)

    # Return report metadata and download links
    return JSONResponse({
        "report_id": report_id,
        "candidates": candidates,
        "chart_data": chart_data,
        "comparison": comparison,
        "download_csv": f"/report/{report_id}.csv",
        "download_json": f"/report/{report_id}.json",
    })

# Endpoint to download a generated report by filename
@app.get("/report/{filename}")
async def get_report(filename: str):
    file_path = os.path.join(REPORT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Report not found")
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)
