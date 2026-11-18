import React, { useState } from 'react';
import {
  MdAccountBalance,
  MdCurrencyRupee,
  MdTrendingUp,
  MdFileDownload,
  MdCheckCircle,
  MdSchedule,
  MdReceiptLong,
} from 'react-icons/md';

export const PaymentsOverview = () => {
  const [payouts] = useState([
    {
      id: 'PAY-8921',
      period: '11 Nov - 17 Nov 2026',
      amount: '₹62,480.00',
      fees: '₹4,120.00',
      netAmount: '₹58,360.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR892104928172',
      status: 'Settled to Bank',
      date: '18 Nov 2026',
    },
    {
      id: 'PAY-8920',
      period: '04 Nov - 10 Nov 2026',
      amount: '₹78,920.00',
      fees: '₹5,340.00',
      netAmount: '₹73,580.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR771092481944',
      status: 'Settled to Bank',
      date: '11 Nov 2026',
    },
    {
      id: 'PAY-8919',
      period: '28 Oct - 03 Nov 2026',
      amount: '₹54,150.00',
      fees: '₹3,890.00',
      netAmount: '₹50,260.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR662194019283',
      status: 'Settled to Bank',
      date: '04 Nov 2026',
    },
  ]);

  return (
    <div className="payments-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Payouts & Bank Settlements</h4>
          <p className="text-muted small mb-0">
            Track daily sales payouts, marketplace commission deductions, and tax invoices.
          </p>
        </div>
        <div>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 small fw-semibold bg-white shadow-xs">
            <MdFileDownload size={18} /> Download GST Statement
          </button>
        </div>
      </div>

      {/* KPI Balances */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Next Upcoming Payout</span>
              <MdSchedule size={20} className="text-warning" />
            </div>
            <h3 className="fw-bold text-dark mb-1">₹34,180.50</h3>
            <small className="text-success fw-medium">Scheduled for Tomorrow (19 Nov)</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Settled in Last 30 Days</span>
              <MdCheckCircle size={20} className="text-success" />
            </div>
            <h3 className="fw-bold text-success mb-1">₹1,82,200.00</h3>
            <small className="text-muted">Directly credited to verified bank</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Linked Settlement Account</span>
              <MdAccountBalance size={20} className="text-primary" />
            </div>
            <h5 className="fw-bold text-dark mb-1">HDFC Bank Ltd</h5>
            <small className="text-muted font-monospace">A/C: ••••••••••8921 (IFSC: HDFC0001234)</small>
          </div>
        </div>
      </div>

      {/* Settlement History Table */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="card-header bg-white py-3 px-4 border-bottom d-flex align-items-center justify-content-between">
          <h6 className="fw-bold mb-0 text-dark">Payout History & Bank Transfers</h6>
          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1">
            Weekly Auto-Payout Cycle
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4">Cycle ID & Date</th>
                <th className="py-3">Sales Period</th>
                <th className="py-3">Gross Sales</th>
                <th className="py-3">Deductions / Fees</th>
                <th className="py-3">Net Settled Amount</th>
                <th className="py-3">Bank Reference (UTR)</th>
                <th className="py-3 text-end px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 px-4">
                    <span className="fw-bold text-dark font-monospace">{p.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{p.date}</div>
                  </td>
                  <td className="py-3">
                    <span className="small text-dark fw-medium">{p.period}</span>
                  </td>
                  <td className="py-3">
                    <span className="fw-semibold text-dark">{p.amount}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-danger small fw-medium">-{p.fees}</span>
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-success fs-6">{p.netAmount}</span>
                  </td>
                  <td className="py-3">
                    <span className="font-monospace small text-muted">{p.utr}</span>
                  </td>
                  <td className="py-3 text-end px-4">
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-medium">
                      {p.status}
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

export default PaymentsOverview;
