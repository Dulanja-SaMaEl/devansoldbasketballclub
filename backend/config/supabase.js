const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseUrl !== 'https://your-supabase-project.supabase.co' && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized successfully.');
  } catch (err) {
    console.warn('⚠️ Supabase initialization failed:', err.message);
  }
} else {
  console.log('ℹ️ Running in fallback mode. Connect Supabase credentials in backend/.env for live Database sync.');
}

module.exports = supabase;
