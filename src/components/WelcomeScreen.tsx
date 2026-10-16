import React from 'react';
import { colors } from '../theme/tokens';
import { BrandHeader } from './BrandHeader';
import { TransitTicker } from './TransitTicker';
import { HeroVisual } from './HeroVisual';
import { MainContent } from './MainContent';
import { MobilityCards } from './MobilityCards';
import { ActionButtons } from './ActionButtons';
import { WelcomeFooter } from './WelcomeFooter';

interface WelcomeScreenProps {
  onEnterPassengerApp?: () => void;
  onEnterDriverApp?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnterPassengerApp,
  onEnterDriverApp,
}) => {
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
      {/* Mobile App Header with City Selector */}
      <BrandHeader />

      {/* Live Urban Transit Ticker */}
      <TransitTicker />

      {/* Front-Loading Mobile App Screen Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '14px 12px 20px',
          boxSizing: 'border-box',
          gap: '14px',
        }}
      >
        {/* Mobile Mixed-Media Hero Scene */}
        <section aria-label="Urban Mobility Scene" className="animate-entrance delay-1" style={{ width: '100%' }}>
          <HeroVisual />
        </section>

        {/* Narrative Headline & Micro-Copy */}
        <section aria-label="Brand Narrative" className="animate-entrance delay-2" style={{ width: '100%' }}>
          <MainContent />
        </section>

        {/* Interactive Mobility Category Selector */}
        <section aria-label="Mobility Modes" className="animate-entrance delay-3" style={{ width: '100%' }}>
          <MobilityCards />
        </section>

        {/* Action Button & Fast Login */}
        <section aria-label="Start Your Journey" className="animate-entrance delay-4" style={{ width: '100%' }}>
          <ActionButtons onEnterApp={onEnterPassengerApp} onEnterDriverApp={onEnterDriverApp} />
        </section>

        {/* Mobile Footer & City Coverage */}
        <div className="animate-entrance delay-5" style={{ width: '100%' }}>
          <WelcomeFooter />
        </div>
      </main>
    </div>
  );
};
