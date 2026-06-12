'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

interface Props {
  settings: Record<string, string>;
}

export default function HeroSection({ settings }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add('hero-loaded'), 100);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-near-black"
    >
      {/* Background wave lines (brand motif) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 opacity-20"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M${300 + i * 20} 0 Q${400 + i * 10} ${400} ${300 + i * 20} 800`}
              stroke="#9E3D42"
              strokeWidth="1"
              opacity={1 - i * 0.07}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <path
              key={`h${i}`}
              d={`M0 ${100 + i * 80} Q300 ${80 + i * 80} 600 ${100 + i * 80}`}
              stroke="#F6A2A2"
              strokeWidth="0.5"
              opacity={0.4 - i * 0.04}
            />
          ))}
        </svg>
        {/* Radial glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wine/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-deep-wine/20 blur-[80px]" />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-near-black via-near-black/95 to-near-black pointer-events-none" />

      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center"
        style={{ opacity: 0, transition: 'opacity 1s ease' }}
        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-wine/40 bg-wine/10 text-rose text-xs tracking-[0.2em] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
            Available for work
          </div>

          <div className="space-y-2">
            <p className="text-rose/80 text-sm tracking-[0.3em] uppercase font-montserrat font-medium">
              Hi, I&apos;m
            </p>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide">
              <span className="text-blush">DONNA</span>
              <br />
              <span className="gradient-text">MAY RODRIGO</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-wine" />
            <p className="font-montserrat text-blush/70 text-sm tracking-[0.15em] uppercase font-medium">
              Graphic Designer & Virtual Assistant
            </p>
          </div>

          <p className="text-blush/60 text-base leading-relaxed max-w-md font-light">
            {settings.hero_tagline || 'Purposeful Creativity'} — delivering high-quality visual
            solutions that elevate your brand and achieve your business objectives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full bg-wine text-blush font-semibold text-sm tracking-widest uppercase hover:bg-rose hover:text-near-black transition-all duration-300 shadow-lg shadow-wine/30"
            >
              View Portfolio
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full border border-wine/50 text-blush font-semibold text-sm tracking-widest uppercase hover:border-rose hover:text-rose transition-all duration-300"
            >
              Book a Call
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-blush/30 text-xs tracking-widest uppercase">Follow</span>
            <div className="h-px w-8 bg-wine/30" />
            {[
              { icon: FaLinkedin, url: settings.linkedin_url, label: 'LinkedIn' },
              { icon: FaFacebook, url: settings.facebook_url, label: 'Facebook' },
              { icon: FaTwitter, url: settings.twitter_url, label: 'Twitter' },
              { icon: FaYoutube, url: settings.youtube_url, label: 'YouTube' },
            ].map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-wine/30 flex items-center justify-center text-blush/50 hover:text-rose hover:border-rose transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-wine/20 scale-110" />
            <div className="absolute inset-0 rounded-full border border-rose/10 scale-125" />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-wine/20 to-transparent blur-2xl" />

            {/* Profile image container */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-wine/50 shadow-2xl shadow-wine/20">
              <div className="w-full h-full bg-gradient-to-br from-wine/40 to-deep-wine flex items-center justify-center">
                {/* Placeholder - replace with actual image */}
                <div className="text-center">
                  <div className="font-bebas text-7xl text-blush/20 leading-none">DMR</div>
                  <p className="text-blush/30 text-xs mt-2 tracking-widest">ADD PHOTO IN ADMIN</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-deep-wine border border-wine/50 rounded-2xl px-4 py-3 shadow-lg">
              <p className="font-bebas text-rose text-2xl leading-none">3+</p>
              <p className="text-blush/60 text-[10px] tracking-wider uppercase">Years Design</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-deep-wine border border-wine/50 rounded-2xl px-4 py-3 shadow-lg">
              <p className="font-bebas text-rose text-2xl leading-none">50+</p>
              <p className="text-blush/60 text-[10px] tracking-wider uppercase">Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blush/30 hover:text-rose transition-colors animate-bounce"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </button>
    </section>
  );
}
