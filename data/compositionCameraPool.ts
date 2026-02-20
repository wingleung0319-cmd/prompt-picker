/**
 * Advanced Composition & Camera Angle pool.
 * 三大類：鏡位鏡頭 (Cinematic Shots)、空間構圖 (Spatial Layout)、藝術透視 (Artistic Perspective).
 * Intensity: 1 平穩 / 2 藝術 / 3 震撼.
 */
export type CompositionCategory =
  | "cinematicShots"
  | "spatialLayout"
  | "artisticPerspective";

/** 1=平穩, 2=藝術, 3=震撼 */
export type IntensityLevel = 1 | 2 | 3;

export type CompositionPreset = {
  id: string;
  category: CompositionCategory;
  nameEn: string;
  nameZh: string;
  keywords: string;
  /** 自動適配：選到此鏡位時額外加入的關鍵詞 */
  extraKeywords?: string;
  /** 自動適配：選到此鏡位時從 base prompt 暫時移除的詞（避免衝突） */
  stripPhrases?: string[];
  intensity: IntensityLevel;
};

const CINEMATIC_SHOTS: CompositionPreset[] = [
  {
    id: "mysterious-closeup",
    category: "cinematicShots",
    nameEn: "Mysterious close-up",
    nameZh: "神祕特寫",
    keywords:
      "Extreme close-up, focus on glowing eyes, (macro photography:1.2), blurred wand in foreground",
    extraKeywords: "holding wand near face",
    intensity: 3,
  },
  {
    id: "dutch-angle",
    category: "cinematicShots",
    nameEn: "Dutch angle",
    nameZh: "荷蘭式傾斜",
    keywords:
      "Dutch angle, (tilted perspective:1.3), dynamic diagonal line, sense of instability",
    intensity: 3,
  },
  {
    id: "over-shoulder",
    category: "cinematicShots",
    nameEn: "Over-the-shoulder",
    nameZh: "過肩視角",
    keywords:
      "Over-the-shoulder shot, (looking over character's shoulder:1.2), focusing on the target",
    intensity: 2,
  },
];

const SPATIAL_LAYOUT: CompositionPreset[] = [
  {
    id: "golden-ratio",
    category: "spatialLayout",
    nameEn: "Golden ratio",
    nameZh: "黃金比例",
    keywords:
      "Golden ratio composition, (rule of thirds:1.2), off-center subject, elegant balance",
    extraKeywords: "asymmetrical background",
    stripPhrases: ["centered composition"],
    intensity: 2,
  },
  {
    id: "leading-lines",
    category: "spatialLayout",
    nameEn: "Leading lines",
    nameZh: "引導線構圖",
    keywords:
      "Leading lines, (background elements pointing to subject:1.2), radial symmetry",
    intensity: 2,
  },
  {
    id: "negative-space",
    category: "spatialLayout",
    nameEn: "Negative space",
    nameZh: "負空間留白",
    keywords:
      "Minimalist composition, (large negative space:1.4), subject placed at bottom, isolation",
    intensity: 1,
  },
];

const ARTISTIC_PERSPECTIVE: CompositionPreset[] = [
  {
    id: "worm-eye-hero",
    category: "artisticPerspective",
    nameEn: "Worm's eye hero",
    nameZh: "蟲瞰英雄",
    keywords:
      "Worm's eye view, (extremely low angle:1.3), looking up at a giant-like figure",
    extraKeywords:
      "arm raised high, pointing wand down at camera, white fluffy hair, floating upwards",
    intensity: 3,
  },
  {
    id: "wide-angle",
    category: "artisticPerspective",
    nameEn: "Wide angle",
    nameZh: "廣角拉伸",
    keywords:
      "Wide angle lens, (distorted edges:1.1), immersive environment, expansive view",
    intensity: 2,
  },
  {
    id: "symmetrical-front",
    category: "artisticPerspective",
    nameEn: "Symmetrical front",
    nameZh: "正前方對稱",
    keywords:
      "Symmetrical front view, (perfectly centered:1.3), flat 2D plane feeling",
    intensity: 1,
  },
];

export const COMPOSITION_CAMERA_POOL: CompositionPreset[] = [
  ...CINEMATIC_SHOTS,
  ...SPATIAL_LAYOUT,
  ...ARTISTIC_PERSPECTIVE,
];

export const INTENSITY_LEVELS: Record<
  IntensityLevel,
  { labelEn: string; labelZh: string }
> = {
  1: { labelEn: "Calm", labelZh: "平穩" },
  2: { labelEn: "Artistic", labelZh: "藝術" },
  3: { labelEn: "Intense", labelZh: "震撼" },
};

export function pickRandomCompositionPreset(
  intensityFilter: IntensityLevel | "all" = "all"
): CompositionPreset {
  const pool =
    intensityFilter === "all"
      ? COMPOSITION_CAMERA_POOL
      : COMPOSITION_CAMERA_POOL.filter((p) => p.intensity === intensityFilter);
  const usePool = pool.length > 0 ? pool : COMPOSITION_CAMERA_POOL;
  const i = Math.floor(Math.random() * usePool.length);
  return usePool[i];
}

/** 將 preset 轉成要追加到 prompt 的完整關鍵詞（含 extraKeywords） */
export function getCompositionKeywords(preset: CompositionPreset): string {
  const parts = [preset.keywords];
  if (preset.extraKeywords?.trim()) parts.push(preset.extraKeywords.trim());
  return parts.join(", ");
}

/** 對 base prompt 套用 stripPhrases（暫時移除衝突詞） */
export function stripConflictingPhrases(
  basePrompt: string,
  preset: CompositionPreset
): string {
  if (!preset.stripPhrases?.length) return basePrompt;
  let result = basePrompt;
  for (const phrase of preset.stripPhrases) {
    const re = new RegExp(
      `\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b,?\\s*`,
      "gi"
    );
    result = result.replace(re, "");
  }
  return result.replace(/,?\s*,/g, ",").replace(/^,\s*|,\s*$/g, "").trim();
}
