import React, { useState } from 'react';
import { BRAND_NAME } from '../constants';

interface HeaderProps {
  scrolled: boolean;
  onBookNow: () => void;
}

// Completed the Header component and added default export to fix "Module has no default export" error.
const Header: React.FC<HeaderProps> = ({ scrolled, onBookNow }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Consultation', href: 'consultation' },
    { name: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'glass-effect py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col text-left focus:outline-none cursor-pointer"
        >
          <span className={`text-2xl font-bold font-serif transition-colors duration-300 ${scrolled ? 'text-indigo-900' : 'text-white'}`}>
            {BRAND_NAME}
          </span>
          <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${scrolled ? 'text-slate-500' : 'text-slate-300'}`}>
            Vedic Astrology
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-semibold text-sm hover:text-amber-500 transition-colors cursor-pointer ${scrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onBookNow(); }}
              className="px-6 py-2.5 rounded-lg bg-amber-400 text-indigo-900 font-bold text-sm shadow-lg hover:bg-amber-300 transition-all hover:-translate-y-1 cursor-pointer active:scale-95"
            >
              Book Now
            </button>
          </div>
        </nav>

        <div className="lg:hidden flex items-center gap-4">
          <button 
            type="button"
            className="text-2xl focus:outline-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} ${scrolled ? 'text-indigo-900' : 'text-white'}`}></i>
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-white z-[110] transition-transform duration-500 lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <button 
            type="button"
            className="absolute top-6 right-6 text-3xl text-indigo-900 focus:outline-none cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
          
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.href}`} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-serif font-bold text-indigo-950 hover:text-amber-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            type="button"
            onClick={() => { setMobileOpen(false); onBookNow(); }}
            className="mt-4 px-10 py-4 rounded-2xl gold-gradient text-indigo-950 font-bold shadow-xl hover:scale-105 transition-all cursor-pointer active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;