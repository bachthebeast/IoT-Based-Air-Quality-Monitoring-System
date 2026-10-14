'use client';

import { useEffect, useState } from 'react';

interface WarningPopupProps {
  temperature: number;
  pm2_5: number;
}

export default function WarningPopup({ temperature, pm2_5 }: WarningPopupProps) {
  const [showTempWarning, setShowTempWarning] = useState(false);
  const [showpm2_5Warning, setShowpm2_5Warning] = useState(false);

  useEffect(() => {
    setShowTempWarning(temperature > 40);
  }, [temperature]);

  useEffect(() => {
    setShowpm2_5Warning(pm2_5 > 100);
  }, [pm2_5]);

  if (!showTempWarning && !showpm2_5Warning) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-red-600 mb-4">Warning!</h2>
        <div className="space-y-2">
          {showTempWarning && (
            <p className="text-red-500">
              Temperature is too high: {temperature}°C (Threshold: 40°C)
            </p>
          )}
          {showpm2_5Warning && (
            <p className="text-red-500">
              PM2.5 is too high: {pm2_5} µg/m³ (Threshold: 100 µg/m³)
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setShowTempWarning(false);
            setShowpm2_5Warning(false);
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
