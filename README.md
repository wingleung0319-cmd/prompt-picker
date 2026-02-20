# Prompt Picker

**Pick and build prompts for Stable Diffusion Midjourney easier.**

A web-based AI prompt generator that helps you create better image generation prompts by selecting from categorized vocabularies and cinematic composition presets.

## Features

- 🎨 **Categorized Vocabulary Selection** - Choose from subjects, scenes, styles, lighting, colors, and more
- 🎬 **Cinematic Composition Presets** - Transform flat card style into cinematic shots with random composition & camera angles
- 🌍 **Bilingual Support** - English and Traditional Chinese
- 💾 **Save & Load Prompts** - Save your favorite prompts and load them later
- 📸 **PNG Metadata Support** - Load prompts from PNG image metadata
- 🎯 **Intensity Levels** - Filter composition presets by intensity (Calm, Artistic, Intense)

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React 18

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npx serve out
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" and select your repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

The site will be available at `https://your-project.vercel.app`

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com) and sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

### GitHub Pages

This project uses static export (`output: "export"`), so it can be deployed to GitHub Pages. See [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) for details.

## License

MIT
