# 개발 환경 설정 기록

## 1. Git 설치 및 사용자 정보

```bash
git --version          # git version 2.50.1
git config --global user.name "ljh3534"
git config --global user.email "<GitHub 계정 이메일>"
```

## 2. GitHub 계정

- 계정: [@ljh3534](https://github.com/ljh3534)
- GitHub CLI 로그인: `gh auth login` → `gh auth status`로 확인

## 3. SSH 키 생성 및 등록

```bash
ssh-keygen -t rsa -b 4096 -C "<이메일>"   # ~/.ssh/id_rsa, id_rsa.pub 생성
cat ~/.ssh/id_rsa.pub                      # GitHub > Settings > SSH and GPG keys 에 등록
ssh -T git@github.com                      # "Hi ljh3534! You've successfully authenticated" 확인
```

- 키 종류: RSA 4096 (`SHA256:FMxh2/q78ukn4bp3OlF+KQHjmVatT4jGzJMi5gRDSRo`)

## 4. 테스트 저장소 및 첫 커밋/푸시

```bash
git clone git@github.com:ljh3534/oss-sw-project.git
cd oss-sw-project
git remote set-url origin git@github.com:ljh3534/oss-sw-project.git  # HTTPS → SSH 전환
git add .
git commit -m "Add project proposal, PRD and setup docs"
git push origin main
```

- 테스트 코드: [`my.py`](../my.py) (Hello, World!)
- CI: [`.github/workflows/metrics.yml`](../.github/workflows/metrics.yml) — PR 병합 시 리드타임 측정
