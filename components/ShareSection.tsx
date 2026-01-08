
import React, { useState } from 'react';

const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const siteUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { 
      name: 'WhatsApp', 
      icon: 'fa-whatsapp', 
      color: 'bg-green-500', 
      url: `https://wa.me/?text=Check out AstroSrijan, premium Vedic Astrology services by Pandit Srijan Sharma: ${siteUrl}` 
    },
    { 
      name: 'Twitter', 
      icon: 'fa-x-twitter', 
      color: 'bg-black', 
      url: `https://twitter.com/intent/tweet?text=Consult the Vedic Master Srijan Sharma for divine guidance.&url=${siteUrl}` 
    },
    { 
      name: 'Facebook', 
      icon: 'fa-facebook-f', 
      color: 'bg-blue-600', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}` 
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden deep-blue-gradient text-white">
      {/* Background Star Effect */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="stars-container"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <i className="fas fa-paper-plane animate-bounce"></i> Share the Enlightenment
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Spread the <span className="text-amber-400">Divine Wisdom</span>
            </h2>
            <p className="text-indigo-100/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Know someone seeking clarity? Share this path with your friends and family to help them navigate their life's journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl">
            {/* Direct Copy Section */}
            <div className="space-y-6 text-left">
              <h4 className="text-xl font-serif font-bold text-amber-400">Quick Copy Link</h4>
              <div className="relative group">
                <input 
                  type="text" 
                  readOnly 
                  value={siteUrl}
                  className="w-full bg-indigo-950/50 border border-white/10 rounded-2xl px-6 py-4 text-sm text-indigo-200 outline-none pr-32 focus:border-amber-400/50 transition-all"
                />
                <button 
                  onClick={handleCopy}
                  className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'gold-gradient text-indigo-950 hover:scale-105'}`}
                >
                  <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Social Icons Section */}
            <div className="space-y-6">
              <h4 className="text-xl font-serif font-bold text-indigo-200">Instant Share</h4>
              <div className="flex justify-center md:justify-start gap-4">
                {shareLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg hover:-translate-y-2 transition-all hover:shadow-2xl hover:brightness-110`}
                    title={`Share on ${link.name}`}
                  >
                    <i className={`fab ${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 text-indigo-200/50 text-xs italic">
            "By helping others find their way, you illuminate your own path."
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
