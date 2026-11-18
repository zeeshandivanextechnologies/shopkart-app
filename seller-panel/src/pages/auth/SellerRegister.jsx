import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdStorefront,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLock,
  MdBusiness,
  MdArrowForward,
  MdCheckCircle,
} from 'react-icons/md';

export const SellerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    storeName: '',
    email: '',
    phone: '',
    password: '',
    gstin: '',
    agreeTerms: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration redirect to OTP verification with phone
    navigate('/verify-otp', { state: { phone: formData.phone || '+91 98765 43210' } });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: '#F1F3F6' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '920px', width: '100%' }}>
        <div className="row g-0">
          {/* Left Info Column */}
          <div className="col-lg-5 p-4 p-md-5 text-white d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #2874F0 0%, #1254C2 100%)' }}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="p-2 rounded-3 bg-white bg-opacity-20 d-flex align-items-center justify-content-center">
                  <MdStorefront size={28} />
                </div>
                <div>
                  <h4 className="fw-bold mb-0">ShopKart</h4>
                  <small className="text-white-50">Multi-Vendor Seller Central</small>
                </div>
              </div>
              <h3 className="fw-bold mb-3">Grow Your Online Merchant Business</h3>
              <p className="text-white-50 small mb-4">
                Join over 5,000+ Indian suppliers and direct manufacturers selling to millions of active buyers across India.
              </p>
              <div className="d-flex flex-column gap-3 small">
                <div className="d-flex align-items-center gap-2">
                  <MdCheckCircle className="text-warning" size={18} />
                  <span>Lowest marketplace commission rates</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <MdCheckCircle className="text-warning" size={18} />
                  <span>Fast 7-day automated bank settlements</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <MdCheckCircle className="text-warning" size={18} />
                  <span>Integrated logistics & doorstep pickup</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top border-white border-opacity-25 small text-white-50">
              Already a registered seller? <Link to="/login" className="text-white fw-bold text-decoration-none">Sign In Here</Link>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="col-lg-7 p-4 p-md-5 bg-white">
            <h4 className="fw-bold text-dark mb-1">Create Seller Account</h4>
            <p className="text-muted small mb-4">Enter your business information to register as a verified supplier</p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Owner Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdPerson className="text-muted" size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-start-0"
                      placeholder="e.g. Boss Developer"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Store / Business Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdStorefront className="text-muted" size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-start-0"
                      placeholder="e.g. Boss Electronics Hub"
                      required
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Official Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdEmail className="text-muted" size={18} />
                    </span>
                    <input
                      type="email"
                      className="form-control bg-light border-start-0"
                      placeholder="seller@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Mobile Number (For OTP)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdPhone className="text-muted" size={18} />
                    </span>
                    <input
                      type="tel"
                      className="form-control bg-light border-start-0"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">GSTIN Number (Optional for Books)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdBusiness className="text-muted" size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-start-0 text-uppercase"
                      placeholder="07AAAAA0000A1Z5"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Account Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdLock className="text-muted" size={18} />
                    </span>
                    <input
                      type="password"
                      className="form-control bg-light border-start-0"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeCheck"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  required
                />
                <label className="form-check-label small text-muted" htmlFor="agreeCheck">
                  I agree to ShopKart Seller Terms, Commission Policy & Fair Merchant Guidelines.
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-xs">
                <span>Continue to OTP Verification</span>
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
