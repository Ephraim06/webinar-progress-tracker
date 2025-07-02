// Import the Supabase client library
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// Initialize Supabase
const supabaseUrl = 'https://xdrgsibciezpaxxsmatn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkcmdzaWJjaWV6cGF4eHNtYXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDI1NzEsImV4cCI6MjA2NzAxODU3MX0.BV4BNIDLAMxCQRbXjll-VOA0dZNCqTN8-Mj9gfrqIfo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the initialized client
export { supabase };
