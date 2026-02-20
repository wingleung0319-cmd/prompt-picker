import type { Selections } from "./promptBuilder";

export interface SavedPrompt {
  id: string;
  name: string;
  promptText: string;
  negativePromptText?: string;
  selections: Selections;
  createdAt: number;
}

const STORAGE_KEY = "ai-prompt-generator-saved";

export function getSavedPrompts(): SavedPrompt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p: unknown): p is SavedPrompt =>
        p !== null &&
        typeof p === "object" &&
        "id" in p &&
        "name" in p &&
        "promptText" in p &&
        "selections" in p &&
        "createdAt" in p
    ).map((p) => ({
      ...p,
      negativePromptText: (p as SavedPrompt).negativePromptText ?? "",
    }));
  } catch {
    return [];
  }
}

export function savePrompt(item: Omit<SavedPrompt, "id" | "createdAt">): SavedPrompt {
  const list = getSavedPrompts();
  const newItem: SavedPrompt = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const next = [newItem, ...list];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return newItem;
}

export function deleteSavedPrompt(id: string): void {
  const list = getSavedPrompts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
