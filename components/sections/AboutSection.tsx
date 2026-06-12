'use client';

import { useEffect, useRef } from 'react';
import { Shield, Target, CheckSquare, Megaphone, Compass } from 'lucide-react';

interface Props {
  settings: Record<string, string>;
}

const brandAdvantages = [
  { icon: Shield, label: 'Assertive', desc: 'Confident in approach and execution' },
  { icon: Target, label: 'Goal Oriented', desc: 'Focused on your business outcomes' },
  { icon: CheckSquare, label: 'Decisive', desc: 'Clear direction, fast turnaround' },
  { icon: Megaphone, label: 'Opinionated', desc: 'Professional insights that matter' },
  { icon: Compass, label: 'Purposeful', desc: 'Every design has intention behind it' },
];

const technicalSkills = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Figma', 'Canva', 'Microsoft Office', 'Capcut'];

export default function AboutSection({ settings }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-24 bg-near-black overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />

      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-wine/5 blur-[100px] rounded-full pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="reveal-item section-reveal mb-16 flex items-end gap-6">
          <div>
            <p className="text-rose/60 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              02 — About Me
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl text-blush leading-none">
              WHO I AM
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-wine/40 to-transparent mb-3" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio */}
          <div className="space-y-6">
            <div className="reveal-item section-reveal">
              <h3 className="font-bebas text-3xl text-rose mb-4 tracking-wide">
                Graphic Designer & Virtual Assistant
              </h3>
              <p className="text-blush/70 leading-relaxed text-base">
                {settings.about_bio ||
                  'I am Donna May Rodrigo. As a Virtual Assistant, I am assertive and take a goal-oriented and decisive approach to meeting my clients\' needs. I utilize purposeful methods and strategies to deliver high-quality results.'}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="reveal-item section-reveal">
              <h4 className="text-blush/50 text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full border border-wine/30 bg-wine/10 text-blush/70 text-xs tracking-wide hover:border-rose/50 hover:text-rose transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="reveal-item section-reveal space-y-3">
              <h4 className="text-blush/50 text-xs tracking-[0.2em] uppercase font-semibold">
                Education
              </h4>
              <div className="border-l-2 border-wine/40 pl-4 space-y-3">
                <div>
                  <p className="text-blush text-sm font-semibold">Bachelor of Science in Information Technology</p>
                  <p className="text-rose/70 text-xs tracking-wide">Romblon State University · 2025–2026</p>
                </div>
                <div>
                  <p className="text-blush text-sm font-semibold">General Virtual Assistant Training</p>
                  <p className="text-rose/70 text-xs tracking-wide">DICT · June 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Advantage Cards */}
          <div className="reveal-item section-reveal">
            <div className="bg-deep-wine/30 border border-wine/20 rounded-2xl p-6">
              <p className="text-rose/60 text-xs tracking-[0.2em] uppercase font-semibold mb-1">
                Brand Advantage
              </p>
              <h3 className="font-bebas text-3xl text-blush mb-6 tracking-wide">POWER</h3>
              <div className="space-y-4">
                {brandAdvantages.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-3 rounded-xl bg-near-black/40 border border-wine/10 hover:border-wine/30 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-wine/20 flex items-center justify-center flex-shrink-0 group-hover:bg-wine/40 transition-colors">
                      <Icon size={18} className="text-rose" />
                    </div>
                    <div>
                      <p className="font-bebas text-blush text-lg leading-none tracking-wide">{label}</p>
                      <p className="text-blush/50 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
