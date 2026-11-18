import React, { useState } from 'react';
import {
  MdStore,
  MdLocationOn,
  MdNotifications,
  MdSecurity,
  MdSave,
  MdCheckCircle,
} from 'react-icons/md';

export const SettingsHub = () => {
  const [saved, setSaved] = useState(false);
  const [storeData, setStoreData] = useState({
    storeName: 'Boss Elite Fashion & Tech Store',
    contactPerson: 'Boss (Super Merchant)',
    email: 'boss.developer@gmail.com',
    phone: '+91 98765 43210',
    warehouseAddress: 'Plot 42, Udyog Vihar Phase 4, Gurugram, Haryana - 122016',
    autoAcceptOrders: true,
    smsAlerts: true,
    emailInvoice: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Store & Business Preferences</h4>
          <p className="text-muted small mb-0">
            Manage your store information, pickup warehouse location, and order notifications.
          </p>
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>All store profile and warehouse configurations have been updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="row g-4">
          {/* General Information */}
          <div className="col-12 col-lg-7">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <MdStore className="text-primary" size={20} /> Business Identity
              </h6>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Store Public Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={storeData.storeName}
                  onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })}
                />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold text-dark">Primary Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    value={storeData.contactPerson}
                    onChange={(e) => setStoreData({ ...storeData, contactPerson: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold text-dark">Business Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={storeData.phone}
                    onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-0">
                <label className="form-label small fw-semibold text-dark">Official Communication Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={storeData.email}
                  onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Warehouse Dispatch Location */}
            <div className="card border shadow-sm p-4 rounded-4 bg-white">
              <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <MdLocationOn className="text-primary" size={20} /> Courier Pickup Warehouse
              </h6>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Full Warehouse Address for Courier Logistics</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={storeData.warehouseAddress}
                  onChange={(e) => setStoreData({ ...storeData, warehouseAddress: e.target.value })}
                ></textarea>
                <small className="text-muted">Delhivery, Ekart and BlueDart riders arrive at this address for daily pickup.</small>
              </div>
            </div>
          </div>

          {/* Operational Controls & Notifications */}
          <div className="col-12 col-lg-5">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <MdNotifications className="text-primary" size={20} /> Automated Dispatch Rules
              </h6>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="autoAccept"
                  checked={storeData.autoAcceptOrders}
                  onChange={(e) => setStoreData({ ...storeData, autoAcceptOrders: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold text-dark" htmlFor="autoAccept">
                  Auto-Accept Incoming Orders
                </label>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                  Automatically move orders into "Packing" without manual click.
                </div>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="smsAlert"
                  checked={storeData.smsAlerts}
                  onChange={(e) => setStoreData({ ...storeData, smsAlerts: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold text-dark" htmlFor="smsAlert">
                  Instant SMS & WhatsApp Dispatch Alerts
                </label>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                  Get notified when courier arrives for warehouse pickup.
                </div>
              </div>

              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailInv"
                  checked={storeData.emailInvoice}
                  onChange={(e) => setStoreData({ ...storeData, emailInvoice: e.target.checked })}
                />
                <label className="form-check-label small fw-semibold text-dark" htmlFor="emailInv">
                  Automated B2B Tax Invoicing
                </label>
                <div className="text-muted" style={{ fontSize: '11px' }}>
                  Generate and email GST e-way bills directly to buyers.
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-xs">
              <MdSave size={20} /> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsHub;
