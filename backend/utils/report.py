"""
Report generation utilities for StarFinder.

Exports CSV and JSON streams for download.
"""
from typing import List, Dict, IO
import io
import csv
import json


def generate_csv(candidates: List[Dict]) -> IO[bytes]:
    """Return a BytesIO stream containing CSV data for the candidates."""
    output = io.StringIO()
    if not candidates:
        output.write("time,depth,confidence\n")
        return io.BytesIO(output.getvalue().encode("utf-8"))

    # Use union of keys for headers to be resilient
    keys = []
    for c in candidates:
        for k in c.keys():
            if k not in keys:
                keys.append(k)

    writer = csv.DictWriter(output, fieldnames=keys)
    writer.writeheader()
    for c in candidates:
        writer.writerow(c)

    return io.BytesIO(output.getvalue().encode("utf-8"))


def generate_json(candidates: List[Dict]) -> str:
    """Return a JSON string for the candidates."""
    return json.dumps({"candidates": candidates}, indent=2)
