import React, { useState } from 'react';
import {
  MdAccountBalanceWallet,
  MdCurrencyRupee,
  MdTrendingUp,
  MdDownload,
} from 'react-icons/md';

export const EarningsOverview = () => {
  const [filterMonth, setFilterMonth] = useState('November 2026');

  const breakdown = [
    { label: 'Gross Product Sales', value: '₹4,82,500.00', color: 'text-dark fw-bold' },
    { label: 'Marketplace Platform Commission (Avg 6%)', value: '-₹28,950.00', color: 'text-danger fw-semibold' },
    { label: 'Logistics / Courier Shipping Fees', value: '-₹14,200.00', color: 'text-danger fw-semibold' },
    { label: 'GST on Services (18% on Fees)', value: '-₹7,767.00', color: 'text-danger fw-semibold' },
    { label: 'Customer Return Deductions (RTO)', value: '-₹3,400.00', color: 'text-danger fw-semibold' },
    { label: 'Net Seller Net Take-Home Settlement', value: '₹4,28,183.00', color: 'text-success fw-bold fs-5' },
  ];

  return (
    <div className="earnings-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Merchant Earnings & Revenue Balance</h4>
          <p className="text-muted small mb-0">
            Transparent revenue calculations, sales deductions, and net realizable business profit.
          </p>
        </div>
        <div>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 small fw-semibold bg-white shadow-xs">
            <MdDownload size={18} /> Download Tax Statement
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <span className="text-muted small">Total Realized Net Sales</span>
            <h2 className="fw-bold text-dark mt-1 mb-1">₹4,28,183.00</h2>
            <small className="text-success fw-medium">+16.4% growth vs previous month</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <span className="text-muted small">Available for Immediate Withdrawal</span>
            <h2 className="fw-bold text-primary mt-1 mb-1">₹68,450.00</h2>
            <small className="text-muted">Cleared from delivered orders</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <span className="text-muted small">In Escrow (Pending Delivery Window)</span>
            <h2 className="fw-bold text-warning mt-1 mb-1">₹34,180.00</h2>
            <small className="text-muted">Will clear after 7-day return period</small>
          </div>
        </div>
      </div>

      {/* Financial Statement Breakdown */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="card-header bg-white py-3 px-4 border-bottom d-flex align-items-center justify-content-between">
          <h6 className="fw-bold mb-0 text-dark">Monthly Earnings Ledger Breakdown ({filterMonth})</h6>
        </div>
        <div className="p-4">
          {breakdown.map((item, idx) => (
            <div className={`d-flex justify-content-between py-3 ${idx < breakdown.length - 1 ? 'border-bottom' : 'bg-light p-3 rounded-3 mt-2'}`} key={idx}>
              <span className="text-dark small fw-medium">{item.label}</span>
              <span className={item.color}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview;
