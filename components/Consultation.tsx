import React from 'react';
import { CONSULTATIONS } from '../frontend/constants';

interface ConsultationProps {
  onBook: (id: string, name: string, price: number) => void;
}

const Consultation: React.FC<ConsultationProps> = ({ onBook }) => {
  return (
    <section id="consultation" className="py-24 bg-indigo-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl text-white font-serif">Booking Options</h2>
          <p className="text-indigo-200">Choose the format that fits your curiosity and urgency.</p>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CONSULTATIONS.map((item) => (
            <div key={item.id} className="bg-indigo-800/40 backdrop-blur-md rounded-3xl p-8 border border-indigo-700/50 flex flex-col items-center text-center transition-all hover:bg-indigo-800/60 hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-3xl text-indigo-900 mb-6 shadow-xl">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
              <p className="text-indigo-200 mb-6 text-sm">{item.description}</p>
              
              <div className="mt-auto space-y-6 w-full">
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-amber-400">₹{item.price}</div>
                  <div className="text-indigo-300 text-xs uppercase tracking-widest font-bold">{item.duration}</div>
                </div>
                <button 
                  onClick={() => onBook(item.id, item.title, item.price)}
                  className="w-full py-4 rounded-xl bg-white text-indigo-900 font-bold hover:bg-amber-400 transition-colors shadow-xl"
                >
                  Confirm Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Consultation;