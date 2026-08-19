const API_BASE = '/api';

// Helper to retrieve auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('devans_admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Authentication
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  verifyToken: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() }
    });
    return res.json();
  },

  // Site Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  updateSettings: async (settings) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE}/admin/dashboard-stats`, {
      headers: { ...getAuthHeaders() }
    });
    return res.json();
  },

  // Generic REST GET List
  getList: async (endpoint, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE}/${endpoint}${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    return res.json();
  },

  // Generic GET Single
  getById: async (endpoint, id) => {
    const res = await fetch(`${API_BASE}/${endpoint}/${id}`);
    return res.json();
  },

  // Protected Admin CREATE
  createItem: async (endpoint, item) => {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
    return res.json();
  },

  // Protected Admin UPDATE
  updateItem: async (endpoint, id, item) => {
    const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(item)
    });
    return res.json();
  },

  // Protected Admin DELETE
  deleteItem: async (endpoint, id) => {
    const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    return res.json();
  },

  // Public Alumni Submissions
  submitMemory: async (submissionData) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });
    return res.json();
  },

  // Admin Manage Submissions
  getSubmissions: async () => {
    const res = await fetch(`${API_BASE}/admin/submissions`, {
      headers: { ...getAuthHeaders() }
    });
    return res.json();
  },

  moderateSubmission: async (id, status) => {
    const res = await fetch(`${API_BASE}/admin/submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Contact Messages
  sendContactMessage: async (contactData) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return res.json();
  },

  getContactMessages: async () => {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { ...getAuthHeaders() }
    });
    return res.json();
  }
};
