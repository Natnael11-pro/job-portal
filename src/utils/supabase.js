import { createClient } from "@supabase/supabase-js";

// Named export for URL
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Named export for Key (optional if needed elsewhere)
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Default export for client creation
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  return supabase;
};

export default supabaseClient;
