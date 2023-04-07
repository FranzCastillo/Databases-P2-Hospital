const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://twevbubwzywwyayjpfqf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZXZidWJ3enl3d3lheWpwZnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4NDA0NzQsImV4cCI6MTk5NjQxNjQ3NH0.tsnCneYXVtXyjf9Yn0T9He9YyDxG2_SL2IlS_dwSMcg";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;