# ADR-0005: CI를 Reusable Workflow·Composite Action·변경 감지로 최적화한다

- **상태**: Accepted
- **날짜**: 2026-11-13
- **결정자**: @ljh3534
- **관련**: RFC [Discussion #15](https://github.com/ljh3534/oss-sw-project/discussions/15), 이슈 #9, PR #13 리뷰 [SHOULD]/[QUESTION], PR #16

## 배경
기존 CI는 모든 PR(문서 PR 포함)에서 3 OS × 3 Node 전체 매트릭스를 돌려 1회 러너 시간이 약 11분이었고, 설치 단계가 4개 잡에 중복되어 액션 버전 업그레이드(#13 리뷰)도 4곳을 고쳐야 했다.

## 검토한 대안
| 대안 | 장점 | 단점 |
|---|---|---|
| A. 현행 유지 | 단순 | 비용·대기 시간 |
| B. PR은 ubuntu만 | 가장 빠름 | Windows 경로 문제 등 OS 이슈를 병합 후 발견 |
| C. PR 축소(5) / main 전체 + 캐시 + 변경 감지 | 비용과 커버리지 균형 | 워크플로 구조가 복잡해짐 |

## 결정
대안 C. 세부 결정:
- 설치는 Composite Action `setup-project`로 단일화, `npm ci --prefer-offline --no-audit --no-fund`
- npm 캐시 키는 OS + lockfile (Node 버전 제외), node_modules 캐시 키는 OS + arch + Node + lockfile (플랫폼별 바이너리 때문)
- 워크플로는 항상 실행하고 `paths-filter` + `if:`로 잡을 skip, `ci-result` 집계 잡을 required check로
- 배포는 main push + 코드 변경 시에만

## 결과
- 좋아지는 점: 러너 시간 −65%, PR 비용 −76% ([측정 리포트](../ci/optimization-report.md))
- 감수할 점: 설치 시 `npm audit`을 하지 않음 → 별도 주기 감사 필요. 캐시 miss 시 +18%.
- 후속 작업: 주간 `npm audit` 워크플로, lint/build 병렬화

## 재검토 조건
의존성 수가 크게 늘거나 캐시 저장 용량(10GB) 한도에 근접하면 캐시 전략을 재검토한다.
