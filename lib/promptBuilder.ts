import type { CategoryKey } from "@/data/vocabularies";

export type Selections = Partial<Record<CategoryKey, string[]>>;

/**
 * Build prompt string from selections.
 * Format: [Subjects] in [Scenes], [Adjectives], [Emotions], [Actions], in [Styles] by [Artists], [Mediums], with [Lighting], [Colors], [Composition], [Quality].
 */
export function buildPrompt(selections: Selections): string {
  const parts: string[] = [];

  const subj = selections.subjects?.filter(Boolean).join(", ");
  const scenes = selections.scenes?.filter(Boolean).join(", ");
  if (subj || scenes) {
    if (subj && scenes) parts.push(`${subj} in ${scenes}`);
    else if (subj) parts.push(subj);
    else if (scenes) parts.push(scenes);
  }

  const adj = selections.adjectives?.filter(Boolean).join(", ");
  if (adj) parts.push(adj);

  const emotions = selections.emotions?.filter(Boolean).join(", ");
  if (emotions) parts.push(emotions);

  const actions = selections.actions?.filter(Boolean).join(", ");
  if (actions) parts.push(actions);

  const hairStyle = selections.hairStyle?.filter(Boolean).join(", ");
  if (hairStyle) parts.push(hairStyle);

  const eyesDetails = selections.eyesDetails?.filter(Boolean).join(", ");
  if (eyesDetails) parts.push(eyesDetails);

  const clothStyle = selections.clothStyle?.filter(Boolean).join(", ");
  if (clothStyle) parts.push(clothStyle);

  const accessories = selections.accessories?.filter(Boolean).join(", ");
  if (accessories) parts.push(accessories);

  const hairAccessories = selections.hairAccessories?.filter(Boolean).join(", ");
  if (hairAccessories) parts.push(hairAccessories);

  const items = selections.items?.filter(Boolean).join(", ");
  if (items) parts.push(items);

  const pose = selections.pose?.filter(Boolean).join(", ");
  if (pose) parts.push(pose);

  const handPose = selections.handPose?.filter(Boolean).join(", ");
  if (handPose) parts.push(handPose);

  const angle = selections.angle?.filter(Boolean).join(", ");
  if (angle) parts.push(angle);

  const styles = selections.styles?.filter(Boolean).join(", ");
  if (styles) parts.push(`in ${styles}`);

  const artists = selections.artists?.filter(Boolean).join(", ");
  if (artists) parts.push(`by ${artists}`);

  const mediums = selections.mediums?.filter(Boolean).join(", ");
  if (mediums) parts.push(mediums);

  const lighting = selections.lighting?.filter(Boolean).join(", ");
  if (lighting) parts.push(`with ${lighting}`);

  const colors = selections.colors?.filter(Boolean).join(", ");
  if (colors) parts.push(colors);

  const composition = selections.composition?.filter(Boolean).join(", ");
  if (composition) parts.push(composition);

  const waterEffects = selections.waterEffects?.filter(Boolean).join(", ");
  if (waterEffects) parts.push(waterEffects);

  const quality = selections.quality?.filter(Boolean).join(", ");
  if (quality) parts.push(quality);

  return parts.join(", ").trim() || "";
}

/** Build negative prompt string from selections (negative category only). */
export function buildNegativePrompt(selections: Selections): string {
  const neg = selections.negative?.filter(Boolean).join(", ");
  return neg?.trim() ?? "";
}
