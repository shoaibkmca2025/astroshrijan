
import React, { useState } from 'react';
import { BookingDetails } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'pay' | 'success'>('pay');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay for a professional feel
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-fade-in">
        
        {step === 'pay' ? (
          <>
            <div className="p-8 deep-blue-gradient text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <i className="fas fa-dharmachakra text-8xl"></i>
              </div>
              <h3 className="text-2xl font-serif font-bold relative z-10">Secure Payment</h3>
              <p className="text-indigo-200 text-sm relative z-10">Total Amount: ₹{bookingDetails.price}</p>
            </div>
            
            <form onSubmit={handlePay} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                  <span className="text-sm font-bold text-slate-600">Consultation Fee</span>
                  <span className="text-xl font-bold text-indigo-900">₹{bookingDetails.price}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Card Details</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 outline-none transition-all placeholder:text-slate-300"
                      />
                      <i className="fas fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <input 
                        required
                        type="text" 
                        placeholder="MM / YY"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <input 
                        required
                        type="password" 
                        placeholder="CVV"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                disabled={isProcessing}
                type="submit"
                className={`w-full py-4 rounded-2xl gold-gradient text-indigo-950 font-bold text-lg shadow-[0_10px_30px_rgba(255,174,0,0.3)] flex items-center justify-center gap-3 transition-all ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(255,174,0,0.4)]'}`}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    Securing Transaction...
                  </>
                ) : (
                  <>
                    <i className="fas fa-shield-check"></i>
                    Pay ₹{bookingDetails.price}
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-30" />
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Encrypted via SSL</div>
              </div>
            </form>
          </>
        ) : (
          <div className="p-10 text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-xl relative z-10">
                <i className="fas fa-check"></i>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-serif font-bold text-indigo-950">Dhanyawaad!</h3>
              <p className="text-slate-500 leading-relaxed">
                Your consultation for <span className="font-bold text-indigo-900">{bookingDetails.serviceName}</span> is now confirmed.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-left space-y-2">
              <p className="text-[10px] text-amber-600 uppercase font-black tracking-widest">Next Steps</p>
              <p className="text-sm text-amber-900 leading-relaxed">Srijan Ji will analyze your chart personally. Expect a detailed email or call at <span className="font-bold">{bookingDetails.phone}</span> within 24 hours.</p>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-2xl deep-blue-gradient text-white font-bold shadow-lg hover:shadow-indigo-200 transition-all"
            >
              Return to AstroSrijan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
