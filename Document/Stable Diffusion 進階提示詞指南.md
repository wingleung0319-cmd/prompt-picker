# Stable Diffusion 進階提示詞指南

Stable Diffusion（簡稱 SD）是一款強大的開源 AI 圖像生成模型，進階提示詞（Prompt Engineering）是提升生成品質、控制風格與細節的關鍵。本指南整理實用技巧、結構化方法與常見範例，適合使用 Automatic1111 WebUI、ComfyUI 或其他 SD 介面的用戶。

**最後更新**：2026 年  
**適用模型**：SD 1.5、SDXL、Flux、Pony 等主流版本

## 1. 提示詞的基本結構（推薦順序）

一個高效的 SD 提示詞通常按以下順序組織，從最重要的元素開始：

1. **主題 / 主體 (Subject)**  
   核心物件或人物，例如：`a majestic dragon`、`beautiful female elf warrior`

2. **場景 / 環境 (Scene / Setting)**  
   背景與情境，例如：`in an enchanted ancient forest at twilight`

3. **細節描述 / 形容詞 (Descriptors / Adjectives)**  
   質感、外觀、氛圍，例如：`highly detailed, ethereal, cinematic, vibrant, intricate`

4. **藝術風格 (Style)**  
   整體風格，例如：`cyberpunk, fantasy art, anime, photorealistic, oil painting`

5. **藝術家參考 (Artists)**  
   借鑒知名藝術家風格，例如：`by Greg Rutkowski, Alphonse Mucha, Ross Tran`

6. **媒介 / 材質 (Medium)**  
   創作形式，例如：`digital painting, concept art, 35mm film, watercolor`

7. **照明與氛圍 (Lighting & Mood)**  
   光線效果，例如：`cinematic lighting, golden hour, volumetric god rays, rim light`

8. **顏色方案 (Colors)**  
   色調，例如：`warm pastel colors, neon cyberpunk palette, desaturated muted tones`

9. **構圖與鏡頭 (Composition & Camera)**  
   視角與畫面，例如：`wide angle, rule of thirds, close-up portrait, dynamic angle`

10. **品質提升詞 (Quality Boosters)**  
    常放在最後，例如：`masterpiece, best quality, ultra detailed, 8k, sharp focus`




## 2. 進階技巧

### 2.1 權重調整（Emphasis）
- 加強：`(keyword:1.3)` 或 `((keyword))`（每多一層括號約 +10%）
- 減弱：`[keyword]` 或 `(keyword:0.7)`

(highly detailed dragon scales:1.4), (beautiful female elf:1.2), [blurry background:1.1]
text### 2.2 負面提示（Negative Prompt）
負面提示是提升品質的關鍵，尤其在 SDXL 與新模型中更重要。

**推薦通用負面提示**（可直接複製）：
worst quality, low quality, normal quality, lowres, blurry, bad anatomy, deformed, mutated hands, extra limbs, missing limbs, poorly drawn face, bad proportions, extra fingers, fused fingers, malformed limbs, watermark, text, signature, logo, jpeg artifacts, compression artifacts, ugly, tiling, out of frame, cropped
text**針對特定問題的負面詞**：
- 手部變形：`bad hands, deformed hands, extra fingers`
- 臉部問題：`bad face, deformed eyes, asymmetrical face`
- 過曝/過暗：`overexposed, underexposed`
- 卡通感太強：`cartoon, 3d render, cgi, plastic`

### 2.3 風格與概念混合
使用 `[A:B:step]` 在生成過程中切換：
[realistic:anime:0.4], cyberpunk city at night
text（前 40% 步驟偏寫實，後 60% 偏動漫）

### 2.4 其他實用語法
- **BREAK**：強制分段（特別在長提示時）
beautiful landscape BREAK highly detailed foreground BREAK cinematic lighting
text- **野生卡（Wildcards）**：在 AUTOMATIC1111 中使用 `__wildcard__`
- **LoRA / Embedding**：`<lora:style_name:0.8>` 或 `(embedding_name:1.1)`

## 3. 常見參數建議

| 參數              | 推薦值（SDXL） | 說明                              |
|-------------------|----------------|-----------------------------------|
| Sampling method   | DPM++ 2M Karras / Euler a | 最常用且穩定                     |
| Sampling steps    | 20–40          | 細節多用 30–50                   |
| CFG Scale         | 7–12           | 7 較創意，12 較嚴格遵守提示      |
| Resolution        | 1024×1024 或 768×1280 | SDXL 原生解析度最佳              |
| Denoising strength| 0.3–0.7 (img2img) | 低值保留原圖，高值大改           |

## 4. 實戰範例

### 範例 1：寫實肖像
professional portrait of a young asian woman with long black hair, detailed skin texture, soft natural lighting, studio photography, shallow depth of field, bokeh, hyper realistic, by Annie Leibovitz, 8k, masterpiece, best quality
Negative: cartoon, anime, deformed, blurry, lowres
text### 範例 2：賽博朋克場景
futuristic cyberpunk city street at night, neon lights, rain, reflective wet pavement, flying cars, holographic billboards, atmospheric fog, cinematic, highly detailed, in the style of Syd Mead and Simon Stålenhag, cyberpunk aesthetic, vibrant neon colors, ultra detailed, 8k
Negative: low quality, blurry, text, watermark
text### 範例 3：幻想角色（帶權重）
beautiful female dark elf sorceress casting spell, glowing purple magic, intricate silver jewelry, flowing black robes, (highly detailed face:1.3), (dramatic pose:1.2), fantasy forest background at night, moonlight, volumetric fog, epic fantasy art by Ross Tran and Alena Aenami, digital painting, masterpiece, best quality, ultra detailed
text