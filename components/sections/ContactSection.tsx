'use client';

import { useState } from 'react';
import { Mail, Phone, Video, Calendar, Send, Linkedin, Facebook, Twitter, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  settings: Record<string, string>;
}

const FORMSPREE_ID = 'xeewpgno';

export default function ContactSection({ settings }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'schedule'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send to Formspree — you receive email notification
      const formspreeRes = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      // Also save to Supabase for admin inbox
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (formspreeRes.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { icon: Linkedin, url: settings.linkedin_url, label: 'LinkedIn' },
    { icon: Facebook, url: settings.facebook_url, label: 'Facebook' },
    { icon: Twitter, url: settings.twitter_url, label: 'Twitter' },
    { icon: Youtube, url: settings.youtube_url, label: 'YouTube' },
  ];

  return (
    <section id="contact" className="relative py-24 bg-near-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />

      {/* BG */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-wine/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end gap-6 mb-12">
          <div>
            <p className="text-rose/60 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              06 — Contact
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl text-blush leading-none">
              GET IN TOUCH
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-wine/40 to-transparent mb-3" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Info */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-blush/60 leading-relaxed">
              Ready to elevate your brand? Whether you need a quick design or long-term creative support, let&apos;s talk about how I can help.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-wine/20 border border-wine/30 flex items-center justify-center group-hover:bg-wine/40 transition-colors">
                    <Mail size={16} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-blush/40 text-[10px] tracking-widest uppercase">Email</p>
                    <p className="text-blush text-sm group-hover:text-rose transition-colors">{settings.email}</p>
                  </div>
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-wine/20 border border-wine/30 flex items-center justify-center group-hover:bg-wine/40 transition-colors">
                    <Phone size={16} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-blush/40 text-[10px] tracking-widest uppercase">Phone</p>
                    <p className="text-blush text-sm group-hover:text-rose transition-colors">{settings.phone}</p>
                  </div>
                </a>
              )}

              {/* Zoom Link */}
              {settings.zoom_link && (
                <a
                  href={settings.zoom_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-wine/20 border border-wine/30 flex items-center justify-center group-hover:bg-wine/40 transition-colors">
                    <Video size={16} className="text-rose" />
                  </div>
                  <div>
                    <p className="text-blush/40 text-[10px] tracking-widest uppercase">Zoom Meeting</p>
                    <p className="text-blush text-sm group-hover:text-rose transition-colors">Join My Zoom Room</p>
                  </div>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-blush/40 text-[10px] tracking-widest uppercase mb-3">Connect</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-wine/30 flex items-center justify-center text-blush/50 hover:text-rose hover:border-rose transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Calendly Button */}
            {settings.calendly_url && (
              <a
                href={settings.calendly_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-wine/20 border border-wine/30 hover:bg-wine/40 hover:border-rose/40 transition-all group"
              >
                <Calendar size={18} className="text-rose" />
                <div>
                  <p className="text-blush text-sm font-semibold group-hover:text-rose transition-colors">
                    Schedule a Meeting
                  </p>
                  <p className="text-blush/40 text-[10px] tracking-wide">via Calendly + Zoom</p>
                </div>
              </a>
            )}
          </div>

          {/* Right: Form / Schedule Tabs */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-deep-wine/30 border border-wine/20 rounded-xl p-1 w-fit">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-5 py-2 rounded-lg text-xs tracking-widest uppercase font-semibold transition-all ${
                  activeTab === 'form'
                    ? 'bg-wine text-blush shadow-lg'
                    : 'text-blush/50 hover:text-blush'
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-5 py-2 rounded-lg text-xs tracking-widest uppercase font-semibold transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-wine text-blush shadow-lg'
                    : 'text-blush/50 hover:text-blush'
                }`}
              >
                Schedule Call
              </button>
            </div>

            {activeTab === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-blush/40 text-[10px] tracking-widest uppercase block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Donna May"
                      className="w-full bg-deep-wine/20 border border-wine/30 rounded-xl px-4 py-3 text-blush text-sm placeholder-blush/20 focus:outline-none focus:border-rose/50 focus:bg-deep-wine/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-blush/40 text-[10px] tracking-widest uppercase block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="hello@yoursite.com"
                      className="w-full bg-deep-wine/20 border border-wine/30 rounded-xl px-4 py-3 text-blush text-sm placeholder-blush/20 focus:outline-none focus:border-rose/50 focus:bg-deep-wine/40 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-blush/40 text-[10px] tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="w-full bg-deep-wine/20 border border-wine/30 rounded-xl px-4 py-3 text-blush text-sm placeholder-blush/20 focus:outline-none focus:border-rose/50 focus:bg-deep-wine/40 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-wine text-blush font-semibold text-sm tracking-widest uppercase hover:bg-rose hover:text-near-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-wine/30"
                >
                  {loading ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl overflow-hidden">
                {settings.calendly_url ? (
                  <iframe
                    src={`${settings.calendly_url}?hide_gdpr_banner=1&background_color=190c0e&text_color=F9E7E7&primary_color=9E3D42`}
                    width="100%"
                    height="650"
                    frameBorder="0"
                    title="Schedule a meeting"
                    className="rounded-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Calendar size={40} className="text-wine/40 mb-4" />
                    <p className="text-blush/40 text-sm">Calendly URL not configured.</p>
                    <p className="text-blush/30 text-xs mt-1">Add it in the admin settings.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
