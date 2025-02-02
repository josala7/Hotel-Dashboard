import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://actjfegeekgqaiaokyov.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdGpmZWdlZWtncWFpYW9reW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNDY1MjIsImV4cCI6MjA0OTkyMjUyMn0.joG7HoS3dejUDoGn1DuypGygC4SmgtB_TDVSU2wR88w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
