# Stacks — Paper Library

A frontend-only research paper browser built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features
- Sidebar navigation: all papers, currently reading, saved, and filter by field
- Search across title, authors, venue, tags, and abstract
- Sort by newest, oldest, most cited, or title
- Save/bookmark papers (in-memory state)
- Seeded with 12 real, well-known CS/ML papers as sample data

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Structure

- `app/page.tsx` — entry point, renders the Library with seed data
- `components/Library.tsx` — client component holding search/filter/sort state
- `components/Sidebar.tsx` — left navigation (views + fields)
- `components/PaperCard.tsx` — individual paper card
- `lib/papers.ts` — mock paper data (swap this for a real API/database later)
- `lib/types.ts` — shared TypeScript types

## Notes

- This is frontend-only: data lives in `lib/papers.ts` and save/read-status changes are in-memory (they reset on reload). Wire up a real data source by replacing `initialPapers` in `app/page.tsx`.
- Fonts use system font stacks (no external font fetch), so the app builds offline. Swap in `next/font/google` in `app/layout.tsx` if you want IBM Plex Sans/Mono or a different serif.
