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
      }}
      aria-label="Application Footer"
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          color: colors.mutedGrey,
          letterSpacing: '0.2px',
          margin: 0,
        }}
      >
        Made for the way India moves.
      </p>
    </footer>
  );
};
