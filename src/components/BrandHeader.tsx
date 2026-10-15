import React, { useState } from 'react';
import { colors, shadows } from '../theme/tokens';
import { Compass, MapPin, ChevronDown, ShieldCheck, Check } from 'lucide-react';

export const BrandHeader: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Delhi NCR');
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [showSafetySheet, setShowSafetySheet] = useState<boolean>(false);

  const cities = ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune'];

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(245, 242, 234, 0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.softBorder}`,
        boxSizing: 'border-box',
      }}
      aria-label="Application Header"
    >
      {/* Brand Monogram + Mobile App Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: colors.deepForest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: shadows.doodleSticker,
            border: `2px solid ${colors.deepForest}`,
            position: 'relative',
          }}
          aria-hidden="true"
        >
          <Compass size={22} color={colors.freshLime} strokeWidth={2.4} />
          <div
            style={{
              position: 'absolute',
              top: '3px',
              right: '3px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
            }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.6px',
                color: colors.deepForest,
                lineHeight: 1,
              }}
            >
              SAFAR
            </span>
            <span
              style={{
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '6px',
                border: `1.5px solid ${colors.deepForest}`,
              }}
            >
              सफ़र
            </span>
          </div>

          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.4px',
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '2px',
            }}
          >
            SMART RIDE APP
          </span>
        </div>
      </div>

      {/* City Location Picker Pill & Safety Shield */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={() => setShowCityPicker(!showCityPicker)}
          aria-label="Select City"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 10px',
            borderRadius: '9999px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            boxShadow: '1px 2px 0px #172B2A',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 800,
            color: colors.deepForest,
            fontFamily: 'var(--font-display)',
          }}
        >
          <MapPin size={12} color={colors.doodleCoral} />
          <span>{selectedCity}</span>
          <ChevronDown size={12} color={colors.deepForest} />
        </button>

        {/* 24/7 Safety Badge */}
        <button
          type="button"
          onClick={() => setShowSafetySheet(!showSafetySheet)}
          aria-label="View Safety Shield"
          title="24/7 Safety Shield Active"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            boxShadow: '1px 2px 0px #172B2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ShieldCheck size={16} color={colors.deepForest} strokeWidth={2.4} />
        </button>
      </div>

      {/* City Dropdown Modal / Popover */}
      {showCityPicker && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            right: '16px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '16px',
            padding: '8px',
            boxShadow: shadows.doodleStickerLg,
            zIndex: 60,
            minWidth: '150px',
            animation: 'fadeIn 0.2s ease forwards',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: colors.mutedGrey,
              padding: '4px 8px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Select City
          </div>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setSelectedCity(city);
                setShowCityPicker(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedCity === city ? colors.warmIvory : 'transparent',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                color: colors.deepForest,
                textAlign: 'left',
              }}
            >
              <span>{city}</span>
              {selectedCity === city && <Check size={14} color={colors.deepForest} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}

      {/* Safety Shield Popover */}
      {showSafetySheet && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            right: '16px',
            left: '16px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '16px',
            padding: '14px',
            boxShadow: shadows.doodleStickerLg,
            zIndex: 60,
            animation: 'fadeIn 0.2s ease forwards',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color={colors.deepForest} />
              <span style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                SAFAR 24/7 Safety Shield
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSafetySheet(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                color: colors.mutedGrey,
              }}
            >
              Close
            </button>
          </div>
          <p style={{ fontSize: '11px', color: colors.mutedGrey, margin: 0, lineHeight: 1.4 }}>
            Verified drivers with background checks, emergency SOS, live route sharing, and real-time transit telemetry.
          </p>
        </div>
      )}
    </header>
  );
};
