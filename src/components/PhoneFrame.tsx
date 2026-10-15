import React, { useState, useEffect } from 'react';
import { colors } from '../theme/tokens';
import { Wifi, Battery, Signal, Smartphone, Maximize2, Moon, Sun, Sparkles } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeScreen?: 'welcome' | 'passenger_home' | 'profile';
  onSelectScreen?: (screen: 'welcome' | 'passenger_home' | 'profile') => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, activeScreen, onSelectScreen }) => {
  const [currentTime, setCurrentTime] = useState<string>('9:41');
  const [isDarkModeStudio, setIsDarkModeStudio] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '100%'>('fit');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: isDarkModeStudio ? '#0c1312' : '#F0ECE1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'background-color 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      {/* Studio Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: isDarkModeStudio
            ? 'radial-gradient(circle, rgba(201, 243, 106, 0.08) 0%, rgba(23, 43, 42, 0) 70%)'
            : 'radial-gradient(circle, rgba(201, 243, 106, 0.25) 0%, rgba(245, 242, 234, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top Studio Control Bar */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '520px',
          marginBottom: '18px',
          padding: '10px 18px',
          borderRadius: '9999px',
          backgroundColor: isDarkModeStudio ? 'rgba(23, 43, 42, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          border: isDarkModeStudio ? '1px solid rgba(201, 243, 106, 0.2)' : '1px solid #E3E0D7',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: colors.freshLime,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.deepForest,
            }}
          >
            <Smartphone size={16} strokeWidth={2.6} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: isDarkModeStudio ? '#F5F2EA' : colors.deepForest,
                  letterSpacing: '0.4px',
                }}
              >
                SAFAR APP
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: colors.freshLime,
                  color: colors.deepForest,
                }}
              >
                MOBILE PREVIEW
              </span>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: isDarkModeStudio ? '#9AA3A0' : colors.mutedGrey,
              }}
            >
              {activeScreen === 'welcome' && 'Welcome & Onboarding'}
              {activeScreen === 'passenger_home' && 'Live Booking & Radar'}
              {activeScreen === 'profile' && 'User Profile & Places'}
            </span>
          </div>
        </div>

        {/* Screen Switcher Pills */}
        {onSelectScreen && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: isDarkModeStudio ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.06)',
              padding: '3px',
              borderRadius: '12px',
            }}
          >
            <button
              type="button"
              onClick={() => onSelectScreen('welcome')}
              style={{
                padding: '4px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeScreen === 'welcome' ? colors.freshLime : 'transparent',
                color: activeScreen === 'welcome' ? colors.deepForest : (isDarkModeStudio ? '#C5CCC9' : colors.deepForest),
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Welcome
            </button>
            <button
              type="button"
              onClick={() => onSelectScreen('passenger_home')}
              style={{
                padding: '4px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeScreen === 'passenger_home' ? colors.freshLime : 'transparent',
                color: activeScreen === 'passenger_home' ? colors.deepForest : (isDarkModeStudio ? '#C5CCC9' : colors.deepForest),
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Ride
            </button>
            <button
              type="button"
              onClick={() => onSelectScreen('profile')}
              style={{
                padding: '4px 8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeScreen === 'profile' ? colors.freshLime : 'transparent',
                color: activeScreen === 'profile' ? colors.deepForest : (isDarkModeStudio ? '#C5CCC9' : colors.deepForest),
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Profile
            </button>
          </div>
        )}

        {/* Studio Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsDarkModeStudio(!isDarkModeStudio)}
            title="Toggle Studio Theme"
            aria-label="Toggle Studio Background Theme"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: isDarkModeStudio ? '1px solid rgba(255,255,255,0.1)' : '1px solid #D6D2C4',
              backgroundColor: isDarkModeStudio ? 'rgba(255,255,255,0.06)' : '#FAF8F3',
              color: isDarkModeStudio ? '#F5F2EA' : colors.deepForest,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isDarkModeStudio ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel(zoomLevel === 'fit' ? '100%' : 'fit')}
            title="Toggle Scale"
            aria-label="Toggle Phone Size"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: isDarkModeStudio ? '1px solid rgba(255,255,255,0.1)' : '1px solid #D6D2C4',
              backgroundColor: isDarkModeStudio ? 'rgba(255,255,255,0.06)' : '#FAF8F3',
              color: isDarkModeStudio ? '#F5F2EA' : colors.deepForest,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </header>

      {/* Realistic Smartphone Chassis */}
      <div
        className="phone-outer-chassis"
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '412px',
          height: zoomLevel === 'fit' ? 'min(875px, calc(100vh - 120px))' : '875px',
          minHeight: '680px',
          borderRadius: '52px',
          backgroundColor: '#1E2625',
          padding: '11px',
          boxSizing: 'border-box',
          boxShadow: isDarkModeStudio
            ? '0 25px 65px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 35px rgba(201, 243, 106, 0.08)'
            : '0 25px 60px -10px rgba(23, 43, 42, 0.35), 0 0 0 1px rgba(23, 43, 42, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Phone Physical Buttons on Side (Left/Right Accents) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-3px',
            top: '115px',
            width: '3px',
            height: '26px',
            borderRadius: '2px 0 0 2px',
            backgroundColor: '#374241',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-3px',
            top: '155px',
            width: '3px',
            height: '50px',
            borderRadius: '2px 0 0 2px',
            backgroundColor: '#374241',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-3px',
            top: '215px',
            width: '3px',
            height: '50px',
            borderRadius: '2px 0 0 2px',
            backgroundColor: '#374241',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-3px',
            top: '170px',
            width: '3px',
            height: '65px',
            borderRadius: '0 2px 2px 0',
            backgroundColor: '#374241',
          }}
        />

        {/* Inner Phone Screen Bezel */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '42px',
            backgroundColor: colors.warmIvory,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* iOS / Modern Mobile Status Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '46px',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px',
              backgroundColor: 'rgba(245, 242, 234, 0.88)',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              boxSizing: 'border-box',
            }}
          >
            {/* Clock */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 800,
                color: colors.deepForest,
                letterSpacing: '-0.2px',
              }}
            >
              {currentTime}
            </span>

            {/* Dynamic Island / Camera Cutout */}
            <div
              style={{
                width: '116px',
                height: '28px',
                backgroundColor: '#0F1E1D',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Camera Lens Dot */}
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: '#1C2E2D',
                  border: '1.5px solid #091211',
                }}
              />
              {/* Dynamic Island Status Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: colors.freshLime,
                    animation: 'floatMascot 2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>

            {/* Signal & Battery Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.deepForest }}>
              <Signal size={13} strokeWidth={2.4} />
              <Wifi size={13} strokeWidth={2.4} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Battery size={16} strokeWidth={2.4} />
              </div>
            </div>
          </div>

          {/* Actual Scrollable App Viewport */}
          <div
            className="mobile-app-viewport"
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingTop: '46px', // space for status bar
              paddingBottom: '32px', // space for home indicator
              boxSizing: 'border-box',
              scrollBehavior: 'smooth',
            }}
          >
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '134px',
              height: '4.5px',
              borderRadius: '9999px',
              backgroundColor: colors.deepForest,
              opacity: 0.85,
              zIndex: 100,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Footer Hint */}
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: isDarkModeStudio ? '#83918E' : colors.mutedGrey,
          fontSize: '11px',
          fontWeight: 600,
          zIndex: 5,
        }}
      >
        <Sparkles size={13} color={colors.freshLime} />
        <span>Mobile App Mode • Scroll or tap inside phone screen to interact</span>
      </div>
    </div>
  );
};
