'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Lock, Eye, EyeOff } from 'lucide-react';

const LOGO_URL = 'https://kgqhunnwlcztxxtrwdwp.supabase.co/storage/v1/object/public/logo/a077e282-5b39-4998-8cf5-0221070fef94.jpg';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        toast.success('Welcome, Donna!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Incorrect password');
      }
    } catch {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-near-black flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wine/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-blush/5 mx-auto mb-4">
            <Image src={LOGO_URL} alt="Creatopia" fill className="object-contain" priority />
          </div>
          <h1 className="font-bebas text-3xl text-blush tracking-widest">CREATOPIA</h1>
          <p className="text-rose/60 text-xs tracking-[0.2em] uppercase mt-1">Admin Panel</p>
        </div>

        <div className="bg-deep-wine/30 border border-wine/20 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-rose/60" />
            <h2 className="text-blush font-semibold text-sm tracking-wide">Secure Access</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-blush/40 text-[10px] tracking-widest uppercase block mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-near-black/50 border border-wine/30 rounded-xl px-4 py-3 text-blush text-sm placeholder-blush/20 focus:outline-none focus:border-rose/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blush/30 hover:text-rose transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-wine text-blush font-semibold text-sm tracking-widest uppercase hover:bg-rose hover:text-near-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? <div className="spinner" /> : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-blush/20 text-xs mt-6">
          <a href="/" className="hover:text-rose transition-colors">← Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}
