import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  MdPhoneAndroid,
  MdVerified,
  MdArrowForward,
  MdRefresh,
  MdLock,
} from 'react-icons/md';

export const SellerOTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '+91 98765 43210';

  const [otp, setOtp] = useState(['5', '8', '2', '9', '1', '4']);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
      // Successful verification
      navigate('/');
    } else {
      setError('Please enter complete 6-digit OTP');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" style={{ backgroundColor: '#F1F3F6' }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white text-center" style={{ maxWidth: '480px', width: '100%' }}>
        <div className="mx-auto mb-3 p-3 rounded-circle bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px' }}>
          <MdPhoneAndroid size={36} />
        </div>

        <h4 className="fw-bold text-dark mb-1">Verify Seller Phone</h4>
        <p className="text-muted small mb-3">
          We have sent a 6-digit security code to <br />
          <strong className="text-dark font-monospace">{phone}</strong>
        </p>

        {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

        <form onSubmit={handleVerify}>
          <div className="d-flex justify-content-center gap-2 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="form-control text-center fw-bold fs-4 bg-light border"
                style={{ width: '48px', height: '56px', borderRadius: '12px' }}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-xs mb-3">
            <span>Verify & Proceed to Dashboard</span>
            <MdArrowForward size={18} />
          </button>
        </form>

        <div className="d-flex align-items-center justify-content-center gap-2 small text-muted">
          <span>Didn't receive code?</span>
          {timer > 0 ? (
            <span className="fw-medium text-primary">Resend in {timer}s</span>
          ) : (
            <button
              type="button"
              className="btn btn-link p-0 small text-primary fw-bold text-decoration-none"
              onClick={() => setTimer(45)}
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="mt-4 pt-3 border-top small">
          <Link to="/login" className="text-muted text-decoration-none">
            Back to Login Screen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerOTPVerification;
