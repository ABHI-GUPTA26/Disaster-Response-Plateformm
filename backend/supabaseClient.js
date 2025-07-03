require('dotenv').config(); 
// ✅ Load env variables from .env

const { createClient } = require('@supabase/supabase-js');

// Use environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = { supabase };

