這個 App 的核心功能是：透過多個分類的下拉選單選擇詞彙，最後點擊生成按鈕得到完整的 Prompt 字串。適合 Stable Diffusion 或其他 AI 圖像生成工具使用。
整體 UI 設計理念

乾淨、現代、單頁應用（SPA）
垂直佈局，適合桌面與平板，也能在手機上勉強可用
使用卡片式分類 + 可收合的 Accordion 或 Tabs
左側或上方為選擇區，右側或下方為生成結果 + 操作按鈕
支援深色模式（Dark Mode）為佳

推薦的兩種主要佈局（你可以選一種實作）
佈局 A：側邊欄 + 主內容區（桌面優先，推薦）
┌──────────────────────────────────────────────────────────────┐
│ App Header: AI Prompt Selector Generator                     │
│ [Language: EN / 中]   [Dark/Light]   [About]                 │
└──────────────────────────────────────────────────────────────┘
┌───────────────────────┐ ┌────────────────────────────────────┐
│ Sidebar (左側導航)    │ │ Main Content (右側主區)            │
│                       │ │                                    │
│ ┌───────────────────┐ │ ┌────────────────────────────────┐ │
│ │ Categories        │ │ │ Prompt Preview (即時更新區域)  │ │
│ │ ▸ Subjects       │ │ │ [多行文字框，可編輯]           │ │
│ │ ▸ Scenes         │ │ │ Copy / Clear                   │ │
│ │ ▸ Adjectives     │ │ └────────────────────────────────┘ │
│ │ ▸ Styles         │ │                                    │
│ │ ▸ Artists        │ │ ┌────────────────────────────────┐ │
│ │ ▸ Mediums        │ │ │ 生成參數區                     │ │
│ │ ▸ Lighting       │ │ │ □ Randomize unselected         │ │
│ │ ▸ Colors         │ │ │ □ Add weights ( :1.2 )         │ │
│ │ ▸ Composition    │ │ │ □ Include negative prompt      │ │
│ │ ▸ Quality        │ │ └────────────────────────────────┘ │
│ │ ▸ Emotions       │ │                                    │
│ │ ▸ Actions        │ │ ┌────────────────────────────────┐ │
│ └───────────────────┘ │ │ 負面提示 (可選展開)            │ │
│                       │ │ [另一個文字框]                 │ │
│ ┌───────────────────┐ │ └────────────────────────────────┘ │
│ │ Quick Actions     │ │                                    │
│ │ • Random Prompt   │ │ ┌────────────────────────────────┐ │
│ │ • Clear All       │ │ │ 生成按鈕區                     │ │
│ │ • Save Template   │ │ │ [Generate Prompt]  [Generate x5]│ │
│ │ • Load Template   │ │ └────────────────────────────────┘ │
│ └───────────────────┘ │                                    │
└───────────────────────┘ └────────────────────────────────────┘

推薦使用的 UI 元件庫（2026 年主流選擇）

方案,優點,適合人群,Cursor 提示關鍵字建議
shadcn/ui + Tailwind,最流行、最美、最靈活,想做出好看介面的開發者,shadcn/ui tailwind nextjs prompt generator
Radix UI + Tailwind,無樣式基礎組件，高度客製,追求控制感,radix-ui tailwind accordion dropdown
Chakra UI,內建深色模式、很好用,快速開發,chakra-ui prompt selector app
Mantine,元件豐富、內建很多實用功能,喜歡一站式解決方案,mantine ui prompt generator
Headless UI + Tailwind,極簡、只給行為不給樣式,極客風格,headless ui tailwind multi-select

目前最推薦：shadcn/ui + Tailwind CSS + Next.js 14/15

主要畫面元件建議

分類區（Accordion 或 Tabs）
使用 <Accordion type="multiple">（允許多個同時展開）
每個分類是一個 Accordion Item
裡面放多選下拉（Multi-Select）或 Tag 輸入 + 建議清單

多選下拉元件
shadcn/ui 的 Command + Popover 組合做搜尋型多選
或使用 react-select / @tanstack/react-select（但 shadcn 風格較一致）

Prompt 預覽區
使用 <Textarea>，高度 8–12 行
支援即時更新（debounce 後更新）
右上角放 Copy 按鈕（使用 navigator.clipboard）

生成按鈕區
大顆主要按鈕：Generate Prompt
次要按鈕：Random Full Prompt、Clear All、Generate 5 Variants

其他小功能
語言切換（en / zh）
深色模式切換
儲存/載入模板（可存 localStorage 或 Supabase/Firebase）
權重調整（進階）：每個選項後面可加 ( :1.2 ) 滑桿或輸入框