import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kgqhunnwlcztxxtrwdwp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncWh1bm53bGN6dHh4dHJ3ZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDgwMzksImV4cCI6MjA5NjgyNDAzOX0._cCjHto-3L6NnM1cWBV6wbxldIdxoecjyPjCfgIm63Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for admin operations)
export const supabaseAdmin = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export type Portfolio = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  tools: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
  credential_url?: string;
  order_index: number;
  created_at: string;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  price_unit: string;
  description: string;
  features: string[];
  highlighted: boolean;
  order_index: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};
