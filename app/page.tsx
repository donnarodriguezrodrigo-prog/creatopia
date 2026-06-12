import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

async function getSettings() {
  const { data } = await supabase.from('site_settings').select('*');
  const settings: Record<string, string> = {};
  data?.forEach((row: { key: string; value: string }) => {
    settings[row.key] = row.value;
  });
  return settings;
}

async function getPortfolio() {
  const { data } = await supabase
    .from('portfolio')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
}

async function getCertificates() {
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
}

async function getServices() {
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });
  return data || [];
}

export default async function Home() {
  const [settings, portfolio, certificates, services] = await Promise.all([
    getSettings(),
    getPortfolio(),
    getCertificates(),
    getServices(),
  ]);

  return (
    <div className="grain">
      <Navbar />
      <main>
        <HeroSection settings={settings} />
        <AboutSection settings={settings} />
        <PortfolioSection items={portfolio} />
        <CertificatesSection items={certificates} />
        <ServicesSection items={services} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}
