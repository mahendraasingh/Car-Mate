import React from 'react';
import { colors } from '../theme/tokens';

export const BrandHeader: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.softBorder}`,
        backgroundColor: colors.warmIvory,
      }}
      aria-label="Application Header"
    >
      {/* Brand Monogram + Name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: colors.deepForest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(23, 43, 42, 0.12)',
          }}
          aria-hidden="true"
        >
          {/* Minimal mobility symbol: geometric route-marker & dynamic wheel */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.freshLime}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" fill={colors.freshLime} />
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
          </svg>
        </div>

        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: colors.deepForest,
              lineHeight: 1,
              margin: 0,
            }}
          >
            SAFAR
          </h1>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.8px',
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '3px',
            }}
          >
            Mobility
          </span>
        </div>
      </div>

      {/* Country & Network Indicator */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '9999px',
          backgroundColor: colors.pureWhite,
          border: `1px solid ${colors.softBorder}`,
          fontSize: '11px',
          fontWeight: 600,
          color: colors.deepForest,
          letterSpacing: '0.4px',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            border: `1.5px solid ${colors.deepForest}`,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
        <span>INDIA</span>
      </div>
    </header>
  );
};
