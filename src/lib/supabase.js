import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tyohpxdtaikjjbgwsyhe.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5b2hweGR0YWlrampiZ3dzeWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMTA3MTAsImV4cCI6MjExMDY4NjcxMH0.Z7uKbjRH2vlOpbkKxIUgXTSFu4wuSYfzl-ojYju3z5k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
