
import React, { useState, useEffect } from 'react';
import { BookingDetails } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Partial<BookingDetails>;
  onSubmit: (details: BookingDetails) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [form, setForm] = useState<BookingDetails>({
    serviceId: initialData.serviceId || '',
    serviceName: initialData.serviceName || '',
    price: initialData.price || 0,
    paymentLink: initialData.paymentLink || '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    timeOfBirth: '',
    placeOfBirth: '',
    questions: '',
  });

  useEffect(() => {
    if (initialData.serviceId) {
      setForm(prev => ({ 
        ...prev, 
        serviceId: initialData.serviceId!,
        serviceName: initialData.serviceName!,
        price: initialData.price!,
        paymentLink: initialData.paymentLink || ''
      }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-8 deep-blue-gradient text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif font-bold">Book Consultation</h3>
            <p className="text-indigo-200 text-sm">Service: {form.serviceName}</p>
          </div>
          <button onClick={onClose} className="text-2xl hover:text-amber-400 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Full Name *</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Email Address *</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Phone Number *</label>
              <input 
                required
                type="tel" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. +91 98881..."
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Date of Birth *</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={form.dob}
                onChange={e => setForm({...form, dob: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Time of Birth</label>
              <input 
                type="time" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={form.timeOfBirth}
                onChange={e => setForm({...form, timeOfBirth: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-indigo-900">Place of Birth</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="City, State, Country"
                value={form.placeOfBirth}
                onChange={e => setForm({...form, placeOfBirth: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-indigo-900">Your Questions (Optional)</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="What would you like to know?"
              value={form.questions}
              onChange={e => setForm({...form, questions: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 rounded-2xl gold-gradient text-indigo-900 font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              Proceed to Payment <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
