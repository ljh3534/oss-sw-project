# ADR-0004: GitHub Actions + GitHub Pages로 배포한다

- **상태**: Accepted
- **날짜**: 2026-11-13
- **결정자**: @ljh3534
- **관련**: #7, PR #13

## 배경
v1은 서버 없는 정적 사이트이며, 학생 프로젝트라 비용 0원이 필요하다. CI 결과물을 그대로 배포해 "테스트를 통과한 빌드만 배포"를 보장하고 싶다.

## 검토한 대안
| 대안 | 장점 | 단점 |
|---|---|---|
| A. GitHub Pages (Actions 배포) | 무료, 저장소와 통합, CI 아티팩트를 그대로 배포 | 정적 파일만 가능 |
| B. Vercel / Netlify | PR 미리보기 자동 | 외부 서비스 계정·토큰 관리 필요 |
| C. `gh-pages` 브랜치 푸시 | 단순 | 빌드 산출물이 git 이력에 쌓임, 권한 범위 넓음 |

## 결정
`actions/upload-pages-artifact` + `actions/deploy-pages`로 배포한다. deploy 잡은 test 잡이 통과한 동일 `dist` 아티팩트만 배포하고, `pages: write`, `id-token: write` 권한은 deploy 잡에만 준다.

## 결과
- 좋아지는 점: 비용 0, 배포 이력이 Environments에 남음, 테스트한 바이너리 = 배포한 바이너리.
- 감수할 점: PR 미리보기 배포가 없다.
- 후속 작업: 8주차에 변경 파일 감지로 문서만 바뀐 경우 배포 생략.

## 재검토 조건
2학기 백엔드(FastAPI) 도입 시 배포 대상 재검토.
