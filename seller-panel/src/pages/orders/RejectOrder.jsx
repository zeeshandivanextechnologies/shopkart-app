import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdCancel,
  MdArrowBack,
  MdWarningAmber,
} from 'react-icons/md';

export const RejectOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [reason, setReason] = useState('Out of Stock / Inventory Mismatch');
  const [notes, setNotes] = useState('');

  const handleConfirmReject = (e) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      navigate('/orders');
    }, 1500);
  };

  return (
    <div className="reject-order-page">
      {/* Header */}
      <div className="mb-4">
        <button
          className="btn btn-sm btn-link text-decoration-none text-muted p-0 mb-1 d-flex align-items-center gap-1"
          onClick={() => navigate('/orders')}
        >
          <MdArrowBack size={16} /> Back to Orders
        </button>
        <h4 className="fw-bold mb-0 text-dark">Reject Customer Order ({id || 'ORD-90812'})</h4>
      </div>

      {confirmed && (
        <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCancel size={20} />
          <span>Order rejected. Buyer will receive full refund automatically. Returning to orders...</span>
        </div>
      )}

      <div className="card border shadow-sm p-4 rounded-4 bg-white" style={{ maxWidth: '680px' }}>
        <div className="alert alert-warning d-flex align-items-center gap-2 small mb-4">
          <MdWarningAmber size={20} />
          <span>Warning: Rejecting accepted customer orders frequently may affect your seller fulfillment SLA rating.</span>
        </div>

        <form onSubmit={handleConfirmReject}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark">Reason for Cancellation / Rejection *</label>
            <select
              className="form-select"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="Out of Stock / Inventory Mismatch">Out of Stock / Inventory Mismatch</option>
              <option value="Product Damaged During Warehouse Packaging">Product Damaged During Warehouse Packaging</option>
              <option value="Courier Service Unavailable for Buyer Pincode">Courier Service Unavailable for Buyer Pincode</option>
              <option value="Price Listing Error on Catalog">Price Listing Error on Catalog</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-dark">Internal Operational Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Optional notes for your warehouse logs..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
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
              className="btn btn-danger text-white d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold shadow-xs"
            >
              <MdCancel size={18} /> Confirm Order Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectOrder;
