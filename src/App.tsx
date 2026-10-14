import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { colors } from './theme/tokens';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // On actual mobile/small screens, render directly full-bleed
  if (!isLargeScreen) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '100dvh',
          backgroundColor: colors.warmIvory,
          paddingTop: 'var(--safe-top)',
          paddingBottom: 'var(--safe-bottom)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <WelcomeScreen />
      </div>
    );
  }

  // On larger screens (desktop / tablet): Show preview container with device frame switcher
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EAE6DB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: viewMode === 'mobile' ? '24px 16px 40px' : '0',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Top Preview Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: colors.pureWhite,
          padding: '8px 16px',
          borderRadius: '9999px',
          border: `1px solid ${colors.softBorder}`,
          boxShadow: '0 2px 8px rgba(23, 43, 42, 0.06)',
          marginBottom: viewMode === 'mobile' ? '20px' : '0',
          position: viewMode === 'fluid' ? 'fixed' : 'relative',
          top: viewMode === 'fluid' ? '16px' : 'auto',
          zIndex: 999,
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: colors.deepForest,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.5px',
          }}
        >
          SAFAR PREVIEW
        </span>

        <div style={{ height: '16px', width: '1px', backgroundColor: colors.softBorder }} />

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setViewMode('mobile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: viewMode === 'mobile' ? colors.deepForest : 'transparent',
              color: viewMode === 'mobile' ? colors.pureWhite : colors.mutedGrey,
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            aria-pressed={viewMode === 'mobile'}
          >
            <Smartphone size={14} />
            <span>Mobile Device (390px)</span>
          </button>

          <button
            onClick={() => setViewMode('fluid')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: viewMode === 'fluid' ? colors.deepForest : 'transparent',
              color: viewMode === 'fluid' ? colors.pureWhite : colors.mutedGrey,
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            aria-pressed={viewMode === 'fluid'}
          >
            <Monitor size={14} />
            <span>Fluid Responsive</span>
          </button>
        </div>
      </div>

      {/* Screen Presentation Wrapper */}
      {viewMode === 'mobile' ? (
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '44px',
            border: `10px solid ${colors.deepForest}`,
            boxShadow: '0 24px 60px -12px rgba(23, 43, 42, 0.25), 0 0 0 1px rgba(23, 43, 42, 0.08)',
            backgroundColor: colors.warmIvory,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Simulated Mobile Device Notch / Status Bar */}
          <div
            style={{
              height: '44px',
              backgroundColor: colors.warmIvory,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '13px',
              fontWeight: 700,
              color: colors.deepForest,
              borderBottom: `1px solid ${colors.softBorder}`,
              userSelect: 'none',
            }}
          >
            <span>{currentTime}</span>

            {/* Dynamic Island / Notch Pill */}
            <div
              style={{
                width: '90px',
                height: '18px',
                borderRadius: '9999px',
                backgroundColor: colors.deepForest,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Signal size={12} strokeWidth={2.5} />
              <Wifi size={12} strokeWidth={2.5} />
              <Battery size={13} strokeWidth={2.5} />
            </div>
          </div>

          {/* Welcome Screen Body */}
          <WelcomeScreen />

          {/* Home Indicator Bar */}
          <div
            style={{
              height: '24px',
              backgroundColor: colors.warmIvory,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: colors.deepForest,
                opacity: 0.35,
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: colors.warmIvory,
          }}
        >
          <WelcomeScreen />
        </div>
      )}
    </div>
  );
};

export default App;
