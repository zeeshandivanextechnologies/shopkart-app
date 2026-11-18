import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdStorefront,
  MdEmail,
  MdLock,
  MdArrowForward,
  MdShield,
  MdPhoneIphone,
} from 'react-icons/md';

export const SellerLogin = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [identifier, setIdentifier] = useState('boss.developer@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMethod === 'otp') {
      navigate('/verify-otp', { state: { phone: mobileNumber } });
    } else {
      // Direct login to dashboard
      navigate('/');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: '#F1F3F6' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '840px', width: '100%' }}>
        <div className="row g-0">
          {/* Left Hero Column */}
          <div className="col-lg-5 p-4 p-md-5 text-white d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #2874F0 0%, #1254C2 100%)' }}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="p-2 rounded-3 bg-white bg-opacity-20 d-flex align-items-center justify-content-center">
                  <MdStorefront size={28} />
                </div>
                <div>
                  <h4 className="fw-bold mb-0">ShopKart</h4>
                  <small className="text-white-50">Seller Command Portal</small>
                </div>
              </div>
              <h3 className="fw-bold mb-3">Welcome Back, Merchant!</h3>
              <p className="text-white-50 small mb-4">
                Log in to fulfill today's incoming orders, manage catalog pricing and inspect settlement statements.
              </p>
              <div className="p-3 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-20 small">
                <div className="fw-semibold mb-1 d-flex align-items-center gap-1">
                  <MdShield size={16} className="text-warning" /> 2-Factor Protected
                </div>
                <div className="text-white-50" style={{ fontSize: '11px' }}>
                  Bank-grade encryption safeguards your business payouts and customer database.
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top border-white border-opacity-25 small text-white-50">
              New to ShopKart marketplace? <Link to="/register" className="text-white fw-bold text-decoration-none">Register as Seller</Link>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="col-lg-7 p-4 p-md-5 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="fw-bold text-dark mb-0">Seller Sign In</h4>
              <div className="btn-group btn-group-sm">
                <button
                  type="button"
                  className={`btn ${loginMethod === 'password' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setLoginMethod('password')}
                >
                  Password
                </button>
                <button
                  type="button"
                  className={`btn ${loginMethod === 'otp' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setLoginMethod('otp')}
                >
                  Mobile OTP
                </button>
              </div>
            </div>
            <p className="text-muted small mb-4">
              {loginMethod === 'password'
                ? 'Sign in using your registered merchant email or Seller ID'
                : 'Enter your registered mobile number for instant 6-digit login OTP'}
            </p>

            <form onSubmit={handleSubmit}>
              {loginMethod === 'password' ? (
                <>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Email / Seller ID</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <MdEmail className="text-muted" size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light border-start-0"
                        placeholder="boss.developer@gmail.com"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label small fw-semibold text-dark mb-0">Password</label>
                      <a href="#" className="small text-primary text-decoration-none">Forgot Password?</a>
                    </div>
                    <div className="input-group mt-1">
                      <span className="input-group-text bg-light border-end-0">
                        <MdLock className="text-muted" size={18} />
                      </span>
                      <input
                        type="password"
                        className="form-control bg-light border-start-0"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-dark">Registered Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <MdPhoneIphone className="text-muted" size={18} />
                    </span>
                    <input
                      type="tel"
                      className="form-control bg-light border-start-0"
                      placeholder="+91 98765 43210"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                <label className="form-check-label small text-muted" htmlFor="rememberMe">
                  Keep me signed in on this workstation
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-xs">
                <span>{loginMethod === 'password' ? 'Access Seller Dashboard' : 'Send Verification OTP'}</span>
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
