import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useUploadAvatar() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function uploadAvatar(file: File) {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setUploading(false);
    }
  }

  return { uploadAvatar, uploading, error };
}