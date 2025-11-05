import React from 'react';
import { Palette, Star, Rocket, Sparkles } from 'lucide-react';

const items = [
  {
    icon: <Palette className="h-6 w-6 text-green-300" />,
    title: 'Holographic Aesthetics',
    desc: 'Liquid gradients and neon futurism blend into a cosmic palette curated for visual storytellers.'
  },
  {
    icon: <Rocket className="h-6 w-6 text-green-300" />,
    title: 'Kinetic Motion',
    desc: 'Smooth transitions and orbital motion tap into game-like feel without sacrificing elegance.'
  },
  {
    icon: <Star className="h-6 w-6 text-green-300" />,
    title: 'Stellar Details',
    desc: 'Subtle glows, soft noise, and crisp vectors tuned for high-contrast dark displays.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-green-300" />,
    title: 'Artist Friendly',
    desc: 'Built with designers in mind—clean layers, sensible spacing, and responsive rhythm.'
  }
];

export default function NeonGallery() {
  return (
    <section id="gallery" className="relative bg-black py-20 text-green-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Design-forward Features</h2>
          <p className="mt-3 text-green-300/75">Crafted for creatives who crave bold, immersive aesthetics.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((card, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent p-5 transition hover:border-green-400/40 hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-green-400/30 bg-black/50 p-3 shadow-inner">
                {card.icon}
              </div>
              <h3 className="text-lg font-medium text-green-100">{card.title}</h3>
              <p className="mt-2 text-sm text-green-300/80">{card.desc}</p>

              {/* Accent glow */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
