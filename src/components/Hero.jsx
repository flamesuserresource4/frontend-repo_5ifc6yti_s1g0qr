import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-green-300">
      {/* Three.js interactive background */}
      <ThreeBackground />

      {/* Subtle neon gradient overlays for depth (don't block interaction) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-black/40 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-green-400" />
          <span className="text-xs uppercase tracking-widest text-green-200/70">Interactive 3D Experience</span>
        </div>
        <h1 className="text-balance font-['IBM_Plex_Sans'] text-4xl font-semibold leading-tight text-green-200 drop-shadow-[0_0_12px_rgba(34,197,94,0.35)] sm:text-6xl">
          Neon Cube Constellation
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-green-300/80 sm:text-lg">
          A responsive 3D hero: a futuristic cube surrounded by iridescent spheres. Move your cursor and the
          background responds in kind.
        </p>

        {/* Spline main object */}
        <div className="mt-10 w-full max-w-5xl">
          <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-3xl border border-green-500/20 bg-black/50 shadow-[0_0_50px_rgba(34,197,94,0.18)]">
            <Spline
              scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-green-400/10" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#play"
            className="group inline-flex items-center gap-2 rounded-full border border-green-400/60 bg-green-500/10 px-5 py-3 text-sm font-medium text-green-200 transition hover:bg-green-500/20 hover:shadow-[0_0_24px_rgba(34,197,94,0.35)]"
          >
            <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
            Start Playing
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full border border-green-400/30 px-5 py-3 text-sm font-medium text-green-200/80 hover:text-green-200"
          >
            Explore Visuals
          </a>
        </div>
      </div>
    </section>
  );
}
