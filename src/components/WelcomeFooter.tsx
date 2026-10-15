import React from 'react';
import { colors } from '../theme/tokens';
import { Heart, Compass } from 'lucide-react';

export const WelcomeFooter: React.FC = () => {
  const cities = ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune'];

  return (
    <footer
      style={{
        width: '100%',
        margin: '18px auto 0',
        padding: '16px 12px 20px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.softBorder}`,
        boxSizing: 'border-box',
      }}
      aria-label="Application Footer"
    >
      {/* City Network Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '12px',
        }}
      >
        {cities.map((city) => (
          <span
            key={city}
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.deepForest,
              backgroundColor: colors.pureWhite,
              border: `1px solid ${colors.softBorder}`,
              borderRadius: '9999px',
              padding: '3px 8px',
            }}
          >
            {city}
          </span>
        ))}
      </div>

      {/* Main Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 800,
          color: colors.deepForest,
          margin: '0 0 4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <span>Made for how India moves</span>
        <Heart size={13} color={colors.doodleCoral} fill={colors.doodleCoral} />
      </p>

      {/* Footnote */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '10px',
          fontWeight: 700,
          color: colors.mutedGrey,
          marginTop: '6px',
        }}
      >
        <Compass size={11} color={colors.deepForest} />
        <span>SAFAR APP v1.0 • ONBOARDING PREVIEW</span>
      </div>
    </footer>
  );
};
