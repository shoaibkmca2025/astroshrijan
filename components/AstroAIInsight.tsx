
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AstroAIInsight: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAIInsight = async () => {
    // Check localStorage first for immediate display
    const cached = localStorage.getItem('astro_daily_insight');
    if (cached) {
      setInsight(cached);
    }

    // If offline, we stop here
    if (!navigator.onLine) {
      if (!cached) {
        setInsight('Embrace peace and patience; the cosmos is working in your favor today.');
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Direct initialization as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'Provide a very brief (max 20 words), deeply spiritual, and uplifting Vedic astrology tip for today. Start with "Srijan Ji says: "',
        config: {
          temperature: 0.8,
          maxOutputTokens: 100,
          thinkingConfig: { thinkingBudget: 0 }
        },
      });
      
      const text = response.text || 'The stars align for your prosperity. Stay grounded today.';
      setInsight(text);
      localStorage.setItem('astro_daily_insight', text);
    } catch (error) {
      console.error('Insight fetch error:', error);
      // Fail silently if we already have a cached version
      if (!insight) {
        setInsight('Embrace the divine flow of the universe; clarity comes to the patient mind.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsight();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-30">
      <div className="glass-effect p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col md:flex-row items-center gap-8 group">
        <div className="w-20 h-20 rounded-full gold-gradient flex-shrink-0 flex items-center justify-center text-3xl text-indigo-900 shadow-xl group-hover:rotate-12 transition-transform duration-500">
          <i className="fas fa-sparkles"></i>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
            <span className={`w-2 h-2 rounded-full ${navigator.onLine ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`}></span>
            Daily Divine Insight {!navigator.onLine && '(Offline)'}
          </h4>
          {loading && !insight ? (
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-slate-100 animate-pulse rounded mx-auto md:mx-0"></div>
              <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded mx-auto md:mx-0"></div>
            </div>
          ) : (
            <p className="text-lg md:text-xl font-serif text-indigo-950 leading-relaxed italic animate-fade-in">
              {insight}
            </p>
          )}
        </div>
        <button 
          onClick={fetchAIInsight}
          disabled={loading || !navigator.onLine}
          className={`text-slate-400 p-3 rounded-full hover:bg-amber-50 transition-all ${(!navigator.onLine) ? 'opacity-30 cursor-not-allowed' : 'hover:text-amber-500'}`}
          title={navigator.onLine ? "Refresh Insight" : "Connect to internet to refresh"}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
        </button>
      </div>
    </div>
  );
};

export default AstroAIInsight;
