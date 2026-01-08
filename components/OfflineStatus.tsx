
import React, { useState, useEffect } from 'react';

const OfflineStatus: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[400] animate-bounce">
      <div className="bg-red-600 text-white px-6 py-2 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white">
        <i className="fas fa-wifi-slash"></i>
        <span className="text-xs font-bold uppercase tracking-widest">You are currently offline</span>
      </div>
    </div>
  );
};

export default OfflineStatus;
