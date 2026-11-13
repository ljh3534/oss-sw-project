# AdPrice — 인플루언서 광고 단가 계산기

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> 팔로워 수 · 참여율 · 카테고리 · 콘텐츠 유형 · 플랫폼을 입력하면 **예상 광고 단가 범위와 산정 근거**를 투명하게 보여주는 오픈소스 웹 도구

오픈소스SW 수업 학기 프로젝트 저장소입니다.

## 왜 만들었나요?

광고주는 인플루언서에게 광고를 맡길 때 적정 단가를 판단할 기준이 없고, 인플루언서는 자신의 단가를 설명할 근거가 부족합니다.
AdPrice는 **계산 공식과 계수를 공개(JSON 설정 파일)** 하여 누구나 검증하고 개선할 수 있는 기준점을 제공합니다.

## 주요 기능

| 기능 | 설명 | 상태 |
|---|---|---|
| 단가 계산 + 근거 브레이크다운 | `기본 단가 × 참여율 × 카테고리 × 콘텐츠 유형 × 플랫폼` 보정을 단계별로 표시 | ✅ v0.1 |
| 시나리오 비교 | 여러 인플루언서/콘텐츠 유형을 나란히 비교 | 📋 계획 |
| 견적서 내보내기 | 결과를 PDF/이미지로 저장 | 📋 계획 |

계산 공식 상세는 [PRD 4장](PRD.md#4-단가-계산-로직)을 참고하세요.

## 빠른 시작

```bash
git clone https://github.com/ljh3534/oss-sw-project.git
cd oss-sw-project
npm ci
npm run dev     # http://localhost:5173
npm test        # 단위 테스트
```

자세한 내용: [Wiki – Getting Started](https://github.com/ljh3534/oss-sw-project/wiki/Getting-Started)

## 문서

| 문서 | 내용 |
|---|---|
| [PROPOSAL.md](PROPOSAL.md) | 프로젝트 제안서 (문제 정의, 기술 스택, 16주 마일스톤) |
| [PRD.md](PRD.md) | 상세 요구사항 및 계산 로직 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 기여 방법, 브랜치 전략, 커밋 컨벤션 |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | 행동 강령 |
| [SECURITY.md](SECURITY.md) | 보안 취약점 신고 |
| [docs/REVIEW_GUIDE.md](docs/REVIEW_GUIDE.md) | 코드 리뷰 가이드 ([MUST]/[SHOULD] 태그) |
| [docs/adr/](docs/adr/) | 기술 결정 기록(ADR) |
| [docs/oss/license-comparison.md](docs/oss/license-comparison.md) | 오픈소스 라이선스 비교 및 선택 기준 |
| [docs/oss/inner-source-roadmap.md](docs/oss/inner-source-roadmap.md) | Inner Source 도입 로드맵 |
| [docs/SETUP.md](docs/SETUP.md) | 개발 환경 설정 기록 |
| [Wiki](https://github.com/ljh3534/oss-sw-project/wiki) | Getting Started · Development Guide · Troubleshooting |

## 기여하기

버그 리포트, 기능 제안, PR 모두 환영합니다! 먼저 [기여 가이드](CONTRIBUTING.md)를 읽어 주세요.
질문이나 설계 토론은 [Discussions](https://github.com/ljh3534/oss-sw-project/discussions)를 이용해 주세요.

## 라이선스

[MIT License](LICENSE) © 2026 ljh3534 — 선택 이유는 [라이선스 비교 문서](docs/oss/license-comparison.md)에 정리했습니다.

> ⚠️ 계산 결과는 **참고용 추정치**이며 실제 계약 단가를 보장하지 않습니다.

## Acknowledgement

Thanks to Junho
