'use client';

import { Check } from 'lucide-react';
import type { Service } from '@/lib/supabase';

interface Props {
  items: Service[];
}

export default function ServicesSection({ items }: Props) {
  return (
    <section id="services" className="relative py-24 bg-deep-wine/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />

      {/* Background wave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <svg viewBox="0 0 1440 600" className="w-full" fill="none">
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d={`M0 ${100 + i * 80} Q360 ${60 + i * 80} 720 ${100 + i * 80} Q1080 ${140 + i * 80} 1440 ${100 + i * 80}`}
              stroke="#9E3D42"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-rose/60 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
            05 — Services & Pricing
          </p>
          <h2 className="font-bebas text-5xl md:text-6xl text-blush leading-none mb-4">
            RATES & PACKAGES
          </h2>
          <p className="text-blush/50 text-sm max-w-md mx-auto">
            Flexible pricing plans designed to grow with your business needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((service) => (
            <div
              key={service.id}
              className={`premium-card relative rounded-2xl p-7 flex flex-col ${
                service.highlighted
                  ? 'bg-wine border-2 border-rose/50 shadow-2xl shadow-wine/40'
                  : 'bg-near-black/60 border border-wine/30 hover:border-wine/60'
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose rounded-full text-near-black text-[10px] tracking-widest uppercase font-bold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-bebas text-2xl tracking-wide mb-1 ${service.highlighted ? 'text-blush' : 'text-blush'}`}>
                  {service.name}
                </h3>
                {service.description && (
                  <p className={`text-xs leading-relaxed ${service.highlighted ? 'text-blush/70' : 'text-blush/50'}`}>
                    {service.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-wine/30">
                <div className="flex items-end gap-1">
                  <span className={`font-bebas text-5xl leading-none ${service.highlighted ? 'text-blush' : 'text-rose'}`}>
                    ${service.price}
                  </span>
                  <span className={`text-xs mb-1 tracking-wide ${service.highlighted ? 'text-blush/60' : 'text-blush/40'}`}>
                    /{service.price_unit}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      service.highlighted ? 'bg-rose/20' : 'bg-wine/20'
                    }`}>
                      <Check size={11} className={service.highlighted ? 'text-rose' : 'text-rose'} />
                    </div>
                    <span className={`text-xs leading-relaxed ${service.highlighted ? 'text-blush/80' : 'text-blush/60'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`mt-8 w-full py-3 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                  service.highlighted
                    ? 'bg-blush text-near-black hover:bg-rose'
                    : 'border border-wine/50 text-blush hover:bg-wine hover:border-wine'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Professional Skills below */}
        <div className="mt-16 text-center">
          <p className="text-blush/40 text-xs tracking-[0.2em] uppercase mb-4">Professional Skills</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {[
              'Strong Attention to Detail',
              'Excellent Communication',
              'Creativity & Problem-Solving',
              'Time Management',
              'Research & Data Gathering',
              'Independent Work',
              'Commitment to Deadlines',
              'Continuous Learning',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full border border-wine/20 bg-wine/5 text-blush/50 text-xs tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
