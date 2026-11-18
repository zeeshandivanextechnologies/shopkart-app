import React, { useState } from 'react';
import {
  MdAccountBalance,
  MdCheckCircle,
  MdShield,
  MdSave,
  MdEdit,
  MdInfoOutline,
} from 'react-icons/md';

export const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountHolder: 'Boss Developer Enterprise Pvt Ltd',
    bankName: 'HDFC Bank Ltd',
    accountNumber: '50200084928172',
    confirmAccountNumber: '50200084928172',
    ifscCode: 'HDFC0001234',
    branchName: 'Cyber City Branch, Gurugram',
    accountType: 'Current Account',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bank-details-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Bank Account & Settlement Information</h4>
          <p className="text-muted small mb-0">
            Configure your verified business bank account where all customer sale proceeds are credited.
          </p>
        </div>
        <div>
          {!isEditing ? (
            <button
              className="btn btn-outline-primary rounded-3 px-3 py-2 fw-semibold d-flex align-items-center gap-2 bg-white"
              onClick={() => setIsEditing(true)}
            >
              <MdEdit size={18} /> Update Bank Account
            </button>
          ) : (
            <button
              className="btn btn-outline-secondary rounded-3 px-3 py-2 fw-semibold"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Penny drop verification passed! Bank account details updated successfully.</span>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-4">
              <div className="d-flex align-items-center gap-2">
                <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3">
                  <MdAccountBalance size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">Primary Payout Beneficiary</h6>
                  <small className="text-muted">NEFT / RTGS / IMPS Enabled</small>
                </div>
              </div>
              <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-medium d-flex align-items-center gap-1">
                <MdCheckCircle size={14} /> Penny Drop Verified
              </span>
            </div>

            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Beneficiary Account Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEditing}
                  value={bankInfo.accountHolder}
                  onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                />
                <small className="text-muted">Must match name on GSTIN and cancelled cheque.</small>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled={!isEditing}
                    value={bankInfo.bankName}
                    onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Account Type</label>
                  <select
                    className="form-select"
                    disabled={!isEditing}
                    value={bankInfo.accountType}
                    onChange={(e) => setBankInfo({ ...bankInfo, accountType: e.target.value })}
                  >
                    <option value="Current Account">Current Account (Recommended for GST)</option>
                    <option value="Savings Account">Savings Account (Individual Proprietor)</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Bank Account Number</label>
                  <input
                    type="password"
                    className="form-control font-monospace"
                    disabled={!isEditing}
                    value={bankInfo.accountNumber}
                    onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">IFSC Code</label>
                  <input
                    type="text"
                    className="form-control font-monospace text-uppercase"
                    disabled={!isEditing}
                    value={bankInfo.ifscCode}
                    onChange={(e) => setBankInfo({ ...bankInfo, ifscCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold text-dark">Bank Branch Address</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEditing}
                  value={bankInfo.branchName}
                  onChange={(e) => setBankInfo({ ...bankInfo, branchName: e.target.value })}
                />
              </div>

              {isEditing && (
                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold shadow-xs">
                  <MdSave size={18} /> Save & Verify Bank Account
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Security & Payout Timing Card */}
        <div className="col-12 col-lg-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
              <MdShield className="text-success" size={20} /> Bank Security Guarantee
            </h6>
            <p className="text-muted small mb-3">
              We deposit ₹1.00 into your account to verify active status before releasing weekly merchant settlements.
            </p>
            <div className="p-3 bg-light rounded-3 border small">
              <div className="fw-semibold text-dark mb-1">Weekly Payout Day:</div>
              <div className="text-muted">Every Wednesday by 02:00 PM via automated RBI clearing.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
