import { supabase } from './supabase';
import type { Driver } from '@/types/database';

export const driverService = {
  getAll: async () => {
    const { data, error } = await supabase.from('drivers').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as Driver[];
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('drivers').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Driver;
  },
  create: async (driver: Omit<Driver, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('drivers').insert(driver).select().single();
    if (error) throw error;
    return data as Driver;
  },
  update: async (id: string, driver: Partial<Omit<Driver, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('drivers').update(driver).eq('id', id).select().single();
    if (error) throw error;
    return data as Driver;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('drivers').delete().eq('id', id);
    if (error) throw error;
  }
};
