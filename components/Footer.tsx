import React from 'react';
import { BRAND_NAME } from '../frontend/constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="deep-blue-gradient text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <a href="#home" className="flex flex-col">
              <span className="text-3xl font-bold font-serif">{BRAND_NAME}</span>
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-slate-400">Vedic Astrology</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              Serving the divine purpose of guiding souls from Chandigarh to the world. Your trusted partner for authentic Vedic wisdom.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/919915959360" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                <i className="fab fa-whatsapp"></i>
              </a>
              {['facebook-f', 'instagram', 'youtube'].map(icon => (
                <a 
                  key={icon} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-indigo-900 transition-all"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-amber-400">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Srijan Sharma</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Astrology Services</a></li>
              <li><a href="#consultation" className="hover:text-white transition-colors">Booking Options</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-amber-400">Our Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Kundali Analysis</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Marriage Matching</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Vastu Shastra</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Gemstone Remedies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8 text-amber-400">Contact Info</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-amber-400 mt-1"></i>
                <span>House No: 688, Sector -8B,<br/>Chandigarh, Pin -160009</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-amber-400"></i>
                <a href="tel:+919915959360" className="hover:text-white">9915959360</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-amber-400"></i>
                <a href="mailto:consult@astrosrijan.com" className="hover:text-white">consult@astrosrijan.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium text-center md:text-left">
          <div className="space-y-2">
            <p>© 2026 {BRAND_NAME.toLowerCase()}.com. All Rights Reserved.</p>
            <p className="text-slate-400">Digital Solutions by 4am Global Media</p>
          </div>
          <p>Srijan Sharma - 30+ Years of Vedic Experience</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};export default Footer;