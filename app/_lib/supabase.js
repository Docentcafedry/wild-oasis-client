import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://girndphlzatlargrbzqo.supabase.co";
const supabaseKey = process.env.SUPABASE_SECRET;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
