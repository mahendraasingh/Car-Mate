import React from 'react';
import { colors, shadows } from '../theme/tokens';
import { Sparkles, Navigation, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Front-Loading Mobile App Visual Scene */}
      <div
        style={{
          width: '100%',
          height: '210px',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: colors.pureWhite,
          border: `2px solid ${colors.deepForest}`,
          boxShadow: shadows.doodleSticker,
        }}
      >
        {/* Real City Background Photo from Reference Assets */}
        <img
          src="/img/ad2b8a118da66d8700a04cf5a69a885b.jpg"
          alt="Urban city transit backdrop"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 45%',
            filter: 'contrast(1.08) saturate(1.15) brightness(0.92)',
          }}
        />

        {/* Editorial Atmospheric Vignette & Warm Tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(23, 43, 42, 0.35) 0%, rgba(245, 242, 234, 0.4) 45%, rgba(23, 43, 42, 0.82) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* 2D Mixed-Media Mobile Transit Overlay */}
        <svg
          viewBox="0 0 400 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Animated Route Curve */}
          <path
            d="M 25 170 C 110 100, 200 180, 310 110 S 375 140, 385 80"
            stroke={colors.freshLime}
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Pickup Point A */}
          <g transform="translate(30, 168)">
            <circle cx="0" cy="0" r="14" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill={colors.doodleCoral} />
          </g>

          {/* Commuter Pool Hub */}
          <g transform="translate(200, 145)">
            <circle cx="0" cy="0" r="16" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="-4" cy="-2" r="2.5" fill={colors.deepForest} />
            <circle cx="4" cy="-2" r="2.5" fill={colors.deepForest} />
            <path d="M-5 5 Q 0 10, 5 5" stroke={colors.deepForest} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>

          {/* Destination Point B */}
          <g transform="translate(380, 80)">
            <circle cx="0" cy="0" r="12" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4.5" fill={colors.deepForest} />
          </g>

          {/* AUTO-RICKSHAW DOODLE */}
          <g transform="translate(65, 115) scale(0.65)">
            <path
              d="M 20 45 L 35 75 L 145 75 L 152 40 L 125 18 L 60 18 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="8"
            />
            <path
              d="M 20 45 L 35 75 L 145 75 L 152 40 L 125 18 L 60 18 Z"
              fill={colors.deepForest}
              stroke={colors.deepForest}
              strokeWidth="2.5"
            />
            <path d="M 50 18 Q 95 8, 125 18 L 122 28 L 46 28 Z" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="2" />
            <path d="M 40 40 L 148 40 L 144 48 L 36 48 Z" fill={colors.freshLime} />
            <circle cx="42" cy="74" r="12" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="2.5" />
            <circle cx="128" cy="74" r="12" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="2.5" />
          </g>

          {/* SEDAN CAB DOODLE */}
          <g transform="translate(230, 118) scale(0.62)">
            <path
              d="M 25 50 C 35 36, 60 30, 80 25 L 115 14 C 135 12, 175 12, 195 24 L 220 30 C 235 36, 240 44, 240 54 L 20 54 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="8"
            />
            <path
              d="M 25 50 C 35 36, 60 30, 80 25 L 115 14 C 135 12, 175 12, 195 24 L 220 30 C 235 36, 240 44, 240 54 L 20 54 Z"
              fill={colors.pureWhite}
              stroke={colors.deepForest}
              strokeWidth="2.5"
            />
            <rect x="135" y="6" width="24" height="8" rx="4" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2" />
            <circle cx="65" cy="56" r="12" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="2.5" />
            <circle cx="195" cy="56" r="12" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="2.5" />
          </g>
        </svg>

        {/* Floating Mobile Pill: Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '12px',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '1px 2px 0px #172B2A',
          }}
        >
          <Sparkles size={13} color={colors.deepForest} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            2.5 Min Fast Match
          </span>
        </div>

        {/* Floating Mobile Pill: Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: colors.doodleYellow,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '12px',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '1px 2px 0px #172B2A',
          }}
        >
          <Zap size={13} color={colors.deepForest} strokeWidth={2.8} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            Zero Surge
          </span>
        </div>

        {/* Floating Mobile Badge: Bottom Center */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: colors.freshLime,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '9999px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '1px 2px 0px #172B2A',
            whiteSpace: 'nowrap',
          }}
        >
          <Navigation size={12} color={colors.deepForest} strokeWidth={2.4} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            Ride Pooling • Cut Fares by 40%
          </span>
        </div>
      </div>
    </div>
  );
};
