import React from 'react';
import { SERVICES } from '../frontend/constants';

interface ServicesProps {
  onBook: (id: string, name: string, price: number) => void;
}

const Services: React.FC<ServicesProps> = ({ onBook }) => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl text-indigo-900 font-serif">Celestial Services</h2>
          <p className="text-slate-600">Comprehensive Vedic solutions tailored for every aspect of your life journey.</p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
              <div className="p-8 space-y-6 flex-grow">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-indigo-900 mb-2">{service.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                      <i className="fas fa-check-circle text-amber-500 text-xs"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0 mt-auto">
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="text-2xl font-bold text-indigo-900">₹{service.price}</div>
                  <button 
                    onClick={() => onBook(service.id, service.name, service.price)}
                    className="px-6 py-2.5 rounded-xl deep-blue-gradient text-white font-bold text-sm shadow-lg hover:shadow-indigo-200 transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;