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

1. Write your title, details, and highlight in **Your message**.
2. Pick a color theme or upload a photo in **Background**.
3. If text needs more contrast, choose **Fade photo edges** or **Cover an area**. Drag the cover directly on the preview. Open **Adjust cover** only when you need a different color, size, or strength.
4. Select **Download PNG**. Open **More options** for fonts, layout, icons, and extra text.

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
