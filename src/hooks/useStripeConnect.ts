import { useState } from 'react';
import { supabase } from '../lib/supabase';

const STRIPE_CONNECT_URL = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${encodeURIComponent(import.meta.env.VITE_STRIPE_REDIRECT_URI)}`;

export function useStripeConnect() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startOnboarding = async (formData: any) => {
    try {
      setLoading(true);
      
      // First create the feedback giver record
      const { data: feedbackGiver, error: createError } = await supabase
        .from('feedback_givers')
        .insert([formData])
        .select()
        .single();

      if (createError) throw createError;

      // Store user ID for the redirect
      localStorage.setItem('stripe_onboarding_user_id', feedbackGiver.id);
      localStorage.setItem('feedback_giver_data', JSON.stringify(formData));
      
      // Open Stripe Connect onboarding in a new tab
      window.open(STRIPE_CONNECT_URL, '_blank');
      
      return { success: true, feedbackGiver };
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const getLoginLink = async (stripeAccountId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-login-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeAccountId }),
      });
      
      const { url } = await response.json();
      window.open(url, '_blank');
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { startOnboarding, getLoginLink, loading, error };
}