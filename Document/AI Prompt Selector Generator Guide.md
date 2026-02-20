AI Prompt Selector Generator Guide
This Markdown file provides a complete guide to building an AI Prompt Selector Generator, based on our conversation. The app is designed to generate text prompts (e.g., for AI tools like Stable Diffusion) by selecting words from categorized vocabularies via dropdown menus. No image generation is involved—it's purely for creating structured prompt strings. The vocabularies are extensive and categorized for flexibility.
The guide includes setup steps, expanded vocabularies (with the newly added "Scenes" category), additional suggestions for enhancements, and notes on compatibility with Stable Diffusion.
Introduction

Purpose: A web app where users select words from categorized dropdowns (e.g., subjects, styles) to generate complete AI prompts. Output is a copyable text string, e.g., "A dragon in enchanted forest, majestic, in fantasy by Greg Rutkowski, digital art, cinematic lighting, warm colors, wide angle, masterpiece."
Reference: Inspired by SD Prompts Generator, but text-only and customizable.
Platform: (AI-driven no-code/low-code tool). Describe features in natural language, and generates the app.
Key Features:
Multi-select dropdowns for categories.
Generate button to combine selections.
Randomize unselected categories (optional toggle).
Clear all button.
Copyable/editable output textarea.

Prompt Format: \[Subjects] in \[Scenes], \[Adjectives], in \[Styles] by \[Artists], \[Mediums], with \[Lighting], \[Colors], \[Composition], \[Quality]. (Commas separate multiples; adjust as needed.)

Setup Steps

Start a New Project:
Create a new app and describe it:text
Create a web app named AI Prompt Selector Generator. It's for generating text prompts only, no image generation. The UI has categorized multi-select dropdowns for vocabularies like subjects, scenes, adjectives, styles, artists, mediums, lighting, colors, composition, and quality. Each dropdown pulls from a predefined list. Include a 'Generate Prompt' button that combines selections into a complete prompt string, displayed in a copyable text area. If a category is empty, optionally randomize it. Add a 'Clear All' button. Use a simple, tabbed layout for categories to keep it organized. No integrations with image APIs.

AI generates the initial app (UI, logic, data).

Define Data Model (Vocabularies):
In "Data" or "Database" section, create a collection/table named "PromptVocab".
Each category is a property storing an array of words. Import as JSON or CSV if large.
Use the vocabularies listed below.

Customize UI and Logic:
Refine with prompts like:
Update to include Scenes category after Subjects. Format prompt as: \[Subjects] in \[Scenes], \[Adjectives], in \[Styles] by \[Artists], \[Mediums], with \[Lighting], \[Colors], \[Composition], \[Quality]. Add toggle for 'Randomize unselected categories'.

Make dropdowns multi-select and searchable. Add a 'Random Full Prompt' button to generate with random selections.

Test: Preview, select words, generate, and iterate.

Publish and Extend:
Publish for hosting/domain.
Advanced: Add user auth for custom words, or export prompts.
Cost: Free tier for prototypes; paid from ~$20/month.



Vocabularies
Expanded lists (50+ words per category, sourced from AI prompt best practices like PromptHero, Civitai). generate more via prompts like "Generate 50 more adjectives."

1. Subjects (主題) - Core elements or objects.
   woman, man, warrior, elf, dragon, lion, cat, tree, mountain, ocean, forest, city, castle, spaceship, robot, alien, ghost, superhero, portrait, landscape, abstract, futuristic city, ancient ruin, underwater scene, space station, desert, jungle, volcano, bridge, pyramid, statue, dreamscape, fantasy realm, sci-fi battle, historical event, party, adventure, mystery, romance, knight, princess, wizard, mermaid, phoenix, unicorn, vampire, werewolf, pirate, explorer, scientist, artist, musician, dancer, athlete, chef, garden, library, marketplace, temple, laboratory, battlefield, starry sky, cloudy horizon.
2. Scenes (場景) - Background environments or settings.
   enchanted forest, bustling city street, serene mountain peak, foggy swamp, underwater coral reef, ancient temple ruins, futuristic metropolis, snowy tundra, desert oasis, volcanic crater, lush jungle canopy, abandoned factory, haunted mansion, cosmic nebula, starry night sky, rural countryside farm, bustling marketplace, grand ballroom, dark alleyway, peaceful beach at sunset, icy glacier cave, blooming cherry blossom garden, post-apocalyptic wasteland, medieval castle courtyard, space station interior, underwater shipwreck, mystical waterfall, vibrant carnival, quiet library hall, stormy ocean waves, dense bamboo grove, golden wheat field, cyberpunk neon district, victorian street, roman coliseum, egyptian pyramid interior, japanese zen garden, arctic polar base, tropical island paradise, underground cavern, floating island in the sky, war-torn battlefield, serene meadow, bustling harbor, ancient forest glade, futuristic lab, cozy cabin in woods, urban rooftop, mystical fog-shrouded valley, alien planet surface, historical battlefield, enchanted garden, derelict spaceship, tranquil riverbank, vibrant coral atoll, shadowy crypt, sunlit vineyard, moonlit graveyard, bustling airport, quiet monastery, dramatic canyon, lush rainforest trail, industrial warehouse, elegant opera house, remote mountain village, cosmic black hole vicinity, serene lotus pond, chaotic street protest, peaceful suburban neighborhood, ancient stone circle, futuristic highway, hidden cave sanctuary, stormy cliffside, blooming flower field, derelict amusement park, underwater abyss, celestial observatory, rural vineyard, urban subway station, mystical oracle chamber, post-war ruins, tranquil hot spring, vibrant festival square, shadowy forest path, golden autumn woods, icy winter village, tropical monsoon jungle, cybernetic augmentation clinic, historical sailing ship deck, enchanted mirror realm, desolate moon surface, bustling fish market, quiet art studio, dramatic theater stage, lush greenhouse, underground bunker, floating market canal, serene bamboo forest, chaotic war room, peaceful yoga retreat, vibrant street art alley, ancient runes site, futuristic drone hive, hidden treasure cove, stormy lighthouse, blooming tulip field, derelict prison, underwater research lab, celestial comet trail, rural horse ranch, urban graffiti wall.
3. Adjectives/Descriptors (形容詞/描述詞) - Modifiers for details.
   beautiful, serene, vivid, intricate, majestic, ethereal, mysterious, dramatic, whimsical, gloomy, vibrant, peaceful, chaotic, elegant, rugged, futuristic, ancient, magical, surreal, cute, terrifying, dynamic, symmetrical, high-contrast, epic, intimate, soft, sharp, textured, luminous, shadowy, radiant, colorful, warm, cool, intense, ornate, minimalist, immersive, abstract, realistic, cartoonish, pixelated, hand-drawn, organic, mechanical, enchanting, foreboding, playful, solemn, radiant, hazy, crisp, flowing, rigid, layered, sparse, atmospheric, nostalgic, innovative, timeless.
4. Styles (風格) - Overall artistic or visual styles.
   photorealistic, stylized, surrealism, expressionism, impressionism, cubism, pop art, anime, manga, cyberpunk, steampunk, fantasy, sci-fi, horror, noir, vintage, retro, modern, baroque, gothic, renaissance, medieval, art deco, art nouveau, abstract, geometric, fractal, psychedelic, dreamlike, dark fantasy, cinematic, illustrative, conceptual, editorial, fashion, architectural, game art, matte painting, whimsical, light-hearted, gritty, elegant, bold, subtle, intricate, minimalist, vibrant, muted, dynamic, static.
5. Artists (藝術家) - Style inspirations from artists.
   Vincent van Gogh, Pablo Picasso, Leonardo da Vinci, Claude Monet, Salvador Dali, Frida Kahlo, Andy Warhol, Hokusai, Rembrandt, Gustav Klimt, Jackson Pollock, Georgia O'Keeffe, Wassily Kandinsky, Henri Matisse, Edvard Munch, Jean-Michel Basquiat, Keith Haring, Yayoi Kusama, Damien Hirst, Norman Rockwell, Alphonse Mucha, HR Giger, Hayao Miyazaki, Tim Burton, Stanley Kubrick, Akira Toriyama, Frank Frazetta, Boris Vallejo, Syd Mead, Greg Rutkowski, Alena Aenami, Marc Simonetti, Loish, Ross Tran, Ilya Kuvshinov, Beeple, Refik Anadol, John Harris, Simon Stalenhag, Pascal Campion, Victo Ngai, Rebecca Yanovskaya, James Jean, Audrey Kawasaki.
6. Mediums (媒介) - Creation mediums or techniques.
   oil painting, watercolor, acrylic, ink drawing, pencil sketch, charcoal, pastel, digital art, vector illustration, pixel art, collage, mosaic, engraving, etching, lithography, screen print, mixed media, gouache, tempera, fresco, airbrush, spray paint, ballpoint pen, marker, crayon, fabric textile, embroidery, digital manipulation, stop-motion frame, comic panel, storyboard sketch, architectural blueprint, map illustration, infographic, poster design, line art, silhouette, abstract pattern, conceptual diagram, narrative sequence, poetic description, symbolic representation, metaphorical depiction, allegorical scene.
7. Lighting (照明) - Lighting effects and atmospheres.
   soft golden, cinematic, dramatic shadows, backlit, rim light, diffused, neon glow, moonlight, sunlight, candlelight, firelight, ethereal mist, foggy haze, volumetric, god rays, high key, low key, chiaroscuro, silhouette, overcast, twilight, dawn, dusk, fluorescent, warm glow, cool blue, harsh midday, soft evening, spotlight, ambient, reflective highlights, subsurface, lens flare, bokeh, depth of field, subtle illumination, intense beam, scattered rays, glowing aura, dim twilight, radiant dawn, shadowy dusk, flickering flame, steady beam, ethereal luminescence.
8. Colors (顏色) - Color schemes or tones.
   warm pastel, vivid, monochromatic, black and white, sepia, cool blues, fiery reds, earthy tones, neon brights, muted grays, golden yellows, deep purples, emerald greens, turquoise, crimson, indigo, lavender, magenta, cyan, amber, bronze, silver, gold, rainbow, analogous, complementary, triadic, high saturation, low saturation, desaturated, vibrant hues, subtle shades, gradient, color blocking, ombre, tonal variation, high contrast, low contrast, autumnal, spring fresh, winter cool, summer bright, oceanic blues, forest greens, desert sands, urban grays.
9. Composition \& Lens (構圖與鏡頭) - Layout and perspectives.
   wide-angle, telephoto, macro, fish-eye, tilt-shift, aerial view, bird's eye, worm's eye, close-up, medium shot, long shot, full body, portrait, landscape, symmetrical, rule of thirds, golden ratio, centered, off-center, dynamic diagonal, horizontal, vertical, curved, leading lines, frame within frame, negative space, panoramic, diptych, triptych, montage, cinematic ratio, square format, layered depth, balanced symmetry, asymmetrical balance, focal point emphasis, expansive vista, intimate detail, narrative flow, symbolic arrangement, abstract alignment.
10. Quality \& Enhancers (質量提升) - Tags for quality and refinement.
    ultra-detailed, masterpiece, high res, sharp focus, intricate details, realistic, hyper-realistic, professionally graded, vibrant, immersive, award-winning, epic scale, fine art, detailed textures, perfect anatomy, coherent composition, balanced, atmospheric depth, volumetric effects, post-processing, HDR, polished, refined, exquisite, flawless, captivating, engaging, thought-provoking, innovative, timeless, evocative, mesmerizing, stunning, breathtaking, elegant, sophisticated, bold, subtle, harmonious, contrasting, unified, diverse, intricate, simplistic.
    Additional Suggestions
    Expand Vocabularies and Categories

Add categories like:
Emotions/Moods: joyful, melancholic, tense, romantic, eerie, uplifting, despairing, adventurous, calm, furious, nostalgic, hopeful, sinister, playful, solemn.
Actions/Verbs: flying, running, whispering, battling, exploring, dancing, meditating, exploding, transforming, gazing, leaping, hiding, summoning.
Perspectives/Views: first-person view, third-person narrative, overhead perspective, intimate close-up, epic panorama, distorted fisheye, dream sequence, flashback.
Cultural/Theme Elements: steampunk machinery, cyberpunk neon, medieval armor, ancient mythology, futuristic tech, victorian elegance, japanese folklore, african tribal, celtic runes.

Prompt: "Add new dropdown categories: Emotions, Actions, Perspectives. Generate 50 words for each and integrate into prompt format after Adjectives."
Allow user-custom words: "Add a button for users to input custom words and save them to categories, stored in user-specific database."

UI and User Experience

Searchable dropdowns: "Make dropdowns searchable with a filter input."
Preset templates: "Add a template selector dropdown with 5 predefined sets of selections." (E.g., "Fantasy Art" pre-fills fantasy-related words.)
Bilingual support (English/Chinese): "Support bilingual vocab: English and Chinese. Add a language toggle switch." (Useful for Hong Kong users.)
Mobile optimization: "Optimize for mobile: Use collapsible tabs for categories."

Features and Logic

Weight adjustments: "Add sliders next to selections for weight (0.5-2.0), and include in output like (word:weight)."
Negative prompts: "Add a Negative Prompts tab with its own dropdowns, and generate two text areas: Positive and Negative." (E.g., avoid "blurry, ugly".)
Variants: "Add 'Generate Variants' button that creates 3-5 similar prompts by randomizing 20% of selections."
Save/Share: "Integrate user login and a 'Saved Prompts' page. Add share button to copy link or export file."
AI suggestions: "Use AI to add a 'Suggest Words' input field that generates recommendations for categories."

Testing and Iteration

A/B test layouts: Use analytics.
Community feedback: Share on Reddit r/AIPrompts.
Performance: "Paginate long dropdown lists to load faster."
Security: "Add input validation to prevent script injection."

Compatibility with Stable Diffusion
Yes, this generator is highly compatible with Stable Diffusion (SD):

Why It Fits: SD relies on detailed text prompts for image generation. Your app produces optimized prompts that match SD's structure (e.g., subjects + descriptors + styles).
Usage: Copy generated prompts directly into SD tools like Automatic1111 WebUI or Hugging Face models.
Tips: Test with SD versions (1.5, SDXL); use weights/negatives for fine-tuning. Communities like r/StableDiffusion have more examples.
Enhancements: If desired, integrate SD API later: "Integrate with Stability AI API for optional image previews" (but keep core as text-only).
Limitations: Prompts work with other AIs (e.g., Midjourney, DALL-E), but SD excels at detailed control.

