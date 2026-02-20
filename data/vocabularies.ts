/** Order: subject & scene → mood → character → pose & camera → style & rendering → quality & negative */
export const CATEGORY_KEYS = [
  "subjects",
  "scenes",
  "adjectives",
  "emotions",
  "actions",
  "hairStyle",
  "eyesDetails",
  "clothStyle",
  "accessories",
  "hairAccessories",
  "items",
  "pose",
  "handPose",
  "angle",
  "composition",
  "styles",
  "artists",
  "mediums",
  "lighting",
  "colors",
  "waterEffects",
  "quality",
  "negative",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export const vocabularies: Record<CategoryKey, string[]> = {
  subjects:
    "woman, man, warrior, elf, dragon, lion, cat, dog, tree, mountain, ocean, forest, city, castle, spaceship, robot, alien, ghost, superhero, portrait, landscape, abstract, futuristic city, ancient ruin, underwater scene, space station, desert, jungle, volcano, bridge, pyramid, statue, dreamscape, fantasy realm, sci-fi battle, historical event, party, adventure, mystery, romance, knight, princess, wizard, mermaid, phoenix, unicorn, vampire, werewolf, pirate, explorer, scientist, artist, musician, dancer, athlete, chef, garden, library, marketplace, temple, laboratory, battlefield, starry sky, cloudy horizon, young woman, rose".split(
      ", "
    ),
  scenes:
    "enchanted forest, bustling city street, serene mountain peak, foggy swamp, underwater coral reef, ancient temple ruins, futuristic metropolis, snowy tundra, desert oasis, volcanic crater, lush jungle canopy, abandoned factory, haunted mansion, cosmic nebula, starry night sky, rural countryside farm, bustling marketplace, grand ballroom, dark alleyway, peaceful beach at sunset, icy glacier cave, blooming cherry blossom garden, post-apocalyptic wasteland, medieval castle courtyard, space station interior, underwater shipwreck, mystical waterfall, vibrant carnival, quiet library hall, stormy ocean waves, dense bamboo grove, golden wheat field, cyberpunk neon district, victorian street, roman coliseum, egyptian pyramid interior, japanese zen garden, arctic polar base, tropical island paradise, underground cavern, floating island in the sky, war-torn battlefield, serene meadow, bustling harbor, ancient forest glade, futuristic lab, cozy cabin in woods, urban rooftop, mystical fog-shrouded valley, alien planet surface, historical battlefield, enchanted garden, derelict spaceship, tranquil riverbank, vibrant coral atoll, shadowy crypt, sunlit vineyard, moonlit graveyard, bustling airport, quiet monastery, dramatic canyon, lush rainforest trail, industrial warehouse, elegant opera house, remote mountain village, cosmic black hole vicinity, serene lotus pond, chaotic street protest, peaceful suburban neighborhood, ancient stone circle, futuristic highway, hidden cave sanctuary, stormy cliffside, blooming flower field, derelict amusement park, underwater abyss, celestial observatory, rural vineyard, urban subway station, mystical oracle chamber, post-war ruins, tranquil hot spring, vibrant festival square, shadowy forest path, golden autumn woods, icy winter village, tropical monsoon jungle, cybernetic augmentation clinic, historical sailing ship deck, enchanted mirror realm, desolate moon surface, bustling fish market, quiet art studio, dramatic theater stage, lush greenhouse, underground bunker, floating market canal, serene bamboo forest, chaotic war room, peaceful yoga retreat, vibrant street art alley, ancient runes site, futuristic drone hive, hidden treasure cove, stormy lighthouse, blooming tulip field, derelict prison, underwater research lab, celestial comet trail, rural horse ranch, urban graffiti wall, cliff edge, distant mountains, tarot card scene".split(
      ", "
    ),
  adjectives:
    "beautiful, serene, vivid, intricate, majestic, ethereal, mysterious, dramatic, whimsical, gloomy, vibrant, peaceful, chaotic, elegant, rugged, futuristic, ancient, magical, surreal, cute, terrifying, dynamic, symmetrical, high-contrast, epic, intimate, soft, sharp, textured, luminous, shadowy, radiant, colorful, warm, cool, intense, ornate, minimalist, immersive, abstract, realistic, cartoonish, pixelated, hand-drawn, organic, mechanical, enchanting, foreboding, playful, solemn, radiant, hazy, crisp, flowing, rigid, layered, sparse, atmospheric, nostalgic, innovative, timeless, restrained, selective color".split(
      ", "
    ),
  styles:
    "photorealistic, stylized, surrealism, expressionism, impressionism, cubism, pop art, anime, manga, cyberpunk, steampunk, fantasy, sci-fi, horror, noir, vintage, retro, modern, baroque, gothic, renaissance, medieval, art deco, art nouveau, abstract, geometric, fractal, psychedelic, dreamlike, dark fantasy, cinematic, illustrative, conceptual, editorial, fashion, architectural, game art, matte painting, whimsical, light-hearted, gritty, elegant, bold, subtle, intricate, minimalist, vibrant, muted, dynamic, static, flat illustration, planar composition, orthographic, symbolic layout, street art, graffiti, mural".split(
      ", "
    ),
  artists:
    "Vincent van Gogh, Pablo Picasso, Leonardo da Vinci, Claude Monet, Salvador Dali, Frida Kahlo, Andy Warhol, Hokusai, Rembrandt, Gustav Klimt, Jackson Pollock, Georgia O'Keeffe, Wassily Kandinsky, Henri Matisse, Edvard Munch, Jean-Michel Basquiat, Keith Haring, Yayoi Kusama, Damien Hirst, Norman Rockwell, Alphonse Mucha, HR Giger, Hayao Miyazaki, Tim Burton, Stanley Kubrick, Akira Toriyama, Frank Frazetta, Boris Vallejo, Syd Mead, Greg Rutkowski, Alena Aenami, Marc Simonetti, Loish, Ross Tran, Ilya Kuvshinov, Beeple, Refik Anadol, John Harris, Simon Stalenhag, Pascal Campion, Victo Ngai, Rebecca Yanovskaya, James Jean, Audrey Kawasaki".split(
      ", "
    ),
  mediums:
    "oil painting, watercolor, acrylic, ink drawing, pencil sketch, charcoal, pastel, digital art, vector illustration, pixel art, collage, mosaic, engraving, etching, lithography, screen print, mixed media, gouache, tempera, fresco, airbrush, spray paint, ballpoint pen, marker, crayon, fabric textile, embroidery, digital manipulation, stop-motion frame, comic panel, storyboard sketch, architectural blueprint, map illustration, infographic, poster design, line art, silhouette, abstract pattern, conceptual diagram, narrative sequence, poetic description, symbolic representation, metaphorical depiction, allegorical scene".split(
      ", "
    ),
  lighting:
    "soft golden, cinematic, dramatic shadows, backlit, rim light, diffused, neon glow, moonlight, sunlight, candlelight, firelight, ethereal mist, foggy haze, volumetric, god rays, high key, low key, chiaroscuro, silhouette, overcast, twilight, dawn, dusk, fluorescent, warm glow, cool blue, harsh midday, soft evening, spotlight, ambient, reflective highlights, subsurface, lens flare, bokeh, depth of field, soft depth of field, subtle illumination, intense beam, scattered rays, glowing aura, dim twilight, radiant dawn, shadowy dusk, flickering flame, steady beam, ethereal luminescence".split(
      ", "
    ),
  colors:
    "warm pastel, vivid, monochromatic, black and white, sepia, cool blues, fiery reds, earthy tones, neon brights, muted grays, golden yellows, deep purples, emerald greens, turquoise, crimson, indigo, lavender, magenta, cyan, amber, bronze, silver, gold, rainbow, analogous, complementary, triadic, high saturation, low saturation, desaturated, vibrant hues, subtle shades, gradient, color blocking, ombre, tonal variation, high contrast, low contrast, autumnal, spring fresh, winter cool, summer bright, oceanic blues, forest greens, desert sands, urban grays, spot color, selective color, greyscale, cobalt blue, dark blue, ultraviolet".split(
      ", "
    ),
  composition:
    "wide-angle, telephoto, macro, fish-eye, tilt-shift, aerial view, bird's eye, worm's eye, close-up, medium shot, long shot, full body, portrait, landscape, symmetrical, rule of thirds, golden ratio, centered, off-center, dynamic diagonal, horizontal, vertical, curved, leading lines, frame within frame, negative space, panoramic, diptych, triptych, montage, cinematic ratio, square format, layered depth, balanced symmetry, asymmetrical balance, focal point emphasis, expansive vista, intimate detail, narrative flow, symbolic arrangement, abstract alignment, dutch angle, top-down, from side".split(
      ", "
    ),
  waterEffects:
    "water reflection, reflection on water, mirror-like water, still water, calm water, ripples, gentle ripples, concentric ripples, waves, rolling waves, splashing water, flowing water, waterfall, rain, water droplets, water drops, puddle reflection, lake reflection, pond reflection, ocean reflection, wet surface, dripping water, water spray, mist from water, water mist, turbulent water, reflective surface, glass-like water, crystal clear water, underwater caustics, water surface, rain drops on surface, wet pavement reflection, reflection of sky on water, reflection of subject on water, rain splashing, fountain, stream, river flow, water cascade".split(
      ", "
    ),
  quality:
    "ultra-detailed, masterpiece, best quality, high res, sharp focus, intricate details, realistic, hyper-realistic, professionally graded, vibrant, immersive, award-winning, epic scale, fine art, detailed textures, perfect anatomy, coherent composition, balanced, atmospheric depth, volumetric effects, post-processing, HDR, polished, refined, exquisite, flawless, captivating, engaging, thought-provoking, innovative, timeless, evocative, mesmerizing, stunning, breathtaking, elegant, sophisticated, bold, subtle, harmonious, contrasting, unified, diverse, intricate, simplistic, professional".split(
      ", "
    ),
  emotions:
    "joyful, melancholic, tense, romantic, eerie, uplifting, despairing, adventurous, calm, furious, nostalgic, hopeful, sinister, playful, solemn".split(
      ", "
    ),
  actions:
    "flying, running, whispering, battling, exploring, dancing, meditating, exploding, transforming, gazing, leaping, hiding, summoning, stepping forward, looking away, looking ahead".split(
      ", "
    ),
  hairStyle:
    "long hair, short hair, curly hair, straight hair, wavy hair, braided hair, ponytail, high ponytail, low ponytail, bun, top knot, bob cut, pixie cut, shoulder-length hair, waist-length hair, mohawk, dreadlocks, afro, bald, side-swept hair, bangs, twin tails, hime cut, braid, pigtails, messy hair, sleek hair, fluffy hair, spiky hair, layered hair, undercut, buzz cut, silver hair, blonde hair, black hair, red hair, blue hair, pink hair, purple hair, white hair, gradient hair, two-tone hair, wind-blown hair, flowing hair, hair blowing in the wind, dynamic hair".split(
      ", "
    ),
  eyesDetails:
    "blue eyes, green eyes, red eyes, golden eyes, purple eyes, heterochromia, amber eyes, brown eyes, black eyes, grey eyes, closed eyes, half-closed eyes, looking at viewer, looking away, looking up, teary eyes, sharp eyes, gentle eyes, narrow eyes, wide eyes, almond eyes, round eyes, cat eyes, glowing eyes, star-shaped pupils, slit pupils, detailed eyes, sparkling eyes".split(
      ", "
    ),
  clothStyle:
    "dress, gown, robe, kimono, yukata, armor, casual wear, formal wear, hoodie, jacket, coat, cloak, cape, vest, shirt, blouse, bikini, swimsuit, school uniform, military uniform, fantasy outfit, medieval clothing, victorian dress, streetwear, sportswear, leather outfit, lace dress, silk, flowing robes, battle armor, tribal attire, wedding dress, pajamas, crop top, high collar, off-shoulder, long sleeves, short sleeves, sleeveless".split(
      ", "
    ),
  accessories:
    "crown, tiara, headband, hair ribbon, hairpin, flower in hair, hat, cap, hood, veil, mask, glasses, sunglasses, earrings, necklace, bracelet, ring, choker, scarf, ribbon, bow, belt, gloves, armband, cape pin, brooch, wings, halo, tail, horns, ear cuff, nose ring, anklet".split(
      ", "
    ),
  hairAccessories:
    "hairpin, hair stick, hair clip, hair ribbon, hair band, flower in hair, hair comb, hair ornament, barrette, hair ring, hair chain, kanzashi, hair vine, hair beads, hair bow, hair crown, hair jewels, hair feathers, scrunchie, hair wrap, hair fork, hair chopsticks, tiara in hair, headpiece, hair band with bow".split(
      ", "
    ),
  items:
    "book, sword, staff, wand, cup, glass, fan, umbrella, mirror, key, candle, lantern, scroll, letter, bouquet, basket, bag, shield, lute, harp, flute, paintbrush, quill, orb, crystal ball, dagger, bow and arrow, spear, crown, rose, lily, lotus, skull, hourglass, compass, map, treasure chest, bottle, vase, teapot, mask, book of spells".split(
      ", "
    ),
  pose:
    "standing, sitting, kneeling, lying down, crouching, leaning, walking pose, running pose, jumping pose, fighting stance, arms crossed, arms raised, hands on hips, hands behind back, hand on chest, reaching forward, pointing, waving, bowing, praying hands, dynamic pose, action pose, relaxed pose, confident pose, dramatic pose, contrapposto, back view, side view, three-quarter view, from above, from below, spread legs, crossed legs, one knee up, sitting on ground, sitting on chair, lying on side, lying on back, lying on stomach, floating pose, flying pose, dancing pose, yoga pose, meditation pose, summoning pose, casting spell pose, holding weapon, dual wielding stance".split(
      ", "
    ),
  handPose:
    "open palm, closed fist, pointing, pointing at viewer, finger to lips, hand on chin, hand on cheek, touching face, hand near mouth, hands clasped, hands together, peace sign, thumbs up, thumbs down, hand raised, hand outstretched, cupped hands, hands in pockets, hand holding, both hands raised, one hand up, elegant hand pose, relaxed hands, fingers spread, hand on heart, hand on chest, waving hand, beckoning gesture, hand over heart, hands folded, finger gun, hand covering mouth, hand through hair, hand resting on something, open hand gesture, fist raised, palm up, palm down".split(
      ", "
    ),
  angle:
    "low angle, high angle, eye level, overhead view, ground level, chest level, waist level, knee level, front view, back view, side view, three-quarter view, quarter view, dutch angle, tilted angle, from above, from below, bird's eye view, worm's eye view, diagonal angle, looking up at, looking down at, flat angle, slight low angle, slight high angle, dramatic angle, cinematic angle".split(
      ", "
    ),
  negative:
    "worst quality, low quality, normal quality, lowres, blurry, bad anatomy, deformed, mutated hands, extra limbs, missing limbs, poorly drawn face, bad proportions, extra fingers, fused fingers, malformed limbs, watermark, text, signature, logo, jpeg artifacts, compression artifacts, ugly, tiling, out of frame, cropped, overexposed, underexposed, cartoon, 3d render, cgi, plastic, bad hands, deformed hands, bad face, deformed eyes, asymmetrical face".split(
      ", "
    ),
};

import { vocabulariesZh } from "./vocabulariesZh";

export type VocabOption = { value: string; label: string };

/** Options for dropdown: value is always English (for prompt), label is locale-dependent. */
export function getVocabularyOptions(
  key: CategoryKey,
  locale: "en" | "zh"
): VocabOption[] {
  const en = vocabularies[key];
  const zh = vocabulariesZh[key];
  return en.map((value, i) => ({
    value,
    label: locale === "zh" && zh[i] ? zh[i] : value,
  }));
}

export const categoryLabels: Record<
  CategoryKey,
  { en: string; zh: string }
> = {
  subjects: { en: "Subjects", zh: "主題" },
  scenes: { en: "Scenes", zh: "場景" },
  adjectives: { en: "Adjectives", zh: "形容詞" },
  emotions: { en: "Emotions", zh: "情緒" },
  actions: { en: "Actions", zh: "動作" },
  hairStyle: { en: "Hair", zh: "髮型" },
  eyesDetails: { en: "Eyes", zh: "眼睛" },
  clothStyle: { en: "Clothing", zh: "服裝" },
  accessories: { en: "Accessories", zh: "配件" },
  hairAccessories: { en: "Hair accessories", zh: "髮飾" },
  items: { en: "Items", zh: "物品" },
  pose: { en: "Pose", zh: "姿勢" },
  handPose: { en: "Hand pose", zh: "手的動作" },
  angle: { en: "Angle", zh: "角度" },
  composition: { en: "Composition", zh: "構圖與鏡頭" },
  styles: { en: "Styles", zh: "風格" },
  artists: { en: "Artists", zh: "藝術家" },
  mediums: { en: "Mediums", zh: "媒介" },
  lighting: { en: "Lighting", zh: "照明" },
  colors: { en: "Colors", zh: "顏色" },
  waterEffects: { en: "Water & reflection", zh: "水的動態／倒影" },
  quality: { en: "Quality", zh: "質量提升" },
  negative: { en: "Negative prompt", zh: "負面提示詞" },
};
