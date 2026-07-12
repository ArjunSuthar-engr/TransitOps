import { supabase } from './supabase';
import type { MaintenanceLog } from '@/types/database';

export const maintenanceService = {
  getAll: async () => {
    const { data, error } = await supabase.from('maintenance_logs').select('*');
    if (error) throw error;
    return data as MaintenanceLog[];
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('maintenance_logs').select('*').eq('id', id).single();
    if (error) throw error;
    return data as MaintenanceLog;
  },
  create: async (log: Omit<MaintenanceLog, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('maintenance_logs').insert(log).select().single();
    if (error) throw error;
    return data as MaintenanceLog;
  },
  update: async (id: string, log: Partial<Omit<MaintenanceLog, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('maintenance_logs').update(log).eq('id', id).select().single();
    if (error) throw error;
    return data as MaintenanceLog;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('maintenance_logs').delete().eq('id', id);
    if (error) throw error;
  }
};
