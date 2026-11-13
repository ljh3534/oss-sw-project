// 빌드 산출물(dist/)의 SHA-256 목록을 만들고 BUILD_SIGNING_KEY(Secret)로 HMAC 서명한다.
// 사용: node scripts/sign-build.mjs [sign|verify] [dir]
// 키 값은 절대 출력하지 않는다.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const [mode = "sign", dir = "dist"] = process.argv.slice(2);
const key = process.env.BUILD_SIGNING_KEY;
if (!key) {
  // 포크·Dependabot PR에는 GitHub가 저장소 Secret을 전달하지 않는다.
  // 그런 PR(REQUIRE_SIGNATURE=false)에서는 서명을 건너뛰고, main 배포 경로에서는 반드시 실패시킨다.
  if (process.env.REQUIRE_SIGNATURE === "false") {
    console.warn("::warning::BUILD_SIGNING_KEY 없음 — 신뢰되지 않은 PR이므로 서명/검증을 건너뜁니다.");
    process.exit(0);
  }
  console.error("BUILD_SIGNING_KEY 환경변수가 없습니다. (GitHub Secrets에서 주입해야 함)");
  process.exit(1);
}

function walk(d) {
  return readdirSync(d).flatMap((name) => {
    const p = join(d, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(dir)
  .filter((p) => !p.endsWith("manifest.json"))
  .map((p) => relative(dir, p).split("\\").join("/"))
  .sort()
  .map((rel) => ({ path: rel, sha256: createHash("sha256").update(readFileSync(join(dir, rel))).digest("hex") }));

const payload = JSON.stringify(files);
const signature = createHmac("sha256", key).update(payload).digest("hex");

if (mode === "sign") {
  writeFileSync(join(dir, "manifest.json"), JSON.stringify({ commit: process.env.GITHUB_SHA ?? "local", files, signature }, null, 2));
  console.log(`서명 완료: ${files.length}개 파일`);
} else {
  const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
  const ok =
    manifest.signature.length === signature.length &&
    timingSafeEqual(Buffer.from(manifest.signature), Buffer.from(signature));
  if (!ok) {
    console.error("서명 검증 실패: 아티팩트가 변조되었거나 키가 다릅니다.");
    process.exit(1);
  }
  console.log(`서명 검증 통과: ${files.length}개 파일`);
}
