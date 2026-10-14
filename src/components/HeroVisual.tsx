import React from 'react';
import { colors, shadows } from '../theme/tokens';
import { Sparkles, MapPin } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Mixed-Media Hero Frame */}
      <div
        style={{
          width: '100%',
          height: '240px',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: colors.pureWhite,
          border: `2px solid ${colors.deepForest}`,
          boxShadow: shadows.card,
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
            objectPosition: 'center 40%',
            filter: 'contrast(1.05) saturate(1.1) brightness(0.95)',
          }}
        />

        {/* Editorial Atmospheric Vignette & Warm Tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(23, 43, 42, 0.25) 0%, rgba(245, 242, 234, 0.45) 50%, rgba(23, 43, 42, 0.75) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* 2D Mixed-Media Doodle & Transportation Overlay (SVG) */}
        <svg
          viewBox="0 0 460 240"
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
          {/* Hand-Drawn Doodle Route Trajectory */}
          <path
            d="M 40 185 Q 120 110, 230 140 T 420 85"
            stroke={colors.freshLime}
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0px 2px 4px rgba(23, 43, 42, 0.6))',
            }}
          />

          {/* Doodle Arrowhead at Route End */}
          <path
            d="M 410 75 L 425 85 L 412 97"
            stroke={colors.freshLime}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hand-Drawn Sparkles / Star Doodles */}
          <g transform="translate(65, 35)">
            <path
              d="M 12 0 L 15 8 L 24 12 L 15 16 L 12 24 L 9 16 L 0 12 L 9 8 Z"
              fill={colors.doodleYellow}
              stroke={colors.deepForest}
              strokeWidth="1.5"
            />
          </g>
          <g transform="translate(390, 140)">
            <path
              d="M 8 0 L 10 5 L 16 8 L 10 11 L 8 16 L 6 11 L 0 8 L 6 5 Z"
              fill={colors.freshLime}
              stroke={colors.deepForest}
              strokeWidth="1.2"
            />
          </g>

          {/* Pickup Point A Doodle */}
          <g transform="translate(45, 185)">
            <circle cx="0" cy="0" r="14" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill={colors.doodleCoral} />
            <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="800" fill={colors.pureWhite} fontFamily="sans-serif">
              A
            </text>
          </g>

          {/* Midpoint Pooling Node Doodle (Shared Commuters) */}
          <g transform="translate(230, 140)">
            <circle cx="0" cy="0" r="18" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="-4" cy="-2" r="3" fill={colors.deepForest} />
            <circle cx="4" cy="-2" r="3" fill={colors.deepForest} />
            <path d="M-6 6 Q 0 11, 6 6" stroke={colors.deepForest} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>

          {/* INDIAN AUTO-RICKSHAW DOODLE STICKER */}
          <g transform="translate(70, 120)">
            {/* White sticker border */}
            <path
              d="M 16 28 L 24 44 L 88 44 L 92 26 L 76 12 L 36 12 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Auto Rickshaw Green & Lime Body */}
            <path
              d="M 16 28 L 24 44 L 88 44 L 92 26 L 76 12 L 36 12 Z"
              fill={colors.deepForest}
              stroke={colors.deepForest}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Canopy */}
            <path d="M 32 12 Q 56 6, 76 12 L 74 18 L 30 18 Z" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="1.5" />
            <path d="M 28 26 L 90 26 L 87 31 L 25 31 Z" fill={colors.freshLime} />
            {/* Windshield & Cabin */}
            <path d="M 46 16 L 73 16 L 75 25 L 44 25 Z" fill={colors.warmIvory} stroke={colors.deepForest} strokeWidth="1.2" />
            {/* Headlight Beam */}
            <circle cx="16" cy="30" r="4" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="1.5" />
            <polygon points="12,30 0,26 0,34" fill={colors.doodleYellow} opacity="0.8" />
            {/* Wheels */}
            <circle cx="26" cy="44" r="8" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="1.5" />
            <circle cx="26" cy="44" r="3" fill={colors.freshLime} />
            <circle cx="78" cy="44" r="8.5" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="1.5" />
            <circle cx="78" cy="44" r="3" fill={colors.freshLime} />
          </g>

          {/* CITY CAB (SEDAN) DOODLE STICKER */}
          <g transform="translate(255, 140)">
            {/* White sticker border */}
            <path
              d="M 18 36 C 24 26, 42 22, 54 18 L 72 10 C 84 9, 114 9, 126 18 L 140 22 C 150 26, 154 32, 154 38 L 14 38 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Car Body */}
            <path
              d="M 18 36 C 24 26, 42 22, 54 18 L 72 10 C 84 9, 114 9, 126 18 L 140 22 C 150 26, 154 32, 154 38 L 14 38 Z"
              fill={colors.pureWhite}
              stroke={colors.deepForest}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Windows */}
            <path d="M 52 20 L 70 12 L 94 12 L 94 22 L 48 22 Z" fill={colors.deepForest} />
            <path d="M 98 12 L 120 18 L 132 22 L 98 22 Z" fill={colors.deepForest} />
            {/* Taxi Roof Sign */}
            <rect x="88" y="5" width="16" height="5" rx="2" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="1.2" />
            {/* Headlights */}
            <polygon points="152,30 162,28 162,34" fill={colors.freshLime} opacity="0.9" />
            {/* Wheels */}
            <circle cx="42" cy="40" r="9" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="1.5" />
            <circle cx="42" cy="40" r="3.5" fill={colors.doodleYellow} />
            <circle cx="126" cy="40" r="9" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="1.5" />
            <circle cx="126" cy="40" r="3.5" fill={colors.doodleYellow} />
          </g>
        </svg>

        {/* Floating Editorial Badge 1: POOLING ACTIVE */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '16px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '10px',
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <Sparkles size={13} color={colors.deepForest} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.4px',
            }}
          >
            SMART POOLING
          </span>
        </div>

        {/* Floating Editorial Badge 2: CITY TRANSIT */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '16px',
            backgroundColor: colors.freshLime,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '10px',
            padding: '5px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <MapPin size={13} color={colors.deepForest} strokeWidth={2.5} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.3px',
            }}
          >
            CAB • AUTO • POOL
          </span>
        </div>
      </div>
    </div>
  );
};
