import React from 'react';
import { colors } from '../theme/tokens';
import { ShieldCheck, Zap, Users, MapPin, Sparkles } from 'lucide-react';

export const TransitTicker: React.FC = () => {
  const tickerItems = [
    { text: 'ZERO SURGE ON DIRECT AUTOS', icon: <Zap size={14} color={colors.deepForest} /> },
    { text: 'SAVE UP TO 40% ON SMART POOLING', icon: <Users size={14} color={colors.deepForest} /> },
    { text: '100% VERIFIED DRIVERS & CAPTAINS', icon: <ShieldCheck size={14} color={colors.deepForest} /> },
    { text: 'LIVE IN DELHI NCR, BENGALURU, MUMBAI', icon: <MapPin size={14} color={colors.deepForest} /> },
    { text: 'SHARED JOURNEYS FOR A GREENER INDIA', icon: <Sparkles size={14} color={colors.deepForest} /> },
  ];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.freshLime,
        borderTop: `2px solid ${colors.deepForest}`,
        borderBottom: `2px solid ${colors.deepForest}`,
        padding: '10px 0',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
      }}
      aria-label="Live Transit Highlights"
    >
      <div
        style={{
          display: 'flex',
          gap: '32px',
          width: 'max-content',
          animation: 'tickerMarquee 28s linear infinite',
        }}
      >
        {/* Double array for seamless endless marquee */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.6px',
            }}
          >
            {item.icon}
            <span>{item.text}</span>
            <span style={{ opacity: 0.4 }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
