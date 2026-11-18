import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MdArrowBack,
  MdPrint,
  MdLocalShipping,
  MdPerson,
  MdLocationOn,
  MdCheckCircle,
} from 'react-icons/md';

export const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = {
    id: id || 'ORD-90812',
    date: '18 Nov 2026, 03:15 PM',
    customer: 'Aarav Sharma',
    phone: '+91 98112 34567',
    email: 'aarav.sharma@gmail.com',
    shippingAddress: 'Flat 402, Sunrise Towers, Link Road, Andheri West, Mumbai, MH - 400053',
    item: 'ShopKart ANC Wireless Headphones V2',
    sku: 'SKU-HEAD-001',
    qty: 1,
    price: 2499,
    shippingFee: 0,
    taxes: 450,
    total: 2499,
    paymentMethod: 'Prepaid (UPI - Google Pay)',
    courier: 'Delhivery Surface Logistics',
    trackingNumber: 'DEL9081283921',
    status: 'Ready for Courier Pickup',
  };

  return (
    <div className="order-details-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <button
            className="btn btn-sm btn-link text-decoration-none text-muted p-0 mb-1 d-flex align-items-center gap-1"
            onClick={() => navigate('/orders')}
          >
            <MdArrowBack size={16} /> Back to All Orders
          </button>
          <h4 className="fw-bold mb-0 text-dark">Order Overview ({order.id})</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 px-3 py-2 small fw-semibold bg-white shadow-xs">
            <MdPrint size={18} /> Print Tax Invoice
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 small fw-semibold shadow-xs">
            <MdLocalShipping size={18} /> Print Shipping Label
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Order Items & Summary */}
        <div className="col-12 col-lg-8">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <h6 className="fw-bold text-dark mb-3">Purchased Items</h6>
            <div className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="fs-2">🎧</div>
                <div>
                  <h6 className="fw-bold mb-0 text-dark">{order.item}</h6>
                  <span className="font-monospace text-muted small">{order.sku}</span>
                </div>
              </div>
              <div className="text-end">
                <div className="fw-bold text-dark">₹{order.price}</div>
                <small className="text-muted">Qty: {order.qty}</small>
              </div>
            </div>

            <div className="border-top pt-3 small text-muted">
              <div className="d-flex justify-content-between py-1">
                <span>Item Subtotal:</span>
                <span className="text-dark fw-semibold">₹{order.price}</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span>Shipping & Packaging:</span>
                <span className="text-success fw-semibold">FREE</span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span>GST Tax (Included 18%):</span>
                <span className="text-dark">₹{order.taxes}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-top mt-2 fs-6 text-dark fw-bold">
                <span>Total Customer Paid:</span>
                <span className="text-primary">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Logistics Tracking */}
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
              <MdLocalShipping className="text-primary" size={20} /> Courier Dispatch Status
            </h6>
            <div className="small text-muted mb-3">
              Courier Partner: <strong className="text-dark">{order.courier}</strong> • Tracking AWB:{' '}
              <span className="font-monospace text-primary fw-bold">{order.trackingNumber}</span>
            </div>
            <div className="p-3 bg-success-subtle text-success border border-success-subtle rounded-3 small fw-medium d-flex align-items-center gap-2">
              <MdCheckCircle size={18} /> Manifested & Ready for Courier Rider Handover
            </div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="col-12 col-lg-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <MdPerson className="text-primary" size={20} /> Buyer Information
            </h6>
            <div className="fw-semibold text-dark mb-1">{order.customer}</div>
            <div className="text-muted small mb-1">{order.phone}</div>
            <div className="text-muted small mb-3">{order.email}</div>
            <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
              {order.paymentMethod}
            </span>
          </div>

          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <MdLocationOn className="text-primary" size={20} /> Delivery Destination
            </h6>
            <p className="text-muted small mb-0">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
