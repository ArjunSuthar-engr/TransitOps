import { supabase } from './supabase';

export const authService = {
  login: async (email: string, password?: string) => {
    if (password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      return data;
    }
  },
  
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
  
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
  
  getCurrentProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (error) throw error;
    return data;
  }
};
