import React from 'react';
import { colors } from '../theme/tokens';
import { Sparkles } from 'lucide-react';

export const MainContent: React.FC = () => {
  return (
    <section
      aria-label="Welcome Story Introduction"
      style={{
        textAlign: 'center',
        padding: '12px 6px 4px',
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Chapter Micro-Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: colors.pureWhite,
          border: `1.5px solid ${colors.deepForest}`,
          borderRadius: '9999px',
          padding: '4px 12px',
          marginBottom: '10px',
          boxShadow: '1px 2px 0px #172B2A',
        }}
      >
        <Sparkles size={12} color={colors.deepForest} />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            fontWeight: 800,
            color: colors.deepForest,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
          }}
        >
          CHAPTER 01 • WELCOME TO SAFAR
        </span>
      </div>

      {/* Mobile Punchy Editorial Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 800,
          color: colors.deepForest,
          lineHeight: 1.15,
          letterSpacing: '-0.8px',
          margin: '0 auto 8px',
        }}
      >
        Your City.{' '}
        <span>Your Ride.</span>{' '}
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
            viewBox="0 0 140 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '-2%',
              width: '104%',
              height: '10px',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <path
              d="M 4 8 C 45 3, 95 3, 136 7"
              stroke={colors.freshLime}
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      {/* Supporting Mobile Narrative Copy */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 500,
          color: colors.mutedGrey,
          lineHeight: 1.5,
          margin: '0 auto',
          padding: '0 8px',
        }}
      >
        India's urban mobility app for instant autos, shared pooling, and clean city cabs with zero surprise surges.
      </p>
    </section>
  );
};
