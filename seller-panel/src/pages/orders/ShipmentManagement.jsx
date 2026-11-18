import React, { useState } from 'react';
import {
  MdLocalShipping,
  MdPrint,
  MdSearch,
  MdCheckCircle,
} from 'react-icons/md';

export const ShipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [shipments] = useState([
    {
      id: 'SHP-7710',
      awb: 'DEL8819204918',
      orderId: 'ORD-90812',
      courier: 'Delhivery Surface',
      destination: 'Mumbai, MH (400053)',
      status: 'Out for Delivery',
      expectedDate: '19 Nov 2026',
      weight: '0.45 kg',
    },
    {
      id: 'SHP-7709',
      awb: 'BLU9918239102',
      orderId: 'ORD-90811',
      courier: 'BlueDart Air',
      destination: 'Bengaluru, KA (560001)',
      status: 'In Transit',
      expectedDate: '20 Nov 2026',
      weight: '0.30 kg',
    },
    {
      id: 'SHP-7708',
      awb: 'EKT7721948192',
      orderId: 'ORD-90810',
      courier: 'Ekart Logistics',
      destination: 'New Delhi, DL (110001)',
      status: 'Picked Up by Rider',
      expectedDate: '19 Nov 2026',
      weight: '0.25 kg',
    },
    {
      id: 'SHP-7707',
      awb: 'SFX6621948192',
      orderId: 'ORD-90809',
      courier: 'Shadowfax',
      destination: 'Chandigarh, PB (160017)',
      status: 'Delivered',
      expectedDate: '18 Nov 2026',
      weight: '1.10 kg',
    },
  ]);

  const filtered = shipments.filter((s) =>
    s.awb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shipment-management-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Logistics & Shipment Tracking</h4>
          <p className="text-muted small mb-0">
            Real-time courier transit status, tracking numbers (AWB) and delivery confirmations.
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
                <th className="py-3">Tracking AWB & Order</th>
                <th className="py-3">Courier Partner</th>
                <th className="py-3">Destination City</th>
                <th className="py-3">Parcel Weight</th>
                <th className="py-3">Delivery Status</th>
                <th className="py-3 text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => (
                <tr key={s.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <span className="fw-bold text-dark font-monospace">{s.awb}</span>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>Order: {s.orderId}</div>
                  </td>
                  <td className="py-3">
                    <span className="badge bg-light text-dark border px-2 py-1">{s.courier}</span>
                  </td>
                  <td className="py-3 text-dark small">{s.destination}</td>
                  <td className="py-3 text-muted small">{s.weight}</td>
                  <td className="py-3">
                    <span
                      className={`badge rounded-pill px-3 py-1 fw-medium ${
                        s.status === 'Delivered'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : s.status === 'Out for Delivery'
                          ? 'bg-primary-subtle text-primary border border-primary-subtle'
                          : 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-end px-4">
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1">
                      <MdPrint size={14} /> Label
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

export default ShipmentManagement;
