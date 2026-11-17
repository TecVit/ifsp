import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const configurado = Boolean(url && chave);

export const supabase = configurado ? createClient(url, chave) : null;

export const TEMA = 'clima';
