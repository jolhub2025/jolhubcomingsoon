import { supabase } from '../lib/supabase'
import type { Registration, SupabaseResponse } from '../lib/supabase'

export class RegistrationService {
  /**
   * Register a new user
   * @param registration - Registration data
   * @returns Promise with success/error response
   */
  static async createRegistration(registration: Omit<Registration, 'id' | 'created_at'>): Promise<SupabaseResponse> {
    try {

      // Check for duplicate email first
      const { data: existingUser, error: checkError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', registration.email.toLowerCase().trim())
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is what we want
        return {
          success: false,
          error: 'DATABASE_ERROR',
          message: 'Error checking for existing email. Please try again.'
        }
      }

      if (existingUser) {
        return {
          success: false,
          error: 'DUPLICATE_EMAIL',
          message: 'You are already registered. Please wait for magic to happen.'
        }
      }

      // Insert new registration
      const { data, error } = await supabase
        .from('registrations')
        .insert([{
          first_name: registration.first_name.trim(),
          last_name: registration.last_name.trim(),
          email: registration.email.toLowerCase().trim(),
          phone: registration.phone?.trim() || null,
          company: registration.company?.trim() || null,
          event_types: registration.event_types,
          referral_source: registration.referral_source
        }])
        .select()
        .single()

      if (error) {
        
        // Handle unique constraint violation (duplicate email)
        if (error.code === '23505') {
          return {
            success: false,
            error: 'DUPLICATE_EMAIL',
            message: 'You are already registered. Please wait for magic to happen.'
          }
        }

        return {
          success: false,
          error: 'DATABASE_ERROR',
          message: 'Failed to save registration. Please try again.'
        }
      }

      return {
        success: true,
        data: data,
        message: 'Registration saved successfully!'
      }

    } catch (error) {
      return {
        success: false,
        error: 'UNEXPECTED_ERROR',
        message: 'An unexpected error occurred. Please try again.'
      }
    }
  }
}