import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-green-500/10 bg-black py-10 text-green-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-green-300/80">
          © {new Date().getFullYear()} Neon Space. Crafted for art & design lovers.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#play" className="hover:text-green-100">Play</a>
          <a href="#gallery" className="hover:text-green-100">Gallery</a>
          <a
            href="https://spline.design/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-green-400/30 px-3 py-1.5 hover:border-green-400/50 hover:text-green-100"
          >
            Built with Spline
          </a>
        </div>
      </div>
    </footer>
  );
}
