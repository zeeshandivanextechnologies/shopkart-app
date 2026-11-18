import React, { useState } from 'react';
import {
  MdCheckCircle,
  MdHourglassEmpty,
  MdCancel,
  MdSearch,
  MdVisibility,
} from 'react-icons/md';

export const ProductApprovalStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [approvals] = useState([
    {
      id: 'REQ-401',
      product: 'ShopKart ANC Wireless Headphones V2',
      category: 'Electronics',
      submittedOn: '16 Nov 2026',
      status: 'Approved',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      remarks: 'Product packaging & GTIN barcode verified.',
    },
    {
      id: 'REQ-402',
      product: 'Magnetic Wireless Power Bank 10,000mAh',
      category: 'Mobile Accessories',
      submittedOn: '18 Nov 2026',
      status: 'Under Review',
      statusClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
      remarks: 'BIS certificate under quality inspection (ETA: 4h).',
    },
    {
      id: 'REQ-403',
      product: 'Generic Fast USB-C Cable (Unbranded)',
      category: 'Accessories',
      submittedOn: '14 Nov 2026',
      status: 'Rejected',
      statusClass: 'bg-danger-subtle text-danger border border-danger-subtle',
      remarks: 'High resolution white-background image missing.',
    },
    {
      id: 'REQ-404',
      product: 'Smart Fitness Tracker Band 7 Pro',
      category: 'Wearables',
      submittedOn: '12 Nov 2026',
      status: 'Approved',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      remarks: 'Ready for live buyer search.',
    },
  ]);

  const filtered = approvals.filter((a) =>
    a.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-approvals-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Catalog QC & Product Approvals</h4>
          <p className="text-muted small mb-0">
            Track brand approval status and quality check (QC) verifications from the ShopKart catalog team.
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
                <th className="py-3">Request ID & Submission</th>
                <th className="py-3">Product Name & Category</th>
                <th className="py-3">QC Status</th>
                <th className="py-3">Catalog Remarks / Reason</th>
                <th className="py-3 text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-dark font-monospace">{item.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>{item.submittedOn}</div>
                  </td>
                  <td className="py-3">
                    <div className="fw-semibold text-dark">{item.product}</div>
                    <span className="badge bg-light text-dark border small mt-1">{item.category}</span>
                  </td>
                  <td className="py-3">
                    <span className={`badge rounded-pill px-3 py-1 fw-medium ${item.statusClass}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted small" style={{ maxWidth: '280px' }}>
                    {item.remarks}
                  </td>
                  <td className="py-3 text-end px-4">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1">
                      View Details
                    </button>
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

export default ProductApprovalStatus;
