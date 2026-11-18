import React, { useState } from 'react';
import {
  MdAssignmentReturn,
  MdCheckCircle,
  MdCancel,
  MdSearch,
} from 'react-icons/md';

export const ReturnRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [returns, setReturns] = useState([
    {
      id: 'RET-8921',
      orderId: 'ORD-90799',
      date: '17 Nov 2026',
      customer: 'Deepak Mehra',
      product: 'ShopKart ANC Wireless Headphones V2',
      reason: 'Color slightly different than expected',
      refundAmount: '₹2,499',
      status: 'Return Approved',
      statusClass: 'bg-info-subtle text-info-emphasis border border-info-subtle',
    },
    {
      id: 'RET-8920',
      orderId: 'ORD-90782',
      date: '16 Nov 2026',
      customer: 'Ananya Roy',
      product: 'Ultra Fast GaN 65W Charger',
      reason: 'Buyer changed mind (Seal intact)',
      refundAmount: '₹1,299',
      status: 'Pending Inspection',
      statusClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
    },
    {
      id: 'RET-8919',
      orderId: 'ORD-90740',
      date: '14 Nov 2026',
      customer: 'Kunal Joshi',
      product: 'Smart Fitness Tracker Band 7 Pro',
      reason: 'Package delivered in damaged outer box',
      refundAmount: '₹1,899',
      status: 'Refund Processed',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
    },
  ]);

  const filtered = returns.filter((r) =>
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="return-requests-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Customer Return & RTO Requests</h4>
          <p className="text-muted small mb-0">
            Inspect returned shipments arriving at warehouse and verify refund settlements.
          </p>
        </div>
      </div>

      {/* Responsive Table with Sr. No */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Return ID & Date</th>
                <th className="py-3">Customer & Order</th>
                <th className="py-3">Returned Item</th>
                <th className="py-3">Customer Return Reason</th>
                <th className="py-3">Refund Amount</th>
                <th className="py-3 text-end px-4">Return Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ret, index) => (
                <tr key={ret.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-dark font-monospace">{ret.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{ret.date}</div>
                  </td>
                  <td className="py-3">
                    <div className="fw-semibold text-dark">{ret.customer}</div>
                    <span className="text-muted small font-monospace">{ret.orderId}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-dark small fw-medium">{ret.product}</span>
                  </td>
                  <td className="py-3 text-muted small" style={{ maxWidth: '240px' }}>
                    {ret.reason}
                  </td>
                  <td className="py-3 fw-bold text-dark">{ret.refundAmount}</td>
                  <td className="py-3 text-end px-4">
                    <span className={`badge rounded-pill px-3 py-1 fw-medium ${ret.statusClass}`}>
                      {ret.status}
                    </span>
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

export default ReturnRequests;
