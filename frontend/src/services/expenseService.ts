import { supabase } from './supabase';
import type { Expense } from '@/types/database';

export const expenseService = {
  getAll: async () => {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) throw error;
    return data as Expense[];
  },
  getById: async (id: string) => {
    const { data, error } = await supabase.from('expenses').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Expense;
  },
  create: async (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase.from('expenses').insert(expense).select().single();
    if (error) throw error;
    return data as Expense;
  },
  update: async (id: string, expense: Partial<Omit<Expense, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase.from('expenses').update(expense).eq('id', id).select().single();
    if (error) throw error;
    return data as Expense;
  },
  delete: async (id: string) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
  }
};
