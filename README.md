# Coy Discover

Swipe-based "Discover" tab for Coy, built with Next.js (App Router), API routes and a JSON file as DB.

## Setup
```bash
npm install
npm run seed
npm run dev
```
Open http://localhost:3000 (use mobile view in DevTools for best experience).

## Tech stack
- Next.js 16 (React, App Router, API routes)
- JSON file storage (`data/db.json`)
- Pointer events for drag-to-swipe

## APIs
- `GET /api/feed`: profiles not yet swiped on
- `POST /api/swipe`: body `{ profileId, action: "like" | "pass" }`, returns `{ match, profile? }`
- `GET /api/matches`: mutual matches

## How matching works
30 mock profiles are seeded. Every 3rd profile (ids 3, 6, 9, ...) has already liked the logged-in user. A match is created only when you like one of them back.

## Privacy
The list of profiles who liked the user (`likedMe`) stays server-side only. It is never returned by any API, so a like is revealed only when it is mutual.

## Reset demo data
```bash
npm run seed
```

## Part A: Feature suggestions
1. **Block / hide list**: let users block specific people or contacts so they can never be added or seen by them. Coy's whole promise is privacy, so users need control over who they avoid.
2. **Icebreaker + 24h match expiry**: after a match, suggest an opening line and expire the match if nobody talks within 24 hours. This turns matches into real conversations and improves retention.
