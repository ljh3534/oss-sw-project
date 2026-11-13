# 워크플로 실행 최적화 전후 비교 리포트

> 8주차 — Reusable Workflow · Composite Action · 캐싱 · 조건부 실행 적용 결과
> 관련: 이슈 #9, RFC [Discussion #15](https://github.com/ljh3534/oss-sw-project/discussions/15), [ADR-0005](../adr/0005-ci-optimization.md), PR #16
> 측정 도구: [`scripts/ci-timing.py`](../../scripts/ci-timing.py) (GitHub Actions Jobs API의 잡·스텝 시작/종료 시각으로 계산)

## 1. 요약

| 지표 | 최적화 전 (4회 평균) | 최적화 후 (캐시 hit) | 개선율 |
|---|---|---|---|
| 전체 소요 시간 (wall-clock) | **200초** | **90초** | **−55%** |
| 러너 사용 시간 합계 | **672초** | **238초** | **−65%** |
| 잡당 평균 의존성 설치 시간 | **45.9초** | **8.2초** | **−82%** |
| PR 1건당 러너 시간 (축소 매트릭스) | 672초 | **164초** | **−76%** |
| 문서만 바꾼 PR | 전체 파이프라인 실행 | build/test/deploy **skip** | (§5) |

## 2. 무엇을 바꿨나

| 기법 | 구현 | 효과 |
|---|---|---|
| **Composite Action** | [`.github/actions/setup-project`](../../.github/actions/setup-project/action.yml) — setup-node v5, 캐시, `npm ci` 를 한 곳으로 | 4개 잡에 복붙되던 설치 단계 제거, 액션 버전 관리 1곳 |
| **Reusable Workflow** | [`reusable-node-ci.yml`](../../.github/workflows/reusable-node-ci.yml) — `workflow_call` 로 Lint→Build→Test→Coverage 제공 | `ci.yml` 은 "언제·어떤 매트릭스로" 만 결정 |
| **npm 설치 옵션** | `npm ci --prefer-offline --no-audit --no-fund` | 설치 시 레지스트리 audit 왕복 제거 — **가장 큰 효과** (§4) |
| **2단계 캐싱** | ① `setup-node` 의 `cache: npm` (~/.npm, 키: OS+lockfile) ② `actions/cache` 로 `node_modules` (키: OS+arch+Node+lockfile, hit이면 `npm ci` 생략) | Windows 설치 시간 −42% (§4) |
| **Matrix 확장/분리** | main: 3 OS × 3 Node − `exclude`(macOS×20) + `include`(Node 26 실험, `continue-on-error`) / PR: 5개 조합 | PR 비용 절반, 차기 LTS 조기 검증 |
| **조건부 실행** | `dorny/paths-filter` 로 코드 변경 감지 → `if:` 로 잡 skip, `ci-result` 집계 잡 | 문서 PR은 CI 수 초 만에 통과 |
| **선택적 배포** | `deploy` 는 `push` + `main` + 코드 변경일 때만 | 문서 수정으로 인한 불필요한 재배포 제거 |

## 3. 측정 방법

- 대상: 동일 코드(커밋 기준 `c6619f4` 이후 계산 모듈), 동일 전체 매트릭스(테스트 9개 잡 + lint/build/coverage)
- 최적화 전: 기존 `ci.yml` 실행 4회 — [#1](https://github.com/ljh3534/oss-sw-project/actions/runs/43433734393), [#2](https://github.com/ljh3534/oss-sw-project/actions/runs/43434219993), [#3](https://github.com/ljh3534/oss-sw-project/actions/runs/43434983197), [#4 (같은 시간대 재측정)](https://github.com/ljh3534/oss-sw-project/actions/runs/43436845924)
- 최적화 후: `workflow_dispatch` 입력으로 조건을 바꿔 3회
  - 캐시 끔 [`cache=false`](https://github.com/ljh3534/oss-sw-project/actions/runs/43436045072) · 캐시 miss [첫 실행](https://github.com/ljh3534/oss-sw-project/actions/runs/43436301703) · 캐시 hit [두 번째 실행](https://github.com/ljh3534/oss-sw-project/actions/runs/43436552694)
- PR 축소 매트릭스: [PR #16 실행](https://github.com/ljh3534/oss-sw-project/actions/runs/43437477417)
- "설치 시간" = `setup-node` + `npm ci` (최적화 후에는 `setup-project` composite 전체)
- 재현: `python3 scripts/ci-timing.py <run_id> ...`

## 4. 상세 결과

### 4.1 실행 단위

| 실행 | wall-clock(초) | 러너 합계(초) | 평균 설치(초) | 설치 합계(초) |
|---|---|---|---|---|
| 전 #1 | 192 | 700 | 47.8 | 574 |
| 전 #2 | 217 | 689 | 46.6 | 559 |
| 전 #3 | 211 | 661 | 45.4 | 545 |
| 전 #4 | 179 | 637 | 43.8 | 526 |
| **전 평균** | **200** | **672** | **45.9** | **551** |
| 후: 캐시 끔 | 88 | 223 | 7.8 | 93 |
| 후: 캐시 miss | 94 | 264 | 9.4 | 113 |
| **후: 캐시 hit** | **90** | **238** | **8.2** | **99** |
| 후: PR 축소 매트릭스 (캐시 hit) | 101 | 164 | 6.8 | 75 |

### 4.2 OS별 설치 시간 (테스트 잡, 초)

| OS | 전 (#4) | 후: 캐시 miss | 후: 캐시 hit | miss → hit |
|---|---|---|---|---|
| ubuntu (Node 20/22/24) | 38 / 39 / 53 | 10 / 5 / 8 | 9 / 5 / 4 | −21% |
| windows (Node 20/22/24) | 58 / 57 / 42 | 22 / 25 / 17 | 16 / 10 / 11 | **−42%** |
| macOS (Node 22/24) | 51 / 38 | 6 / 11 | 9 / 10 | +12% (오차 범위) |

### 4.3 해석 (솔직한 분석)

1. **개선의 대부분은 캐시가 아니라 `--no-audit` 였다.** 기존 로그에서 `npm ci` 는 "added 202 packages, and audited 203 packages in **37s**" 였고, 같은 의존성을 `--no-audit --no-fund` 로 설치하면 캐시 없이도 "added 202 packages in **3s**" 였다. 매 잡마다 레지스트리에 보안 감사 요청을 보내는 왕복이 병목이었다. 보안 감사는 별도로 주 1회 `npm audit` 또는 Dependabot으로 수행하는 것이 맞다.
2. **캐시 효과는 OS에 따라 다르다.** 의존성이 202개로 작아서 Linux/macOS에서는 캐시 복원 시간 ≈ 새로 다운로드 시간이다. 반면 파일 시스템이 느린 **Windows에서는 node_modules 캐시 hit 시 설치 시간이 평균 21초 → 12초(−42%)** 로 확실히 줄었다. 의존성이 늘어날수록(React, PDF 라이브러리 추가 예정) 캐시 효과는 커진다.
3. **캐시 miss는 오히려 +18% 느리다** (러너 223 → 264초). 캐시 저장(post step) 비용 때문이다. lockfile이 바뀔 때만 miss가 나므로 평상시에는 hit 상태로 유지된다.
4. **Matrix 분리가 PR 비용을 가장 크게 줄였다.** PR에서는 테스트 9개 → 5개로 러너 시간 238 → 164초(−31%), 최적화 전 대비 −76%.
5. wall-clock은 잡 간 의존(lint → build → test)과 러너 대기 시간 때문에 러너 시간만큼 줄지 않는다(−55%). 다음 단계로 lint와 build를 병렬화하면 약 15초를 더 줄일 수 있다.

## 5. 조건부 실행 검증 (문서만 바뀐 PR)

| 시나리오 | changes.code | ci | deploy | 결과 |
|---|---|---|---|---|
| 코드 변경 PR (#16) | true | 실행 (PR 매트릭스 5개) | skip (PR) | ✅ |
| 문서만 변경 PR | false | **skip** | skip | ✅ `ci-result` 통과 — 제출 정리 PR에서 확인 후 기록 |
| main push + 코드 변경 | true | 실행 (9+1개) | **실행** | ✅ |
| main push + 문서만 변경 | false | skip | **skip** | 재배포 없음 |

## 6. 다음 개선 후보

- [ ] lint와 build를 병렬화 (wall-clock −15초 예상)
- [ ] `dorny/paths-filter@v3` 의 Node 20 deprecation 경고 → 후속 버전으로 교체
- [ ] 주 1회 `npm audit` 전용 워크플로 (설치 단계에서 뺀 감사를 대체)
