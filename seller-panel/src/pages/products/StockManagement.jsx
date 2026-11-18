import React, { useState } from 'react';
import {
  MdAdd,
  MdRemove,
  MdSave,
  MdCheckCircle,
  MdRefresh,
} from 'react-icons/md';

export const StockManagement = () => {
  const [saved, setSaved] = useState(false);
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'ShopKart ANC Wireless Headphones V2', sku: 'SKU-HEAD-001', stock: 45 },
    { id: 2, name: 'Smart Fitness Tracker Band 7 Pro', sku: 'SKU-BAND-002', stock: 82 },
    { id: 3, name: 'Ultra Fast GaN 65W Charger', sku: 'SKU-CHRG-003', stock: 4 },
    { id: 4, name: 'Mechanical Gaming Keyboard RGB', sku: 'SKU-KEYB-004', stock: 0 },
    { id: 5, name: 'Ergonomic Memory Foam Laptop Stand', sku: 'SKU-STND-005', stock: 35 },
  ]);

  const updateQuantity = (id, delta) => {
    setStockItems(
      stockItems.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="stock-management-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Quick Stock Adjustment & Restock</h4>
          <p className="text-muted small mb-0">
            Instantly increment or decrement inventory levels directly without opening product edit forms.
          </p>
        </div>
        <div>
          <button
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-xs"
            onClick={handleSaveAll}
          >
            <MdSave size={18} /> Save Stock Updates
          </button>
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Stock levels updated and synchronized with live customer catalog!</span>
        </div>
      )}

      {/* Responsive Table with Sr. No */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Product Name & SKU</th>
                <th className="py-3">Current Stock Level</th>
                <th className="py-3">Adjust Stock Count</th>
                <th className="py-3 text-end px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <div className="fw-semibold text-dark">{item.name}</div>
                    <span className="font-monospace text-muted small">{item.sku}</span>
                  </td>
                  <td className="py-3">
                    <span className={`fw-bold fs-6 ${item.stock === 0 ? 'text-danger' : item.stock < 10 ? 'text-warning' : 'text-success'}`}>
                      {item.stock} Units Available
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="d-inline-flex align-items-center border rounded-3 bg-light p-1">
                      <button
                        className="btn btn-sm btn-white border shadow-xs px-2 py-1"
                        onClick={() => updateQuantity(item.id, -5)}
                        title="Reduce 5"
                      >
                        -5
                      </button>
                      <button
                        className="btn btn-sm btn-white border shadow-xs px-2 py-1 ms-1"
                        onClick={() => updateQuantity(item.id, -1)}
                        title="Reduce 1"
                      >
                        <MdRemove size={14} />
                      </button>
                      <span className="px-3 fw-bold text-dark">{item.stock}</span>
                      <button
                        className="btn btn-sm btn-white border shadow-xs px-2 py-1 me-1"
                        onClick={() => updateQuantity(item.id, 1)}
                        title="Add 1"
                      >
                        <MdAdd size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-white border shadow-xs px-2 py-1"
                        onClick={() => updateQuantity(item.id, 10)}
                        title="Add 10"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                  <td className="py-3 text-end px-4">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                      onClick={handleSaveAll}
                    >
                      Update
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

export default StockManagement;
