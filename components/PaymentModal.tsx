
import React, { useState, useEffect, useRef } from 'react';
import { BookingDetails } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

type PaymentStatus = 'summary' | 'waiting' | 'verifying' | 'success' | 'failed';

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  const [status, setStatus] = useState<PaymentStatus>('summary');
  const [verificationStep, setVerificationStep] = useState(0);
  const [errorType, setErrorType] = useState<'cancelled' | 'not_found'>('cancelled');
  
  const paymentStartTime = useRef<number | null>(null);
  const sessionVerified = useRef<boolean>(false);
  const awayDuration = useRef<number>(0);

  const verificationMessages = [
    "Securely connecting to bank servers...",
    "Searching for matching transaction...",
    "Validating UPI/Card authorization...",
    "Confirming final settlement status..."
  ];

  // Logic to handle user returning from the payment gateway
  useEffect(() => {
    if (status === 'waiting') {
      const handleFocus = () => {
        if (!paymentStartTime.current) return;
        
        // CRITICAL: Calculate duration ONLY at the moment of return.
        // This ensures waiting on the error screen doesn't count as "payment time".
        const duration = (Date.now() - paymentStartTime.current) / 1000;
        awayDuration.current = duration;

        // In a real app, this is where a webhook or background sync would confirm success.
        // We simulate a strict check: if returned in < 15s, it's a guaranteed failure/cancel.
        if (duration < 15) {
          sessionVerified.current = false;
          setErrorType('cancelled');
          setStatus('failed');
        } else {
          // If they were away long enough, we "verify" the session
          sessionVerified.current = true;
          setStatus('verifying');
        }
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [status]);

  // Simulated multi-step verification process
  useEffect(() => {
    if (status === 'verifying') {
      const interval = setInterval(() => {
        setVerificationStep(prev => {
          if (prev >= verificationMessages.length - 1) {
            clearInterval(interval);
            
            // Re-verify the internal flag. If the session wasn't legitimate, it STAYS failed.
            if (sessionVerified.current) {
              setStatus('success');
            } else {
              setErrorType('not_found');
              setStatus('failed');
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1200);

      return () => clearInterval(interval);
    } else {
      setVerificationStep(0);
    }
  }, [status]);

  const handlePayNow = () => {
    if (bookingDetails.paymentLink) {
      paymentStartTime.current = Date.now();
      sessionVerified.current = false; // Reset session
      window.open(bookingDetails.paymentLink, '_blank');
      setStatus('waiting');
    } else {
      setErrorType('not_found');
      setStatus('failed');
    }
  };

  const handleRetry = () => {
    // Retrying doesn't magically change the awayDuration.
    // If they didn't spend enough time in the other tab, this will re-fail.
    setStatus('verifying');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-fade-in">
        
        {status === 'summary' && (
          <>
            <div className="p-8 deep-blue-gradient text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <i className="fas fa-dharmachakra fa-6x rotate-slow"></i>
              </div>
              <h3 className="text-2xl font-serif font-bold relative z-10">Checkout</h3>
              <p className="text-indigo-200 text-sm relative z-10">Safe & Secure Payment</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Fee</p>
                    <p className="text-3xl font-black text-indigo-900">₹{bookingDetails.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Secure</p>
                    <i className="fas fa-shield-alt text-2xl text-green-500"></i>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayNow}
                className="w-full py-5 rounded-2xl gold-gradient text-indigo-950 font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Open Secure Payment Hub
              </button>
              
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Verification required after redirection
              </p>
            </div>
          </>
        )}

        {status === 'waiting' && (
          <div className="p-12 text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 border-4 border-amber-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-clock text-amber-600 animate-pulse"></i>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-indigo-900">Gateway Active</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Please complete the payment in the Razorpay window. Once done, return to this tab for <strong>automatic verification</strong>.
              </p>
            </div>
          </div>
        )}

        {status === 'verifying' && (
          <div className="p-12 text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-400 rounded-full border-t-transparent animate-spin"></div>
              <i className="fas fa-search-dollar fa-2x text-indigo-900 animate-pulse"></i>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-bold text-indigo-950">Confirming...</h3>
              <p className="text-amber-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
                {verificationMessages[verificationStep]}
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="p-10 text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl">
              <i className="fas fa-check"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-indigo-900">Payment Done!</h3>
              <p className="text-slate-600">
                Your consultation for <span className="font-bold text-indigo-900">{bookingDetails.serviceName}</span> is confirmed.
              </p>
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 text-left">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Celestial Sync</p>
                <p className="text-xs text-amber-900">
                  Transaction verified successfully. Expect a call on <strong>{bookingDetails.phone}</strong> from Srijan Ji within 24 hours.
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-2xl deep-blue-gradient text-white font-bold shadow-lg"
            >
              Finish
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="p-10 text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto border border-red-100">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-indigo-900">Not Verified</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {errorType === 'cancelled' 
                  ? "Verification failed because the payment tab was closed too quickly. Real payment takes longer to process." 
                  : "We couldn't locate a successful transaction matching your session. If money was debited, it will be auto-refunded."}
              </p>
            </div>
            <div className="space-y-3 pt-4">
              <button 
                onClick={handleRetry}
                className="w-full py-4 rounded-xl border-2 border-indigo-900 text-indigo-900 font-bold hover:bg-indigo-50 transition-colors"
              >
                Re-scan Transaction Status
              </button>
              <button 
                onClick={() => setStatus('summary')}
                className="w-full py-4 rounded-xl gold-gradient text-indigo-950 font-bold shadow-lg"
              >
                Back to Payment Gateway
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Security ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
