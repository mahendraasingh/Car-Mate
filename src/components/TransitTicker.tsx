import React from 'react';
import { colors } from '../theme/tokens';
import { ShieldCheck, Zap, Users, MapPin, Sparkles } from 'lucide-react';

export const TransitTicker: React.FC = () => {
  const tickerItems = [
    { text: 'ZERO SURGE ON AUTOS', icon: <Zap size={12} color={colors.deepForest} /> },
    { text: 'SAVE UP TO 40% ON POOLING', icon: <Users size={12} color={colors.deepForest} /> },
    { text: '100% VERIFIED CAPTAINS', icon: <ShieldCheck size={12} color={colors.deepForest} /> },
    { text: 'LIVE IN 8 METRO CITIES', icon: <MapPin size={12} color={colors.deepForest} /> },
    { text: 'CLEAN AC CITY CABS', icon: <Sparkles size={12} color={colors.deepForest} /> },
  ];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.freshLime,
        borderTop: `1.5px solid ${colors.deepForest}`,
        borderBottom: `1.5px solid ${colors.deepForest}`,
        padding: '6px 0',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-label="Live Transit Highlights"
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          width: 'max-content',
          animation: 'tickerMarquee 24s linear infinite',
        }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.4px',
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
