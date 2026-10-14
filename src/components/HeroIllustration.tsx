import React from 'react';
import { colors } from '../theme/tokens';

export const HeroIllustration: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 460 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '230px',
          overflow: 'visible',
        }}
        role="img"
        aria-label="Urban Indian transportation featuring a city cab, auto-rickshaw, and ride-pooling route"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FAF8F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5F2EA" stopOpacity="1" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop Ground & Flyover Arch */}
        <rect x="15" y="15" width="430" height="230" rx="20" fill="url(#skyGrad)" stroke={colors.softBorder} strokeWidth="1.2" />

        {/* Minimal City Skyline / Metro Viaduct Silhouette */}
        <g opacity="0.35">
          {/* Metro pillars & elevated track */}
          <line x1="30" y1="90" x2="430" y2="90" stroke={colors.mutedGrey} strokeWidth="3" strokeDasharray="12 4" />
          <line x1="80" y1="90" x2="80" y2="170" stroke={colors.softBorder} strokeWidth="4" />
          <line x1="200" y1="90" x2="200" y2="170" stroke={colors.softBorder} strokeWidth="4" />
          <line x1="340" y1="90" x2="340" y2="170" stroke={colors.softBorder} strokeWidth="4" />

          {/* Minimal skyline silhouettes */}
          <rect x="50" y="55" width="22" height="35" rx="2" fill={colors.softBorder} />
          <rect x="130" y="45" width="30" height="45" rx="2" fill={colors.softBorder} />
          <rect x="260" y="50" width="26" height="40" rx="2" fill={colors.softBorder} />
          <rect x="380" y="60" width="24" height="30" rx="2" fill={colors.softBorder} />
        </g>

        {/* Roadway Platform */}
        <rect x="25" y="165" width="410" height="58" rx="14" fill={colors.pureWhite} stroke={colors.softBorder} strokeWidth="1.2" />
        {/* Road Divider Markings */}
        <line x1="45" y1="194" x2="415" y2="194" stroke={colors.warmIvory} strokeWidth="2.5" strokeDasharray="16 10" />

        {/* POOLING / SHARED ROUTE TRAJECTORY */}
        <g>
          {/* Animated/flowing connection route line linking riders */}
          <path
            d="M 55 130 C 120 70, 220 145, 310 110 S 405 140, 420 178"
            fill="none"
            stroke={colors.deepForest}
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Pickup Point 1 (Rider A) */}
          <g transform="translate(100, 95)">
            <circle cx="0" cy="0" r="14" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="5" fill={colors.freshLime} />
            {/* Person Icon 1 */}
            <path d="M-4 6 C-4 2, 4 2, 4 6" stroke={colors.deepForest} strokeWidth="1.2" fill="none" />
            <circle cx="0" cy="-1" r="2.2" fill={colors.deepForest} />
          </g>

          {/* Pickup Point 2 (Rider B - Shared Pool Node) */}
          <g transform="translate(260, 115)">
            <circle cx="0" cy="0" r="16" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="1.8" />
            <circle cx="-3" cy="-1" r="2.2" fill={colors.deepForest} />
            <path d="M-7 7 C-7 3, 1 3, 1 7" stroke={colors.deepForest} strokeWidth="1.2" fill="none" />
            <circle cx="3" cy="-1" r="2.2" fill={colors.deepForest} />
            <path d="M-1 7 C-1 3, 7 3, 7 7" stroke={colors.deepForest} strokeWidth="1.2" fill="none" />
            {/* Pool indicator pill */}
            <rect x="-18" y="-28" width="36" height="15" rx="7.5" fill={colors.deepForest} />
            <text x="0" y="-18" fill={colors.freshLime} fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
              POOL
            </text>
          </g>

          {/* Destination Marker */}
          <g transform="translate(418, 175)">
            <circle cx="0" cy="0" r="9" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2" />
            <circle cx="0" cy="0" r="3.5" fill={colors.deepForest} />
          </g>
        </g>

        {/* VEHICLE 1: AUTHENTIC INDIAN AUTO-RICKSHAW */}
        <g transform="translate(52, 142)">
          {/* Shadow */}
          <ellipse cx="62" cy="58" rx="46" ry="5.5" fill={colors.forestAlpha15} />

          {/* Rickshaw Body Structure */}
          {/* Forest green lower body */}
          <path
            d="M 24 35 L 34 50 L 98 50 L 102 32 L 86 16 L 42 16 L 24 35 Z"
            fill={colors.deepForest}
            stroke={colors.deepForest}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Fresh Lime Canopy Roof */}
          <path
            d="M 38 16 C 42 7, 78 5, 88 12 L 86 17 L 36 17 Z"
            fill={colors.freshLime}
            stroke={colors.deepForest}
            strokeWidth="1.5"
          />
          {/* Canopy side stripe */}
          <path
            d="M 34 32 L 99 32 L 96 37 L 31 37 Z"
            fill={colors.freshLime}
          />

          {/* Rickshaw Open Passenger Cabin Window */}
          <path
            d="M 52 19 L 83 19 L 85 30 L 50 30 Z"
            fill={colors.warmIvory}
            stroke={colors.deepForest}
            strokeWidth="1.2"
          />

          {/* Windshield */}
          <path
            d="M 39 19 L 48 19 L 44 30 L 29 30 Z"
            fill="#EAF0EF"
            stroke={colors.deepForest}
            strokeWidth="1.2"
          />

          {/* Round Headlight */}
          <circle cx="23" cy="38" r="4.5" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="1.2" />
          <path d="M 20 38 L 8 36 L 8 40 Z" fill={colors.freshLime} opacity="0.6" />

          {/* Wheels */}
          {/* Front Single Wheel */}
          <g transform="translate(32, 51)">
            <circle cx="0" cy="0" r="9" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="5" fill={colors.softBorder} />
            <circle cx="0" cy="0" r="2.5" fill={colors.deepForest} />
          </g>

          {/* Rear Wheel */}
          <g transform="translate(86, 51)">
            <circle cx="0" cy="0" r="10" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="5.5" fill={colors.softBorder} />
            <circle cx="0" cy="0" r="2.5" fill={colors.deepForest} />
          </g>

          {/* Badge Label */}
          <rect x="52" y="39" width="28" height="8" rx="4" fill={colors.deepForest} />
          <text x="66" y="45.5" fill={colors.warmIvory} fontSize="6" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            AUTO
          </text>
        </g>

        {/* VEHICLE 2: MODERN CITY CAB (SEDAN) */}
        <g transform="translate(235, 146)">
          {/* Shadow */}
          <ellipse cx="90" cy="54" rx="72" ry="6" fill={colors.forestAlpha15} />

          {/* Car Body (Crisp Pure White with Deep Forest accents) */}
          <path
            d="M 22 42 C 28 32, 45 28, 58 24 L 80 14 C 92 13, 126 13, 138 24 L 155 29 C 168 33, 172 40, 172 46 L 18 46 C 18 43, 20 42, 22 42 Z"
            fill={colors.pureWhite}
            stroke={colors.deepForest}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Windows / Greenhouse */}
          <path
            d="M 60 26 L 79 17 L 105 17 L 105 28 L 56 28 Z"
            fill={colors.deepForest}
          />
          <path
            d="M 109 17 L 132 24 L 146 28 L 109 28 Z"
            fill={colors.deepForest}
          />

          {/* Taxi Roof Indicator Light */}
          <rect x="98" y="9" width="18" height="5" rx="2.5" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="1.2" />

          {/* Front Headlight & Rear Light */}
          <path d="M 166 38 L 172 41 L 166 43 Z" fill={colors.freshLime} />
          <path d="M 18 38 L 22 38 L 20 43 L 18 43 Z" fill="#E05A47" />

          {/* Wheels */}
          {/* Front Wheel */}
          <g transform="translate(142, 48)">
            <circle cx="0" cy="0" r="10.5" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="6" fill={colors.softBorder} />
            <circle cx="0" cy="0" r="2.8" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="1" fill={colors.freshLime} />
          </g>

          {/* Rear Wheel */}
          <g transform="translate(48, 48)">
            <circle cx="0" cy="0" r="10.5" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="6" fill={colors.softBorder} />
            <circle cx="0" cy="0" r="2.8" fill={colors.deepForest} />
            <circle cx="0" cy="0" r="1" fill={colors.freshLime} />
          </g>

          {/* Cab Door Line & Handle */}
          <line x1="107" y1="28" x2="107" y2="44" stroke={colors.softBorder} strokeWidth="1.2" />
          <rect x="96" y="33" width="7" height="2" rx="1" fill={colors.deepForest} />

          {/* Badge Label */}
          <rect x="114" y="34" width="22" height="7" rx="3.5" fill={colors.deepForest} />
          <text x="125" y="39.5" fill={colors.freshLime} fontSize="5.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            CAB
          </text>
        </g>
      </svg>
    </div>
  );
};
