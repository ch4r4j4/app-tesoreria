// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jielrbkskylszysnqjhb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppZWxyYmtza3lsc3p5c25xamhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MjIzNDEsImV4cCI6MjA2NjM5ODM0MX0.2H_UbNjdRY0-OCOZY_vgHNo963FZB9UFF0g1HDt5tWc';

export const supabase = createClient(supabaseUrl, supabaseKey);
