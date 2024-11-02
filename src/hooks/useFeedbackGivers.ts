import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type FeedbackGiver = Database['public']['Tables']['feedback_givers']['Row'];

export function useFeedbackGivers() {
  const [feedbackGivers, setFeedbackGivers] = useState<FeedbackGiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFeedbackGivers() {
      try {
        const { data, error } = await supabase
          .from('feedback_givers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFeedbackGivers(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbackGivers();
  }, []);

  return { feedbackGivers, loading, error };
}