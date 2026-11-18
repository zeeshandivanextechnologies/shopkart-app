import React, { useState } from 'react';
import {
  MdMenu,
  MdNotificationsNone,
  MdSearch,
  MdKeyboardArrowDown,
  MdClose,
  MdStorefront,
  MdVerified,
  MdShield,
  MdLogout,
  MdEmail,
  MdPhone,
  MdQrCode2,
  MdStar,
  MdTrendingUp,
} from 'react-icons/md';

export const Header = ({ onToggleSidebar }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock Seller User Profile
  const sellerUser = {
    name: 'Boss (Super Merchant)',
    storeName: 'Boss Elite Fashion & Tech Store',
    email: 'boss.developer@gmail.com',
    phone: '+91 98765 43210',
    gstin: '07AABCS1429B1Z8',
    sellerId: 'SLR-904128',
    rating: '4.9',
    tier: 'Platinum Plus Partner',
  };

  return (
    <>
      <header className="seller-header d-flex align-items-center justify-content-between px-3 shadow-xs bg-white sticky-top">
        {/* Left: Sidebar Toggle + Search */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary border-0 rounded-3 p-2 d-flex align-items-center justify-content-center toggle-btn"
            onClick={onToggleSidebar}
            title="Toggle Sidebar Menu"
            aria-label="Toggle Sidebar Menu"
          >
            <MdMenu size={24} />
          </button>

          {/* Quick Search on Desktop */}
          <div className="search-bar d-none d-md-flex align-items-center bg-light rounded-pill px-3 py-2 border">
            <MdSearch className="text-muted me-2" size={18} />
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none p-0"
              placeholder="Search orders, SKU, products..."
              style={{ width: '260px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Right: Notifications + User Profile Modal Trigger */}
        <div className="d-flex align-items-center gap-3">
          {/* Notifications Dropdown */}
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle p-2 position-relative border d-flex align-items-center justify-content-center"
              title="Notifications"
              aria-label="Notifications"
              style={{ width: '40px', height: '40px' }}
            >
              <MdNotificationsNone className="text-secondary" size={22} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white p-1" style={{ fontSize: '10px' }}>
                3
              </span>
            </button>
          </div>

          <div className="vr d-none d-sm-block my-2" style={{ height: '24px' }}></div>

          {/* User Profile Pill -> Opens Modal on Click */}
          <button
            className="btn user-profile-btn d-flex align-items-center gap-2 p-1 pe-3 rounded-pill border bg-light shadow-xs"
            onClick={() => setShowUserModal(true)}
            title="Open Seller Profile Modal"
          >
            <div className="user-avatar-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-xs">
              B
            </div>
            <div className="d-none d-sm-block text-start" style={{ lineHeight: '1.25' }}>
              <div className="fw-semibold small text-dark d-flex align-items-center gap-1">
                {sellerUser.name}
                <MdVerified className="text-primary" size={14} />
              </div>
              <div className="text-muted" style={{ fontSize: '11px' }}>
                {sellerUser.tier}
              </div>
            </div>
            <MdKeyboardArrowDown className="text-muted small ms-1" size={18} />
          </button>
        </div>
      </header>

      {/* USER PROFILE MODAL */}
      {showUserModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Modal Header */}
              <div className="modal-header bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center">
                    <MdStorefront size={20} />
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold fs-6 mb-0">Merchant Account Overview</h5>
                    <small className="text-white-50" style={{ fontSize: '11px' }}>Multi-vendor Platform Profile</small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-link text-white p-1 rounded-circle"
                  onClick={() => setShowUserModal(false)}
                  aria-label="Close modal"
                >
                  <MdClose size={22} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4 bg-light">
                {/* User Card */}
                <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 border mb-3 shadow-sm">
                  <div
                    className="avatar-lg bg-gradient-primary text-white rounded-4 d-flex align-items-center justify-content-center fs-2 fw-bold shadow-sm"
                    style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #2874F0, #1254C2)' }}
                  >
                    B
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="fw-bold mb-1 text-dark d-flex align-items-center gap-1">
                      {sellerUser.name}
                      <MdVerified className="text-primary" size={16} title="Verified Merchant" />
                    </h6>
                    <div className="small text-muted text-truncate">{sellerUser.storeName}</div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2 py-1 small d-flex align-items-center gap-1">
                        <MdStar size={14} className="text-warning" /> {sellerUser.rating} Rating
                      </span>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-1 small d-flex align-items-center gap-1">
                        <MdTrendingUp size={14} /> Top Seller
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-3 border rounded-3 bg-white h-100 shadow-xs">
                      <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                        <MdQrCode2 size={16} /> Seller ID
                      </div>
                      <div className="fw-bold text-dark font-monospace">{sellerUser.sellerId}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 border rounded-3 bg-white h-100 shadow-xs">
                      <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                        <MdVerified size={16} className="text-success" /> Verified GSTIN
                      </div>
                      <div className="fw-bold text-success font-monospace">{sellerUser.gstin}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 border rounded-3 bg-white shadow-xs">
                      <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                        <MdEmail size={16} /> Business Contact Email
                      </div>
                      <div className="fw-semibold text-dark small">{sellerUser.email}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 border rounded-3 bg-white shadow-xs">
                      <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                        <MdPhone size={16} /> Dispatch Hotline / Phone
                      </div>
                      <div className="fw-semibold text-dark small">{sellerUser.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Security Trust badge */}
                <div className="d-flex align-items-center gap-2 p-2 px-3 bg-success-subtle text-success border border-success-subtle rounded-3 small">
                  <MdShield size={18} />
                  <span className="fw-medium">2-Factor Merchant Authentication & Payout Protection Active</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-white px-4 py-3 d-flex justify-content-between border-top">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 px-3 py-2 rounded-3"
                  onClick={() => {
                    setShowUserModal(false);
                    alert('Logging out of Seller Portal...');
                  }}
                >
                  <MdLogout size={16} /> Log Out
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-4 py-2 rounded-3 fw-semibold shadow-xs"
                  onClick={() => setShowUserModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
