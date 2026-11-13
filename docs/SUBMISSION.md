# 과제 제출 링크 모음 (4~8주차)

저장소: https://github.com/ljh3534/oss-sw-project · 배포: https://ljh3534.github.io/oss-sw-project/

## 4주차 — GitHub Flow 및 코드리뷰 협업 실습

| 요구사항 | 결과물 |
|---|---|
| Feature 브랜치 + Conventional Commits PR | [#10](https://github.com/ljh3534/oss-sw-project/pull/10) `chore/collaboration-setup` · [#11](https://github.com/ljh3534/oss-sw-project/pull/11) `docs/oss-basics` · [#12](https://github.com/ljh3534/oss-sw-project/pull/12) `feat/calculator-core` · [#13](https://github.com/ljh3534/oss-sw-project/pull/13) `ci/basic-pipeline` · [#14](https://github.com/ljh3534/oss-sw-project/pull/14) · [#16](https://github.com/ljh3534/oss-sw-project/pull/16) — [커밋 이력](https://github.com/ljh3534/oss-sw-project/commits/main) |
| [MUST]/[SHOULD] 태그 리뷰 3건 이상 | [#10 리뷰](https://github.com/ljh3534/oss-sw-project/pull/10#pullrequestreview-5890986545) · [#11 리뷰](https://github.com/ljh3534/oss-sw-project/pull/11#pullrequestreview-5891063670) · [#12 리뷰](https://github.com/ljh3534/oss-sw-project/pull/12#pullrequestreview-5891110531) · [#13 리뷰](https://github.com/ljh3534/oss-sw-project/pull/13#pullrequestreview-5891781716) · [#14 리뷰](https://github.com/ljh3534/oss-sw-project/pull/14#pullrequestreview-5891906219) · [#16 리뷰](https://github.com/ljh3534/oss-sw-project/pull/16#pullrequestreview-5892218188) (총 6건, 반영 커밋·답글 포함) |
| (선택) PR 템플릿 | [.github/pull_request_template.md](https://github.com/ljh3534/oss-sw-project/blob/main/.github/pull_request_template.md), [이슈 템플릿](https://github.com/ljh3534/oss-sw-project/tree/main/.github/ISSUE_TEMPLATE) |
| (선택) CODEOWNERS | [.github/CODEOWNERS](https://github.com/ljh3534/oss-sw-project/blob/main/.github/CODEOWNERS) |
| (선택) 브랜치 보호 | main: PR 필수 · `CI result` 필수 체크 · 대화 해결 필수 · 선형 이력 · force push 금지 ([CONTRIBUTING §2](https://github.com/ljh3534/oss-sw-project/blob/main/CONTRIBUTING.md#2-브랜치-전략--github-flow)) |
| (선택) CONTRIBUTING · 리뷰 가이드 | [CONTRIBUTING.md](https://github.com/ljh3534/oss-sw-project/blob/main/CONTRIBUTING.md) · [docs/REVIEW_GUIDE.md](https://github.com/ljh3534/oss-sw-project/blob/main/docs/REVIEW_GUIDE.md) |

## 5주차 — 비동기 협업 체계 (Discussions/Wiki/ADR)

| 요구사항 | 결과물 |
|---|---|
| Wiki 3개 문서 + 상호 링크 | [Home](https://github.com/ljh3534/oss-sw-project/wiki) · [Getting Started](https://github.com/ljh3534/oss-sw-project/wiki/Getting-Started) · [Development Guide](https://github.com/ljh3534/oss-sw-project/wiki/Development-Guide) · [Troubleshooting](https://github.com/ljh3534/oss-sw-project/wiki/Troubleshooting) (+ 사이드바·푸터) |
| (선택) ADR 템플릿 + `docs/adr/` | [docs/adr/](https://github.com/ljh3534/oss-sw-project/tree/main/docs/adr) — [템플릿](https://github.com/ljh3534/oss-sw-project/blob/main/docs/adr/template.md), ADR-0001~0005 |
| (선택) 자동 응답 · SLA 추적 · 주간 요약 | [auto-response.yml](https://github.com/ljh3534/oss-sw-project/blob/main/.github/workflows/auto-response.yml) · [sla-tracker.yml](https://github.com/ljh3534/oss-sw-project/blob/main/.github/workflows/sla-tracker.yml) · [weekly-summary.yml](https://github.com/ljh3534/oss-sw-project/blob/main/.github/workflows/weekly-summary.yml) — 실행 예: [SLA 점검](https://github.com/ljh3534/oss-sw-project/actions/runs/43438699139), [주간 요약 이슈 #28](https://github.com/ljh3534/oss-sw-project/issues/28) |
| (선택) Discussions 카테고리 설계 + RFC 1건 | [카테고리 설계](https://github.com/ljh3534/oss-sw-project/blob/main/docs/collaboration/async-collaboration.md#2-discussions-카테고리-설계) · [RFC 템플릿](https://github.com/ljh3534/oss-sw-project/blob/main/.github/DISCUSSION_TEMPLATE/rfc.yml) · [RFC Discussion #15](https://github.com/ljh3534/oss-sw-project/discussions/15) (토론 → 결론 → ADR-0005 → 구현 → Resolved) |

## 6주차 — 오픈소스 실습 및 Inner Source 계획

| 요구사항 | 결과물 |
|---|---|
| Public 저장소 + LICENSE · README · CONTRIBUTING · CODE_OF_CONDUCT | [LICENSE (MIT)](https://github.com/ljh3534/oss-sw-project/blob/main/LICENSE) · [README](https://github.com/ljh3534/oss-sw-project#readme) · [CONTRIBUTING](https://github.com/ljh3534/oss-sw-project/blob/main/CONTRIBUTING.md) · [CODE_OF_CONDUCT](https://github.com/ljh3534/oss-sw-project/blob/main/CODE_OF_CONDUCT.md) · [SECURITY](https://github.com/ljh3534/oss-sw-project/blob/main/SECURITY.md) — [Community Standards](https://github.com/ljh3534/oss-sw-project/community) |
| (선택) 라이선스 비교 분석 · 선택 기준 | [docs/oss/license-comparison.md](https://github.com/ljh3534/oss-sw-project/blob/main/docs/oss/license-comparison.md) |
| (선택) Inner Source 도입 로드맵 | [docs/oss/inner-source-roadmap.md](https://github.com/ljh3534/oss-sw-project/blob/main/docs/oss/inner-source-roadmap.md) |

## 7주차 — GitHub Actions 기반 기본 CI/CD

| 요구사항 | 결과물 |
|---|---|
| Node.js CI로 Lint/Test 자동 실행 | [PR #13의 ci.yml](https://github.com/ljh3534/oss-sw-project/blob/c89c641/.github/workflows/ci.yml) (7주차 버전) |
| Matrix (버전/OS) | Node 20/22/24 × ubuntu/windows/macOS 9개 — [실행 내역](https://github.com/ljh3534/oss-sw-project/actions/runs/43434219993) |
| Secrets 주입 | `BUILD_SIGNING_KEY` → [sign-build.mjs](https://github.com/ljh3534/oss-sw-project/blob/main/scripts/sign-build.mjs)로 dist HMAC 서명(build)/검증(test). Secret 누락 시 실패하는 것도 [첫 실행](https://github.com/ljh3534/oss-sw-project/actions/runs/43432569798/attempts/1)에서 확인 |
| Build→Test→Deploy + 아티팩트 업/다운로드 | `needs` 체인, `dist`·`coverage` 업로드, test·deploy에서 다운로드 → [GitHub Pages 배포](https://github.com/ljh3534/oss-sw-project/actions/runs/43434219993) |
| Actions 실행 내역 | [Actions 탭](https://github.com/ljh3534/oss-sw-project/actions/workflows/ci.yml) |

## 8주차 — 워크플로 실행 최적화

| 요구사항 | 결과물 |
|---|---|
| Matrix 확장 | main: 3×3 − `exclude`(macOS×20) + `include`(Node 26 실험, `continue-on-error`) / PR: 5개 — [ci.yml](https://github.com/ljh3534/oss-sw-project/blob/main/.github/workflows/ci.yml) |
| Reusable Workflow | [reusable-node-ci.yml](https://github.com/ljh3534/oss-sw-project/blob/main/.github/workflows/reusable-node-ci.yml) |
| Composite Action | [.github/actions/setup-project](https://github.com/ljh3534/oss-sw-project/blob/main/.github/actions/setup-project/action.yml) |
| 캐싱 전후 측정 · 개선율 | **[최적화 전후 비교 리포트](https://github.com/ljh3534/oss-sw-project/blob/main/docs/ci/optimization-report.md)** — 러너 시간 672초 → 238초(−65%), 설치 45.9초 → 8.2초(−82%) |
| 브랜치/PR 조건 + 변경 파일 감지 선택적 배포 | `dorny/paths-filter` + `if:`, main push + 코드 변경 시에만 배포 — [main 배포 실행](https://github.com/ljh3534/oss-sw-project/actions/runs/43438381644) |
