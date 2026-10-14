import React from 'react';
import { colors } from '../theme/tokens';

export const WelcomeFooter: React.FC = () => {
  return (
    <footer
      style={{
        width: '100%',
        paddingTop: '16px',
        paddingBottom: '8px',
        textAlign: 'center',
        position: 'relative',
      }}
      aria-label="Application Footer"
    >
      {/* Hand-drawn route separator with center node */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <div style={{ height: '1px', flex: 1, backgroundColor: colors.softBorder, maxWidth: '60px' }} />
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            border: `1.5px solid ${colors.deepForest}`,
          }}
          aria-hidden="true"
        />
        <div style={{ height: '1px', flex: 1, backgroundColor: colors.softBorder, maxWidth: '60px' }} />
      </div>

      {/* Primary Supporting Line */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 700,
          color: colors.deepForest,
          letterSpacing: '0.3px',
          margin: 0,
        }}
      >
        Made for the way India moves.
      </p>

      {/* Discrete Edition Badge */}
      <span
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: colors.mutedGrey,
          display: 'block',
          marginTop: '3px',
          letterSpacing: '0.4px',
        }}
      >
        SAFAR MOBILITY © 2026 • PREVIEW EDITION
      </span>
    </footer>
  );
};
