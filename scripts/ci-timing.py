#!/usr/bin/env python3
"""GitHub Actions 실행 시간 측정: 실행(run) ID들을 받아 잡별 총 시간과 'npm ci'(의존성 설치) 단계 시간을 집계한다.

사용: python3 scripts/ci-timing.py <run_id> [<run_id> ...]
필요: gh CLI 로그인
"""
import json
import subprocess
import sys
from datetime import datetime
from statistics import mean

REPO = "ljh3534/oss-sw-project"


def ts(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def jobs(run_id):
    out = subprocess.check_output(
        ["gh", "api", f"repos/{REPO}/actions/runs/{run_id}/jobs?per_page=100", "-q", ".jobs"]
    )
    return json.loads(out)


def summarize(run_id):
    rows = []
    for j in jobs(run_id):
        if j["conclusion"] in ("skipped", None) or not j["started_at"] or not j["completed_at"]:
            continue
        total = (ts(j["completed_at"]) - ts(j["started_at"])).total_seconds()
        install = sum(
            (ts(s["completed_at"]) - ts(s["started_at"])).total_seconds()
            for s in j["steps"]
            if s.get("started_at") and s.get("completed_at")
            and ("npm ci" in s["name"] or "setup-project" in s["name"] or "setup-node" in s["name"])
        )
        rows.append({"job": j["name"], "total": total, "install": install})
    return rows


if __name__ == "__main__":
    for rid in sys.argv[1:]:
        rows = summarize(rid)
        if not rows:
            print(f"run {rid}: no completed jobs")
            continue
        print(f"\n## run {rid}")
        print("| job | total(s) | setup+install(s) |\n|---|---|---|")
        for r in rows:
            print(f"| {r['job']} | {r['total']:.0f} | {r['install']:.0f} |")
        print(f"| **합계(러너 시간)** | **{sum(r['total'] for r in rows):.0f}** | **{sum(r['install'] for r in rows):.0f}** |")
        print(f"| 평균 setup+install | | {mean(r['install'] for r in rows):.1f} |")
