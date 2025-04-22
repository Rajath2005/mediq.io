// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jniyvfwzcvjcsqyuaevc.supabase.co'; // Replace with yours
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuaXl2Znd6Y3ZqY3NxeXVhZXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzQ4NzksImV4cCI6MjA2MDkxMDg3OX0.8Bt85Ho1sS7ct5buWbl2ZXlMOKpBjE1voBlBfgw-Bms'; // Replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
