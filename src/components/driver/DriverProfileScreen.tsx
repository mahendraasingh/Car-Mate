import React, { useState } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { DriverPartnerProfile } from '../../types/driver';
import type { VehicleCategory } from '../../types/passenger';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  Star,
  CheckCircle2,
  FileCheck,
  Edit3,
  Save,
  X,
} from 'lucide-react';

interface DriverProfileScreenProps {
  profile: DriverPartnerProfile;
  onUpdateProfile: (updated: DriverPartnerProfile) => void;
  onBack: () => void;
}

export const DriverProfileScreen: React.FC<DriverProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onBack,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(profile.fullName);
  const [phone, setPhone] = useState<string>(profile.phone);
  const [email, setEmail] = useState<string>(profile.email);
  const [city, setCity] = useState<string>(profile.city);
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>(profile.vehicle.category);
  const [makeModel, setMakeModel] = useState<string>(profile.vehicle.makeModel);
  const [registrationNumber, setRegistrationNumber] = useState<string>(profile.vehicle.registrationNumber);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Full name is required');
      return;
    }

    const updatedProfile: DriverPartnerProfile = {
      ...profile,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      vehicle: {
        ...profile.vehicle,
        category: vehicleCategory,
        categoryLabel:
          vehicleCategory === 'auto'
            ? 'SAFAR Auto-Rickshaw'
            : vehicleCategory === 'suv'
            ? 'SAFAR Prime SUV'
            : 'SAFAR Prime Sedan / Compact Cab',
        makeModel: makeModel.trim(),
        registrationNumber: registrationNumber.trim(),
      },
    };

    onUpdateProfile(updatedProfile);
    setIsEditing(false);
    setSaveSuccessMsg('Driver profile & vehicle successfully saved to local storage!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleCancel = () => {
    setFullName(profile.fullName);
    setPhone(profile.phone);
    setEmail(profile.email);
    setCity(profile.city);
    setVehicleCategory(profile.vehicle.category);
    setMakeModel(profile.vehicle.makeModel);
    setRegistrationNumber(profile.vehicle.registrationNumber);
    setIsEditing(false);
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
      aria-label="Driver Partner Profile and Commercial Fleet Details"
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
            Driver Profile
          </h1>
          <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
            Fleet Partner Hub (Demo)
          </span>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit Profile"
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              backgroundColor: colors.freshLime,
              border: `1.5px solid ${colors.deepForest}`,
              color: colors.deepForest,
              fontSize: '11px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <Edit3 size={12} />
            <span>Edit</span>
          </button>
        ) : (
          <div style={{ width: '40px' }} />
        )}
      </header>

      {/* Main Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Success Alert */}
        {saveSuccessMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '14px',
              backgroundColor: '#EDF8EE',
              border: `1.5px solid ${colors.driverOnline}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.deepForest,
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            <CheckCircle2 size={16} color={colors.driverOnline} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Profile Identity Card */}
        <div
          style={{
            padding: '20px',
            borderRadius: '24px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Avatar with Ring */}
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              border: `3px solid ${colors.deepForest}`,
              overflow: 'hidden',
              marginBottom: '10px',
              boxShadow: '0 4px 12px rgba(23, 43, 42, 0.15)',
              backgroundColor: '#EDE9DE',
            }}
          >
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 800,
              color: colors.deepForest,
              margin: '0 0 4px',
            }}
          >
            {profile.fullName}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
                border: `1px solid ${colors.deepForest}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Star size={11} fill={colors.deepForest} /> {profile.rating} Rating
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#F0ECE1',
                color: colors.deepForest,
              }}
            >
              Partner since {profile.joinedYear}
            </span>
          </div>

          {/* Quick 3 Metrics Pill Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              width: '100%',
              paddingTop: '12px',
              borderTop: '1px solid #EBE7DC',
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>Total Rides</span>
              <p style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800, color: colors.deepForest }}>
                {profile.totalTripsCompleted}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>Acceptance</span>
              <p style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800, color: colors.driverOnline }}>
                {profile.acceptanceRatePercent}%
              </p>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>Region</span>
              <p style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800, color: colors.deepForest }}>
                {profile.city}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form (View or Edit) */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Personal Details Section */}
          <div
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              boxShadow: shadows.subtle,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest, textTransform: 'uppercase' }}>
              Personal Information
            </span>

            {/* Full Name */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  <User size={15} color={colors.mutedGrey} />
                  <span>{profile.fullName}</span>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  <Phone size={15} color={colors.mutedGrey} />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  <Mail size={15} color={colors.mutedGrey} />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            {/* Operating City */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Operating City / Hub
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  <MapPin size={15} color={colors.mutedGrey} />
                  <span>{profile.city}</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              boxShadow: shadows.subtle,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest, textTransform: 'uppercase' }}>
              Assigned Commercial Vehicle
            </span>

            {/* Vehicle Category */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Vehicle Class
              </label>
              {isEditing ? (
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value as VehicleCategory)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    backgroundColor: colors.pureWhite,
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="compact_cab">Prime Sedan / Compact Cab</option>
                  <option value="auto">SAFAR Auto-Rickshaw</option>
                  <option value="suv">SAFAR Prime SUV</option>
                  <option value="small_cab">SAFAR Mini Cab</option>
                </select>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  <Car size={15} color={colors.mutedGrey} />
                  <span>{profile.vehicle.categoryLabel}</span>
                </div>
              )}
            </div>

            {/* Make / Model */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Vehicle Make & Model
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ fontSize: '13px', fontWeight: 700, color: colors.deepForest }}>
                  {profile.vehicle.makeModel}
                </div>
              )}
            </div>

            {/* Registration Number */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: colors.mutedGrey, display: 'block', marginBottom: '4px' }}>
                Commercial Plate Number (Demo)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${colors.deepForest}`,
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      fontWeight: 800,
                      backgroundColor: colors.freshLime,
                      color: colors.deepForest,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${colors.deepForest}`,
                    }}
                  >
                    {profile.vehicle.registrationNumber}
                  </span>
                  <span style={{ fontSize: '10px', color: colors.mutedGrey }}>(Demo verified plate)</span>
                </div>
              )}
            </div>
          </div>

          {/* Verification & KYC Documents (Placeholder Notice) */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '20px',
              backgroundColor: '#F5F3EB',
              border: '1.5px solid #DDD9CD',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCheck size={16} color={colors.deepForest} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest }}>
                Commercial Documents (KYC Demo)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: colors.mutedGrey }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Driving License (LMV Commercial):</span>
                <span style={{ fontWeight: 700, color: colors.driverOnline }}>Verified (Demo)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Vehicle Insurance Expiry:</span>
                <span style={{ fontWeight: 700, color: colors.deepForest }}>{profile.vehicle.insuranceExpiryDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Commercial Permit Number:</span>
                <span style={{ fontWeight: 700, color: colors.deepForest }}>{profile.vehicle.commercialPermitNumber}</span>
              </div>
            </div>

            <span style={{ fontSize: '10px', color: '#888F8C', fontStyle: 'italic', marginTop: '4px' }}>
              * Placeholders for future onboarding. Document uploads and government ID checks will be added in backend phase.
            </span>
          </div>

          {/* Edit Actions: Save / Cancel */}
          {isEditing && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  height: '48px',
                  borderRadius: '16px',
                  backgroundColor: '#ECE8DF',
                  border: `2px solid ${colors.deepForest}`,
                  color: colors.deepForest,
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <X size={16} />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                style={{
                  height: '48px',
                  borderRadius: '16px',
                  backgroundColor: colors.freshLime,
                  border: `2px solid ${colors.deepForest}`,
                  boxShadow: shadows.doodleSticker,
                  color: colors.deepForest,
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Save size={16} />
                <span>SAVE CHANGES</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
