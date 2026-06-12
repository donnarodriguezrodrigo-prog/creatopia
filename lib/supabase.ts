import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
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
