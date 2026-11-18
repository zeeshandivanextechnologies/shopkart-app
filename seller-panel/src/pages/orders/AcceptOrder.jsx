import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdCheckCircle,
  MdArrowBack,
  MdLocalShipping,
  MdCalendarToday,
} from 'react-icons/md';

export const AcceptOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [courierPartner, setCourierPartner] = useState('Delhivery');
  const [pickupSlot, setPickupSlot] = useState('Today (Before 04:00 PM)');

  const handleConfirmAccept = (e) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      navigate('/orders');
    }, 1500);
  };

  return (
    <div className="accept-order-page">
      {/* Header */}
      <div className="mb-4">
        <button
          className="btn btn-sm btn-link text-decoration-none text-muted p-0 mb-1 d-flex align-items-center gap-1"
          onClick={() => navigate('/orders')}
        >
          <MdArrowBack size={16} /> Back to Orders
        </button>
        <h4 className="fw-bold mb-0 text-dark">Confirm Order Acceptance ({id || 'ORD-90812'})</h4>
      </div>

      {confirmed && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Order accepted successfully! Courier pickup slot reserved. Redirecting...</span>
        </div>
      )}

      <div className="card border shadow-sm p-4 rounded-4 bg-white" style={{ maxWidth: '680px' }}>
        <form onSubmit={handleConfirmAccept}>
          <div className="p-3 bg-light rounded-3 border mb-4">
            <div className="fw-bold text-dark mb-1">Customer Order: {id || 'ORD-90812'}</div>
            <div className="text-muted small">Item: ShopKart ANC Wireless Headphones V2 • 1 Unit (₹2,499)</div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark">Select Courier Pickup Partner</label>
            <select
              className="form-select"
              value={courierPartner}
              onChange={(e) => setCourierPartner(e.target.value)}
            >
              <option value="Delhivery">Delhivery Express (Recommended - Same Day)</option>
              <option value="Ekart Logistics">Ekart Logistics (Standard)</option>
              <option value="BlueDart Air">BlueDart Priority Air</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-dark">Warehouse Handover Slot</label>
            <select
              className="form-select"
              value={pickupSlot}
              onChange={(e) => setPickupSlot(e.target.value)}
            >
              <option value="Today (Before 04:00 PM)">Today (Before 04:00 PM - Immediate)</option>
              <option value="Tomorrow Morning (10:00 AM - 01:00 PM)">Tomorrow Morning (10:00 AM - 01:00 PM)</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary px-3 py-2 rounded-3"
              onClick={() => navigate('/orders')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success text-white d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold shadow-xs"
            >
              <MdCheckCircle size={18} /> Confirm Order & Generate AWB
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcceptOrder;
