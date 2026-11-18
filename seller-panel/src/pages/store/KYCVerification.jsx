import React, { useState } from 'react';
import {
  MdVerifiedUser,
  MdCheckCircle,
  MdHourglassEmpty,
  MdCloudUpload,
  MdAssignment,
  MdInsertDriveFile,
} from 'react-icons/md';

export const KYCVerification = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'GSTIN Certificate (REG-06)',
      number: '07AABCS1429B1Z8',
      type: 'PDF Document (2.4 MB)',
      status: 'Verified',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      date: '14 Jan 2024',
    },
    {
      id: 2,
      title: 'Company PAN Card',
      number: 'AABCS1429B',
      type: 'Scanned Image (1.1 MB)',
      status: 'Verified',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      date: '14 Jan 2024',
    },
    {
      id: 3,
      title: 'Authorized Signatory Aadhaar Card',
      number: '•••• •••• 9812',
      type: 'Masked Aadhaar Card (890 KB)',
      status: 'Verified',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      date: '15 Jan 2024',
    },
    {
      id: 4,
      title: 'Cancelled Cheque / Bank Statement',
      number: 'HDFC Bank •••••8921',
      type: 'PDF Cheque Copy (1.8 MB)',
      status: 'Verified',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      date: '16 Jan 2024',
    },
  ]);

  return (
    <div className="kyc-verification-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Merchant KYC & Regulatory Compliance</h4>
          <p className="text-muted small mb-0">
            Government regulatory identity verification for legal Indian e-commerce seller onboarding.
          </p>
        </div>
        <div>
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1">
            <MdCheckCircle size={16} /> 100% KYC Approved Seller
          </span>
        </div>
      </div>

      {/* KYC Progress Banner */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 text-white" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 bg-white bg-opacity-20 rounded-circle text-white fs-2 d-flex align-items-center justify-content-center">
            <MdVerifiedUser />
          </div>
          <div>
            <h5 className="fw-bold mb-1">Full Tier-1 Merchant Clearance Active</h5>
            <p className="text-white-50 small mb-0">
              Your business identity documents have been fully authenticated against GSTN and NSDL databases. Unlimited order fulfillment allowed.
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white mb-4">
        <div className="card-header bg-white py-3 px-4 border-bottom d-flex align-items-center justify-content-between">
          <h6 className="fw-bold mb-0 text-dark">Submitted Compliance Documents</h6>
          <button className="btn btn-sm btn-outline-primary rounded-3 px-3 fw-semibold d-flex align-items-center gap-1">
            <MdCloudUpload size={16} /> Upload Additional License
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Document Title</th>
                <th className="py-3">Identifier / Document ID</th>
                <th className="py-3">File Format & Size</th>
                <th className="py-3">Approval Date</th>
                <th className="py-3 text-end px-4">Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-2">
                      <MdInsertDriveFile className="text-primary" size={20} />
                      <strong className="text-dark">{doc.title}</strong>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="font-monospace fw-semibold text-dark">{doc.number}</span>
                  </td>
                  <td className="py-3 text-muted small">{doc.type}</td>
                  <td className="py-3 text-muted small">{doc.date}</td>
                  <td className="py-3 text-end px-4">
                    <span className={`badge rounded-pill px-3 py-1 fw-medium ${doc.statusClass}`}>
                      {doc.status}
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

export default KYCVerification;
