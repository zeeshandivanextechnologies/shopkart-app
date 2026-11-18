import React, { useState } from 'react';
import {
  MdAccountBalance,
  MdCurrencyRupee,
  MdCheckCircle,
  MdDownload,
} from 'react-icons/md';

export const PayoutHistory = () => {
  const payouts = [
    {
      id: 'PAY-8921',
      date: '18 Nov 2026',
      period: '11 Nov - 17 Nov 2026',
      grossAmount: '₹62,480.00',
      fees: '₹4,120.00',
      netAmount: '₹58,360.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR892104928172',
      status: 'Settled to Bank',
    },
    {
      id: 'PAY-8920',
      date: '11 Nov 2026',
      period: '04 Nov - 10 Nov 2026',
      grossAmount: '₹78,920.00',
      fees: '₹5,340.00',
      netAmount: '₹73,580.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR771092481944',
      status: 'Settled to Bank',
    },
    {
      id: 'PAY-8919',
      date: '04 Nov 2026',
      period: '28 Oct - 03 Nov 2026',
      grossAmount: '₹54,150.00',
      fees: '₹3,890.00',
      netAmount: '₹50,260.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR662194019283',
      status: 'Settled to Bank',
    },
    {
      id: 'PAY-8918',
      date: '28 Oct 2026',
      period: '21 Oct - 27 Oct 2026',
      grossAmount: '₹49,200.00',
      fees: '₹3,450.00',
      netAmount: '₹45,750.00',
      bank: 'HDFC Bank (•••• 8921)',
      utr: 'UTR552194018271',
      status: 'Settled to Bank',
    },
  ];

  return (
    <div className="payout-history-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Historical Bank Settlements (Payouts)</h4>
          <p className="text-muted small mb-0">
            Log of all weekly auto-transfers credited to your verified business bank account.
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
                <th className="py-3">Payout ID & Date</th>
                <th className="py-3">Fulfillment Period</th>
                <th className="py-3">Gross Sales</th>
                <th className="py-3">Commission Deductions</th>
                <th className="py-3">Net Bank Credit</th>
                <th className="py-3">UTR Reference</th>
                <th className="py-3 text-end px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p, index) => (
                <tr key={p.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-dark font-monospace">{p.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{p.date}</div>
                  </td>
                  <td className="py-3 text-dark small">{p.period}</td>
                  <td className="py-3 fw-semibold text-dark">{p.grossAmount}</td>
                  <td className="py-3 text-danger small">-{p.fees}</td>
                  <td className="py-3 fw-bold text-success fs-6">{p.netAmount}</td>
                  <td className="py-3 font-monospace small text-muted">{p.utr}</td>
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

export default PayoutHistory;
