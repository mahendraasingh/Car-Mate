import React, { useState } from 'react';
import { colors } from '../theme/tokens';
import { ArrowRight, Info } from 'lucide-react';

export const ActionButtons: React.FC = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleActionClick = (buttonName: string) => {
    setFeedbackMessage(`${buttonName} placeholder: Authentication & onboarding will be enabled in the next phase.`);
    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: 'auto',
        paddingTop: '8px',
      }}
    >
      {/* Non-intrusive Placeholder Feedback Toast */}
      {feedbackMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: colors.pureWhite,
            border: `1px solid ${colors.softBorder}`,
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            color: colors.deepForest,
            boxShadow: '0 4px 12px rgba(23, 43, 42, 0.08)',
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
        >
          <Info size={16} color={colors.deepForest} />
          <span style={{ flex: 1, lineHeight: 1.3 }}>{feedbackMessage}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: colors.mutedGrey,
              fontSize: '14px',
              padding: '2px 4px',
            }}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Action Button: Get Started */}
      <button
        id="btn-get-started"
        type="button"
        onClick={() => handleActionClick('Get Started')}
        aria-label="Get Started with SAFAR"
        style={{
          width: '100%',
          height: '50px',
          minHeight: '48px',
          backgroundColor: colors.deepForest,
          color: colors.pureWhite,
          borderRadius: '14px',
          border: 'none',
          fontSize: '15px',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          letterSpacing: '0.3px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 3px 10px rgba(23, 43, 42, 0.16)',
          transition: 'transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        }}
      >
        <span>Get Started</span>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <ArrowRight size={14} color={colors.deepForest} strokeWidth={2.8} />
        </div>
      </button>

      {/* Authentication Buttons: Log In & Sign Up */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          width: '100%',
        }}
      >
        <button
          id="btn-login"
          type="button"
          onClick={() => handleActionClick('Log In')}
          aria-label="Log In"
          style={{
            height: '48px',
            minHeight: '44px',
            backgroundColor: colors.pureWhite,
            color: colors.deepForest,
            borderRadius: '12px',
            border: `1.5px solid ${colors.softBorder}`,
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Log In
        </button>

        <button
          id="btn-signup"
          type="button"
          onClick={() => handleActionClick('Sign Up')}
          aria-label="Sign Up"
          style={{
            height: '48px',
            minHeight: '44px',
            backgroundColor: colors.warmIvory,
            color: colors.deepForest,
            borderRadius: '12px',
            border: `1.5px solid ${colors.deepForest}`,
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
