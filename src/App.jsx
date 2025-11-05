import React from 'react';
import Hero from './components/Hero';
import NeonGallery from './components/NeonGallery';
import MiniGame from './components/MiniGame';
import SiteFooter from './components/SiteFooter';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-200">
      <Hero />
      <NeonGallery />
      <MiniGame />
      <SiteFooter />
    </div>
  );
}

export default App;
