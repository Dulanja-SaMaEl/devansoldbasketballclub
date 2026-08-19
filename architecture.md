# Architecture & System Design — Devans Old Basketball Club Digital Legacy

## 1. Overview
The Devans Old Basketball Club digital platform is a modern, living archive and community hub for former players, legends, current students, and supporters of basketball at Maliyadeva College, Kurunegala, Sri Lanka.

The application combines a modern digital museum aesthetic (editorial layouts, warm paper textures, historical imagery styling, dark athletic leather & gold accents) with high-performance full-stack web technology.

---

## 2. Technology Architecture

```
[ Browser Client (React + Vite + Tailwind CSS + Framer Motion) ]
                              │
                              ▼
           [ Express.js REST API Server (Node.js) ]
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
  [ Supabase Client / Database ]    [ Supabase Storage ]
     (PostgreSQL + RLS Auth)       (Images, Documents)
```

### Frontend Architecture
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom heritage design system extension
- **Animation**: Framer Motion for cinematic scroll reveals, parallax hero, lightbox transitions, trophy reveals
- **Icons**: Lucide React
- **Routing**: React Router v6 (Public routes + Admin Protected routes)
- **State Management & Data Fetching**: Custom API service layer with fallback mock handlers for instant out-of-the-box preview and live Supabase integration

### Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Helmet (security headers), Express JSON, Auth Guard JWT/Supabase Middleware, Error Handlers
- **API Routes**: `/api/achievements`, `/api/legends`, `/api/generations`, `/api/history`, `/api/gallery`, `/api/stories`, `/api/news`, `/api/events`, `/api/submissions`, `/api/settings`, `/api/auth`

### Database & Storage (Supabase PostgreSQL)
- **Database Engine**: PostgreSQL managed by Supabase
- **Storage**: Supabase Storage Buckets (`site-images`, `gallery`, `profiles`, `documents`)
- **Authentication**: Supabase Auth / JWT for Admin role access

---

## 3. Database Schema Overview

```
                                  ┌───────────────────┐
                                  │    generations    │
                                  └─────────┬─────────┘
                                            │ 1
                                            │
                                            │ *
                                  ┌─────────┴─────────┐
                                  │      legends      │
                                  └───────────────────┘

┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│   achievements    │    │ timeline_entries  │    │   gallery_images  │
└───────────────────┘    └───────────────────┘    └───────────────────┘

┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│      stories      │    │   news_articles   │    │      events       │
└───────────────────┘    └───────────────────┘    └───────────────────┘

┌───────────────────┐    ┌───────────────────┐
│   site_settings   │    │    submissions    │
└───────────────────┘    └───────────────────┘
```

---

## 4. Key Security & Resilience Features
- Secure admin login with Supabase session validation or fallback JWT
- Protected endpoints for POST/PUT/DELETE operations
- Input validation and sanitized responses
- Robust error handling with user-friendly empty states and fallback data when backend is starting up or disconnected
- Clean environment variable abstraction (`.env`) for frontend and backend

---

## 5. Visual Identity & Design System
- **Primary Heritage Tones**: Deep Basketball Maroon (`#4A0E17`), Old Parchment Cream (`#F9F6F0`), Antique Gold (`#D4AF37`), Dark Charcoal Charcoal (`#141210`)
- **Typography**: Cinematic Serif for Display/Titles, Modern Clean Sans-serif for Body & Navigation
- **Archive Aesthetics**: Paper borders, vintage photograph frames, trophy room banners, digital yearbook grid layout
