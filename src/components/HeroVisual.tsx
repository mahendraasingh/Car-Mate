import React from 'react';
import { colors, shadows } from '../theme/tokens';
import { Sparkles, MapPin, Navigation, Compass } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Front-Loading Panoramic Story Frame */}
      <div
        style={{
          width: '100%',
          height: 'clamp(280px, 45vh, 440px)',
          borderRadius: '32px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: colors.pureWhite,
          border: `3px solid ${colors.deepForest}`,
          boxShadow: shadows.doodleStickerLg,
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
              'linear-gradient(180deg, rgba(23, 43, 42, 0.35) 0%, rgba(245, 242, 234, 0.4) 45%, rgba(23, 43, 42, 0.85) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* 2D Mixed-Media Doodle & Transportation Overlay (SVG) */}
        <svg
          viewBox="0 0 900 400"
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
          {/* Glowing Animated Doodle Route Curve */}
          <path
            d="M 60 320 C 220 180, 420 340, 640 220 S 840 280, 860 160"
            stroke={colors.freshLime}
            strokeWidth="6"
            strokeDasharray="14 10"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0px 3px 8px rgba(23, 43, 42, 0.8))',
            }}
          />

          {/* Doodle Arrowhead at Route End */}
          <path
            d="M 845 145 L 865 160 L 848 178"
            stroke={colors.freshLime}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Route Milestones with Commuter Dots */}
          {/* Pickup A */}
          <g transform="translate(70, 320)">
            <circle cx="0" cy="0" r="22" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="3.5" />
            <circle cx="0" cy="0" r="9" fill={colors.doodleCoral} />
            <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="800" fill={colors.pureWhite} fontFamily="sans-serif">
              A
            </text>
          </g>

          {/* Ride Pool Node (Commuters Sharing Journey) */}
          <g transform="translate(420, 280)">
            <circle cx="0" cy="0" r="28" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="3.5" />
            <circle cx="-6" cy="-4" r="4.5" fill={colors.deepForest} />
            <circle cx="6" cy="-4" r="4.5" fill={colors.deepForest} />
            <path d="M-8 8 Q 0 16, 8 8" stroke={colors.deepForest} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Destination Drop Pin */}
          <g transform="translate(860, 155)">
            <circle cx="0" cy="0" r="16" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="3" />
            <circle cx="0" cy="0" r="6" fill={colors.deepForest} />
          </g>

          {/* AUTHENTIC INDIAN AUTO-RICKSHAW DOODLE */}
          <g transform="translate(130, 210)">
            {/* White sticker silhouette */}
            <path
              d="M 20 45 L 35 75 L 145 75 L 152 40 L 125 18 L 60 18 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="10"
              strokeLinejoin="round"
            />
            {/* Rickshaw Green Body */}
            <path
              d="M 20 45 L 35 75 L 145 75 L 152 40 L 125 18 L 60 18 Z"
              fill={colors.deepForest}
              stroke={colors.deepForest}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Yellow Canopy Roof */}
            <path d="M 50 18 Q 95 8, 125 18 L 122 28 L 46 28 Z" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="2.5" />
            {/* Lime Side Stripe */}
            <path d="M 40 40 L 148 40 L 144 48 L 36 48 Z" fill={colors.freshLime} />
            {/* Open Passenger Cabin */}
            <path d="M 72 26 L 118 26 L 120 42 L 68 42 Z" fill={colors.warmIvory} stroke={colors.deepForest} strokeWidth="2" />
            {/* Front Headlight Beam */}
            <circle cx="24" cy="48" r="6" fill={colors.doodleYellow} stroke={colors.deepForest} strokeWidth="2" />
            <polygon points="18,48 0,40 0,56" fill={colors.doodleYellow} opacity="0.85" />
            {/* Wheels */}
            <circle cx="42" cy="74" r="14" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="3" />
            <circle cx="42" cy="74" r="5" fill={colors.freshLime} />
            <circle cx="128" cy="74" r="14" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="3" />
            <circle cx="128" cy="74" r="5" fill={colors.freshLime} />
          </g>

          {/* MODERN CITY CAB (SEDAN) DOODLE */}
          <g transform="translate(480, 230)">
            {/* White sticker silhouette */}
            <path
              d="M 25 50 C 35 36, 60 30, 80 25 L 115 14 C 135 12, 175 12, 195 24 L 220 30 C 235 36, 240 44, 240 54 L 20 54 Z"
              fill={colors.pureWhite}
              stroke={colors.pureWhite}
              strokeWidth="10"
              strokeLinejoin="round"
            />
            {/* White Sedan Body */}
            <path
              d="M 25 50 C 35 36, 60 30, 80 25 L 115 14 C 135 12, 175 12, 195 24 L 220 30 C 235 36, 240 44, 240 54 L 20 54 Z"
              fill={colors.pureWhite}
              stroke={colors.deepForest}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Windows */}
            <path d="M 85 28 L 112 17 L 148 17 L 148 32 L 80 32 Z" fill={colors.deepForest} />
            <path d="M 154 17 L 188 25 L 205 32 L 154 32 Z" fill={colors.deepForest} />
            {/* Fresh Lime Taxi Roof Light */}
            <rect x="135" y="6" width="24" height="8" rx="4" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2" />
            {/* Wheels */}
            <circle cx="65" cy="56" r="14" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="3" />
            <circle cx="65" cy="56" r="5" fill={colors.doodleYellow} />
            <circle cx="195" cy="56" r="14" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="3" />
            <circle cx="195" cy="56" r="5" fill={colors.doodleYellow} />
          </g>
        </svg>

        {/* Floating Story Sticker 1: Top-Left */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '24px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <Sparkles size={16} color={colors.deepForest} />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 800,
                color: colors.deepForest,
                lineHeight: 1.1,
              }}
            >
              RIDE POOLING ACTIVE
            </div>
            <div style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
              Save up to 40% & reduce traffic
            </div>
          </div>
        </div>

        {/* Floating Story Sticker 2: Top-Right */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            backgroundColor: colors.doodleYellow,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <Navigation size={16} color={colors.deepForest} strokeWidth={2.6} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.4px',
            }}
          >
            NO SURGE ON AUTOS
          </span>
        </div>

        {/* Floating Story Sticker 3: Bottom-Left Location Annotation */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <MapPin size={15} color={colors.doodleCoral} strokeWidth={2.6} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            Gully to Highway • 2.5 Min ETA
          </span>
        </div>

        {/* Floating Story Sticker 4: Bottom-Right Mode Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '24px',
            backgroundColor: colors.freshLime,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <Compass size={16} color={colors.deepForest} strokeWidth={2.6} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.4px',
            }}
          >
            CAB • AUTO • POOL
          </span>
        </div>
      </div>
    </div>
  );
};
