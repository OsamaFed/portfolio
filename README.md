# My Portfolio

This is my personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. It highlights my skills, featured projects, GitHub activity stats, and contact information with a clean animated interface and a custom starfield background.

## Features

- **Next.js 16** with app router and server-side rendering support
- **React 19** + **TypeScript** for type-safe UI development
- **Tailwind CSS** for responsive styling and modern visuals
- **Animated sections** and transitions using custom client components
- **Featured project cards** with reusable project data from `lib/projects.ts`
- **Starfield background** rendered using a custom Three.js hook
- **GitHub contributions** stats component
- **Contact section** with X and email links

## App Structure

- `app/`
  - `layout.tsx` — root layout with metadata, navigation, starfield, and analytics
  - `page.tsx` — homepage rendering Hero, Skills, ProjectsPreview, and Contact sections
- `components/`
  - `sections/` — Hero, Skills, Contact and other page sections
  - `projects/` — project preview components
  - `layout/` — site navigation components
  - `ui/` — reusable UI components like animated sections and skill badges
  - `StarField.tsx` — fixed animated starfield background
- `lib/projects.ts` — portfolio project data and metadata
- `public/` — static assets, images, and resume/CV references
- `scripts/strip-comments.mjs` — utility script included in `package.json`

## Tech Stack

- `next`
- `react`
- `typescript`
- `tailwindcss`
- `framer-motion`
- `three`
- `@vercel/analytics`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```text
http://localhost:5000
```

## Build & Production

- Build the app:

```bash
npm run build
```

- Start the production server:

```bash
npm run start
```

## Useful Scripts

- `npm run dev` — run Next.js in development mode on port `5000`
- `npm run build` — build the production application
- `npm run start` — run the built app in production mode on port `5000`
- `npm run lint` — run ESLint
- `npm run strip-comments` — run the custom comment stripping script

## Notes

- The site includes a custom starfield effect for a subtle animated background.
- Project details are maintained in `lib/projects.ts`, making it easy to add or update featured work.
- Metadata and Open Graph settings are defined in `app/layout.tsx`.

## Contact

- X: https://x.com/osamafed
- Email: osama.mohammed.work1@gmail.com
