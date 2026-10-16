import React, { useState } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { DriverTripRecord } from '../../types/driver';
import {
  ArrowLeft,
  Clock,
  Car,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface DriverTripHistoryScreenProps {
  trips: DriverTripRecord[];
  onBack: () => void;
}

export const DriverTripHistoryScreen: React.FC<DriverTripHistoryScreenProps> = ({
  trips,
  onBack,
}) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'upi' | 'cash'>('all');
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);

  const filteredTrips = trips.filter((t) => {
    if (filter === 'today') return t.timestamp.includes('Today') || t.timestamp.includes('Just now');
    if (filter === 'upi') return t.paymentMode.toLowerCase().includes('upi') || t.paymentMode.toLowerCase().includes('online');
    if (filter === 'cash') return t.paymentMode.toLowerCase().includes('cash');
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedTripId((prev) => (prev === id ? null : id));
  };

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
      aria-label="Driver Partner Commercial Trip History"
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
            Trip History Log
          </h1>
          <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
            {trips.length} Verified Records (Demo)
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
          LOG BOOK
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {(
            [
              { id: 'all', label: 'All Trips' },
              { id: 'today', label: 'Today Only' },
              { id: 'upi', label: 'UPI / Online' },
              { id: 'cash', label: 'Cash Rides' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: `1.5px solid ${colors.deepForest}`,
                backgroundColor: filter === item.id ? colors.deepForest : colors.pureWhite,
                color: filter === item.id ? colors.freshLime : colors.deepForest,
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Trips List */}
        {filteredTrips.length === 0 ? (
          <div
            style={{
              padding: '36px 20px',
              borderRadius: '24px',
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              boxShadow: shadows.doodleSticker,
              textAlign: 'center',
            }}
          >
            <Car size={36} color={colors.mutedGrey} style={{ margin: '0 auto 10px' }} />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: colors.deepForest }}>
              No trips match this filter
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: colors.mutedGrey }}>
              Complete rides from the Driver Dashboard to populate your official trip history.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredTrips.map((trip) => {
              const isExpanded = expandedTripId === trip.id;

              return (
                <div
                  key={trip.id}
                  style={{
                    borderRadius: '20px',
                    backgroundColor: colors.pureWhite,
                    border: `2px solid ${colors.deepForest}`,
                    boxShadow: shadows.subtle,
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Trip Card Summary Row */}
                  <div
                    onClick={() => toggleExpand(trip.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleExpand(trip.id)}
                    style={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {/* Top Row: Timestamp, category badge, and fare */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: colors.deepForest,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Clock size={12} color={colors.mutedGrey} /> {trip.timestamp}
                        </span>
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#EBE7DD',
                            color: colors.deepForest,
                            textTransform: 'uppercase',
                          }}
                        >
                          {trip.vehicleCategory === 'auto' ? 'AUTO' : 'CAB'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '17px',
                            fontWeight: 800,
                            color: colors.deepForest,
                          }}
                        >
                          ₹{trip.fareEarned}
                        </span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {/* Route Locations */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: colors.freshLime,
                            border: `1.5px solid ${colors.deepForest}`,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: colors.deepForest,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {trip.pickupName}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: colors.doodleCoral,
                            border: `1.5px solid ${colors.deepForest}`,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: colors.deepForest,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {trip.destinationName}
                        </span>
                      </div>
                    </div>

                    {/* Footer Row: Distance, passenger, payment */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '6px',
                        borderTop: '1px solid #EFECE3',
                        fontSize: '10px',
                        color: colors.mutedGrey,
                        fontWeight: 600,
                      }}
                    >
                      <span>
                        {trip.distanceKm} km • {trip.durationMinutes} mins
                      </span>
                      <span style={{ color: colors.deepForest, fontWeight: 700 }}>
                        {trip.paymentMode} • {trip.passengerLabel}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Breakdown Drawer */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: '#FAF8F3',
                        borderTop: '1px dashed #D6D2C4',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        fontSize: '11px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.mutedGrey }}>
                        <span>Base Fare Charge:</span>
                        <span style={{ fontWeight: 700, color: colors.deepForest }}>₹{Math.round(trip.fareEarned * 0.35)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.mutedGrey }}>
                        <span>Distance Charge ({trip.distanceKm} km):</span>
                        <span style={{ fontWeight: 700, color: colors.deepForest }}>₹{Math.round(trip.fareEarned * 0.65)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.mutedGrey }}>
                        <span>Partner Commission:</span>
                        <span style={{ fontWeight: 800, color: colors.driverOnline }}>0% (Promotional Demo)</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '6px',
                          borderTop: '1px solid #E3DFD5',
                          fontWeight: 800,
                          color: colors.deepForest,
                        }}
                      >
                        <span>Total Payout Credited:</span>
                        <span style={{ color: colors.driverOnline }}>₹{trip.fareEarned}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
