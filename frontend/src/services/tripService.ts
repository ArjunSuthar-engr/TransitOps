import { supabase } from './supabase';
import type { Trip } from '@/types/database';

export const tripService = {
  getAll: async () => {
    const { data, error } = await supabase.from('trips').select('*');
    if (error) throw error;
    return data as Trip[];
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('trips').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Trip;
  },
  create: async (trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('trips').insert(trip).select().single();
    if (error) throw error;
    return data as Trip;
  },
  update: async (id: string, trip: Partial<Omit<Trip, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('trips').update(trip).eq('id', id).select().single();
    if (error) throw error;
    return data as Trip;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('trips').delete().eq('id', id);
    if (error) throw error;
  }
};
