"""
Comparison utilities to match AI-detected candidates with NASA baseline data.

For simplicity, matching is done by time proximity within a tolerance.
"""
from typing import List, Dict


def compare_with_nasa(candidates: List[Dict], nasa_baseline: List[Dict], tolerance: float = 0.01) -> Dict:
    """
    Compare lists of candidate dicts to NASA baseline dicts.

    Each entry is expected to have at least a 'time' key. Returns a summary dict
    with matches and mismatches.
    """
    matches = []
    unmatched = []

    # Build simple index of baseline times for quick lookup
    baseline_times = [b.get("time") for b in nasa_baseline]

    for cand in candidates:
        t = cand.get("time")
        found = None
        for bt in baseline_times:
            if bt is None:
                continue
            if abs(bt - t) <= tolerance:
                found = bt
                break
        if found is not None:
            matches.append({"candidate": cand, "matched_time": found})
        else:
            unmatched.append(cand)

    return {"matches": matches, "unmatched": unmatched, "total": len(candidates)}
# Optional: compare AI predictions with baseline/NASA dataset

