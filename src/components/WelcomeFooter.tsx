import React from 'react';
import { colors } from '../theme/tokens';
import { Heart, Compass } from 'lucide-react';

export const WelcomeFooter: React.FC = () => {
  const cities = ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Chennai'];

  return (
    <footer
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '32px auto 0',
        padding: '24px 20px 32px',
        textAlign: 'center',
        borderTop: `1px solid ${colors.softBorder}`,
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
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {cities.map((city) => (
          <span
            key={city}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: colors.deepForest,
              backgroundColor: colors.pureWhite,
              border: `1px solid ${colors.softBorder}`,
              borderRadius: '9999px',
              padding: '4px 12px',
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
          fontSize: '16px',
          fontWeight: 800,
          color: colors.deepForest,
          letterSpacing: '0.3px',
          margin: '0 0 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span>Made for the way India moves.</span>
        <Heart size={15} color={colors.doodleCoral} fill={colors.doodleCoral} />
      </p>

      {/* Footnote */}
      <p
        style={{
          fontSize: '12px',
          color: colors.mutedGrey,
          margin: '0 0 12px',
        }}
      >
        SAFAR is a registered commercial urban transit platform designed for Indian metros and smart commuters.
      </p>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontWeight: 700,
          color: colors.mutedGrey,
        }}
      >
        <Compass size={13} color={colors.deepForest} />
        <span>SAFAR MOBILITY © 2026 • ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
};
