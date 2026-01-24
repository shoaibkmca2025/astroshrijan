import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl text-indigo-900 font-serif">Echoes of Enlightenment</h2>
          <p className="text-slate-600">Heartfelt words from those whose paths were cleared by Vedic guidance.</p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 relative group transition-all hover:shadow-xl">
              <div className="absolute top-8 right-10 text-6xl text-slate-200 font-serif leading-none group-hover:text-amber-100 transition-colors">"</div>
              <p className="text-slate-700 italic text-lg leading-relaxed relative z-10 mb-10">
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full deep-blue-gradient text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900">{t.author}</h4>
                  <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;