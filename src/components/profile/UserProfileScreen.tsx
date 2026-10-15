import React, { useState, useEffect } from 'react';
import { colors } from '../../theme/tokens';
import type { PassengerProfile, SavedPlace, VehicleCategory } from '../../types/passenger';
import { profileStorage } from '../../services/profileStorage';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Briefcase,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface UserProfileScreenProps {
  onBack: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ onBack }) => {
  const [profile, setProfile] = useState<PassengerProfile>(profileStorage.loadProfile());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(profile.fullName);
  const [phoneInput, setPhoneInput] = useState<string>(profile.phone);
  const [emailInput, setEmailInput] = useState<string>(profile.email);

  // New Saved Place Form
  const [showAddPlace, setShowAddPlace] = useState<boolean>(false);
  const [placeTitle, setPlaceTitle] = useState<string>('');
  const [placeAddress, setPlaceAddress] = useState<string>('');
  const [placeTag, setPlaceTag] = useState<'home' | 'work' | 'other'>('other');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setNameInput(profile.fullName);
    setPhoneInput(profile.phone);
    setEmailInput(profile.email);
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      showToast('Please enter your full name.');
      return;
    }
    const updated = profileStorage.updatePersonalInfo(nameInput, phoneInput, emailInput);
    setProfile(updated);
    setIsEditing(false);
    showToast('Personal information updated successfully!');
  };

  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeTitle.trim() || !placeAddress.trim()) {
      showToast('Please fill title and address for saved place.');
      return;
    }
    const updated = profileStorage.addSavedPlace({
      title: placeTitle.trim(),
      tag: placeTag,
      address: placeAddress.trim(),
      coordinates: { latitude: 28.48 + Math.random() * 0.05, longitude: 77.06 + Math.random() * 0.05 },
    });
    setProfile(updated);
    setPlaceTitle('');
    setPlaceAddress('');
    setShowAddPlace(false);
    showToast('Saved place added!');
  };

  const handleDeletePlace = (id: string) => {
    const updated = profileStorage.removeSavedPlace(id);
    setProfile(updated);
    showToast('Saved place removed.');
  };

  const handleUpdateVehiclePref = (category: VehicleCategory) => {
    const updated = profileStorage.updatePreferences({ preferredVehicle: category });
    setProfile(updated);
    showToast(`Preferred vehicle set to ${category.replace('_', ' ').toUpperCase()}`);
  };

  const handleToggleEco = () => {
    const updated = profileStorage.updatePreferences({
      ecoPoolingOptIn: !profile.preferences.ecoPoolingOptIn,
    });
    setProfile(updated);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        backgroundColor: colors.warmIvory,
        position: 'relative',
        boxSizing: 'border-box',
      }}
      aria-label="User Profile Screen"
    >
      {/* Top Profile Navigation Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(245, 242, 234, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.softBorder}`,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '9999px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 800,
            color: colors.deepForest,
            cursor: 'pointer',
            boxShadow: '1px 1px 0px #172B2A',
          }}
          aria-label="Back to Booking Screen"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            fontWeight: 800,
            color: colors.deepForest,
          }}
        >
          Passenger Profile
        </span>

        <div style={{ width: '60px' }} />
      </header>

      {/* Main Scrollable Content */}
      <main
        style={{
          padding: '16px 14px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Toast Alert */}
        {toastMessage && (
          <div
            role="status"
            style={{
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              borderRadius: '12px',
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: 700,
              color: colors.deepForest,
              boxShadow: '1px 2px 0px #172B2A',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <Sparkles size={14} color={colors.deepForest} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section A: Profile Identity Header */}
        <section
          style={{
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '1px 3px 0px #172B2A',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
              border: `2.5px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '1px 2px 0px #172B2A',
              fontSize: '22px',
              fontWeight: 800,
              color: colors.deepForest,
              flexShrink: 0,
            }}
          >
            {profile.fullName.charAt(0)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: colors.deepForest,
                  margin: 0,
                }}
              >
                {profile.fullName}
              </h2>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.deepForest}`,
                  borderRadius: '6px',
                  padding: '1px 5px',
                }}
              >
                PROTOTYPE
              </span>
            </div>

            <div style={{ fontSize: '12px', color: colors.mutedGrey, fontWeight: 600, marginTop: '2px' }}>
              {profile.phone}
            </div>

            <div style={{ fontSize: '11px', color: colors.mutedGrey, marginTop: '1px' }}>
              {profile.email}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            style={{
              backgroundColor: colors.warmIvory,
              border: `1.5px solid ${colors.deepForest}`,
              borderRadius: '10px',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              cursor: 'pointer',
              boxShadow: '1px 1px 0px #172B2A',
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </section>

        {/* Section B: Personal Information Form (When Editing) */}
        {isEditing && (
          <section
            style={{
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '1px 3px 0px #172B2A',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 800,
                color: colors.deepForest,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              EDIT PERSONAL DETAILS
            </span>

            <form onSubmit={handleSavePersonalInfo} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>Full Name</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colors.warmIvory, border: `1.5px solid ${colors.deepForest}`, borderRadius: '10px', padding: '6px 8px' }}>
                  <User size={13} color={colors.deepForest} />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colors.warmIvory, border: `1.5px solid ${colors.deepForest}`, borderRadius: '10px', padding: '6px 8px' }}>
                  <Phone size={13} color={colors.deepForest} />
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colors.warmIvory, border: `1.5px solid ${colors.deepForest}`, borderRadius: '10px', padding: '6px 8px' }}>
                  <Mail size={13} color={colors.deepForest} />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    height: '38px',
                    backgroundColor: colors.deepForest,
                    color: colors.pureWhite,
                    border: `1.5px solid ${colors.deepForest}`,
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '1px 2px 0px #172B2A',
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    height: '38px',
                    backgroundColor: colors.warmIvory,
                    color: colors.deepForest,
                    border: `1.5px solid ${colors.softBorder}`,
                    borderRadius: '10px',
                    padding: '0 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Section C: Saved Places Manager */}
        <section
          style={{
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '1px 3px 0px #172B2A',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 800,
                color: colors.deepForest,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              SAVED PLACES
            </span>

            <button
              type="button"
              onClick={() => setShowAddPlace(!showAddPlace)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: colors.warmIvory,
                border: `1.5px solid ${colors.deepForest}`,
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 800,
                color: colors.deepForest,
                cursor: 'pointer',
                boxShadow: '1px 1px 0px #172B2A',
              }}
            >
              <Plus size={13} />
              <span>Add</span>
            </button>
          </div>

          {/* Add New Place Form */}
          {showAddPlace && (
            <form onSubmit={handleAddPlace} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: colors.warmIvory, borderRadius: '12px', border: `1px solid ${colors.softBorder}` }}>
              <input
                type="text"
                placeholder="Place Title (e.g. Gym, Parents)"
                value={placeTitle}
                onChange={(e) => setPlaceTitle(e.target.value)}
                style={{ padding: '6px 8px', borderRadius: '8px', border: `1px solid ${colors.deepForest}`, fontSize: '12px', fontWeight: 700 }}
              />
              <input
                type="text"
                placeholder="Full Street Address"
                value={placeAddress}
                onChange={(e) => setPlaceAddress(e.target.value)}
                style={{ padding: '6px 8px', borderRadius: '8px', border: `1px solid ${colors.deepForest}`, fontSize: '12px', fontWeight: 600 }}
              />
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['home', 'work', 'other'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPlaceTag(t)}
                    style={{
                      flex: 1,
                      padding: '4px',
                      borderRadius: '6px',
                      border: `1px solid ${colors.deepForest}`,
                      backgroundColor: placeTag === t ? colors.freshLime : colors.pureWhite,
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                style={{
                  height: '32px',
                  backgroundColor: colors.deepForest,
                  color: colors.pureWhite,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Save Place
              </button>
            </form>
          )}

          {/* Places List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {profile.savedPlaces.map((place: SavedPlace) => (
              <div
                key={place.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.softBorder}`,
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      backgroundColor: colors.pureWhite,
                      border: `1px solid ${colors.deepForest}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {place.tag === 'home' && <Home size={14} color={colors.deepForest} />}
                    {place.tag === 'work' && <Briefcase size={14} color={colors.deepForest} />}
                    {place.tag === 'other' && <MapPin size={14} color={colors.deepForest} />}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest }}>
                      {place.title}
                    </div>
                    <div style={{ fontSize: '10px', color: colors.mutedGrey, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {place.address}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeletePlace(place.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.mutedGrey,
                    padding: '4px',
                  }}
                  title="Remove Saved Place"
                  aria-label={`Remove ${place.title}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section D: Profile Preferences */}
        <section
          style={{
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '1px 3px 0px #172B2A',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            RIDE PREFERENCES
          </span>

          {/* Preferred Vehicle */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.deepForest, marginBottom: '6px' }}>
              Default Vehicle Category:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {(['auto', 'small_cab', 'compact_cab', 'suv'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleUpdateVehiclePref(cat)}
                  style={{
                    padding: '6px 4px',
                    borderRadius: '8px',
                    border: `1.5px solid ${colors.deepForest}`,
                    backgroundColor: profile.preferences.preferredVehicle === cat ? colors.freshLime : colors.warmIvory,
                    fontSize: '10px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: profile.preferences.preferredVehicle === cat ? '1px 1px 0px #172B2A' : 'none',
                  }}
                >
                  {cat === 'auto' && 'Auto'}
                  {cat === 'small_cab' && 'Small'}
                  {cat === 'compact_cab' && 'Sedan'}
                  {cat === 'suv' && 'SUV'}
                </button>
              ))}
            </div>
          </div>

          {/* Eco Pooling Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.warmIvory,
              borderRadius: '12px',
              padding: '8px 10px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: colors.deepForest }}>
                Eco Smart Pooling Opt-In
              </div>
              <div style={{ fontSize: '10px', color: colors.mutedGrey }}>
                Automatically check co-riders along route to save 40% fare
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleEco}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '9999px',
                backgroundColor: profile.preferences.ecoPoolingOptIn ? colors.deepForest : colors.softBorder,
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: colors.pureWhite,
                  position: 'absolute',
                  top: '3px',
                  left: profile.preferences.ecoPoolingOptIn ? '21px' : '3px',
                  transition: 'left 0.2s ease',
                }}
              />
            </button>
          </div>
        </section>

        {/* Section E: Past Ride History */}
        <section
          style={{
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '1px 3px 0px #172B2A',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 800,
                color: colors.deepForest,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              PAST RIDE HISTORY (DEMO)
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>
              {profile.rideHistory.length} Trips
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {profile.rideHistory.map((trip) => (
              <div
                key={trip.id}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.softBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        backgroundColor: trip.vehicleCategory === 'auto' ? colors.doodleYellow : colors.freshLime,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        border: `1px solid ${colors.deepForest}`,
                        textTransform: 'uppercase',
                      }}
                    >
                      {trip.vehicleCategory.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>
                      {trip.date}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest, marginTop: '2px' }}>
                    {trip.pickupName} → {trip.destinationName}
                  </div>

                  <div style={{ fontSize: '10px', color: colors.mutedGrey, marginTop: '1px' }}>
                    {trip.driverName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: colors.deepForest }}>
                    ₹{trip.farePaid}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '9px', fontWeight: 700, color: '#166534' }}>
                    <Check size={11} strokeWidth={2.5} />
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footnote */}
        <div style={{ textAlign: 'center', fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
          <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          <span>Local Prototype Persistence Enabled • No cloud sync required</span>
        </div>
      </main>
    </div>
  );
};
