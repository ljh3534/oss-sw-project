# 비동기 협업 체계

> 5주차 — "회의 없이도 일이 굴러가는" 협업 구조. 각 채널의 역할을 나누고, 자동화로 응답 지연을 감시한다.

## 1. 채널별 역할

| 채널 | 용도 | 산출물 | 예시 |
|---|---|---|---|
| **Issues** | 해야 할 일 (실행 단위) | 작업 추적, PR과 연결 | 버그, 기능 구현 |
| **Discussions** | 아직 할지 말지 모르는 것 (토론 단위) | 합의 → Issue 또는 ADR | 질문, 아이디어, RFC |
| **Wiki** | 자주 바뀌는 how-to 문서 | 온보딩, 개발 가이드, 문제 해결 | Getting Started |
| **docs/adr/** | 되돌리기 어려운 결정의 *이유* | ADR (PR 리뷰를 거친 기록) | 계수 JSON 분리 |
| **PR 리뷰** | 코드 단위 피드백 | `[MUST]`/`[SHOULD]` 코멘트 | — |

흐름: **Discussions(RFC) → 합의 → ADR(PR) → Issue → PR → Wiki/README 갱신**

## 2. Discussions 카테고리 설계

| 카테고리 | 형식 | 누가 글을 쓰나 | 목적 | 응답 SLA |
|---|---|---|---|---|
| 📣 Announcements | Announcement | 메인테이너만 | 릴리스, 계수 버전 변경 공지 | — |
| 🙏 Q&A | Question / Answer | 누구나 | 사용법·설치 질문, 답변 채택(Mark as answer) | 24h |
| 📝 RFC | Open-ended discussion | 누구나 | 계산 공식·아키텍처 등 **설계 제안** — 템플릿 사용, 합의 시 ADR로 | 48h |
| 💡 Ideas | Open-ended discussion | 누구나 | 가벼운 기능 아이디어 (RFC 이전 단계) | 1주 |
| 🙌 Show and tell | Open-ended discussion | 누구나 | AdPrice 활용 사례 공유 | — |
| 🗳️ Polls | Poll | 누구나 | 우선순위 투표 (예: 다음 지원 플랫폼) | — |
| 💬 General | Open-ended discussion | 누구나 | 그 외 자유 주제 | — |

### RFC 운영 규칙

1. 제목: `[RFC] <제안 한 줄>`
2. 본문 템플릿: 배경 / 제안 / 대안 / 영향 범위 / 미해결 질문 / 토론 기한
3. 토론 기한(기본 7일) 동안 의견을 받고, 작성자가 **결론 댓글**을 단다: `채택` / `보류` / `기각`
4. `채택`이면 ADR PR을 열고 Discussion에 링크한 뒤 Discussion을 Close(Resolved)한다.

## 3. 자동화 워크플로

| 워크플로 | 트리거 | 하는 일 |
|---|---|---|
| [`auto-response.yml`](../../.github/workflows/auto-response.yml) | 이슈 생성, 외부 기여자의 PR 생성, Discussion 생성 | 안내 댓글, `needs-triage` 라벨, Q&A면 Troubleshooting 위키 안내 |
| [`sla-tracker.yml`](../../.github/workflows/sla-tracker.yml) | 6시간마다 + 수동 실행(dry-run 옵션) | 이슈 24h / PR 48h 동안 응답이 없으면 `sla-breached` 라벨 + 메인테이너 멘션, 실행 요약(Job Summary) 표 |
| [`weekly-summary.yml`](../../.github/workflows/weekly-summary.yml) | 매주 월요일 09:00 KST + 수동 실행 | 지난 7일 커밋·병합 PR·PR 리드타임 중앙값·이슈·SLA 위반을 요약한 `[주간 요약]` 이슈 생성 |
| [`metrics.yml`](../../.github/workflows/metrics.yml) | PR 병합 | PR 리드타임 계산 |

## 4. SLA 기준

| 대상 | 첫 응답 | 완료 |
|---|---|---|
| 이슈 (외부 작성자) | 24h | — |
| PR 리뷰 | 24h | 48h |
| Discussions Q&A | 24h | 답변 채택 |
| RFC | 48h | 기한(기본 7일) 내 결론 |
