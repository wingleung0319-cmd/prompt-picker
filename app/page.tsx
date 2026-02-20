"use client";

import * as React from "react";
import { Header } from "@/components/Header";
import { CategoryAccordion } from "@/components/CategoryAccordion";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/LocaleProvider";
import { translations } from "@/lib/i18n";
import { buildPrompt, buildNegativePrompt, type Selections } from "@/lib/promptBuilder";
import {
  getSavedPrompts,
  savePrompt,
  deleteSavedPrompt,
  type SavedPrompt,
} from "@/lib/savedPrompts";
import {
  vocabularies,
  CATEGORY_KEYS,
  type CategoryKey,
} from "@/data/vocabularies";
import { Copy, Shuffle, Trash2, Sparkles, Save, FolderOpen, Loader2, FileInput, ImageIcon } from "lucide-react";
import { parsePngPrompt } from "@/lib/pngPrompt";
import {
  pickRandomCompositionPreset,
  getCompositionKeywords,
  stripConflictingPhrases,
  type CompositionPreset,
  type IntensityLevel,
} from "@/data/compositionCameraPool";
import { CameraDialIcon } from "@/components/CameraDialIcon";
import { AdBanner } from "@/components/AdBanner";

const STORAGE_KEY = "ai-prompt-generator-selections";
const CUSTOM_PROMPT_STORAGE_KEY = "ai-prompt-generator-custom-prompt";

function mergePrompt(custom: string, built: string): string {
  const c = custom.trim();
  const b = built.trim();
  if (!c) return b;
  if (!b) return c;
  return `${c}, ${b}`;
}

function randomPick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  const n = Math.min(count, shuffled.length);
  return shuffled.slice(0, n);
}

function randomSelections(): Selections {
  const s: Selections = {};
  for (const key of CATEGORY_KEYS) {
    const options = vocabularies[key];
    const count = Math.random() > 0.5 ? 1 : Math.floor(Math.random() * 3) + 1;
    s[key] = randomPick(options, count);
  }
  return s;
}

export default function Home() {
  const { locale } = useLocale();
  const t = translations[locale];

  const [selections, setSelections] = React.useState<Selections>({});
  const [customPrompt, setCustomPrompt] = React.useState("");

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Selections;
        const loaded = CATEGORY_KEYS.reduce<Selections>((acc, key) => {
          const val = parsed[key];
          if (Array.isArray(val) && val.every((x) => typeof x === "string")) {
            acc[key] = val;
          }
          return acc;
        }, {});
        setSelections(loaded);
      }
      const custom = localStorage.getItem(CUSTOM_PROMPT_STORAGE_KEY);
      if (custom != null) setCustomPrompt(custom);
    } catch {
      // ignore
    }
  }, []);

  const [promptText, setPromptText] = React.useState("");
  const [negativePromptText, setNegativePromptText] = React.useState("");
  const [randomCompositionPreset, setRandomCompositionPreset] =
    React.useState<CompositionPreset | null>(null);
  const [compositionIntensity, setCompositionIntensity] = React.useState<
    "all" | IntensityLevel
  >("all");
  const [savedList, setSavedList] = React.useState<SavedPrompt[]>([]);
  const [savedFeedback, setSavedFeedback] = React.useState(false);
  const pngInputRef = React.useRef<HTMLInputElement>(null);
  const skipNextNegativeSyncRef = React.useRef(false);

  React.useEffect(() => {
    let base = mergePrompt(customPrompt, buildPrompt(selections));
    if (randomCompositionPreset) {
      base = stripConflictingPhrases(base, randomCompositionPreset);
      const compositionPart = getCompositionKeywords(randomCompositionPreset);
      base = [base, compositionPart].filter(Boolean).join(", ");
    }
    setPromptText(base);
  }, [customPrompt, selections, randomCompositionPreset]);

  React.useEffect(() => {
    if (skipNextNegativeSyncRef.current) {
      skipNextNegativeSyncRef.current = false;
      return;
    }
    setNegativePromptText(buildNegativePrompt(selections));
  }, [selections]);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
    } catch {
      // ignore
    }
  }, [selections]);

  React.useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PROMPT_STORAGE_KEY, customPrompt);
    } catch {
      // ignore
    }
  }, [customPrompt]);

  const refreshSavedList = React.useCallback(() => {
    setSavedList(getSavedPrompts());
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") refreshSavedList();
  }, [refreshSavedList]);

  const handleGenerate = React.useCallback(() => {
    let base = mergePrompt(customPrompt, buildPrompt(selections));
    if (randomCompositionPreset) {
      base = stripConflictingPhrases(base, randomCompositionPreset);
      base = [base, getCompositionKeywords(randomCompositionPreset)]
        .filter(Boolean)
        .join(", ");
    }
    setPromptText(base);
  }, [customPrompt, selections, randomCompositionPreset]);

  const handleRandom = React.useCallback(() => {
    setSelections(randomSelections());
  }, []);

  const handleClear = React.useCallback(() => {
    setSelections({});
    setCustomPrompt("");
    setRandomCompositionPreset(null);
    setPromptText("");
    setNegativePromptText("");
  }, []);

  const handleRandomComposition = React.useCallback(() => {
    const preset = pickRandomCompositionPreset(compositionIntensity);
    setRandomCompositionPreset(preset);
  }, [compositionIntensity]);

  const [copied, setCopied] = React.useState(false);
  const [copiedNegative, setCopiedNegative] = React.useState(false);
  const handleCopy = React.useCallback(async () => {
    if (!promptText) return;
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [promptText]);
  const handleCopyNegative = React.useCallback(async () => {
    if (!negativePromptText) return;
    await navigator.clipboard.writeText(negativePromptText);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 1500);
  }, [negativePromptText]);

  const handleSave = React.useCallback(() => {
    const name =
      typeof window !== "undefined"
        ? window.prompt(
            locale === "zh" ? "請輸入提示詞名稱：" : "Enter a name for this prompt:",
            ""
          )
        : null;
    if (name == null || !name.trim()) return;
    savePrompt({
      name: name.trim(),
      promptText,
      negativePromptText,
      selections,
    });
    refreshSavedList();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1500);
  }, [promptText, negativePromptText, selections, locale, refreshSavedList]);

  const handleLoad = React.useCallback((item: SavedPrompt) => {
    setSelections(item.selections);
    setPromptText(item.promptText);
    setNegativePromptText(item.negativePromptText ?? buildNegativePrompt(item.selections));
    setCustomPrompt("");
  }, []);

  const handlePngLoad = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file?.type?.startsWith("image/png")) return;
      try {
        const buffer = await file.arrayBuffer();
        const result = parsePngPrompt(buffer);
        if (result) {
          skipNextNegativeSyncRef.current = true;
          setSelections({});
          setCustomPrompt(result.prompt);
          setNegativePromptText(result.negativePrompt);
        } else {
          alert(t.pngReadError);
        }
      } catch {
        alert(t.pngReadError);
      }
    },
    [t.pngReadError]
  );

  const handleDeleteSaved = React.useCallback((id: string) => {
    deleteSavedPrompt(id);
    refreshSavedList();
  }, [refreshSavedList]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 py-6 md:py-8 max-w-6xl mx-auto">
        <p className="text-muted-foreground text-sm mb-4">
          {t.selectFromCategories}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-1">
              <CategoryAccordion
                selections={selections}
                onSelectionsChange={setSelections}
              />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="custom-prompt">
                {t.customPrompt}
              </label>
              <input
                id="custom-prompt"
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={t.customPromptPlaceholder}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleGenerate} className="gap-2">
                <Sparkles className="h-4 w-4" />
                {t.generate}
              </Button>
              <Button variant="secondary" onClick={handleRandom} className="gap-2">
                <Shuffle className="h-4 w-4" />
                {t.random}
              </Button>
              <span className="inline-flex items-center gap-1.5">
                <select
                  value={
                    compositionIntensity === "all"
                      ? "all"
                      : String(compositionIntensity)
                  }
                  onChange={(e) =>
                    setCompositionIntensity(
                      e.target.value === "all"
                        ? "all"
                        : (Number(e.target.value) as IntensityLevel)
                    )
                  }
                  className="h-9 rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={t.compositionIntensity}
                >
                  <option value="all">{t.compositionIntensityAll}</option>
                  <option value={1}>{t.compositionIntensity1}</option>
                  <option value={2}>{t.compositionIntensity2}</option>
                  <option value={3}>{t.compositionIntensity3}</option>
                </select>
                <Button
                  variant="outline"
                  onClick={handleRandomComposition}
                  className="gap-2"
                  title={locale === "zh" ? "依視覺衝擊等級隨機抽一個構圖／角度（平面卡牌→電影大片）" : "Pick random composition by intensity (flat card → film look)"}
                >
                  <CameraDialIcon className="h-4 w-4" />
                  {t.randomCompositionCamera}
                </Button>
              </span>
              <Button variant="outline" onClick={handleClear} className="gap-2">
                <Trash2 className="h-4 w-4" />
                {t.clear}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
                disabled={!promptText}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? t.copied : t.copy}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyNegative}
                disabled={!negativePromptText}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copiedNegative ? t.copied : t.copyNegative}
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!promptText}
                className="gap-2"
              >
                {savedFeedback ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {savedFeedback ? t.saved : t.save}
              </Button>
              <input
                ref={pngInputRef}
                type="file"
                accept="image/png"
                className="hidden"
                aria-hidden
                onChange={handlePngLoad}
              />
              <Button
                variant="outline"
                onClick={() => pngInputRef.current?.click()}
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                {t.loadFromPng}
              </Button>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-h-[200px]">
              <label className="text-sm font-medium" htmlFor="prompt-preview">
                {t.promptPreview}
              </label>
              <textarea
                id="prompt-preview"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={t.promptPlaceholder}
                className="flex-1 min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-3 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="negative-prompt-preview">
                {t.negativePromptPreview}
              </label>
              <textarea
                id="negative-prompt-preview"
                value={negativePromptText}
                onChange={(e) => setNegativePromptText(e.target.value)}
                placeholder={t.negativePromptPlaceholder}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-3 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
              />
            </div>

            <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-4">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                <FolderOpen className="h-4 w-4" />
                {t.savedPrompts}
              </h3>
              {savedList.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t.noSavedPrompts}
                </p>
              ) : (
                <ul className="space-y-2">
                  {savedList.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                    >
                      <span className="truncate font-medium">{item.name}</span>
                      <div className="flex shrink-0 gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => handleLoad(item)}
                        >
                          <FileInput className="h-3.5 w-3.5" />
                          {t.load}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteSaved(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {t.delete}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
      <AdBanner format="horizontal" />
    </div>
  );
}
