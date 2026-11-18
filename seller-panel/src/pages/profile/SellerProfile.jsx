import React, { useState } from 'react';
import {
  MdPerson,
  MdStorefront,
  MdEmail,
  MdPhone,
  MdVerified,
  MdLocationOn,
  MdEdit,
  MdSave,
  MdCheckCircle,
  MdShield,
} from 'react-icons/md';

export const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Boss (Super Merchant)',
    storeName: 'Boss Elite Fashion & Tech Store',
    email: 'boss.developer@gmail.com',
    phone: '+91 98765 43210',
    gstin: '07AABCS1429B1Z8',
    sellerId: 'SLR-904128',
    joinedDate: '12 January 2024',
    tier: 'Platinum Plus Partner',
    rating: '4.9 ★',
    address: 'Plot 42, Udyog Vihar Phase 4, Gurugram, Haryana - 122016',
    bankAccount: '••••••••••8921 (HDFC Bank)',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="seller-profile-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Seller Merchant Profile</h4>
          <p className="text-muted small mb-0">
            View and manage your registered merchant credentials, business rating and verified badges.
          </p>
        </div>
        <div>
          {!isEditing ? (
            <button
              className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-xs"
              onClick={() => setIsEditing(true)}
            >
              <MdEdit size={18} /> Edit Profile Info
            </button>
          ) : (
            <button
              className="btn btn-outline-secondary rounded-3 px-3 py-2 fw-semibold"
              onClick={() => setIsEditing(false)}
            >
              Cancel Editing
            </button>
          )}
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Seller credentials updated successfully!</span>
        </div>
      )}

      <div className="row g-4">
        {/* Left Column: Avatar & Trust Badges */}
        <div className="col-12 col-lg-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white text-center mb-4">
            <div
              className="avatar-lg bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fs-1 fw-bold mx-auto mb-3 shadow-sm"
              style={{ width: '90px', height: '90px' }}
            >
              B
            </div>
            <h5 className="fw-bold text-dark mb-1 d-flex align-items-center justify-content-center gap-1">
              {profile.name}
              <MdVerified className="text-primary" size={18} title="Verified Merchant" />
            </h5>
            <p className="text-muted small mb-2">{profile.storeName}</p>
            <div className="d-flex justify-content-center gap-2 mb-3">
              <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-medium">
                {profile.tier}
              </span>
              <span className="badge bg-success text-white px-3 py-1 rounded-pill fw-medium">
                {profile.rating}
              </span>
            </div>

            <div className="border-top pt-3 text-start small">
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Seller ID</span>
                <span className="font-monospace fw-bold text-dark">{profile.sellerId}</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">GSTIN Status</span>
                <span className="text-success fw-bold">Verified</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Member Since</span>
                <span className="text-dark fw-medium">{profile.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="card border shadow-sm p-3 rounded-4 bg-white">
            <div className="d-flex align-items-center gap-2 text-success fw-semibold small mb-2">
              <MdShield size={20} /> Account Security Level
            </div>
            <div className="progress mb-2" style={{ height: '8px' }}>
              <div className="progress-bar bg-success" style={{ width: '100%' }}></div>
            </div>
            <small className="text-muted" style={{ fontSize: '11px' }}>
              100% Complete: KYC Approved, GSTIN Verified & Bank Validated.
            </small>
          </div>
        </div>

        {/* Right Column: Editable Business Details */}
        <div className="col-12 col-lg-8">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Merchant Information & Contact</h6>
            <form onSubmit={handleSave}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Proprietor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Store Public Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isEditing}
                    value={profile.storeName}
                    onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Registered Email</label>
                  <input
                    type="email"
                    className="form-control"
                    disabled={!isEditing}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Registered Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">GSTIN Registration</label>
                  <input
                    type="text"
                    className="form-control font-monospace text-uppercase"
                    disabled
                    value={profile.gstin}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Primary Payout Bank</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    disabled
                    value={profile.bankAccount}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-dark">Registered Business / Warehouse Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  disabled={!isEditing}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                ></textarea>
              </div>

              {isEditing && (
                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold">
                  <MdSave size={18} /> Save Profile Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
