# Tedraphics

Tedraphics is a browser-based editor for square social media posters. Create a 1080 × 1080 design, preview it as you edit, and save it as a PNG.

## Features

- Six color themes, one tap photo fades, and draggable soft covers
- Your own background images and clipart
- Editable title, body, quote, and social details
- Amharic and Afaan Oromo text options
- Controls for type, color, placement, frames, and image crop
- A live preview and 1080 × 1080 PNG export

## Create a poster

1. Open **Content** and write your title, main text, and quote.
2. Open **Background** to choose a color theme or upload an image.
3. In **Background**, select **Apply photo fade** to blend a photo into the theme color. For a smaller area, select **+ Soft cover** beside the preview or choose a Dark, Light, or Warm cover. Drag its handle over the area you want to soften; adjust the sliders only if needed.
4. Use **Fine tune** for typography, text colors, positions, clipart, and other details.
5. Check the live preview, then select **Download PNG**.

Uploaded images are read in your browser and are not sent to a Tedraphics server. Edits are kept in memory for the current session, so download your poster before closing or refreshing the page.

## Run locally

Install Node.js and npm, then run:

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite. To check the source and produce a production build:

```bash
npm run lint
npm run build
```

Tedraphics uses React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.
