import React from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { DriverEarningsSummary } from '../../types/driver';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Car,
} from 'lucide-react';

interface DriverEarningsScreenProps {
  earnings: DriverEarningsSummary;
  onBack: () => void;
}

export const DriverEarningsScreen: React.FC<DriverEarningsScreenProps> = ({
  earnings,
  onBack,
}) => {
  const maxDailyAmount = Math.max(...earnings.dailyTrend.map((d) => d.amount), 2000);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: colors.warmIvory,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
      role="region"
      aria-label="Driver Partner Earnings and Weekly Payouts"
    >
      {/* Top Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: `2px solid ${colors.deepForest}`,
          backgroundColor: colors.pureWhite,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Driver Home"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: colors.warmIvory,
            border: `2px solid ${colors.deepForest}`,
            color: colors.deepForest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.6} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 800,
              color: colors.deepForest,
              margin: 0,
            }}
          >
            Driver Earnings
          </h1>
          <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
            Commercial Payout Ledger (Demo)
          </span>
        </div>

        <div
          style={{
            padding: '4px 8px',
            borderRadius: '8px',
            backgroundColor: colors.freshLime,
            color: colors.deepForest,
            fontSize: '10px',
            fontWeight: 800,
            border: `1px solid ${colors.deepForest}`,
          }}
        >
          LIVE DEMO
        </div>
      </header>

      {/* Main Content Body */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Today's Hero Earnings Card */}
        <div
          style={{
            padding: '20px',
            borderRadius: '24px',
            backgroundColor: colors.deepForest,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
            color: colors.pureWhite,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: colors.freshLime,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <TrendingUp size={13} /> Today's Balance
            </span>
            <span
              style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: colors.pureWhite,
                fontWeight: 600,
              }}
            >
              Instant UPI Direct
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '40px',
                fontWeight: 800,
                color: colors.pureWhite,
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              ₹{earnings.todayTotal.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
              net earnings
            </span>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                This Week Net Total
              </span>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: colors.freshLime,
                }}
              >
                ₹{earnings.weeklyTotal.toLocaleString('en-IN')}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
                Today's Completed Trips
              </span>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: colors.pureWhite,
                }}
              >
                {earnings.todayTripsCount} Rides
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Trend Bar Chart */}
        <div
          style={{
            padding: '16px',
            borderRadius: '22px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color={colors.deepForest} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: colors.deepForest }}>
                Weekly Earnings Trend
              </span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>
              Oct 12 - Oct 18, 2026
            </span>
          </div>

          {/* Bar Chart Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '110px',
              paddingTop: '10px',
              gap: '6px',
            }}
          >
            {earnings.dailyTrend.map((day, idx) => {
              const heightPercent = Math.max(12, Math.round((day.amount / maxDailyAmount) * 100));
              const isToday = day.dayName.includes('Today');

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: isToday ? colors.deepForest : colors.mutedGrey,
                    }}
                  >
                    {day.amount > 0 ? `₹${day.amount}` : '-'}
                  </span>

                  {/* Vertical Bar */}
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '26px',
                      height: `${heightPercent}%`,
                      backgroundColor: isToday ? colors.freshLime : '#E5E1D4',
                      border: `1.5px solid ${colors.deepForest}`,
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease',
                      boxShadow: isToday ? '0 0 8px rgba(201, 243, 106, 0.6)' : 'none',
                    }}
                  />

                  {/* Day Label */}
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: isToday ? 800 : 600,
                      color: isToday ? colors.deepForest : colors.mutedGrey,
                    }}
                  >
                    {day.dayName.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bank & Payout Configuration Info Card */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '18px',
            backgroundColor: '#F5F3EB',
            border: `1.5px solid ${colors.deepForest}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: colors.pureWhite,
                border: `1.5px solid ${colors.deepForest}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.deepForest,
              }}
            >
              <Landmark size={18} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest, display: 'block' }}>
                Bank Payout Account (Demo)
              </span>
              <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
                HDFC Bank • A/C Ending in **4921 • Daily Auto-Sweep
              </span>
            </div>
          </div>

          <ShieldCheck size={18} color={colors.driverOnline} />
        </div>

        {/* Recent Trip Receipts */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: colors.deepForest }}>
              Recent Trip Settlements
            </span>
            <span style={{ fontSize: '11px', color: colors.mutedGrey, fontWeight: 600 }}>
              {earnings.recentTrips.length} completed
            </span>
          </div>

          {earnings.recentTrips.length === 0 ? (
            <div
              style={{
                padding: '28px 20px',
                borderRadius: '20px',
                backgroundColor: colors.pureWhite,
                border: `2px solid ${colors.deepForest}`,
                textAlign: 'center',
              }}
            >
              <Car size={32} color={colors.mutedGrey} style={{ margin: '0 auto 8px' }} />
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: colors.deepForest }}>
                No trips completed today yet
              </p>
              <span style={{ fontSize: '11px', color: colors.mutedGrey, marginTop: '4px', display: 'block' }}>
                Switch Online on the dashboard to accept simulated passenger requests.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {earnings.recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    backgroundColor: colors.pureWhite,
                    border: `1.5px solid ${colors.deepForest}`,
                    boxShadow: shadows.subtle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: colors.mutedGrey }}>
                        {trip.timestamp}
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
                        {trip.paymentMode}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        fontWeight: 700,
                        color: colors.deepForest,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {trip.pickupName} → {trip.destinationName}
                    </p>

                    <span style={{ fontSize: '10px', color: colors.mutedGrey }}>
                      {trip.distanceKm} km • {trip.durationMinutes} mins
                    </span>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '16px',
                        fontWeight: 800,
                        color: colors.deepForest,
                        display: 'block',
                      }}
                    >
                      +₹{trip.fareEarned}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: colors.driverOnline,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '2px',
                      }}
                    >
                      <CheckCircle2 size={10} /> Credited
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
