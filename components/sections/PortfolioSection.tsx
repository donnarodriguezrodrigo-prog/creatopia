'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, X } from 'lucide-react';
import type { Portfolio } from '@/lib/supabase';

interface Props {
  items: Portfolio[];
}

export default function PortfolioSection({ items }: Props) {
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<Portfolio | null>(null);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-deep-wine/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-wine/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end gap-6 mb-12">
          <div>
            <p className="text-rose/60 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              03 — Portfolio
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl text-blush leading-none">
              MY WORK
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-wine/40 to-transparent mb-3" />
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-wine text-blush shadow-lg shadow-wine/30'
                    : 'border border-wine/30 text-blush/60 hover:border-rose/50 hover:text-rose'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Portfolio Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-bebas text-5xl text-wine/30 mb-4">NO ITEMS YET</div>
            <p className="text-blush/40 text-sm">Add portfolio items via the admin panel</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="premium-card group relative rounded-2xl overflow-hidden bg-near-black border border-wine/20 hover:border-wine/50 text-left"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-deep-wine/30">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bebas text-wine/40 text-2xl tracking-widest">
                        {item.category}
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/60 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink
                      size={24}
                      className="text-rose opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    />
                  </div>
                  {item.featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-wine text-blush text-[10px] tracking-widest uppercase font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-rose/60 text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-bebas text-xl text-blush mt-1 leading-tight tracking-wide">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-blush/50 text-sm mt-2 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.tools && item.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded-full bg-wine/10 border border-wine/20 text-blush/50 text-[10px] tracking-wide"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-near-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-wine/30 border border-wine/50 flex items-center justify-center text-blush hover:bg-wine/60 transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-deep-wine/30 border border-wine/30 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image_url && (
              <div className="relative w-full aspect-video bg-near-black">
                <Image
                  src={selected.image_url}
                  alt={selected.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="p-6">
              <span className="text-rose/60 text-xs tracking-[0.2em] uppercase font-semibold">
                {selected.category}
              </span>
              <h3 className="font-bebas text-3xl text-blush mt-1 tracking-wide">
                {selected.title}
              </h3>
              {selected.description && (
                <p className="text-blush/60 text-sm mt-3 leading-relaxed">
                  {selected.description}
                </p>
              )}
              {selected.tools && selected.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-wine/20 border border-wine/30 text-blush/70 text-xs tracking-wide"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}