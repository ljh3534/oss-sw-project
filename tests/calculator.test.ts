import { describe, expect, it } from "vitest";
import {
  ValidationError,
  calculatePrice,
  formatKRW,
  getEngagementMultiplier,
  getEngagementRate,
  getFollowerTier,
  type InfluencerInput,
} from "../src/calculator";

const base: InfluencerInput = {
  platform: "instagram",
  followerCount: 50_000,
  avgLikes: 1_400,
  avgComments: 100,
  category: "beauty",
  contentType: "reels",
};

describe("getFollowerTier — PRD 4.2 팔로워 구간", () => {
  it.each([
    [1_000, "nano"],
    [9_999, "nano"],
    [10_000, "micro"],
    [49_999, "micro"],
    [50_000, "mid"],
    [199_999, "mid"],
    [200_000, "macro"],
    [999_999, "macro"],
    [1_000_000, "mega"],
  ])("%i명 → %s", (followers, tier) => {
    expect(getFollowerTier(followers).id).toBe(tier);
  });

  it("최소 구간 미만이면 에러", () => {
    expect(() => getFollowerTier(999)).toThrow(ValidationError);
  });
});

describe("getEngagementMultiplier — PRD 4.3 참여율 보정", () => {
  it.each([
    [0.5, 0.8],
    [1, 1.0],
    [2.99, 1.0],
    [3, 1.3],
    [5.99, 1.3],
    [6, 1.6],
    [15, 1.6],
  ])("참여율 %f%% → %f", (rate, multiplier) => {
    expect(getEngagementMultiplier(rate)).toBe(multiplier);
  });
});

describe("getEngagementRate", () => {
  it("좋아요+댓글로 계산", () => {
    expect(getEngagementRate(base)).toBeCloseTo(3);
  });
  it("직접 입력값이 우선", () => {
    expect(getEngagementRate({ ...base, engagementRate: 7 })).toBe(7);
  });
});

describe("calculatePrice", () => {
  it("PRD 공식대로 계산하고 단계별 근거를 반환한다", () => {
    const r = calculatePrice(base);
    // 기본 단가: 50 × 18,000 = 900,000
    expect(r.baseRate).toBe(900_000);
    expect(r.tier).toBe("mid");
    // 900,000 × 1.3(참여율 3%) × 1.2(뷰티) × 1.3(릴스) × 1.0(인스타)
    expect(r.estimate).toBe(1_825_200);
    expect(r.minPrice).toBe(Math.round(1_825_200 * 0.85));
    expect(r.maxPrice).toBe(Math.round(1_825_200 * 1.15));
    expect(r.breakdown).toHaveLength(5);
    expect(r.breakdown.at(-1)?.amount).toBe(r.estimate);
  });

  it("플랫폼 보정이 반영된다 (유튜브 1.4)", () => {
    const ig = calculatePrice(base);
    const yt = calculatePrice({ ...base, platform: "youtube" });
    expect(yt.estimate).toBe(Math.round(ig.estimate * 1.4));
  });

  it("최소 ≤ 예상 ≤ 최대", () => {
    const r = calculatePrice({ ...base, followerCount: 1_500_000, avgLikes: 10_000, avgComments: 500, contentType: "video" });
    expect(r.minPrice).toBeLessThanOrEqual(r.estimate);
    expect(r.estimate).toBeLessThanOrEqual(r.maxPrice);
  });
});

describe("validateInput — PRD 8장 유효성 검사", () => {
  const bad: Array<[string, Partial<InfluencerInput>]> = [
    ["팔로워 0명", { followerCount: 0 }],
    ["팔로워 음수", { followerCount: -10 }],
    ["팔로워 NaN", { followerCount: Number.NaN }],
    ["좋아요 음수", { avgLikes: -1 }],
    ["참여율 100% 초과(좋아요+댓글)", { avgLikes: 60_000 }],
    ["참여율 직접 입력 100 초과", { engagementRate: 120 }],
    ["참여율 직접 입력 음수", { engagementRate: -1 }],
    ["참여 정보 누락", { avgLikes: undefined }],
    ["알 수 없는 플랫폼", { platform: "x" as InfluencerInput["platform"] }],
    ["알 수 없는 카테고리", { category: "x" as InfluencerInput["category"] }],
    ["알 수 없는 콘텐츠 유형", { contentType: "x" as InfluencerInput["contentType"] }],
  ];

  it.each(bad)("%s → ValidationError", (_name, patch) => {
    expect(() => calculatePrice({ ...base, ...patch })).toThrow(ValidationError);
  });
});

describe("formatKRW", () => {
  it("천 단위 구분 + 원", () => {
    expect(formatKRW(1_825_200)).toBe("1,825,200원");
  });
});
