import React from 'react';
import {
  MdStorefront,
  MdLocationOn,
  MdCategory,
  MdAccessTime,
  MdLocalShipping,
  MdVerified,
  MdEdit,
} from 'react-icons/md';

export const StoreDetails = () => {
  return (
    <div className="store-details-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Store Information & Hub Details</h4>
          <p className="text-muted small mb-0">
            Official business profile displayed on the customer mobile app storefront.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Main Store Banner Card */}
        <div className="col-12 col-lg-8">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="p-3 bg-primary text-white rounded-4 fs-2 shadow-xs d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <MdStorefront />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-1 d-flex align-items-center gap-1">
                  Boss Elite Fashion & Tech Store
                  <MdVerified className="text-primary" size={18} />
                </h5>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1">
                  Active Direct Supplier
                </span>
              </div>
            </div>

            <p className="text-muted small mb-4">
              Authorized seller and distributor of high-quality electronics, wireless accessories and lifestyle gadgets directly to end consumers.
            </p>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-3 border">
                  <small className="text-muted d-block mb-1">Primary Marketplace Category</small>
                  <strong className="text-dark">Consumer Electronics & Audio</strong>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-3 border">
                  <small className="text-muted d-block mb-1">Store Return Policy Window</small>
                  <strong className="text-dark">7 Days Easy Buyer Returns</strong>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-3 border">
                  <small className="text-muted d-block mb-1">Average Dispatch SLA</small>
                  <strong className="text-success">&lt; 14 Hours (Fast Dispatch)</strong>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-light rounded-3 border">
                  <small className="text-muted d-block mb-1">Buyer Satisfaction Score</small>
                  <strong className="text-warning">4.9 / 5.0 (99.2% Positive)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Dispatch Timing */}
        <div className="col-12 col-lg-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <MdAccessTime className="text-primary" size={20} /> Warehouse Working Hours
            </h6>
            <div className="small text-muted">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Monday - Saturday</span>
                <strong className="text-dark">09:00 AM - 07:00 PM</strong>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Sunday</span>
                <span className="badge bg-warning text-dark">Half Day (Packing Only)</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Courier Cut-off Slot</span>
                <strong className="text-primary">04:00 PM Daily</strong>
              </div>
            </div>
          </div>

          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
              <MdLocalShipping className="text-primary" size={20} /> Integrated Couriers
            </h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <span className="badge bg-light text-dark border p-2">Ekart Logistics</span>
              <span className="badge bg-light text-dark border p-2">Delhivery Air</span>
              <span className="badge bg-light text-dark border p-2">BlueDart Surface</span>
              <span className="badge bg-light text-dark border p-2">Shadowfax Quick</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
