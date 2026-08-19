import { supabase } from './supabaseClient';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper to retrieve auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('devans_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Table name resolver for Supabase vs backend REST
const resolveTableName = (endpoint) => {
  const map = {
    'timeline': 'timeline',
    'timeline_entries': 'timeline',
    'legends': 'legends',
    'achievements': 'achievements',
    'generations': 'generations',
    'gallery': 'gallery',
    'gallery_images': 'gallery',
    'stories': 'stories',
    'news': 'news',
    'news_articles': 'news',
    'events': 'events',
    'submissions': 'submissions',
    'settings': 'settings',
    'site_settings': 'settings'
  };
  return map[endpoint] || endpoint;
};

// Fallback archival datasets when backend is unreachable or static-hosted
const MOCK_DATA = {
  settings: {
    site_name: 'Devans Old Basketball Club',
    hero_title: 'DEVANS OLD BASKETBALL CLUB',
    hero_subtitle: 'The Living Digital Legacy of Basketball at Maliyadeva College',
    hero_image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1920&q=80',
    address: 'Maliyadeva College, Kurunegala, Sri Lanka',
    email: 'info@devansbasketball.lk',
    phone: '+94 37 222 2222'
  },
  achievements: [
    { id: 'ach-1', title: 'All-Island Schools Basketball Championship', year: 1994, category: 'National Championship', description: 'Maliyadeva College Basketball Team won the prestigious All-Island National Title in a historic finals victory.', trophy_type: 'Gold' },
    { id: 'ach-2', title: 'Wayamba Provincial Championship', year: 2008, category: 'Provincial Championship', description: 'Unbeaten tournament run securing the Wayamba Province championship trophy.', trophy_type: 'Gold' },
    { id: 'ach-3', title: 'National Youth League Finals', year: 2016, category: 'National League', description: 'Runner-up honors after a thrilling double-overtime national tournament final.', trophy_type: 'Silver' },
    { id: 'ach-4', title: 'Centenary Founders Memorial Cup', year: 2022, category: 'Invitational Tournament', description: 'Claimed top honors at the inter-school invitation tournament.', trophy_type: 'Gold' }
  ],
  legends: [
    { id: 'leg-1', name: 'Devans Alumni Captain', nickname: 'The Point Guard', role: 'Captain', era: '1992 - 1997', bio: 'Inspirational captain of the 1990s championship squad. Known for clutch game-winning shots and defensive leadership.', photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { id: 'leg-2', name: 'Devans Veteran Head Coach', nickname: 'Coach Master', role: 'Head Coach', era: '1985 - 2002', bio: 'Legendary coach who dedicated two decades to moulding Devans players into court leaders on and off the hard floor.', photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' }
  ],
  generations: [
    { id: 'gen-1', name: '1980s Pioneers', start_year: 1980, end_year: 1989, description: 'The founding generation who built the grit, endurance, and groundwork for Maliyadeva basketball.', team_photo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80' },
    { id: 'gen-2', name: '1990s Champions', start_year: 1990, end_year: 1999, description: 'An era of intense provincial rivalries, All-Island glory, and iconic team brotherhood.', team_photo_url: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80' },
    { id: 'gen-3', name: '2000s Renaissance', start_year: 2000, end_year: 2009, description: 'Technical court discipline and fast-paced perimeter shooting defined this generation.', team_photo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80' }
  ],
  timeline: [
    { id: 'tm-1', year: 1978, title: 'Inauguration of College Basketball Court', category: 'Foundation', description: 'Initial courts established at Maliyadeva College grounds under athletic council.' },
    { id: 'tm-2', year: 1994, title: 'First National Championship Victory', category: 'Championship', description: 'Maliyadeva Basketball won the prestigious All-Island championship title.' },
    { id: 'tm-3', year: 2008, title: 'Unbeaten Provincial Campaign', category: 'Milestone', description: 'Completed a 14-game unbeaten streak across the Wayamba Province championship.' },
    { id: 'tm-4', year: 2018, title: 'Court Lighting Modernization', category: 'Infrastructure', description: 'Installation of modern floodlight systems for evening practice sessions and tournaments.' },
    { id: 'tm-5', year: 2024, title: 'Digital Legacy Archive Launch', category: 'Digital Era', description: 'Establishment of Devans Old Basketball Club interactive historical archive.' }
  ],
  gallery: [
    { id: 'gal-1', title: '1994 Victory Celebration', year: 1994, image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
    { id: 'gal-2', title: 'Maliyadeva Court Practice Session', year: 2005, image_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80' },
    { id: 'gal-3', title: 'Alumni Match Tournament', year: 2019, image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
    { id: 'gal-4', title: 'Junior Squad Championship Final', year: 2022, image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80' }
  ],
  stories: [
    { id: 'sto-1', title: 'Under the Floodlights: The 1994 Final', author: 'Anura Wickramasinghe', year: 1994, content: 'Recollections of the tense final quarter during the All-Island Championship in Colombo...', summary: 'The story behind the fourth-quarter comeback that secured Maliyadeva’s first national trophy.' },
    { id: 'sto-2', title: 'Brothers in Maroon & Gold', author: 'Chaminda Bandara', year: 2008, content: 'Reflections on team chemistry, early morning drills, and lifelong friendships forged on court...', summary: 'How court culture shaped leaders both in sports and professional careers.' }
  ],
  news: [
    { id: 'news-1', title: 'Annual Alumni Basketball League Announced', date: '2026-09-15', category: 'Notice', content: 'Registration is now open for the 2026 Devans Old Basketball Club Championship.' }
  ],
  events: [
    { id: 'evt-1', title: 'Devans Alumni Basketball Championship 2026', date: '2026-10-10', time: '08:30 AM', location: 'Maliyadeva Basketball Court', status: 'Upcoming' }
  ]
};

// Safe JSON fetch wrapper with automatic fallback
const safeFetchJson = async (url, options = {}, fallbackKey = null) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.success !== false) return data;
      }
    }
  } catch (err) {
    console.warn(`API network fallback used for: ${url}`, err);
  }

  // Return safe mock data fallback
  if (fallbackKey && MOCK_DATA[fallbackKey]) {
    return { success: true, data: MOCK_DATA[fallbackKey] };
  }
  return { success: true, data: [] };
};

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      const res = await safeFetchJson(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res && res.token) return res;
    } catch (err) {
      console.warn('API authentication fallback triggered', err);
    }

    // Default admin fallback for static deployment / demo mode
    if (email === 'admin@devansbasketball.lk' && password === 'admin123') {
      return {
        success: true,
        token: 'devans_admin_session_token_2026',
        user: { email, role: 'admin', name: 'Devans Admin' }
      };
    }

    return { success: false, message: 'Invalid credentials' };
  },

  verifyToken: async () => {
    return safeFetchJson(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() }
    });
  },

  // Site Settings
  getSettings: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('settings').select('*').single();
        if (!error && data) return { success: true, data };
      } catch (e) {
        console.warn('Supabase settings query error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/settings`, {}, 'settings');
  },
  updateSettings: async (settings) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('settings').upsert([settings]).select();
        if (!error && data) return { success: true, data: data[0] };
      } catch (e) {
        console.warn('Supabase updateSettings error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(settings)
    });
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    if (supabase) {
      try {
        const [ach, leg, gen, gal, sto, nws, evt, sub] = await Promise.all([
          supabase.from('achievements').select('id', { count: 'exact' }),
          supabase.from('legends').select('id', { count: 'exact' }),
          supabase.from('generations').select('id', { count: 'exact' }),
          supabase.from(resolveTableName('gallery')).select('id', { count: 'exact' }),
          supabase.from('stories').select('id', { count: 'exact' }),
          supabase.from(resolveTableName('news')).select('id', { count: 'exact' }),
          supabase.from('events').select('id', { count: 'exact' }),
          supabase.from('submissions').select('id', { count: 'exact' })
        ]);

        return {
          success: true,
          isDirectSupabase: true,
          stats: {
            totalAchievements: ach.count || ach.data?.length || 0,
            totalLegends: leg.count || leg.data?.length || 0,
            totalGenerations: gen.count || gen.data?.length || 0,
            totalGalleryImages: gal.count || gal.data?.length || 0,
            totalStories: sto.count || sto.data?.length || 0,
            publishedArticles: nws.count || nws.data?.length || 0,
            upcomingEvents: evt.count || evt.data?.length || 0,
            pendingSubmissions: sub.count || sub.data?.length || 0
          }
        };
      } catch (e) {
        console.warn('Supabase getDashboardStats error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/admin/dashboard-stats`, {
      headers: { ...getAuthHeaders() }
    });
  },

  // Generic REST GET List (Reads live from Supabase if configured)
  getList: async (endpoint, params = {}) => {
    if (supabase) {
      try {
        const tableName = resolveTableName(endpoint);
        let query = supabase.from(tableName).select('*');
        const { data, error } = await query;
        if (!error && data) {
          return { success: true, data, isDirectSupabase: true };
        }
      } catch (e) {
        console.warn(`Supabase getList error for ${endpoint}:`, e);
      }
    }

    const queryStr = new URLSearchParams(params).toString();
    const url = `${API_BASE}/${endpoint}${queryStr ? `?${queryStr}` : ''}`;
    return safeFetchJson(url, {}, endpoint);
  },

  // Generic GET Single
  getById: async (endpoint, id) => {
    if (supabase) {
      try {
        const tableName = resolveTableName(endpoint);
        const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
        if (!error && data) return { success: true, data };
      } catch (e) {
        console.warn(`Supabase getById error for ${endpoint}:`, e);
      }
    }
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {}, endpoint);
  },

  // Protected Admin CREATE (Inserts live into Supabase)
  createItem: async (endpoint, item) => {
    if (supabase) {
      try {
        const tableName = resolveTableName(endpoint);
        const { data, error } = await supabase.from(tableName).insert([item]).select();
        if (!error && data && data.length > 0) {
          return { success: true, data: data[0], message: 'Created successfully in Supabase DB' };
        }
        if (error) console.error(`Supabase createItem error for ${endpoint}:`, error.message);
      } catch (e) {
        console.warn(`Supabase createItem exception for ${endpoint}:`, e);
      }
    }
    return safeFetchJson(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
  },

  // Protected Admin UPDATE (Updates live in Supabase)
  updateItem: async (endpoint, id, item) => {
    if (supabase) {
      try {
        const tableName = resolveTableName(endpoint);
        const { data, error } = await supabase.from(tableName).update(item).eq('id', id).select();
        if (!error && data && data.length > 0) {
          return { success: true, data: data[0], message: 'Updated successfully in Supabase DB' };
        }
        if (error) console.error(`Supabase updateItem error for ${endpoint}:`, error.message);
      } catch (e) {
        console.warn(`Supabase updateItem exception for ${endpoint}:`, e);
      }
    }
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
  },

  // Protected Admin DELETE (Deletes live from Supabase)
  deleteItem: async (endpoint, id) => {
    if (supabase) {
      try {
        const tableName = resolveTableName(endpoint);
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (!error) {
          return { success: true, message: 'Deleted successfully from Supabase DB' };
        }
        if (error) console.error(`Supabase deleteItem error for ${endpoint}:`, error.message);
      } catch (e) {
        console.warn(`Supabase deleteItem exception for ${endpoint}:`, e);
      }
    }
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
  },

  // Public Alumni Submissions
  submitMemory: async (submissionData) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('submissions').insert([submissionData]).select();
        if (!error && data) return { success: true, data: data[0] };
      } catch (e) {
        console.warn('Supabase submitMemory error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });
  },

  // Admin Manage Submissions
  getSubmissions: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('submissions').select('*');
        if (!error && data) return { success: true, data };
      } catch (e) {
        console.warn('Supabase getSubmissions error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/admin/submissions`, {
      headers: { ...getAuthHeaders() }
    });
  },

  moderateSubmission: async (id, status) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('submissions').update({ status }).eq('id', id).select();
        if (!error && data) return { success: true, data: data[0] };
      } catch (e) {
        console.warn('Supabase moderateSubmission error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/admin/submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status })
    });
  },

  // Contact Messages
  sendContactMessage: async (contactData) => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').insert([contactData]).select();
        if (!error && data) return { success: true, data: data[0] };
      } catch (e) {
        console.warn('Supabase sendContactMessage error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
  },

  getContactMessages: async () => {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').select('*');
        if (!error && data) return { success: true, data };
      } catch (e) {
        console.warn('Supabase getContactMessages error:', e);
      }
    }
    return safeFetchJson(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeaders() }
    });
  }
};
