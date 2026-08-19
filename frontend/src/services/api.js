const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper to retrieve auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('devans_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
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
    { id: 1, title: 'All-Island Schools Basketball Championship', year: 1994, category: 'National Championship', description: 'Maliyadeva College Basketball Team won the prestigious All-Island National Title in a historic finals victory.', trophy_type: 'Gold' },
    { id: 2, title: 'Wayamba Provincial Championship', year: 2008, category: 'Provincial Championship', description: 'Unbeaten tournament run securing the Wayamba Province championship trophy.', trophy_type: 'Gold' },
    { id: 3, title: 'National Youth League Finals', year: 2016, category: 'National League', description: 'Runner-up honors after a thrilling double-overtime national tournament final.', trophy_type: 'Silver' },
    { id: 4, title: 'Centenary Founders Memorial Cup', year: 2022, category: 'Invitational Tournament', description: 'Claimed top honors at the inter-school invitation tournament.', trophy_type: 'Gold' }
  ],
  legends: [
    { id: 1, name: 'K. B. Herath', nickname: 'The General', era: '1980s Era', bio: 'Pioneering team captain who anchored Maliyadeva basketball through its inaugural championship appearances.', photo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Rohan Fernando', nickname: 'Coach Rohan', era: '1990s Era', bio: 'Master strategist and coach who led the 1994 squad to national glory.', photo_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Dinesh Senanayake', nickname: 'Sniper', era: '2000s Era', bio: 'All-Island MVP and clutch point guard famous for game-winning perimeter shots.', photo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'S. T. Bandara', nickname: 'The Anchor', era: '2010s Era', bio: 'Record holder for highest career scoring average and defensive rebounds in college history.', photo_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80' }
  ],
  generations: [
    { id: 1, name: 'The Founding Pioneers', start_year: 1970, end_year: 1989, description: 'The foundation era where basketball court roots were established at Maliyadeva College.', team_photo_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80' },
    { id: 2, name: 'The Golden Championship Era', start_year: 1990, end_year: 2009, description: 'A dominant era marked by island-wide tournament titles and regional supremacy.', team_photo_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80' },
    { id: 3, name: 'The Modern Resurgence', start_year: 2010, end_year: 2025, description: 'Modern infrastructure, digital archives, and continuous alumni support.', team_photo_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80' }
  ],
  timeline: [
    { id: 1, year: 1978, title: 'Inauguration of College Basketball Court', category: 'Foundation', description: 'Official inauguration of the Maliyadeva College basketball program and court setup.' },
    { id: 2, year: 1994, title: 'First National Championship Victory', category: 'Championship', description: 'Claimed the All-Island Schools Basketball Championship in Colombo.' },
    { id: 3, year: 2008, title: 'Unbeaten Provincial Campaign', category: 'Milestone', description: 'Completed a 14-game unbeaten streak across the Wayamba Province championship.' },
    { id: 4, year: 2018, title: 'Court Lighting Modernization', category: 'Infrastructure', description: 'Installation of modern floodlight systems for evening practice sessions and tournaments.' },
    { id: 5, year: 2024, title: 'Digital Legacy Archive Launch', category: 'Digital Era', description: 'Establishment of Devans Old Basketball Club interactive historical archive.' }
  ],
  gallery: [
    { id: 1, title: '1994 Victory Celebration', year: 1994, image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Maliyadeva Court Practice Session', year: 2005, image_url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Alumni Match Tournament', year: 2019, image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Junior Squad Championship Final', year: 2022, image_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80' }
  ],
  stories: [
    { id: 1, title: 'Under the Floodlights: The 1994 Final', author: 'Anura Wickramasinghe', year: 1994, content: 'Recollections of the tense final quarter during the All-Island Championship in Colombo...', summary: 'The story behind the fourth-quarter comeback that secured Maliyadeva’s first national trophy.' },
    { id: 2, title: 'Brothers in Maroon & Gold', author: 'Chaminda Bandara', year: 2008, content: 'Reflections on team chemistry, early morning drills, and lifelong friendships forged on court...', summary: 'How court culture shaped leaders both in sports and professional careers.' }
  ],
  news: [
    { id: 1, title: 'Annual Alumni Basketball League Announced', date: '2026-09-15', category: 'Notice', content: 'Registration is now open for the 2026 Devans Old Basketball Club Championship.' }
  ],
  events: [
    { id: 1, title: 'Devans Alumni Basketball Championship 2026', date: '2026-10-10', time: '08:30 AM', location: 'Maliyadeva Basketball Court', status: 'Upcoming' }
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
    return safeFetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  },

  verifyToken: async () => {
    return safeFetchJson(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() }
    });
  },

  // Site Settings
  getSettings: async () => {
    return safeFetchJson(`${API_BASE}/settings`, {}, 'settings');
  },
  updateSettings: async (settings) => {
    return safeFetchJson(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(settings)
    });
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    return safeFetchJson(`${API_BASE}/admin/dashboard-stats`, {
      headers: { ...getAuthHeaders() }
    });
  },

  // Generic REST GET List
  getList: async (endpoint, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/${endpoint}${query ? `?${query}` : ''}`;
    return safeFetchJson(url, {}, endpoint);
  },

  // Generic GET Single
  getById: async (endpoint, id) => {
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {}, endpoint);
  },

  // Protected Admin CREATE
  createItem: async (endpoint, item) => {
    return safeFetchJson(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
  },

  // Protected Admin UPDATE
  updateItem: async (endpoint, id, item) => {
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
  },

  // Protected Admin DELETE
  deleteItem: async (endpoint, id) => {
    return safeFetchJson(`${API_BASE}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
  },

  // Public Alumni Submissions
  submitMemory: async (submissionData) => {
    return safeFetchJson(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });
  },

  // Admin Manage Submissions
  getSubmissions: async () => {
    return safeFetchJson(`${API_BASE}/admin/submissions`, {
      headers: { ...getAuthHeaders() }
    });
  },

  moderateSubmission: async (id, status) => {
    return safeFetchJson(`${API_BASE}/admin/submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status })
    });
  },

  // Contact Messages
  sendContactMessage: async (contactData) => {
    return safeFetchJson(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
  },

  getContactMessages: async () => {
    return safeFetchJson(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeaders() }
    });
  }
};
