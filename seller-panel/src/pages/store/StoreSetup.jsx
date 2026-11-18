import React, { useState } from 'react';
import {
  MdStore,
  MdCheckCircle,
  MdArrowForward,
  MdLocationCity,
  MdLocalShipping,
  MdAccountBalance,
} from 'react-icons/md';

export const StoreSetup = () => {
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState({
    storeName: 'Boss Elite Store',
    tagline: 'Best Indian direct wholesale prices & gadgets',
    category: 'Electronics & Mobiles',
    pickupPincode: '122016',
    pickupCity: 'Gurugram',
    pickupState: 'Haryana',
    addressLine: 'Plot 42, Udyog Vihar Phase 4',
    returnAddressSame: true,
  });

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="store-setup-page">
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1 text-dark">Store Onboarding & Setup Wizard</h4>
        <p className="text-muted small mb-0">
          Complete your 3-step merchant configuration to start receiving instant buyer orders.
        </p>
      </div>

      {/* Wizard Progress Steps */}
      <div className="card border shadow-sm p-3 mb-4 rounded-4 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <div className={`d-flex align-items-center gap-2 ${step >= 1 ? 'text-primary fw-bold' : 'text-muted'}`}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '32px', height: '32px' }}>
              1
            </div>
            <span className="small d-none d-sm-inline">Store Details</span>
          </div>

          <div className="flex-grow-1 mx-3" style={{ height: '2px', backgroundColor: step >= 2 ? '#2874F0' : '#E0E0E0' }}></div>

          <div className={`d-flex align-items-center gap-2 ${step >= 2 ? 'text-primary fw-bold' : 'text-muted'}`}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '32px', height: '32px' }}>
              2
            </div>
            <span className="small d-none d-sm-inline">Pickup & Warehouse</span>
          </div>

          <div className="flex-grow-1 mx-3" style={{ height: '2px', backgroundColor: step >= 3 ? '#2874F0' : '#E0E0E0' }}></div>

          <div className={`d-flex align-items-center gap-2 ${step >= 3 ? 'text-primary fw-bold' : 'text-muted'}`}>
            <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${step >= 3 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '32px', height: '32px' }}>
              3
            </div>
            <span className="small d-none d-sm-inline">Store Verification</span>
          </div>
        </div>
      </div>

      {/* Step Forms */}
      <div className="card border shadow-sm p-4 rounded-4 bg-white" style={{ maxWidth: '820px' }}>
        {step === 1 && (
          <form onSubmit={nextStep}>
            <h5 className="fw-bold text-dark mb-3">Step 1: Store Branding & Identity</h5>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">Store Public Display Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Boss Elite Store"
                required
                value={storeData.storeName}
                onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">Store Tagline / Bio</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Best wholesale prices for genuine electronics"
                value={storeData.tagline}
                onChange={(e) => setStoreData({ ...storeData, tagline: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-semibold text-dark">Primary Selling Category</label>
              <select
                className="form-select"
                value={storeData.category}
                onChange={(e) => setStoreData({ ...storeData, category: e.target.value })}
              >
                <option value="Electronics & Mobiles">Electronics & Mobiles</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold">
              <span>Next: Pickup Address</span>
              <MdArrowForward size={18} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={nextStep}>
            <h5 className="fw-bold text-dark mb-3">Step 2: Courier Pickup Location</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-dark">Warehouse Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="122016"
                  required
                  value={storeData.pickupPincode}
                  onChange={(e) => setStoreData({ ...storeData, pickupPincode: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-dark">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gurugram"
                  required
                  value={storeData.pickupCity}
                  onChange={(e) => setStoreData({ ...storeData, pickupCity: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-dark">State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Haryana"
                  required
                  value={storeData.pickupState}
                  onChange={(e) => setStoreData({ ...storeData, pickupState: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold text-dark">Detailed Street Address / Landmark</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Plot / Shed / Building number and street"
                required
                value={storeData.addressLine}
                onChange={(e) => setStoreData({ ...storeData, addressLine: e.target.value })}
              ></textarea>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="sameReturn"
                checked={storeData.returnAddressSame}
                onChange={(e) => setStoreData({ ...storeData, returnAddressSame: e.target.checked })}
              />
              <label className="form-check-label small text-muted" htmlFor="sameReturn">
                Use same address for customer return pickups (RTO)
              </label>
            </div>

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary px-3 py-2 rounded-3" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold">
                <span>Next: Final Verification</span>
                <MdArrowForward size={18} />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-4">
            <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
              <MdCheckCircle size={40} />
            </div>
            <h4 className="fw-bold text-dark mb-1">Store Setup Completed!</h4>
            <p className="text-muted small mb-4">
              Your store <strong>{storeData.storeName}</strong> is ready. Courier partners (Delhivery, Ekart) have verified your warehouse location.
            </p>
            <div className="p-3 bg-light rounded-3 border text-start small mb-4 mx-auto" style={{ maxWidth: '480px' }}>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Registered Name:</span>
                <span className="fw-bold text-dark">{storeData.storeName}</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Pickup Location:</span>
                <span className="text-dark">{storeData.pickupCity}, {storeData.pickupState} ({storeData.pickupPincode})</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Catalog Status:</span>
                <span className="badge bg-success">Ready to List</span>
              </div>
            </div>
            <button className="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-xs" onClick={() => setStep(1)}>
              Edit Setup Parameters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreSetup;
