import React, { useState } from 'react';
import {
  MdInventory,
  MdWarningAmber,
  MdSearch,
  MdRefresh,
  MdCheckCircle,
} from 'react-icons/md';

export const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [inventoryList, setInventoryList] = useState([
    {
      id: 'INV-01',
      product: 'ShopKart ANC Wireless Headphones V2',
      sku: 'SKU-HEAD-001',
      warehouseLocation: 'Bay 12 - Rack C',
      totalStock: 45,
      reservedOrders: 12,
      availableStock: 33,
      reorderLevel: 10,
      status: 'Healthy',
    },
    {
      id: 'INV-02',
      product: 'Smart Fitness Tracker Band 7 Pro',
      sku: 'SKU-BAND-002',
      warehouseLocation: 'Bay 04 - Rack A',
      totalStock: 82,
      reservedOrders: 15,
      availableStock: 67,
      reorderLevel: 20,
      status: 'Healthy',
    },
    {
      id: 'INV-03',
      product: 'Ultra Fast GaN 65W Charger',
      sku: 'SKU-CHRG-003',
      warehouseLocation: 'Bay 08 - Rack B',
      totalStock: 4,
      reservedOrders: 3,
      availableStock: 1,
      reorderLevel: 15,
      status: 'Critical Low',
    },
    {
      id: 'INV-04',
      product: 'Mechanical Gaming Keyboard RGB',
      sku: 'SKU-KEYB-004',
      warehouseLocation: 'Bay 15 - Rack D',
      totalStock: 0,
      reservedOrders: 0,
      availableStock: 0,
      reorderLevel: 5,
      status: 'Out of Stock',
    },
  ]);

  const filtered = inventoryList.filter((inv) =>
    inv.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-management-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Warehouse Inventory Management</h4>
          <p className="text-muted small mb-0">
            Monitor real-time allocated stock, reserved orders, and warehouse bay locations.
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
                <th className="py-3">SKU & Item Details</th>
                <th className="py-3">Warehouse Bay</th>
                <th className="py-3">Physical Stock</th>
                <th className="py-3">Reserved (In Packing)</th>
                <th className="py-3">Live Sellable Stock</th>
                <th className="py-3 text-end px-4">Inventory Health</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, index) => (
                <tr key={inv.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <div className="fw-semibold text-dark">{inv.product}</div>
                    <span className="font-monospace text-muted small">{inv.sku}</span>
                  </td>
                  <td className="py-3">
                    <span className="badge bg-light text-dark border px-2 py-1">{inv.warehouseLocation}</span>
                  </td>
                  <td className="py-3 fw-bold text-dark">{inv.totalStock} Units</td>
                  <td className="py-3 text-warning fw-medium">{inv.reservedOrders} Units</td>
                  <td className="py-3 fw-bold text-primary fs-6">{inv.availableStock} Units</td>
                  <td className="py-3 text-end px-4">
                    <span
                      className={`badge rounded-pill px-3 py-1 fw-medium ${
                        inv.status === 'Healthy'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : inv.status === 'Critical Low'
                          ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                          : 'bg-danger-subtle text-danger border border-danger-subtle'
                      }`}
                    >
                      {inv.status}
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

export default InventoryManagement;
