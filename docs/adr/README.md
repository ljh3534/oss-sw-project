# Architecture Decision Records (ADR)

AdPrice의 중요한 기술·설계 결정을 기록한다. "왜 이렇게 만들었지?"에 대한 답을 코드가 아니라 문서로 남겨, 사람이 바뀌어도 맥락이 사라지지 않게 하는 것이 목적이다.

## 언제 ADR을 쓰나?

- 라이브러리·프레임워크·인프라 선택 또는 교체
- 계산 공식·계수 체계의 변경 (단순 계수 값 조정은 PR로 충분)
- 되돌리기 어렵거나 여러 모듈에 영향을 주는 구조 결정
- 리뷰에서 "왜 이렇게 했나요?"가 두 번 이상 나온 결정

## 절차

1. 큰 결정이면 먼저 [Discussions – RFC](https://github.com/ljh3534/oss-sw-project/discussions/categories/ideas)에서 토론한다.
2. [`template.md`](template.md)를 복사해 `NNNN-짧은-제목.md`로 만든다. 번호는 4자리 일련번호.
3. 상태 `Proposed`로 PR을 연다 (`docs(adr): ADR-NNNN ...`).
4. 리뷰에서 합의되면 `Accepted`로 바꿔 병합한다.
5. 결정을 뒤집을 때는 기존 ADR을 수정하지 않고, 새 ADR을 쓰고 기존 ADR 상태를 `Superseded by ADR-XXXX`로 바꾼다.

## 상태

`Proposed` → `Accepted` → (`Deprecated` | `Superseded by ADR-XXXX`) / 또는 `Rejected`

## 목록

| 번호 | 제목 | 상태 | 날짜 |
|---|---|---|---|
| [0001](0001-record-architecture-decisions.md) | ADR로 아키텍처 결정을 기록한다 | Accepted | 2026-11-13 |
| [0002](0002-coefficients-in-json.md) | 계산 계수를 JSON 설정 파일로 분리한다 | Accepted | 2026-11-13 |
| [0003](0003-step-rounding-in-breakdown.md) | 단가 계산 시 단계별로 반올림한다 | Accepted | 2026-11-13 |
| [0004](0004-github-pages-deploy.md) | GitHub Actions + GitHub Pages로 배포한다 | Accepted | 2026-11-13 |
