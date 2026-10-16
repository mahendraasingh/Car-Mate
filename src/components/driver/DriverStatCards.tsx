import React from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { DriverPartnerProfile, DriverEarningsSummary } from '../../types/driver';
import { IndianRupee, ArrowUpRight, CheckCircle2, Clock, Car, ChevronRight, TrendingUp } from 'lucide-react';

interface DriverStatCardsProps {
  profile: DriverPartnerProfile;
  earnings: DriverEarningsSummary;
  onNavigateEarnings: () => void;
  onNavigateHistory: () => void;
  onNavigateVehicle: () => void;
}

export const DriverStatCards: React.FC<DriverStatCardsProps> = ({
  profile,
  earnings,
  onNavigateEarnings,
  onNavigateHistory,
  onNavigateVehicle,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Primary Today's Earnings Commercial Banner */}
      <div
        onClick={onNavigateEarnings}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigateEarnings()}
        style={{
          width: '100%',
          padding: '16px 18px',
          borderRadius: '22px',
          backgroundColor: colors.deepForest,
          border: `2px solid ${colors.deepForest}`,
          boxShadow: shadows.doodleSticker,
          color: colors.pureWhite,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transition: 'transform 0.15s ease',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 243, 106, 0.25) 0%, rgba(23, 43, 42, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: colors.freshLime,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <TrendingUp size={12} /> Today's Payout Net
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 800,
                  color: colors.pureWhite,
                  letterSpacing: '-0.5px',
                  lineHeight: 1,
                }}
              >
                ₹{earnings.todayTotal.toLocaleString('en-IN')}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.65)',
                }}
              >
                (Demo data)
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              fontSize: '11px',
              fontWeight: 700,
              color: colors.freshLime,
            }}
          >
            <span>Statement</span>
            <ArrowUpRight size={13} />
          </div>
        </div>

        {/* 3 Metric Pills: Trips, Hours, Week Net */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '8px',
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>
              <CheckCircle2 size={11} color={colors.freshLime} />
              <span>Trips</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: colors.pureWhite }}>
              {earnings.todayTripsCount} rides
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>
              <Clock size={11} color={colors.freshLime} />
              <span>Online Time</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: colors.pureWhite }}>
              {earnings.onlineHoursToday} hrs
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>
              <IndianRupee size={11} color={colors.freshLime} />
              <span>This Week</span>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: colors.freshLime }}>
              ₹{earnings.weeklyTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Row of Two Compact Action Cards: Trip History & Vehicle Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Trip History Entry */}
        <div
          onClick={onNavigateHistory}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigateHistory()}
          style={{
            padding: '12px 14px',
            borderRadius: '18px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: colors.deepForest,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              Trip Log
            </span>
            <ChevronRight size={14} color={colors.mutedGrey} />
          </div>

          <div style={{ marginTop: '8px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: colors.deepForest }}>
              {earnings.recentTrips.length} Records
            </span>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: colors.mutedGrey, fontWeight: 500 }}>
              Recent rides & routes
            </p>
          </div>
        </div>

        {/* Assigned Vehicle Snapshot */}
        <div
          onClick={onNavigateVehicle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigateVehicle()}
          style={{
            padding: '12px 14px',
            borderRadius: '18px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: colors.deepForest,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Car size={12} color={colors.deepForest} /> Vehicle
            </span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                padding: '1px 5px',
                borderRadius: '4px',
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
              }}
            >
              {profile.vehicle.fuelType}
            </span>
          </div>

          <div style={{ marginTop: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 800,
                color: colors.deepForest,
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile.vehicle.registrationNumber}
            </span>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '10px',
                color: colors.mutedGrey,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile.vehicle.makeModel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
