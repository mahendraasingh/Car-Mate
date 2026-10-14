import React from 'react';
import { colors, shadows } from '../theme/tokens';
import { Sparkles } from 'lucide-react';

export const MainContent: React.FC = () => {
  return (
    <section
      aria-label="Welcome Story Introduction"
      style={{
        textAlign: 'center',
        padding: '24px 16px 12px',
        maxWidth: '860px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Editorial Chapter Tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: colors.pureWhite,
          border: `1.5px solid ${colors.deepForest}`,
          borderRadius: '9999px',
          padding: '6px 16px',
          marginBottom: '16px',
          boxShadow: shadows.doodleSticker,
        }}
      >
        <Sparkles size={14} color={colors.deepForest} />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 800,
            color: colors.deepForest,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}
        >
          CHAPTER 01 • THE EVERYDAY COMMUTE
        </span>
      </div>

      {/* Large-Scale Editorial Headline */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5.5vw, 54px)',
          fontWeight: 800,
          color: colors.deepForest,
          lineHeight: 1.1,
          letterSpacing: '-1.2px',
          margin: '0 auto 18px',
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
          {/* Hand-drawn bold highlight brush */}
          <svg
            viewBox="0 0 160 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '-4%',
              width: '108%',
              height: '14px',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <path
              d="M 4 10 C 45 3, 110 3, 156 8"
              stroke={colors.freshLime}
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h2>

      {/* Supporting Narrative Copy */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2.2vw, 20px)',
          fontWeight: 500,
          color: colors.mutedGrey,
          lineHeight: 1.6,
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        From quick auto rides to shared journeys and everyday cab trips, move through your city on your terms.
      </p>
    </section>
  );
};
