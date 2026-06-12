'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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

      // Update active section
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
          <div className="w-9 h-9 rounded-lg bg-wine/20 border border-wine/40 flex items-center justify-center group-hover:bg-wine/40 transition-colors">
            <span className="font-bebas text-rose text-lg leading-none">C</span>
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

        {/* CTA Button */}
        <button
          onClick={() => handleNavClick('#contact')}
          className="hidden md:block px-5 py-2 rounded-full bg-wine text-blush text-xs tracking-widest uppercase font-semibold hover:bg-rose hover:text-near-black transition-all duration-300"
        >
          Hire Me
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-blush p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-near-black/98 backdrop-blur-md border-t border-wine/20 px-6 py-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm tracking-widest uppercase font-semibold transition-colors w-full text-left ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-rose'
                      : 'text-blush/70'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-2 w-full py-3 rounded-full bg-wine text-blush text-xs tracking-widest uppercase font-semibold"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
