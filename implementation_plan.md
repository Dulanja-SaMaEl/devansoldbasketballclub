# Implementation Plan — Cinematic Scroll-Driven Experience Transformation

## 1. Objectives & Overview
Transform the Devans Old Basketball Club frontend from standard section layouts into a **cinematic, scroll-choreographed digital museum experience**. 

Key principles:
- **Zero breakage of existing architecture**: Preserve Express REST API, Supabase PostgreSQL DB & Storage schema, admin panel (`/admin`), authentication, and dynamic data binding.
- **GSAP + ScrollTrigger integration**: Smooth, performant pinned sections, horizontal scroll moments, court-line drawing animations, and layered parallax.
- **Interactive Visual Storytelling**:
  1. **Cinematic Hero ("The Game Begins")**: Basketball court materializes, ball guide emerges, court lines animate, typography transforms into "DEVANS OLD BASKETBALL CLUB".
  2. **Chapter Progress Indicator**: Fixed vertical progress track showing `01 ORIGIN`, `02 RISE`, `03 CHAMPIONS`, `04 LEGENDS`, `05 GENERATIONS`, `06 MEMORIES`, `07 PRESENT`, `08 FUTURE`.
  3. **Court Markings Timeline**: Court lines transform into chronological milestone markers as the user scrolls.
  4. **3D Legend Wall & Spotlight Trophy Room**: Interactive spotlight reveals for trophies emerging from darkness and depth-layered portrait cards for Hall of Fame stalwarts.
  5. **Newspaper Archive Transformation**: Background compresses into paper texture with historic newspaper column headlines.
  6. **Generations Horizontal Scroll**: Pinned horizontal scroll section moving from 1980s through 2020s.
  7. **Sophisticated Desktop Custom Cursor**: Dynamic context labels ("VIEW MEMORY", "MEET LEGEND", "VIEW MOMENT").

---

## 2. Technical Stack Addition
- `gsap` + `gsap/ScrollTrigger` for scroll choreography, pinning, and timeline triggers.
- `framer-motion` for micro-interactions, modal transitions, and fallback reduced-motion renders.

---

## 3. Step-by-Step Execution Plan

### Step 1: Install GSAP in Frontend & Configure Plugins
- Install `gsap` in `frontend/package.json`.
- Register `ScrollTrigger` plugin safely inside React components.

### Step 2: Implement Desktop Custom Cursor & Chapter Progress Bar
- Create `frontend/src/components/CustomCursor.jsx` with context hover states.
- Create `frontend/src/components/ScrollProgressTrack.jsx` for chapter indicator tracking.

### Step 3: Transform Homepage into Cinematic Scroll Experience (`HomePage.jsx`)
- Rebuild `HomePage.jsx` into pinned, scroll-triggered chapters.
- Bind all sections dynamically to the backend API data.

### Step 4: Enhance Dedicated Archive Pages
- Add GSAP animations & smooth transitions to `HistoryPage`, `AchievementsPage`, `LegendsPage`, `GalleryPage`, `GenerationsPage`.

### Step 5: Verification & Testing
- Test admin panel (`/admin`) and CRUD operations to ensure 100% functionality preservation.
- Test scroll smoothness on desktop and touch scrolling on mobile.
- Verify build & push updates to Git.
