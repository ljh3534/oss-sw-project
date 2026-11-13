import coefficients from "./coefficients.json";

export type Platform = keyof typeof coefficients.platform;
export type Category = keyof typeof coefficients.category;
export type ContentType = keyof typeof coefficients.contentType;

export interface InfluencerInput {
  platform: Platform;
  followerCount: number;
  /** 평균 좋아요 수 (engagementRate 미입력 시 필수) */
  avgLikes?: number;
  /** 평균 댓글 수 (engagementRate 미입력 시 필수) */
  avgComments?: number;
  /** 참여율(%) 직접 입력 — 있으면 avgLikes/avgComments보다 우선 */
  engagementRate?: number;
  category: Category;
  contentType: ContentType;
}

export interface BreakdownStep {
  label: string;
  multiplier: number;
  amount: number;
}

export interface CalculationResult {
  tier: string;
  baseRate: number;
  engagementRate: number;
  multipliers: {
    engagement: number;
    category: number;
    contentType: number;
    platform: number;
  };
  estimate: number;
  minPrice: number;
  maxPrice: number;
  breakdown: BreakdownStep[];
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const MIN_FOLLOWERS = coefficients.followerTiers[0].min;

/** PRD 8장: 음수, 팔로워 0명, 참여율 100% 초과 등을 막는다. */
export function validateInput(input: InfluencerInput): void {
  const { followerCount, avgLikes, avgComments, engagementRate } = input;

  if (!Number.isFinite(followerCount) || followerCount < MIN_FOLLOWERS) {
    throw new ValidationError(`팔로워 수는 ${MIN_FOLLOWERS.toLocaleString()}명 이상이어야 합니다.`);
  }
  if (!(input.platform in coefficients.platform)) {
    throw new ValidationError(`지원하지 않는 플랫폼입니다: ${input.platform}`);
  }
  if (!(input.category in coefficients.category)) {
    throw new ValidationError(`지원하지 않는 카테고리입니다: ${input.category}`);
  }
  if (!(input.contentType in coefficients.contentType)) {
    throw new ValidationError(`지원하지 않는 콘텐츠 유형입니다: ${input.contentType}`);
  }

  if (engagementRate !== undefined) {
    if (!Number.isFinite(engagementRate) || engagementRate < 0 || engagementRate > 100) {
      throw new ValidationError("참여율은 0~100% 사이여야 합니다.");
    }
    return;
  }

  if (avgLikes === undefined || avgComments === undefined) {
    throw new ValidationError("참여율 또는 평균 좋아요·댓글 수를 입력해야 합니다.");
  }
  if (avgLikes < 0 || avgComments < 0) {
    throw new ValidationError("좋아요·댓글 수는 음수일 수 없습니다.");
  }
  if (avgLikes + avgComments > followerCount) {
    throw new ValidationError("참여율이 100%를 초과합니다. 입력값을 확인하세요.");
  }
}

/** 참여율(%) = (평균 좋아요 + 평균 댓글) / 팔로워 수 × 100 */
export function getEngagementRate(input: InfluencerInput): number {
  if (input.engagementRate !== undefined) return input.engagementRate;
  return (((input.avgLikes ?? 0) + (input.avgComments ?? 0)) / input.followerCount) * 100;
}

export function getFollowerTier(followerCount: number) {
  const tiers = coefficients.followerTiers;
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (followerCount >= tiers[i].min) return tiers[i];
  }
  throw new ValidationError("팔로워 수가 최소 구간보다 작습니다.");
}

export function getEngagementMultiplier(rate: number): number {
  for (const band of coefficients.engagement) {
    if (band.below === null || rate < band.below) return band.multiplier;
  }
  /* v8 ignore next */
  throw new Error("engagement 구간 설정이 잘못되었습니다.");
}

/**
 * 예상 단가 = 기본 단가 × 참여율 × 카테고리 × 콘텐츠 유형 × 플랫폼 보정계수
 * 최소/최대 = 예상 단가 × range.min / range.max
 */
export function calculatePrice(input: InfluencerInput): CalculationResult {
  validateInput(input);

  const tier = getFollowerTier(input.followerCount);
  const baseRate = Math.round((input.followerCount / 1000) * tier.ratePer1000);
  const engagementRate = getEngagementRate(input);

  const multipliers = {
    engagement: getEngagementMultiplier(engagementRate),
    category: coefficients.category[input.category].multiplier,
    contentType: coefficients.contentType[input.contentType].multiplier,
    platform: coefficients.platform[input.platform].multiplier,
  };

  const steps: Array<[string, number]> = [
    [`참여율 ${engagementRate.toFixed(2)}%`, multipliers.engagement],
    [coefficients.category[input.category].label, multipliers.category],
    [coefficients.contentType[input.contentType].label, multipliers.contentType],
    [coefficients.platform[input.platform].label, multipliers.platform],
  ];

  const breakdown: BreakdownStep[] = [
    { label: `기본 단가 (${tier.label}, 1천 명당 ${tier.ratePer1000.toLocaleString()}원)`, multiplier: 1, amount: baseRate },
  ];
  let amount = baseRate;
  for (const [label, multiplier] of steps) {
    amount = Math.round(amount * multiplier);
    breakdown.push({ label, multiplier, amount });
  }

  return {
    tier: tier.id,
    baseRate,
    engagementRate,
    multipliers,
    estimate: amount,
    minPrice: Math.round(amount * coefficients.range.min),
    maxPrice: Math.round(amount * coefficients.range.max),
    breakdown,
  };
}

/** 폼 입력값 변환: 빈 칸은 0이 아니라 "미입력(undefined)"으로 취급한다. */
export function parseOptionalNumber(raw: FormDataEntryValue | null): number | undefined {
  if (raw === null || typeof raw !== "string" || raw.trim() === "") return undefined;
  return Number(raw);
}

export function formatKRW(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}
