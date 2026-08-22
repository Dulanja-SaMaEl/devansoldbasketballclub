-- ==========================================
-- OLD DEVANS BASKETBALL CLUB - SUPABASE SEED DATA
-- Editable placeholder records (Idempotent seed script)
-- ==========================================

-- 1. INITIAL SITE SETTINGS
INSERT INTO site_settings (
    id, club_name, short_name, hero_title, hero_subtitle, description, email, phone, address, footer_text
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Old Devans Basketball Club',
    'Devans Basketball',
    'OLD DEVANS BASKETBALL CLUB',
    'The Living Digital Legacy of Basketball at Maliyadeva College, Kurunegala',
    'Honoring the history, victories, brotherhood, and memories across generations of Maliyadeva basketball players.',
    'contact@devansbasketball.lk',
    '+94 37 222 2222',
    'Maliyadeva College, Kurunegala, Sri Lanka',
    'The Game Changes. The Legacy Remains.'
) ON CONFLICT (id) DO NOTHING;

-- 2. TIMELINE ENTRIES (Editable Placeholders)
INSERT INTO timeline_entries (id, year, title, description, category, key_figures, order_index) VALUES
('10000000-0000-0000-0000-000000000001', 1975, 'Founding of Maliyadeva Basketball [Replace Record]', 'Initial courts established at Maliyadeva College campus. [Verified history to be added via admin panel].', 'Founding', 'Founding Pioneers', 1),
('10000000-0000-0000-0000-000000000002', 1985, 'First Major Championship Era [Replace Record]', 'The early decade marked by regional tournament appearances and team growth. [Verified details to be added].', 'Championship', 'Team Captain & Squad', 2),
('10000000-0000-0000-0000-000000000003', 1998, 'All-Island Title Milestone [Replace Record]', 'A landmark championship victory bringing honor to Maliyadeva College. [Verified details to be added].', 'Title', 'All-Island Squad', 3),
('10000000-0000-0000-0000-000000000004', 2010, 'Golden Jubilee Era [Replace Record]', 'Expansion of the basketball program with modernized court facilities and alumni support.', 'Expansion', 'Alumni Council', 4),
('10000000-0000-0000-0000-000000000005', 2023, 'Modern Brotherhood & Digital Archive [Replace Record]', 'Official launch of Old Devans Basketball Club digital archive to unite generations.', 'Legacy', 'Devans Alumni', 5)
ON CONFLICT (id) DO NOTHING;

-- 3. GENERATIONS
INSERT INTO generations (id, name, start_year, end_year, description, order_index) VALUES
('11111111-1111-1111-1111-111111111111', '1980s Pioneers', 1980, 1989, 'The founding generation who laid the bedrock of Devans basketball heritage.', 1),
('22222222-2222-2222-2222-222222222222', '1990s Champions', 1990, 1999, 'The era of rapid dominance and national championship appearances.', 2),
('33333333-3333-3333-3333-333333333333', '2000s Renaissance', 2000, 2009, 'An era defined by fierce rivalries, technical excellence, and team spirit.', 3),
('44444444-4444-4444-4444-444444444444', '2010s Modern Era', 2010, 2019, 'State-of-the-art facilities and consistent island-wide tournament presence.', 4),
('55555555-5555-5555-5555-555555555555', '2020s Next Generation', 2020, 2029, 'Carrying the torch into the future with digital legacy and global alumni support.', 5)
ON CONFLICT (id) DO NOTHING;

-- 4. LEGENDS / HALL OF FAME (Editable Placeholders)
INSERT INTO legends (id, name, nickname, role, position, generation_id, years_active, bio, quote, is_featured) VALUES
('aaaa1111-1111-1111-1111-111111111111', 'Sample Legend Member [Replace Record]', '"The General"', 'Captain & Guard', 'Point Guard', '22222222-2222-2222-2222-222222222222', '1992 - 1997', 'Pioneering leader of the 1990s championship team. Led Maliyadeva to multiple inter-school victories. [Full bio to be updated in Admin].', 'Wearing the Maliyadeva jersey was the greatest honor of our youth.', TRUE),
('bbbb2222-2222-2222-2222-222222222222', 'Sample Veteran Coach [Replace Record]', '"Coach Master"', 'Head Coach', 'Coach', '11111111-1111-1111-1111-111111111111', '1985 - 2002', 'Dedicated educator and coach who built the discipline and tactical foundation of Devans Basketball over two decades.', 'Discipline on court defines character off court.', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5. ACHIEVEMENTS & TROPHIES (Editable Placeholders)
INSERT INTO achievements (id, title, year, tournament, category, position, description, team_name, captain, coach, is_featured) VALUES
('ac100000-0000-0000-0000-000000000001', 'All-Island Schools Championship [Replace Record]', 1998, 'All-Island Senior Championship', 'Island Wide', 'Champions', 'Historic victory securing national top rank for Maliyadeva College. [Verified records to be updated].', 'Devans Senior First V', '[Captain Name]', '[Coach Name]', TRUE),
('ac100000-0000-0000-0000-000000000002', 'Provincial Schools Trophy [Replace Record]', 2006, 'Wayamba Provincial Tournament', 'Provincial', 'Champions', 'Undefeated streak throughout the provincial tournament series.', 'Devans Senior Team', '[Captain Name]', '[Coach Name]', TRUE),
('ac100000-0000-0000-0000-000000000003', 'Triangular Alumni Shield [Replace Record]', 2018, 'Annual Alumni Triangular Tournament', 'Alumni', 'Champions', 'Celebrating brotherhood and competitive excellence among old boys.', 'Devans Alumni Squad', '[Captain Name]', '[Coach Name]', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 6. GALLERY IMAGES (Editable Placeholders)
INSERT INTO gallery_images (id, title, caption, image_url, year, category, is_featured) VALUES
('fa100000-0000-0000-0000-000000000001', '1998 Championship Team Photo [Replace Record]', 'The 1998 All-Island winning squad celebrating on home court.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', 1998, 'Teams', TRUE),
('fa100000-0000-0000-0000-000000000002', 'Historic Court Action [Replace Record]', 'Fierce competition during inter-school finals.', 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80', 2004, 'Matches', TRUE),
('fa100000-0000-0000-0000-000000000003', 'Trophy Presentation [Replace Record]', 'Captains lifting the championship shield.', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80', 2012, 'Trophies', TRUE),
('fa100000-0000-0000-0000-000000000004', 'Alumni Reunion Gathering [Replace Record]', 'Generations of Devans basketball players reuniting at Maliyadeva College.', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80', 2022, 'Reunions', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 7. STORIES & MEMORIES (Editable Placeholders)
INSERT INTO stories (id, title, author, generation_name, story, date, status) VALUES
('ba100000-0000-0000-0000-000000000001', 'The Final Quarter of 1998 [Replace Record]', 'Sample Old Boy Author [Replace]', '1990s Champions', 'Down by 4 points with 30 seconds on the clock, our captain called a time-out. What followed was unforgettable. [Verified memory to be added via submission or admin].', '2023-10-15', 'Approved'),
('ba100000-0000-0000-0000-000000000002', 'Brotherhood Beyond the Court [Replace Record]', 'Sample Alumni Member [Replace]', '2000s Renaissance', 'Maliyadeva basketball taught us resilience, respect for our seniors, and a bond that lasts a lifetime.', '2024-02-20', 'Approved')
ON CONFLICT (id) DO NOTHING;

-- 8. NEWS ARTICLES (Editable Placeholders)
INSERT INTO news_articles (id, title, slug, excerpt, content, cover_image_url, published_date, status) VALUES
('ea100000-0000-0000-0000-000000000001', 'Launch of Old Devans Basketball Club Digital Archive', 'launch-of-digital-archive', 'Connecting past legends with the future generation of Maliyadeva basketball.', 'We are proud to unveil the living digital museum of Devans Basketball. This platform preserves our history, championship trophies, legend profiles, and photo gallery for old boys and supporters worldwide.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', '2026-08-01', 'Published'),
('ea100000-0000-0000-0000-000000000002', 'Annual Devans Alumni Tournament Announced', 'annual-devans-alumni-tournament', 'Get ready for the annual gathering of generations at the college basketball courts.', 'Details regarding registration, schedule, and team brackets for the upcoming Devans Alumni Basketball Tournament.', 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80', '2026-08-10', 'Published')
ON CONFLICT (id) DO NOTHING;

-- 9. EVENTS (Editable Placeholders)
INSERT INTO events (id, title, description, date, time, location, status) VALUES
('ee100000-0000-0000-0000-000000000001', 'Devans Basketball Alumni Reunion & Match 2026', 'Annual gathering of former Maliyadeva basketball players across all generations featuring friendly games, dinner, and archive exhibition.', '2026-11-20', '03:00 PM', 'Maliyadeva College Basketball Court, Kurunegala', 'Upcoming')
ON CONFLICT (id) DO NOTHING;
