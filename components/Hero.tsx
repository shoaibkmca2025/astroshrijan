import React from 'react';
import { ASTROLOGER_IMAGE } from '../constants';

interface HeroProps {
  onBookNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden deep-blue-gradient text-white">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="stars-container"></div>
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-fade-in-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-200 text-xs font-bold tracking-widest uppercase">
            ESTD. 1994 • Authentic Vedic Lineage
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Consult the <span className="text-amber-400 italic">Vedic Master</span> Srijan Sharma
          </h1>
          <p className="text-xl text-indigo-100 max-w-xl leading-relaxed font-light">
            Bringing 30+ years of ancestral wisdom from Chandigarh to help you navigate life's challenges with celestial precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onBookNow}
              className="px-10 py-5 rounded-2xl gold-gradient text-indigo-950 font-bold shadow-[0_10px_40px_rgba(255,174,0,0.3)] hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <i className="fas fa-dharmachakra mr-2 group-hover:rotate-180 transition-transform duration-1000"></i> 
              Book Personal Consultation
            </button>
            <button 
              onClick={scrollToServices}
              className="px-10 py-5 rounded-2xl border-2 border-white/20 backdrop-blur-md text-white font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center outline-none cursor-pointer"
            >
              Explore Services
            </button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end animate-fade-in-right">
          <div className="relative w-full max-w-lg lg:max-w-xl">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-amber-400/20 rounded-full blur-[120px] animate-pulse"></div>
            
            <div className="relative z-20 group">
              <div className="absolute -inset-1 gold-gradient rounded-[40px] opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-[40px] overflow-hidden border-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] float-animation bg-slate-800 aspect-[4/5] flex items-center justify-center">
                <img 
                  src={ASTROLOGER_IMAGE} 
                  alt="Srijan Sharma Photo"
                  loading="eager"
                  className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
