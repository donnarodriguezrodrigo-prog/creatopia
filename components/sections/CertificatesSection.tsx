'use client';

import Image from 'next/image';
import { ExternalLink, Award } from 'lucide-react';
import type { Certificate } from '@/lib/supabase';

interface Props {
  items: Certificate[];
}

export default function CertificatesSection({ items }: Props) {
  return (
    <section id="certificates" className="relative py-24 bg-near-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wine/40 to-transparent" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-wine/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end gap-6 mb-12">
          <div>
            <p className="text-rose/60 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              04 — Certificates
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl text-blush leading-none">
              MY CREDENTIALS
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-wine/40 to-transparent mb-3" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <Award size={48} className="text-wine/30 mx-auto mb-4" />
            <div className="font-bebas text-4xl text-wine/30 mb-4">NO CERTIFICATES YET</div>
            <p className="text-blush/40 text-sm">Add certificates via the admin panel</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((cert) => (
              <div
                key={cert.id}
                className="premium-card group bg-deep-wine/20 border border-wine/20 rounded-2xl overflow-hidden hover:border-wine/50"
              >
                {/* Certificate Image */}
                <div className="relative aspect-[4/3] bg-near-black overflow-hidden">
                  {cert.image_url ? (
                    <Image
                      src={cert.image_url}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wine/20 to-deep-wine/40">
                      <Award size={40} className="text-wine/50" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bebas text-lg text-blush leading-tight tracking-wide">
                        {cert.title}
                      </h3>
                      <p className="text-rose/70 text-xs tracking-wide mt-1">{cert.issuer}</p>
                      <p className="text-blush/40 text-xs mt-1">{cert.date}</p>
                    </div>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-wine/30 flex items-center justify-center text-blush/40 hover:text-rose hover:border-rose transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
