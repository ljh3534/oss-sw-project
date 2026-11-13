# AdPrice 기여 가이드 (CONTRIBUTING)

AdPrice에 관심을 가져 주셔서 감사합니다! 이 문서는 이슈 등록부터 PR 병합까지의 협업 규칙을 정리합니다.
모든 참여자는 [행동 강령(CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md)을 따라야 합니다.

## 1. 시작하기

```bash
git clone https://github.com/ljh3534/oss-sw-project.git
cd oss-sw-project
npm ci          # 의존성 설치 (Node.js 20 이상, package.json은 #6에서 추가)
npm run lint    # ESLint
npm test        # Vitest 단위 테스트
npm run dev     # 로컬 개발 서버
```

더 자세한 환경 구성은 [Wiki – Getting Started](https://github.com/ljh3534/oss-sw-project/wiki/Getting-Started)를 참고하세요.

## 2. 브랜치 전략 — GitHub Flow

```
main ──●────────────●──────────●──  (항상 배포 가능, 직접 push 금지)
        \          /          /
         feat/... ●──●──●    /
                   fix/... ●
```

1. `main`은 항상 배포 가능한 상태를 유지하며 **직접 push하지 않습니다** (브랜치 보호 규칙 적용).
2. 작업은 `main`에서 분기한 **feature 브랜치**에서 합니다.
3. 작업이 끝나면 PR을 열고, CI 통과 + 리뷰 후 **Squash merge** 합니다.
4. 병합된 브랜치는 삭제합니다.

### 브랜치 이름 규칙

`<type>/<짧은-설명>` (소문자, 하이픈 구분)

| 예시 | 용도 |
|---|---|
| `feat/calculator-core` | 새 기능 |
| `fix/negative-follower-validation` | 버그 수정 |
| `docs/adr-template` | 문서 |
| `ci/matrix-test` | CI/CD |
| `chore/collaboration-setup` | 설정·잡무 |

## 3. 커밋 메시지 — Conventional Commits

```
<type>(<scope>): <subject>

<body: 무엇을, 왜 (선택)>

<footer: Closes #이슈번호, BREAKING CHANGE: ... (선택)>
```

| type | 의미 |
|---|---|
| `feat` | 사용자에게 보이는 새 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서만 변경 |
| `style` | 포맷팅 등 동작과 무관한 변경 |
| `refactor` | 동작 변화 없는 구조 개선 |
| `test` | 테스트 추가·수정 |
| `ci` | CI 설정(GitHub Actions) |
| `build` | 빌드 시스템·의존성 |
| `chore` | 그 외 잡무 |

예시:

```
feat(calculator): 참여율 보정계수 구간 적용
fix(form): 팔로워 수 0 입력 시 계산되지 않도록 검증 추가
docs(adr): ADR-0002 계수 JSON 분리 결정 기록
```

- subject는 50자 이내, 마침표 없이, 명령형/현재형으로 씁니다.
- 하나의 커밋에는 하나의 논리적 변경만 담습니다.
- PR은 Squash merge 하므로 **PR 제목도 Conventional Commits 형식**이어야 합니다.

## 4. Pull Request 절차

1. 이슈를 먼저 만들거나 기존 이슈에 "제가 할게요" 댓글을 남깁니다.
2. 브랜치를 만들고 작업합니다.
3. PR 템플릿의 체크리스트를 채워 PR을 엽니다. 본문에 `Closes #번호`를 적습니다.
4. CI(Lint · Test · Build)가 모두 통과해야 합니다.
5. CODEOWNERS에 지정된 리뷰어가 [리뷰 가이드](docs/REVIEW_GUIDE.md)에 따라 리뷰합니다.
6. 모든 `[MUST]` 코멘트가 해결되면 Squash merge 합니다.
   - 저장소 설정에서 **Squash merge만 허용**하고, **병합 후 브랜치 자동 삭제**가 켜져 있습니다.

PR은 작게 유지하세요 — 변경 라인 400줄 이하를 권장합니다.

## 5. 코드 리뷰

리뷰 코멘트는 반드시 태그로 시작합니다. 자세한 기준은 [docs/REVIEW_GUIDE.md](docs/REVIEW_GUIDE.md)를 보세요.

| 태그 | 의미 | 병합 전 해결 |
|---|---|---|
| `[MUST]` | 버그·보안·요구사항 위반 등 반드시 고쳐야 함 | 필수 |
| `[SHOULD]` | 강하게 권장하는 개선 | 권장 (안 하면 이유를 답글로) |
| `[COULD]` / `[NIT]` | 선택적 제안, 사소한 스타일 | 선택 |
| `[QUESTION]` | 의도 확인 질문 | 답변 필요 |
| `[PRAISE]` | 잘한 점 | — |

## 6. 의사결정 기록

설계상 중요한 결정(라이브러리 선택, 계산 공식 변경 등)은 [`docs/adr/`](docs/adr/)에 ADR로 남깁니다.
큰 변경은 먼저 [Discussions의 RFC 카테고리](https://github.com/ljh3534/oss-sw-project/discussions)에서 토론합니다.

## 7. 라이선스

기여한 코드는 저장소의 [MIT License](LICENSE)로 배포되는 데 동의한 것으로 간주합니다.
