# VIBEMode website

React + Vite + Tailwind CSS website for the VIBEMode personalised hoodie brand.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL shown in the terminal.

## Production build

Run `npm run build`. Vite creates the production website in `dist/`.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: leave blank

The AI image generation section currently uses a local visual fallback unless a valid API integration is configured. Do not publish private API keys in frontend code.
