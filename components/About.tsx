import React from 'react';
import { ASTROLOGER_IMAGE } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-4 border-slate-50 group bg-slate-950 min-h-[500px] flex items-center justify-center">
              <img 
                src={ASTROLOGER_IMAGE}
                alt="Srijan Sharma Photo"
                className="w-full h-auto max-h-[800px] aspect-[4/5] object-cover object-center hover:scale-105 transition-transform duration-1000 block"
              />
            </div>
          </div>

          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6">
              <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs">A Lifetime of Devotion</span>
              <h2 className="text-5xl text-indigo-950 font-serif leading-tight">Wisdom Carved in <br/>Ancient Stars</h2>
              <div className="w-24 h-2 gold-gradient rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                <strong>Srijan Sharma</strong> is more than an astrologer; he is a bridge to the divine science of the Vedas. With 30 years of experience, he deciphers the celestial map of your life to provide clarity where there is confusion.
              </p>
              
              <p className="font-medium text-indigo-900 border-l-4 border-amber-500 pl-6 italic bg-amber-50/50 py-6 rounded-r-3xl shadow-sm">
                "My practice is rooted in the Parashari and Siddhantic systems, ensuring that every remedy I suggest is tailored to the unique vibration of your soul."
              </p>

              <p>
                Whether it is Career, Marriage, or Personal Growth, Srijan Sharma's approach blends deep meditation with mathematical precision to bring you the results you seek.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
