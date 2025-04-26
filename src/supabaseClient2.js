// src/supabaseClient2.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl2 = 'https://thtyiaesrhgwecnfrutg.supabase.co'; // <-- Replace
const supabaseKey2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodHlpYWVzcmhnd2VjbmZydXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjI2ODIsImV4cCI6MjA2MTA5ODY4Mn0.6B8VO0jo5OSuYaDBCQ9rx6iGp7PZn6FUE7q1L8sTh9E'; // <-- Replace

export const supabase2 = createClient(supabaseUrl2, supabaseKey2);
