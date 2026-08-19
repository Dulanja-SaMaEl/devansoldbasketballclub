-- ==========================================
-- DEVANS OLD BASKETBALL CLUB - SUPABASE SCHEMA
-- Maliyadeva College, Kurunegala, Sri Lanka
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_name TEXT NOT NULL DEFAULT 'Devans Old Basketball Club',
    short_name TEXT NOT NULL DEFAULT 'Devans Basketball',
    logo_url TEXT,
    hero_image_url TEXT,
    hero_title TEXT DEFAULT 'DEVANS OLD BASKETBALL CLUB',
    hero_subtitle TEXT DEFAULT 'The Living Digital Legacy of Basketball at Maliyadeva College, Kurunegala',
    description TEXT DEFAULT 'Preserving the heritage, victories, brotherhood, and memories across generations of Maliyadeva basketball.',
    email TEXT DEFAULT 'contact@devansbasketball.lk',
    phone TEXT DEFAULT '+94 37 222 2222',
    address TEXT DEFAULT 'Maliyadeva College, Kurunegala, Sri Lanka',
    social_links JSONB DEFAULT '{"facebook": "", "instagram": "", "youtube": ""}'::jsonb,
    footer_text TEXT DEFAULT 'The Game Changes. The Legacy Remains.',
    seo_title TEXT DEFAULT 'Devans Old Basketball Club — Heritage & History',
    seo_description TEXT DEFAULT 'Official living archive of Devans Old Basketball Club, Maliyadeva College.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TIMELINE ENTRIES
CREATE TABLE IF NOT EXISTS timeline_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT DEFAULT 'Milestone',
    image_url TEXT,
    key_figures TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GENERATIONS
CREATE TABLE IF NOT EXISTS generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- e.g. "1980s Era", "Founding Pioneers"
    start_year INTEGER NOT NULL,
    end_year INTEGER NOT NULL,
    description TEXT NOT NULL,
    team_photo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. LEGENDS / HALL OF FAME
CREATE TABLE IF NOT EXISTS legends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    nickname TEXT,
    role TEXT NOT NULL, -- e.g. Captain, Coach, Point Guard, Legend
    position TEXT,
    generation_id UUID REFERENCES generations(id) ON DELETE SET NULL,
    years_active TEXT NOT NULL, -- e.g. "1992 - 1998"
    bio TEXT NOT NULL,
    achievements JSONB DEFAULT '[]'::jsonb,
    quote TEXT,
    profile_image_url TEXT,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACHIEVEMENTS & TROPHIES
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    tournament TEXT NOT NULL,
    category TEXT DEFAULT 'Island Wide', -- e.g. All-Island Senior, Provincial, Triangular
    position TEXT NOT NULL DEFAULT 'Champions', -- Champions, Runners-Up, 3rd Place
    description TEXT NOT NULL,
    team_name TEXT DEFAULT 'Devans Senior Team',
    captain TEXT,
    coach TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. GALLERY IMAGES
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    year INTEGER,
    category TEXT DEFAULT 'Matches', -- Matches, Teams, Reunions, Trophies, Vintage, Documents
    people_tags JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. STORIES & MEMORIES
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    generation_name TEXT,
    story TEXT NOT NULL,
    image_url TEXT,
    date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'Approved', -- Pending, Approved, Rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. NEWS ARTICLES
CREATE TABLE IF NOT EXISTS news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    author TEXT DEFAULT 'Devans Basketball Editorial',
    published_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'Published', -- Draft, Published, Archived
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. EVENTS
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT,
    location TEXT NOT NULL,
    cover_image_url TEXT,
    registration_url TEXT,
    status TEXT DEFAULT 'Upcoming', -- Upcoming, Completed, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. SUBMISSIONS (ALUMNI PHOTO & MEMORY SUBMISSIONS)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT DEFAULT 'Memory', -- Memory, Photo, Artifact
    submitter_name TEXT NOT NULL,
    submitter_email TEXT NOT NULL,
    generation_year TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_timeline_year ON timeline_entries(year);
CREATE INDEX IF NOT EXISTS idx_achievements_year ON achievements(year);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_news_status ON news_articles(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
