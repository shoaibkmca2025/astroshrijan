
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Consultation from './components/Consultation';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import PaymentModal from './components/PaymentModal';
import AstroAIInsight from './components/AstroAIInsight';
import ChatWidget from './components/ChatWidget';
import OfflineStatus from './components/OfflineStatus';
import { BookingDetails, ModalType } from './types';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingDetails>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = (serviceId: string, serviceName: string, price: number) => {
    setBookingData({ serviceId, serviceName, price });
    setActiveModal('booking');
  };

  const handleBookingSubmit = (details: BookingDetails) => {
    setBookingData(details);
    setActiveModal('payment');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen selection:bg-amber-200 selection:text-indigo-900">
      <Header scrolled={scrolled} onBookNow={() => openBooking('general', 'General Consultation', 2100)} />
      
      <main>
        <Hero onBookNow={() => openBooking('general', 'General Consultation', 2100)} />
        <AstroAIInsight />
        <About />
        <Services onBook={openBooking} />
        <Consultation onBook={openBooking} />
        <Testimonials />
      </main>

      <Footer />

      {activeModal === 'booking' && (
        <BookingModal 
          isOpen={true} 
          onClose={closeModal} 
          initialData={bookingData} 
          onSubmit={handleBookingSubmit}
        />
      )}

      {activeModal === 'payment' && (
        <PaymentModal 
          isOpen={true} 
          onClose={closeModal} 
          bookingDetails={bookingData as BookingDetails}
        />
      )}
      
      {/* Offline Notification */}
      <OfflineStatus />
      
      {/* Live Chat Widget */}
      <ChatWidget />

      {/* Attractive Automation: Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-28 w-12 h-12 rounded-xl bg-white text-indigo-900 border border-slate-200 shadow-xl transition-all duration-500 transform ${scrolled ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-50 pointer-events-none'} flex items-center justify-center hover:scale-110 active:scale-95 z-50 group`}
      >
        <i className="fas fa-chevron-up group-hover:-translate-y-1 transition-transform"></i>
      </button>
    </div>
  );
};

export default App;
