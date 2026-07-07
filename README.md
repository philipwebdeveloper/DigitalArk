# Digital Ark — Website

A modern, animated 5-page website for **Digital Ark** (web design & development services), based in San Jose Del Monte, Bulacan.

Pages: `index.html` (Home), `about.html`, `services.html`, `projects.html`, `contact.html`.

Plain HTML/CSS/JS — no build step, no dependencies. This makes it deploy instantly on GitHub + Vercel.

## 1. Put it on GitHub

1. Create a new repository on [github.com](https://github.com) (e.g. `digital-ark-website`).
2. Upload all these files/folders to it, keeping the folder structure:
   ```
   index.html
   about.html
   services.html
   projects.html
   contact.html
   vercel.json
   css/style.css
   js/main.js
   assets/favicon.svg
   ```
   Easiest way: on the repo page, click **Add file → Upload files**, then drag the whole folder in.

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (you can sign in with your GitHub account).
2. Click **Add New… → Project**.
3. Select the `digital-ark-website` repository you just created.
4. Vercel will detect it as a static site — you don't need to change any build settings (leave Framework Preset as "Other", no build command needed).
5. Click **Deploy**. In under a minute you'll get a live URL like `digital-ark-website.vercel.app`.
6. Optional: in the Vercel project → **Settings → Domains**, you can add a custom domain later if you buy one (e.g. `digitalark.com`).

Every time you push changes to GitHub, Vercel will automatically redeploy the site.

## Editing content later

- **Text/contact info**: edit directly in each `.html` file — search for the text you want to change.
- **Colors**: all colors are defined once at the top of `css/style.css` under `:root { ... }` (e.g. `--gold`, `--bg-navy`) — change them there and they update site-wide.
- **Pricing**: in `services.html`, look for the `<!-- PRICING -->` section. Prices are placeholders (₱) — update them to your real rates.
- **Contact form**: the form on `contact.html` currently opens the visitor's email app with the message pre-filled (no backend needed). If you'd like real form submissions to a database or inbox without opening email, connect a free service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) later.
- **Projects page**: the project cards are sample/concept work to show your range. Swap in real client project names, descriptions, and screenshots once you have them (replace the colored placeholder blocks in `.project-thumb` with `<img>` tags).
- **Social links**: in each page's footer, the Facebook/Instagram links currently point to `#` — update `href="#"` to your real profile URLs.

## Design notes

- Theme: deep navy background with a warm gold "beacon" accent — a nod to the Ark name (a guiding light through dark water), instead of a generic dark/neon look.
- Fonts: Space Grotesk (headings), Inter (body text), JetBrains Mono (labels), loaded from Google Fonts.
- Animations: scroll-reveal fades, hover lifts on cards, an animated pulsing "beacon" signature in the hero, and a smooth mobile menu. Respects users who prefer reduced motion.
