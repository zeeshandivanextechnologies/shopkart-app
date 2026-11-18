import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdSearch,
  MdFilterList,
  MdPrint,
  MdLocalShipping,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
} from 'react-icons/md';

export const OrdersList = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [orders, setOrders] = useState([
    {
      id: 'ORD-90812',
      date: '18 Nov 2026, 03:15 PM',
      customer: 'Aarav Sharma',
      city: 'Mumbai, MH',
      item: 'ShopKart ANC Wireless Headphones V2',
      qty: 1,
      total: '₹2,499',
      payment: 'Prepaid (UPI)',
      status: 'Pending',
      courier: 'Delhivery Express',
    },
    {
      id: 'ORD-90811',
      date: '18 Nov 2026, 02:40 PM',
      customer: 'Pooja Verma',
      city: 'Bengaluru, KA',
      item: 'Smart Fitness Tracker Band 7 Pro',
      qty: 2,
      total: '₹3,798',
      payment: 'Prepaid (Credit Card)',
      status: 'Accepted',
      courier: 'BlueDart Air',
    },
    {
      id: 'ORD-90810',
      date: '18 Nov 2026, 11:20 AM',
      customer: 'Rahul Nair',
      city: 'New Delhi, DL',
      item: 'Ultra Fast GaN 65W Charger',
      qty: 1,
      total: '₹1,299',
      payment: 'COD',
      status: 'Shipped',
      courier: 'Ekart Logistics',
    },
    {
      id: 'ORD-90809',
      date: '17 Nov 2026, 06:10 PM',
      customer: 'Simran Kaur',
      city: 'Chandigarh, PB',
      item: 'Mechanical Gaming Keyboard RGB',
      qty: 1,
      total: '₹4,199',
      payment: 'Prepaid (UPI)',
      status: 'Delivered',
      courier: 'Shadowfax',
    },
    {
      id: 'ORD-90808',
      date: '17 Nov 2026, 01:15 PM',
      customer: 'Vikas Gupta',
      city: 'Jaipur, RJ',
      item: 'Ergonomic Laptop Stand',
      qty: 1,
      total: '₹899',
      payment: 'COD',
      status: 'Rejected',
      courier: 'None',
    },
  ]);

  const filtered = orders.filter((o) => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.item.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Seller Customer Orders Hub</h4>
          <p className="text-muted small mb-0">
            Accept pending orders, inspect buyer delivery address, and initiate dispatch.
          </p>
        </div>
      </div>

      {/* Status Pills */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {['All', 'Pending', 'Accepted', 'Shipped', 'Delivered', 'Rejected'].map((st) => (
          <button
            key={st}
            className={`btn btn-sm rounded-pill px-3 py-1 fw-medium ${
              filterStatus === st ? 'btn-primary' : 'btn-light border bg-white text-secondary'
            }`}
            onClick={() => setFilterStatus(st)}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Responsive Table with Sr. No */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Order ID & Date</th>
                <th className="py-3">Customer & Destination</th>
                <th className="py-3">Ordered Item & Qty</th>
                <th className="py-3">Amount & Payment</th>
                <th className="py-3">Current Status</th>
                <th className="py-3 text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ord, index) => (
                <tr key={ord.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-dark font-monospace">{ord.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{ord.date}</div>
                  </td>
                  <td className="py-3">
                    <div className="fw-semibold text-dark">{ord.customer}</div>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{ord.city}</div>
                  </td>
                  <td className="py-3">
                    <div className="fw-medium text-dark text-truncate" style={{ maxWidth: '220px' }}>
                      {ord.item}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>Qty: {ord.qty} Unit</div>
                  </td>
                  <td className="py-3">
                    <div className="fw-bold text-dark">{ord.total}</div>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{ord.payment}</div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`badge rounded-pill px-3 py-1 fw-medium ${
                        ord.status === 'Delivered'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : ord.status === 'Shipped'
                          ? 'bg-info-subtle text-info-emphasis border border-info-subtle'
                          : ord.status === 'Accepted'
                          ? 'bg-primary-subtle text-primary border border-primary-subtle'
                          : ord.status === 'Pending'
                          ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                          : 'bg-danger-subtle text-danger border border-danger-subtle'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-end px-4">
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1 small d-inline-flex align-items-center gap-1"
                        onClick={() => navigate(`/orders/${ord.id}`)}
                      >
                        <MdVisibility size={14} /> View
                      </button>
                      {ord.status === 'Pending' && (
                        <>
                          <button
                            className="btn btn-sm btn-success rounded-pill px-2 py-1 text-white small"
                            onClick={() => navigate(`/orders/${ord.id}/accept`)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1 small"
                            onClick={() => navigate(`/orders/${ord.id}/reject`)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
