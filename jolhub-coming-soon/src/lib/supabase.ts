import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Registration {
  id?: number
  created_at?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  event_types: string
  referral_source: string
}

// API Response Types
export interface SupabaseResponse {
  success: boolean
  data?: Registration
  error?: string
  message?: string
}