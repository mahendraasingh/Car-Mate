import React from 'react';
import { colors } from '../theme/tokens';
import { BrandHeader } from './BrandHeader';
import { HeroIllustration } from './HeroIllustration';
import { MobilityBadges } from './MobilityBadges';
import { ActionButtons } from './ActionButtons';
import { WelcomeFooter } from './WelcomeFooter';

export const WelcomeScreen: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
        backgroundColor: colors.warmIvory,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand Header */}
      <BrandHeader />

      {/* Scrollable / Flexible Main Screen Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px 20px',
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Hero Transportation Illustration */}
        <section
          aria-label="Illustration"
          className="animate-entrance delay-1"
          style={{ width: '100%', marginBottom: '12px' }}
        >
          <HeroIllustration />
        </section>

        {/* Main Content: Headline and Description */}
        <section
          aria-label="Welcome Information"
          className="animate-entrance delay-2"
          style={{
            textAlign: 'center',
            marginBottom: '4px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 6vw, 30px)',
              fontWeight: 800,
              color: colors.deepForest,
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              margin: '0 0 10px',
            }}
          >
            Your City. Your Ride. Your Way.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 3.8vw, 15px)',
              fontWeight: 400,
              color: colors.mutedGrey,
              lineHeight: 1.5,
              maxWidth: '380px',
              margin: '0 auto',
            }}
          >
            Book a cab, hop into an auto, or share your journey. Get where you need to go, your way.
          </p>
        </section>

        {/* Supporting Mobility Badges */}
        <div className="animate-entrance delay-3" style={{ width: '100%' }}>
          <MobilityBadges />
        </div>

        {/* Interactive Action Buttons */}
        <div className="animate-entrance delay-4" style={{ width: '100%', marginTop: 'auto' }}>
          <ActionButtons />
        </div>

        {/* Footer */}
        <div className="animate-entrance delay-5" style={{ width: '100%' }}>
          <WelcomeFooter />
        </div>
      </main>
    </div>
  );
};
