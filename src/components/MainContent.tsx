import React from 'react';
import { colors } from '../theme/tokens';

export const MainContent: React.FC = () => {
  return (
    <section
      aria-label="Welcome Introduction"
      style={{
        textAlign: 'center',
        padding: '8px 4px 4px',
        position: 'relative',
      }}
    >
      {/* Editorial Headline with Deliberate Hierarchy */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 7vw, 34px)',
          fontWeight: 800,
          color: colors.deepForest,
          lineHeight: 1.15,
          letterSpacing: '-0.8px',
          margin: '0 auto 12px',
          maxWidth: '380px',
        }}
      >
        Your City.{' '}
        <span style={{ color: colors.deepForest }}>Your Ride.</span>{' '}
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            zIndex: 1,
          }}
        >
          Your Way.
          {/* Hand-drawn style highlight underline */}
          <svg
            viewBox="0 0 140 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '-2%',
              width: '104%',
              height: '8px',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <path
              d="M 2 8 C 35 2, 90 2, 138 6"
              stroke={colors.freshLime}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h2>

      {/* Supporting Copy */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 3.8vw, 15px)',
          fontWeight: 400,
          color: colors.mutedGrey,
          lineHeight: 1.55,
          maxWidth: '360px',
          margin: '0 auto',
        }}
      >
        From quick auto rides to shared journeys and everyday cab trips, move through your city on your terms.
      </p>
    </section>
  );
};
