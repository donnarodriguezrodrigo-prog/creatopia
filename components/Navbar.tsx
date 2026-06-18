'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const LOGO_URL = 'https://kgqhunnwlcztxxtrwdwp.supabase.co/storage/v1/object/public/logo/a077e282-5b39-4998-8cf5-0221070fef94.jpg';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-near-black/95 backdrop-blur-md border-b border-wine/30 shadow-lg shadow-deep-wine/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-blush/5 flex-shrink-0">
            <Image
              src={LOGO_URL}
              alt="Creatopia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bebas text-blush text-xl tracking-widest">CREATOPIA</span>
            <span className="text-rose/70 text-[9px] tracking-[0.2em] uppercase font-montserrat">
              Purposeful Creativity
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className={`nav-link text-sm tracking-widest uppercase font-montserrat font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-rose active'
                    : 'text-blush/70 hover:text-blush'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-wine/30 bg-wine/10 text-blush hover:border-rose/50 hover:bg-wine/30 transition-all"
          aria-label="Toggle menu"
        >
          <span className={`absolute transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
            <X size={20} />
          </span>
          <span className={`absolute transition-all duration-300 ${menuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
            <Menu size={20} />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-near-black/98 backdrop-blur-md border-t border-wine/20 px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm tracking-widest uppercase font-semibold transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-rose bg-wine/20'
                      : 'text-blush/70 hover:text-blush hover:bg-wine/10'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
