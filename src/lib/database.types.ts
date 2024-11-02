export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feedback_givers: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          avatar_url: string | null
          twitter_handle: string
          github_handle: string
          location: string
          bio: string
          followers: string
          base_price: number
          public_multiplier: number
          stripe_account_id: string | null
          stripe_account_status: 'pending' | 'active' | null
          stripe_details_submitted: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          avatar_url?: string | null
          twitter_handle: string
          github_handle: string
          location: string
          bio: string
          followers: string
          base_price: number
          public_multiplier: number
          stripe_account_id?: string | null
          stripe_account_status?: 'pending' | 'active' | null
          stripe_details_submitted?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          avatar_url?: string | null
          twitter_handle?: string
          github_handle?: string
          location?: string
          bio?: string
          followers?: string
          base_price?: number
          public_multiplier?: number
          stripe_account_id?: string | null
          stripe_account_status?: 'pending' | 'active' | null
          stripe_details_submitted?: boolean
        }
      }
      feedback_requests: {
        Row: {
          id: string
          created_at: string
          giver_id: string
          requester_email: string
          product_link: string
          is_public: boolean
          status: 'pending' | 'completed' | 'cancelled'
          feedback_url: string | null
          final_price: number
          stripe_payment_intent_id: string | null
          stripe_transfer_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          giver_id: string
          requester_email: string
          product_link: string
          is_public: boolean
          status?: 'pending' | 'completed' | 'cancelled'
          feedback_url?: string | null
          final_price: number
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          giver_id?: string
          requester_email?: string
          product_link?: string
          is_public?: boolean
          status?: 'pending' | 'completed' | 'cancelled'
          feedback_url?: string | null
          final_price?: number
          stripe_payment_intent_id?: string | null
          stripe_transfer_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}