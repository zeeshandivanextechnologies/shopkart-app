import React, { useState } from 'react';
import {
  MdAccountBalance,
  MdArrowForward,
  MdCheckCircle,
  MdSecurity,
  MdCurrencyRupee,
} from 'react-icons/md';

export const WithdrawMoney = () => {
  const [amount, setAmount] = useState('25000');
  const [submitted, setSubmitted] = useState(false);
  const availableBalance = 68450;

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (Number(amount) > availableBalance || Number(amount) < 500) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="withdraw-money-page">
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Instant Merchant Balance Withdrawal</h4>
        <p className="text-muted small mb-0">
          Request early instant transfer of your cleared order balance directly via IMPS.
        </p>
      </div>

      {submitted && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Withdrawal request of ₹{amount} submitted! Funds will reflect in HDFC account within 15 minutes.</span>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Withdrawal Amount (₹)</h6>
            <form onSubmit={handleWithdraw}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Enter Amount to Transfer</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light fw-bold text-dark">₹</span>
                  <input
                    type="number"
                    className="form-control bg-light fw-bold text-dark"
                    placeholder="Enter amount"
                    min="500"
                    max={availableBalance}
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between small text-muted mt-2">
                  <span>Minimum: ₹500</span>
                  <span>Available: <strong className="text-primary">₹{availableBalance.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 border mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <small className="text-muted d-block">Destination Bank</small>
                    <strong className="text-dark">HDFC Bank Ltd (••••••••••8921)</strong>
                  </div>
                  <span className="badge bg-success-subtle text-success">Verified A/C</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-xs"
              >
                <span>Initiate Instant IMPS Transfer</span>
                <MdArrowForward size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Policy Card */}
        <div className="col-12 col-lg-5">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
              <MdSecurity className="text-primary" size={20} /> Payout Terms
            </h6>
            <div className="small text-muted">
              <div className="mb-2">
                <strong className="text-dark d-block">Instant IMPS Processing:</strong>
                Transfers occur 24x7 within 15 minutes of authorization.
              </div>
              <div className="mb-2">
                <strong className="text-dark d-block">Auto Wednesday Cycle:</strong>
                Regular scheduled settlements carry 0% processing fees.
              </div>
              <div>
                <strong className="text-dark d-block">RBI Compliance:</strong>
                All settlements comply with NSDL/GSTN seller clearance rules.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
