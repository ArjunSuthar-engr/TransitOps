import { supabase } from './supabase';
import type { Vehicle } from '@/types/database';

export const vehicleService = {
  getAll: async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) throw error;
    return data as Vehicle[];
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('vehicles').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Vehicle;
  },
  create: async (vehicle: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('vehicles').insert(vehicle).select().single();
    if (error) throw error;
    return data as Vehicle;
  },
  update: async (id: string, vehicle: Partial<Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('vehicles').update(vehicle).eq('id', id).select().single();
    if (error) throw error;
    return data as Vehicle;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) throw error;
  }
};
