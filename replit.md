# Portfolio – Next.js App on Replit

## Overview
A personal portfolio site built with Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and Three.js.

## Architecture
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 via PostCSS
- **Animation**: Framer Motion, Three.js (StarField)
- **Package manager**: npm

## Project Structure
- `app/` – Next.js App Router pages and layouts
- `app/projects/` – Project detail pages
- `components/` – Shared React components (sections, UI, StarField)
- `lib/` – Data files (projects, skills)
- `public/` – Static assets

## Running the App
```bash
npm run dev    # Development server on port 5000
npm run build  # Production build
npm run start  # Production server on port 5000
```

## Replit Configuration
- Dev server runs on port **5000**, bound to `0.0.0.0` (required for Replit preview)
- Workflow: "Start application" → `npm run dev`
