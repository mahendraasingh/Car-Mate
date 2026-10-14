import React from 'react';
import { colors } from '../theme/tokens';
import { BrandHeader } from './BrandHeader';
import { HeroVisual } from './HeroVisual';
import { MainContent } from './MainContent';
import { MobilityCards } from './MobilityCards';
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

      {/* Main Screen Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '14px 18px 18px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Mixed-Media Hero Scene */}
        <div className="animate-entrance delay-1" style={{ width: '100%', marginBottom: '14px' }}>
          <HeroVisual />
        </div>

        {/* Editorial Headline & Supporting Copy */}
        <div className="animate-entrance delay-2" style={{ width: '100%', marginBottom: '6px' }}>
          <MainContent />
        </div>

        {/* Interactive Mobility Category Cards */}
        <div className="animate-entrance delay-3" style={{ width: '100%' }}>
          <MobilityCards />
        </div>

        {/* Primary and Authentication Actions */}
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
