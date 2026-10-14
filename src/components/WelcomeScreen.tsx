import React from 'react';
import { colors } from '../theme/tokens';
import { BrandHeader } from './BrandHeader';
import { TransitTicker } from './TransitTicker';
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
        minHeight: '100vh',
        width: '100%',
        backgroundColor: colors.warmIvory,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Expansive Sticky Brand Header */}
      <BrandHeader />

      {/* Live Urban Transit Ticker Marquee */}
      <TransitTicker />

      {/* Front-Loading Storytelling Main View */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '28px 20px 40px',
          boxSizing: 'border-box',
          gap: '24px',
        }}
      >
        {/* Front-Loading Panoramic Mixed-Media Hero Scene */}
        <section aria-label="Urban Mobility Scene" className="animate-entrance delay-1" style={{ width: '100%' }}>
          <HeroVisual />
        </section>

        {/* Large-Scale Narrative Headline & Copy */}
        <section aria-label="Brand Narrative" className="animate-entrance delay-2" style={{ width: '100%' }}>
          <MainContent />
        </section>

        {/* Interactive Mobility Category Cards */}
        <section aria-label="Mobility Modes" className="animate-entrance delay-3" style={{ width: '100%' }}>
          <MobilityCards />
        </section>

        {/* Action Button Cluster */}
        <section aria-label="Start Your Journey" className="animate-entrance delay-4" style={{ width: '100%', margin: '16px auto 8px' }}>
          <ActionButtons />
        </section>

        {/* Expansive Footer & City Transit Badges */}
        <div className="animate-entrance delay-5" style={{ width: '100%' }}>
          <WelcomeFooter />
        </div>
      </main>
    </div>
  );
};
