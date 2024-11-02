import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type FeedbackGiverInsert = Database['public']['Tables']['feedback_givers']['Insert'];

export function useCreateFeedbackGiver() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createFeedbackGiver(data: FeedbackGiverInsert) {
    setLoading(true);
    try {
      const { data: feedbackGiver, error } = await supabase
        .from('feedback_givers')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return { data: feedbackGiver };
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { createFeedbackGiver, loading, error };
}