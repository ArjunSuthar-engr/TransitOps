import { supabase } from './supabase';
import type { FuelLog } from '@/types/database';

export const fuelService = {
  getAll: async () => {
    const { data, error } = await supabase.from('fuel_logs').select(`
      *,
      vehicle:vehicles(registration_number, make, model)
    `);
    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('fuel_logs').select('*').eq('id', id).single();
    if (error) throw error;
    return data as FuelLog;
  },
  create: async (log: Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('fuel_logs').insert(log).select().single();
    if (error) throw error;
    return data as FuelLog;
  },
  update: async (id: string, log: Partial<Omit<FuelLog, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('fuel_logs').update(log).eq('id', id).select().single();
    if (error) throw error;
    return data as FuelLog;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('fuel_logs').delete().eq('id', id);
    if (error) throw error;
  }
};
