import React from 'react';
import {
  MdPercent,
  MdInfoOutline,
} from 'react-icons/md';

export const CommissionDetails = () => {
  const categories = [
    { category: 'Consumer Electronics & Audio', rate: '5.5%', closingFee: '₹15', fulfillmentFee: '₹35' },
    { category: 'Wearables & Smartwatches', rate: '6.0%', closingFee: '₹15', fulfillmentFee: '₹30' },
    { category: 'Mobile Accessories & Chargers', rate: '8.0%', closingFee: '₹10', fulfillmentFee: '₹25' },
    { category: 'Fashion & Footwear', rate: '10.0%', closingFee: '₹20', fulfillmentFee: '₹40' },
    { category: 'Home & Kitchen Appliances', rate: '7.5%', closingFee: '₹25', fulfillmentFee: '₹55' },
  ];

  return (
    <div className="commission-details-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Marketplace Commission Schedule</h4>
          <p className="text-muted small mb-0">
            Standard category-wise referral fees, closing charges and fulfillment rates for merchants.
          </p>
        </div>
      </div>

      <div className="alert alert-info d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
        <MdInfoOutline size={20} />
        <span>No listing fee! Platform commissions are only deducted after a buyer successfully receives an order.</span>
      </div>

      {/* Responsive Table with Sr. No */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Product Category</th>
                <th className="py-3">Platform Commission Rate</th>
                <th className="py-3">Order Closing Fee</th>
                <th className="py-3">Standard Courier Fulfillment</th>
                <th className="py-3 text-end px-4">Effective Rate</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3 fw-semibold text-dark">{c.category}</td>
                  <td className="py-3 fw-bold text-primary">{c.rate}</td>
                  <td className="py-3 text-muted small">{c.closingFee}</td>
                  <td className="py-3 text-muted small">{c.fulfillmentFee}</td>
                  <td className="py-3 text-end px-4">
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      Competitive Rate
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

export default CommissionDetails;
