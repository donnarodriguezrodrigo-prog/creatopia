'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Image as ImageIcon, Award, DollarSign, MessageSquare,
  Settings, LogOut, Plus, Trash2, Edit2, Save, X, Upload,
  ExternalLink, Eye, Star, RefreshCw, User
} from 'lucide-react';
import type { Portfolio, Certificate, Service, ContactMessage } from '@/lib/supabase';

const LOGO_URL = 'https://kgqhunnwlcztxxtrwdwp.supabase.co/storage/v1/object/public/logo/a077e282-5b39-4998-8cf5-0221070fef94.jpg';

type Tab = 'overview' | 'portfolio' | 'certificates' | 'services' | 'messages' | 'settings';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const [portfolioForm, setPortfolioForm] = useState({
    title: '', description: '', category: 'Design', tools: '', featured: false, image_url: ''
  });
  const [editingPortfolio, setEditingPortfolio] = useState<string | null>(null);

  const [certForm, setCertForm] = useState({
    title: '', issuer: '', date: '', image_url: '', credential_url: ''
  });
  const [editingCert, setEditingCert] = useState<string | null>(null);

  const [settingsForm, setSettingsForm] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const certFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [p, c, s, m, st] = await Promise.all([
        supabase.from('portfolio').select('*').order('order_index'),
        supabase.from('certificates').select('*').order('order_index'),
        supabase.from('services').select('*').order('order_index'),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('*'),
      ]);
      setPortfolio(p.data || []);
      setCertificates(c.data || []);
      setServices(s.data || []);
      setMessages(m.data || []);
      const sMap: Record<string, string> = {};
      (st.data || []).forEach((r: { key: string; value: string }) => { sMap[r.key] = r.value; });
      setSettings(sMap);
      setSettingsForm(sMap);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const uploadImage = async (file: File, bucket: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from(bucket).upload(filename, file, { upsert: true });
    if (error) { toast.error('Upload failed: ' + error.message); return null; }
    const { data: url } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return url.publicUrl;
  };

  // ---- Portfolio CRUD ----
  const savePortfolio = async () => {
    if (!portfolioForm.title) return toast.error('Title required');
    const payload = {
      ...portfolioForm,
      tools: portfolioForm.tools ? portfolioForm.tools.split(',').map(t => t.trim()) : [],
      order_index: portfolio.length,
    };
    let error;
    if (editingPortfolio) {
      ({ error } = await supabase.from('portfolio').update(payload).eq('id', editingPortfolio));
    } else {
      ({ error } = await supabase.from('portfolio').insert(payload));
    }
    if (error) return toast.error(error.message);
    toast.success(editingPortfolio ? 'Updated!' : 'Added!');
    setPortfolioForm({ title: '', description: '', category: 'Design', tools: '', featured: false, image_url: '' });
    setEditingPortfolio(null);
    loadAllData();
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return;
    await supabase.from('portfolio').delete().eq('id', id);
    toast.success('Deleted');
    loadAllData();
  };

  const startEditPortfolio = (item: Portfolio) => {
    setEditingPortfolio(item.id);
    setPortfolioForm({
      title: item.title,
      description: item.description || '',
      category: item.category,
      tools: item.tools?.join(', ') || '',
      featured: item.featured,
      image_url: item.image_url,
    });
    setActiveTab('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- Certificate CRUD ----
  const saveCert = async () => {
    if (!certForm.title || !certForm.issuer || !certForm.date) return toast.error('Required fields missing');
    let error;
    const payload = { ...certForm, order_index: certificates.length };
    if (editingCert) {
      ({ error } = await supabase.from('certificates').update(payload).eq('id', editingCert));
    } else {
      ({ error } = await supabase.from('certificates').insert(payload));
    }
    if (error) return toast.error(error.message);
    toast.success(editingCert ? 'Updated!' : 'Added!');
    setCertForm({ title: '', issuer: '', date: '', image_url: '', credential_url: '' });
    setEditingCert(null);
    loadAllData();
  };

  const deleteCert = async (id: string) => {
    if (!confirm('Delete this certificate?')) return;
    await supabase.from('certificates').delete().eq('id', id);
    toast.success('Deleted');
    loadAllData();
  };

  // ---- Settings Save ----
  const saveSettings = async () => {
    const upserts = Object.entries(settingsForm).map(([key, value]) => ({
      key, value, updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' });
    if (error) return toast.error(error.message);
    toast.success('Settings saved!');
    loadAllData();
  };

  const markRead = async (id: string) => {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id);
    loadAllData();
  };

  const unreadCount = messages.filter(m => !m.read).length;

  const navItems: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'services', label: 'Services', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-near-black flex">
      {/* Sidebar */}
      <aside className="w-60 bg-deep-wine/40 border-r border-wine/20 flex flex-col fixed top-0 left-0 bottom-0 z-40">
        <div className="p-5 border-b border-wine/20">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-blush/5 flex-shrink-0">
              <Image src={LOGO_URL} alt="Creatopia" fill className="object-contain" />
            </div>
            <div>
              <p className="font-bebas text-blush text-sm tracking-widest">CREATOPIA</p>
              <p className="text-rose/50 text-[9px] tracking-wide uppercase">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-wine text-blush shadow-lg shadow-wine/30'
                  : 'text-blush/60 hover:text-blush hover:bg-wine/20'
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose text-near-black text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-wine/20 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-blush/50 hover:text-blush hover:bg-wine/10 transition-all"
          >
            <ExternalLink size={15} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-blush/50 hover:text-rose hover:bg-wine/10 transition-all"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 p-8 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bebas text-4xl text-blush tracking-wide">
              {navItems.find(n => n.id === activeTab)?.label?.toUpperCase()}
            </h1>
            <p className="text-blush/40 text-sm mt-0.5">Creatopia Admin Panel</p>
          </div>
          <button
            onClick={loadAllData}
            className="p-2 rounded-lg border border-wine/30 text-blush/50 hover:text-rose hover:border-rose/40 transition-all"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* ---- OVERVIEW ---- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Portfolio Items', value: portfolio.length, icon: ImageIcon },
                { label: 'Certificates', value: certificates.length, icon: Award },
                { label: 'Services', value: services.length, icon: DollarSign },
                { label: 'Messages', value: `${unreadCount} new`, icon: MessageSquare },
              ].map((stat) => (
                <div key={stat.label} className="bg-deep-wine/30 border border-wine/20 rounded-2xl p-5">
                  <stat.icon size={20} className="text-rose mb-3" />
                  <p className="font-bebas text-3xl text-blush">{stat.value}</p>
                  <p className="text-blush/50 text-xs tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {unreadCount > 0 && (
              <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-6">
                <h3 className="font-bebas text-xl text-rose mb-4 tracking-wide">NEW MESSAGES</h3>
                <div className="space-y-3">
                  {messages.filter(m => !m.read).slice(0, 3).map(msg => (
                    <div key={msg.id} className="flex items-start gap-4 p-4 bg-near-black/40 rounded-xl border border-wine/10">
                      <div className="flex-1 min-w-0">
                        <p className="text-blush font-semibold text-sm">{msg.name}</p>
                        <p className="text-rose/60 text-xs">{msg.email}</p>
                        <p className="text-blush/50 text-sm mt-1 truncate">{msg.message}</p>
                      </div>
                      <button
                        onClick={() => markRead(msg.id)}
                        className="text-xs text-blush/30 hover:text-rose transition-colors flex-shrink-0"
                      >
                        Mark read
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- PORTFOLIO ---- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-6">
              <h3 className="font-bebas text-xl text-rose mb-5 tracking-wide">
                {editingPortfolio ? 'EDIT ITEM' : 'ADD NEW ITEM'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Title *</label>
                  <input
                    className="admin-input"
                    value={portfolioForm.title}
                    onChange={e => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="admin-label">Category</label>
                  <input
                    className="admin-input"
                    value={portfolioForm.category}
                    onChange={e => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                    placeholder="Design, Branding, Social Media..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Description</label>
                  <textarea
                    className="admin-input resize-none"
                    rows={3}
                    value={portfolioForm.description}
                    onChange={e => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                    placeholder="Brief description of the project"
                  />
                </div>
                <div>
                  <label className="admin-label">Tools (comma-separated)</label>
                  <input
                    className="admin-input"
                    value={portfolioForm.tools}
                    onChange={e => setPortfolioForm({ ...portfolioForm, tools: e.target.value })}
                    placeholder="Canva, Figma, Photoshop"
                  />
                </div>
                <div>
                  <label className="admin-label">Image</label>
                  <div className="flex gap-2">
                    <input
                      className="admin-input flex-1"
                      value={portfolioForm.image_url}
                      onChange={e => setPortfolioForm({ ...portfolioForm, image_url: e.target.value })}
                      placeholder="Click upload button →"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-wine/30 border border-wine/40 text-blush/70 hover:text-rose hover:bg-wine/50 transition-all"
                    >
                      <Upload size={16} />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      toast.loading('Uploading...', { id: 'upload' });
                      const url = await uploadImage(file, 'portfolio');
                      toast.dismiss('upload');
                      if (url) {
                        setPortfolioForm(f => ({ ...f, image_url: url }));
                        toast.success('Uploaded!');
                      }
                    }}
                  />
                  {portfolioForm.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={portfolioForm.image_url} alt="Preview" className="mt-2 h-20 rounded-lg border border-wine/30 object-cover" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={portfolioForm.featured}
                    onChange={e => setPortfolioForm({ ...portfolioForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-wine"
                  />
                  <label htmlFor="featured" className="text-blush/70 text-sm flex items-center gap-1">
                    <Star size={14} className="text-rose/60" /> Featured item
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={savePortfolio}
                  className="px-6 py-2.5 rounded-xl bg-wine text-blush text-sm font-semibold tracking-wide hover:bg-rose hover:text-near-black transition-all flex items-center gap-2"
                >
                  <Save size={15} />
                  {editingPortfolio ? 'Update' : 'Add Item'}
                </button>
                {editingPortfolio && (
                  <button
                    onClick={() => { setEditingPortfolio(null); setPortfolioForm({ title: '', description: '', category: 'Design', tools: '', featured: false, image_url: '' }); }}
                    className="px-6 py-2.5 rounded-xl border border-wine/30 text-blush/60 text-sm hover:border-rose/40 hover:text-rose transition-all flex items-center gap-2"
                  >
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl overflow-hidden">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-left">Title</th>
                    <th className="px-5 py-3 text-left">Category</th>
                    <th className="px-5 py-3 text-left">Featured</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.length === 0 ? (
                    <tr><td colSpan={4} className="px-5 py-8 text-center text-blush/30 text-sm">No portfolio items yet</td></tr>
                  ) : portfolio.map(item => (
                    <tr key={item.id} className="border-t border-wine/10">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {item.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image_url} alt="" className="w-10 h-7 rounded-lg object-cover border border-wine/20" />
                          )}
                          <span className="text-blush text-sm font-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-blush/50 text-sm">{item.category}</td>
                      <td className="px-5 py-3">
                        {item.featured ? <Star size={14} className="text-rose" /> : <span className="text-blush/20 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEditPortfolio(item)} className="p-1.5 rounded-lg bg-wine/20 text-blush/60 hover:text-rose hover:bg-wine/40 transition-all">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deletePortfolio(item.id)} className="p-1.5 rounded-lg bg-wine/20 text-blush/60 hover:text-red-400 hover:bg-red-900/20 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---- CERTIFICATES ---- */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-6">
              <h3 className="font-bebas text-xl text-rose mb-5 tracking-wide">
                {editingCert ? 'EDIT CERTIFICATE' : 'ADD CERTIFICATE'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Title *</label>
                  <input className="admin-input" value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} placeholder="Certificate name" />
                </div>
                <div>
                  <label className="admin-label">Issuer *</label>
                  <input className="admin-input" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} placeholder="Issuing organization" />
                </div>
                <div>
                  <label className="admin-label">Date *</label>
                  <input className="admin-input" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} placeholder="June 2026" />
                </div>
                <div>
                  <label className="admin-label">Credential URL</label>
                  <input className="admin-input" value={certForm.credential_url} onChange={e => setCertForm({ ...certForm, credential_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Image</label>
                  <div className="flex gap-2">
                    <input className="admin-input flex-1" value={certForm.image_url} onChange={e => setCertForm({ ...certForm, image_url: e.target.value })} placeholder="Click upload button →" />
                    <button
                      onClick={() => certFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-wine/30 border border-wine/40 text-blush/70 hover:text-rose hover:bg-wine/50 transition-all"
                    >
                      <Upload size={16} />
                    </button>
                  </div>
                  <input
                    ref={certFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      toast.loading('Uploading...', { id: 'cert-upload' });
                      const url = await uploadImage(file, 'certificates');
                      toast.dismiss('cert-upload');
                      if (url) { setCertForm(f => ({ ...f, image_url: url })); toast.success('Uploaded!'); }
                    }}
                  />
                  {certForm.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={certForm.image_url} alt="Preview" className="mt-2 h-20 rounded-lg border border-wine/30 object-cover" />
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={saveCert} className="px-6 py-2.5 rounded-xl bg-wine text-blush text-sm font-semibold hover:bg-rose hover:text-near-black transition-all flex items-center gap-2">
                  <Save size={15} />{editingCert ? 'Update' : 'Add Certificate'}
                </button>
                {editingCert && (
                  <button onClick={() => { setEditingCert(null); setCertForm({ title: '', issuer: '', date: '', image_url: '', credential_url: '' }); }} className="px-6 py-2.5 rounded-xl border border-wine/30 text-blush/60 text-sm hover:text-rose transition-all flex items-center gap-2">
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl overflow-hidden">
              <table className="w-full admin-table">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-left">Title</th>
                    <th className="px-5 py-3 text-left">Issuer</th>
                    <th className="px-5 py-3 text-left">Date</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.length === 0 ? (
                    <tr><td colSpan={4} className="px-5 py-8 text-center text-blush/30 text-sm">No certificates yet</td></tr>
                  ) : certificates.map(cert => (
                    <tr key={cert.id} className="border-t border-wine/10">
                      <td className="px-5 py-3 text-blush text-sm font-medium">{cert.title}</td>
                      <td className="px-5 py-3 text-blush/50 text-sm">{cert.issuer}</td>
                      <td className="px-5 py-3 text-blush/50 text-sm">{cert.date}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingCert(cert.id);
                              setCertForm({ title: cert.title, issuer: cert.issuer, date: cert.date, image_url: cert.image_url || '', credential_url: cert.credential_url || '' });
                            }}
                            className="p-1.5 rounded-lg bg-wine/20 text-blush/60 hover:text-rose hover:bg-wine/40 transition-all"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => deleteCert(cert.id)} className="p-1.5 rounded-lg bg-wine/20 text-blush/60 hover:text-red-400 hover:bg-red-900/20 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---- SERVICES ---- */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <p className="text-blush/50 text-sm">Services are pre-seeded from the database. Edit directly in Supabase Table Editor for now.</p>
            {services.map(service => (
              <div key={service.id} className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bebas text-xl text-blush tracking-wide">{service.name}</h3>
                    {service.highlighted && <span className="px-2 py-0.5 rounded-full bg-rose/20 text-rose text-[10px] tracking-wide">Popular</span>}
                  </div>
                  <p className="text-rose font-bebas text-2xl">${service.price}/{service.price_unit}</p>
                  <p className="text-blush/40 text-xs mt-1">{service.features.length} features</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- MESSAGES ---- */}
        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare size={40} className="text-wine/30 mx-auto mb-4" />
                <p className="text-blush/40 text-sm">No messages yet</p>
              </div>
            ) : messages.map(msg => (
              <div key={msg.id} className={`p-5 rounded-2xl border transition-all ${msg.read ? 'bg-near-black/30 border-wine/10' : 'bg-deep-wine/30 border-wine/30'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-blush font-semibold text-sm">{msg.name}</p>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />}
                    </div>
                    <a href={`mailto:${msg.email}`} className="text-rose/60 text-xs hover:text-rose transition-colors">{msg.email}</a>
                    <p className="text-blush/60 text-sm mt-2 leading-relaxed">{msg.message}</p>
                    <p className="text-blush/30 text-xs mt-2">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg.id)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-wine/20 text-blush/60 text-xs hover:text-rose hover:bg-wine/40 transition-all flex items-center gap-1"
                    >
                      <Eye size={12} /> Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- SETTINGS ---- */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-6">
              <h3 className="font-bebas text-xl text-rose mb-5 tracking-wide flex items-center gap-2">
                <User size={18} /> PROFILE PHOTO
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-wine/40 bg-near-black flex-shrink-0">
                  {settingsForm.profile_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={settingsForm.profile_image} alt="Profile" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blush/20 text-xs">No photo</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <input
                      className="admin-input flex-1"
                      value={settingsForm.profile_image || ''}
                      onChange={e => setSettingsForm({ ...settingsForm, profile_image: e.target.value })}
                      placeholder="Click upload →"
                    />
                    <button
                      onClick={() => profileFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-wine/30 border border-wine/40 text-blush/70 hover:text-rose hover:bg-wine/50 transition-all flex items-center gap-2"
                    >
                      <Upload size={16} /> Upload
                    </button>
                  </div>
                  <input
                    ref={profileFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      toast.loading('Uploading photo...', { id: 'profile-upload' });
                      const url = await uploadImage(file, 'profile');
                      toast.dismiss('profile-upload');
                      if (url) {
                        const updated = { ...settingsForm, profile_image: url };
                        setSettingsForm(updated);
                        await supabase.from('site_settings').upsert(
                          { key: 'profile_image', value: url, updated_at: new Date().toISOString() },
                          { onConflict: 'key' }
                        );
                        toast.success('Profile photo updated!');
                        loadAllData();
                      }
                    }}
                  />
                  <p className="text-blush/30 text-xs mt-2">This appears in your hero section. Square images work best.</p>
                </div>
              </div>
            </div>

            {/* Other Settings */}
            <div className="bg-deep-wine/20 border border-wine/20 rounded-2xl p-6">
              <h3 className="font-bebas text-xl text-rose mb-5 tracking-wide">SITE SETTINGS</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'hero_tagline', label: 'Hero Tagline' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'calendly_url', label: 'Calendly URL' },
                  { key: 'zoom_link', label: 'Zoom Meeting Link' },
                  { key: 'linkedin_url', label: 'LinkedIn URL' },
                  { key: 'facebook_url', label: 'Facebook URL' },
                  { key: 'twitter_url', label: 'Twitter/X URL' },
                  { key: 'youtube_url', label: 'YouTube URL' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="admin-label">{label}</label>
                    <input
                      className="admin-input"
                      value={settingsForm[key] || ''}
                      onChange={e => setSettingsForm({ ...settingsForm, [key]: e.target.value })}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="admin-label">About Bio</label>
                  <textarea
                    className="admin-input resize-none"
                    rows={5}
                    value={settingsForm.about_bio || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, about_bio: e.target.value })}
                    placeholder="Your bio / about text"
                  />
                </div>
              </div>
              <button
                onClick={saveSettings}
                className="mt-5 px-6 py-2.5 rounded-xl bg-wine text-blush text-sm font-semibold tracking-wide hover:bg-rose hover:text-near-black transition-all flex items-center gap-2"
              >
                <Save size={15} /> Save All Settings
              </button>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .admin-label {
          display: block;
          color: rgba(249,231,231,0.4);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .admin-input {
          width: 100%;
          background: rgba(25,12,14,0.5);
          border: 1px solid rgba(158,61,66,0.3);
          border-radius: 12px;
          padding: 10px 14px;
          color: #F9E7E7;
          font-size: 14px;
          font-family: var(--font-montserrat);
          transition: all 0.2s;
        }
        .admin-input:focus {
          outline: none;
          border-color: rgba(246,162,162,0.5);
          background: rgba(66,4,7,0.4);
        }
        .admin-input::placeholder {
          color: rgba(249,231,231,0.2);
        }
      `}</style>
    </div>
  );
}
