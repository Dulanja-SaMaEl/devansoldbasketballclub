const supabase = require('../config/supabase');
const crypto = require('crypto');

// Initial seed store matching database schema
let memoryStore = {
  site_settings: {
    id: '00000000-0000-0000-0000-000000000001',
    club_name: 'Old Devans Basketball Club',
    short_name: 'Devans Basketball',
    logo_url: '',
    hero_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80',
    hero_title: 'OLD DEVANS BASKETBALL CLUB',
    hero_subtitle: 'The Living Digital Legacy of Basketball at Maliyadeva College, Kurunegala',
    description: 'Preserving the heritage, victories, brotherhood, and memories across generations of Maliyadeva basketball.',
    email: 'contact@devansbasketball.lk',
    phone: '+94 37 222 2222',
    address: 'Maliyadeva College, Kurunegala, Sri Lanka',
    social_links: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', youtube: 'https://youtube.com' },
    footer_text: 'The Game Changes. The Legacy Remains.',
    seo_title: 'Old Devans Basketball Club — Heritage & History',
    seo_description: 'Official living archive of Old Devans Basketball Club, Maliyadeva College.'
  },
  timeline_entries: [
    { id: '1', year: 1975, title: 'Founding of Maliyadeva Basketball Court', description: 'Initial basketball courts established on Maliyadeva College grounds under college athletic council.', category: 'Founding', key_figures: 'Founding Teachers & Pioneers', order_index: 1 },
    { id: '2', year: 1985, title: 'First Championship Era', description: 'Early decade of regional tournament victory and establishing the Devans fast-break court style.', category: 'Championship', key_figures: '1985 Senior Squad', order_index: 2 },
    { id: '3', year: 1998, title: 'All-Island Title Triumph', description: 'Historic national victory crowning Maliyadeva Basketball at the top tier of Sri Lanka school sports.', category: 'Title', key_figures: '1998 First V Squad', order_index: 3 },
    { id: '4', year: 2010, title: 'Floodlit Court Expansion & Alumni League', description: 'Upgraded floodlit facilities and formal establishment of the Devans Old Basketball Council.', category: 'Expansion', key_figures: 'Alumni Council', order_index: 4 },
    { id: '5', year: 2023, title: 'Digital Legacy & Museum Platform', description: 'Unveiling the official Old Devans Basketball Club web archive uniting generations worldwide.', category: 'Legacy', key_figures: 'Devans Alumni Association', order_index: 5 }
  ],
  generations: [
    { id: 'gen-1980s', name: '1980s Pioneers', start_year: 1980, end_year: 1989, description: 'The founding generation who built the grit, endurance, and groundwork for Maliyadeva basketball.', team_photo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', order_index: 1 },
    { id: 'gen-1990s', name: '1990s Champions', start_year: 1990, end_year: 1999, description: 'An era of intense provincial rivalries, All-Island glory, and iconic team brotherhood.', team_photo_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80', order_index: 2 },
    { id: 'gen-2000s', name: '2000s Renaissance', start_year: 2000, end_year: 2009, description: 'Technical court discipline and fast-paced perimeter shooting defined this generation.', team_photo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', order_index: 3 },
    { id: 'gen-2010s', name: '2010s Modern Era', start_year: 2010, end_year: 2019, description: 'Modern court facilities, tactical expansion, and provincial championship accolades.', team_photo_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80', order_index: 4 },
    { id: 'gen-2020s', name: '2020s Next Generation', start_year: 2020, end_year: 2029, description: 'Carrying forward the Maliyadeva court crest into the modern digital era.', team_photo_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80', order_index: 5 }
  ],
  legends: [
    { id: 'leg-1', name: 'Devans Alumni Captain', nickname: '"The Point Guard"', role: 'Senior Captain', position: 'Point Guard', generation_id: 'gen-1990s', years_active: '1992 - 1997', bio: 'Inspirational captain of the 1990s championship squad. Known for clutch game-winning shots and defensive leadership.', achievements: ['All-Island MVP 1996', 'Provincial Shield 1995'], quote: 'Wearing the Maliyadeva crest was the greatest honor of our youth.', profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', is_featured: true },
    { id: 'leg-2', name: 'Devans Veteran Head Coach', nickname: '"Coach Master"', role: 'Head Coach', position: 'Coach', generation_id: 'gen-1980s', years_active: '1985 - 2002', bio: 'Legendary coach who dedicated two decades to moulding Devans players into court leaders on and off the hard floor.', achievements: ['2x All-Island Coach of the Year', 'Lifetime Brotherhood Award'], quote: 'Discipline on court defines character off court.', profile_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80', is_featured: true }
  ],
  achievements: [
    { id: 'ach-1', title: 'All-Island Senior Championship', year: 1998, tournament: 'All-Island Inter-Schools Basketball Tournament', category: 'Island Wide', position: 'Champions', description: 'Historic championship victory crowning Maliyadeva College as national champions.', team_name: 'Devans Senior First V', captain: 'First V Captain', coach: 'Head Coach', image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', is_featured: true },
    { id: 'ach-2', title: 'Wayamba Provincial Trophy', year: 2006, tournament: 'Wayamba Provincial Schools League', category: 'Provincial', position: 'Champions', description: 'Undefeated provincial tournament run claiming regional school dominance.', team_name: 'Devans Senior Team', captain: 'Senior Captain', coach: 'Head Coach', image_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80', is_featured: true },
    { id: 'ach-3', title: 'Triangular Alumni Shield', year: 2018, tournament: 'Annual Alumni Triangular Shield', category: 'Alumni', position: 'Champions', description: 'Victorious performance celebrating sportsmanship among legacy institutions.', team_name: 'Devans Old Boys V', captain: 'Alumni Captain', coach: 'Alumni Coach', image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80', is_featured: false }
  ],
  gallery_images: [
    { id: 'gal-1', title: '1998 Championship First V', caption: 'The victory celebration after the All-Island final buzzer.', image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', year: 1998, category: 'Teams', is_featured: true, order_index: 1 },
    { id: 'gal-2', title: 'Inter-School Tournament Drive', caption: 'High-energy offensive drive on home college court.', image_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80', year: 2004, category: 'Matches', is_featured: true, order_index: 2 },
    { id: 'gal-3', title: 'Trophy Room Exhibition', caption: 'Championship shields and medals earned across five decades.', image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', year: 2015, category: 'Trophies', is_featured: true, order_index: 3 },
    { id: 'gal-4', title: 'Alumni Reunion Brotherhood', caption: 'Devans basketball players across eras returning to Maliyadeva College.', image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80', year: 2022, category: 'Reunions', is_featured: false, order_index: 4 },
    { id: 'gal-5', title: 'Archival 1980s Team Photo', caption: '1980s squad scanned from Maliyadeva College archives.', image_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80', year: 1984, category: 'Vintage', is_featured: true, order_index: 5 }
  ],
  stories: [
    { id: 'sto-1', title: 'The Final Quarter of 1998', author: 'Devans Alumni Member', generation_name: '1990s Champions', story: 'Down by 4 points with 30 seconds remaining against a formidable opponent, our coach called a time-out. We looked each other in the eye and remembered the Maliyadeva spirit. Two quick steals and clutch free throws gave us victory.', date: '2023-10-15', status: 'Approved' },
    { id: 'sto-2', title: 'Lessons from the College Court', author: 'Devans Alumni Captain', generation_name: '2000s Renaissance', story: 'Maliyadeva basketball taught us far more than basketball. It gave us lifelong brotherhood, humility in victory, and resilience in defeat.', date: '2024-02-20', status: 'Approved' }
  ],
  news_articles: [
    { id: 'news-1', title: 'Launch of Devans Old Basketball Club Digital Archive', slug: 'launch-of-digital-archive', excerpt: 'Connecting past legends with the future generation of Maliyadeva basketball.', content: 'We are proud to unveil the living digital museum of Devans Basketball. This platform preserves our history, championship trophies, legend profiles, and photo gallery for old boys and supporters worldwide.', cover_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80', published_date: '2026-08-01', status: 'Published', author: 'Devans Editorial', tags: ['Archive', 'History', 'Legacy'] },
    { id: 'news-2', title: 'Annual Devans Alumni Tournament Announced', slug: 'annual-devans-alumni-tournament', excerpt: 'Get ready for the annual gathering of generations at the college basketball courts.', content: 'Registration is now open for the annual Devans Alumni Basketball Tournament. Old boys from 1980s through 2020s are invited to register squad teams.', cover_image_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80', published_date: '2026-08-10', status: 'Published', author: 'Alumni Committee', tags: ['Tournament', 'Reunion'] }
  ],
  events: [
    { id: 'evt-1', title: 'Devans Basketball Alumni Reunion & Match 2026', description: 'Annual gathering of former Maliyadeva basketball players across all generations featuring exhibition matches, dinner, and archive showcase.', date: '2026-11-20', time: '03:00 PM', location: 'Maliyadeva College Basketball Court, Kurunegala', cover_image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80', status: 'Upcoming', registration_url: '#register' }
  ],
  contact_messages: [],
  submissions: [
    { id: 'sub-1', type: 'Memory', submitter_name: 'Devan Alumnus', submitter_email: 'alumnus@devans.lk', generation_year: '1995', content: 'Submitting historical team photograph from the 1995 provincial final.', status: 'Pending', created_at: new Date().toISOString() }
  ]
};

class StorageService {
  async getTable(tableName) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from(tableName).select('*');
        if (!error && data) return data;
      } catch (err) {
        console.warn(`Supabase error for ${tableName}, using memory fallback:`, err.message);
      }
    }
    return memoryStore[tableName] || [];
  }

  async getItemById(tableName, id) {
    const list = await this.getTable(tableName);
    return list.find(item => item.id === id) || null;
  }

  async createItem(tableName, itemData) {
    const newId = crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`;
    const newItem = { id: newId, created_at: new Date().toISOString(), ...itemData };

    if (supabase) {
      try {
        const { data, error } = await supabase.from(tableName).insert([newItem]).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn(`Supabase insert error for ${tableName}:`, err.message);
      }
    }

    if (!memoryStore[tableName]) memoryStore[tableName] = [];
    memoryStore[tableName].push(newItem);
    return newItem;
  }

  async updateItem(tableName, id, updateData) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from(tableName).update(updateData).eq('id', id).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn(`Supabase update error for ${tableName}:`, err.message);
      }
    }

    if (memoryStore[tableName]) {
      const idx = memoryStore[tableName].findIndex(item => item.id === id);
      if (idx !== -1) {
        memoryStore[tableName][idx] = { ...memoryStore[tableName][idx], ...updateData, updated_at: new Date().toISOString() };
        return memoryStore[tableName][idx];
      }
    }
    return null;
  }

  async deleteItem(tableName, id) {
    if (supabase) {
      try {
        await supabase.from(tableName).delete().eq('id', id);
      } catch (err) {
        console.warn(`Supabase delete error for ${tableName}:`, err.message);
      }
    }

    if (memoryStore[tableName]) {
      memoryStore[tableName] = memoryStore[tableName].filter(item => item.id !== id);
    }
    return { success: true };
  }

  async getSettings() {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1);
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn('Supabase settings error:', err.message);
      }
    }
    return memoryStore.site_settings;
  }

  async updateSettings(settingsData) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').update(settingsData).eq('id', memoryStore.site_settings.id).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn('Supabase update settings error:', err.message);
      }
    }
    memoryStore.site_settings = { ...memoryStore.site_settings, ...settingsData };
    return memoryStore.site_settings;
  }
}

module.exports = new StorageService();
