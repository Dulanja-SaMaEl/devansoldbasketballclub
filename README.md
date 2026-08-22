# Old Devans Basketball Club — Digital Legacy Platform
> **Maliyadeva College, Kurunegala, Sri Lanka**

A living digital legacy, historical archive, and alumni hub for Old Devans Basketball Club. Built with React 18, Vite, Tailwind CSS, Framer Motion, Express.js REST API, and Supabase PostgreSQL.

---

## 🏆 Features

### Public Website
- **Cinematic Heritage Hero**: Dark editorial imagery, custom typography hierarchy, and Maliyadeva College branding.
- **Historical Journey & Timeline**: Interactive chronological stream of milestones from founding to present.
- **Championship Trophy Cabinet**: Styled like a digital museum trophy room displaying island-wide, provincial, and alumni titles with category filtering.
- **Hall of Fame & Legends**: Yearbook-style profile cards for captains, coaches, point guards, and stalwarts.
- **Generations Explorer**: Decade-by-decade team photo and memory archive (1980s through 2020s).
- **Photographic Memory Wall**: Archival photo grid with custom separation filters and full-screen Lightbox modal.
- **Alumni Memories & Stories**: Story archive with an interactive submission form for old boys and fans to contribute memories.
- **News, Events & Contact**: Editorial bulletins, reunion event registration, and editable contact details.

### Admin Panel (`/admin`)
- **Protected Admin Authentication**: JWT & Supabase Auth session security with default credentials.
- **Dashboard Stats**: Real-time counter cards for achievements, legends, gallery photos, news, events, and pending contributions.
- **Content Manager (CRUD)**: Easy-to-use CRUD interfaces for Timeline, Achievements, Legends, Generations, Gallery, Stories, News, and Events.
- **Alumni Submission Moderation**: Review pending memory and photo submissions with one-click approve/reject actions.
- **Site Settings Manager**: Admin-editable site title, contact details, hero headings, and footer text.

---

## 🚀 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router v6
- **Backend**: Node.js, Express.js, JWT Authentication, Helmet security headers, Express Rate Limit
- **Database & Storage**: Supabase PostgreSQL with schema & seed scripts + fallback resilient memory store

---

## 📁 Directory Structure

```text
devans-old-basketball-club/
│
├── backend/                  # Express REST API Server
│   ├── config/               # Supabase configuration
│   ├── middleware/           # Auth guard & Error handlers
│   ├── routes/               # REST API Endpoints
│   ├── services/             # Storage service & fallback data
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/                 # React 18 + Vite + Tailwind Client
│   ├── public/
│   ├── src/
│   │   ├── admin/            # Admin Panel views
│   │   ├── components/       # Reusable UI (Lightbox, TrophyCabinet, Navbar, Footer, etc.)
│   │   ├── layouts/          # Public & Admin Layouts
│   │   ├── pages/            # Public Website pages
│   │   ├── services/         # API Service client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── supabase/                 # Supabase PostgreSQL Database Setup
│   ├── schema.sql            # Table definitions & indexes
│   └── seed.sql              # Editable initial records (Adhering to Rule 30)
│
├── architecture.md           # System & Architectural specifications
├── README.md
└── .gitignore
```

---

## 🛠️ Quick Start & Running Locally

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Servers

```bash
# Terminal 1: Start Backend Express API (Port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend Vite Dev Server (Port 5173)
cd frontend
npm run dev
```

Visit the website at: **http://localhost:5173**  
Access Admin Portal at: **http://localhost:5173/admin/login**

---

## 🔐 Default Admin Credentials

- **Email**: `admin@devansbasketball.lk`
- **Password**: `admin123`

---

## 🗄️ Supabase PostgreSQL Setup (Optional Live Sync)

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase dashboard.
3. Run `supabase/schema.sql` to create all PostgreSQL tables and indexes.
4. Run `supabase/seed.sql` to insert initial seed data.
5. Update `backend/.env` with your Supabase URL and Service Role Key:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-key
```

---

## 📜 License & Copyright
© Devans Old Basketball Club • Maliyadeva College, Kurunegala, Sri Lanka.
"The Game Changes. The Legacy Remains."
