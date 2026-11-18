import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdFilterList,
  MdEdit,
  MdDeleteOutline,
  MdCheckCircle,
  MdWarningAmber,
} from 'react-icons/md';

export const ManageProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [products, setProducts] = useState([
    {
      id: 'PROD-101',
      title: 'ShopKart ANC Wireless Headphones V2',
      sku: 'SKU-HEAD-001',
      category: 'Electronics',
      price: 2499,
      mrp: 4999,
      stock: 45,
      status: 'Active',
      image: '🎧',
    },
    {
      id: 'PROD-102',
      title: 'Smart Fitness Tracker Band 7 Pro',
      sku: 'SKU-BAND-002',
      category: 'Wearables',
      price: 1899,
      mrp: 3499,
      stock: 82,
      status: 'Active',
      image: '⌚',
    },
    {
      id: 'PROD-103',
      title: 'Ultra Fast GaN 65W Charger',
      sku: 'SKU-CHRG-003',
      category: 'Accessories',
      price: 1299,
      mrp: 2499,
      stock: 4,
      status: 'Low Stock',
      image: '🔌',
    },
    {
      id: 'PROD-104',
      title: 'Mechanical Gaming Keyboard RGB Backlit',
      sku: 'SKU-KEYB-004',
      category: 'Electronics',
      price: 4199,
      mrp: 6999,
      stock: 0,
      status: 'Out of Stock',
      image: '⌨️',
    },
    {
      id: 'PROD-105',
      title: 'Ergonomic Memory Foam Laptop Stand',
      sku: 'SKU-STND-005',
      category: 'Accessories',
      price: 899,
      mrp: 1499,
      stock: 35,
      status: 'Active',
      image: '💻',
    },
  ]);

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="manage-products-page">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Manage Products Catalog</h4>
          <p className="text-muted small mb-0">
            Control selling price, edit catalog specifications, and remove discontinued SKUs.
          </p>
        </div>
        <div>
          <Link
            to="/products/add"
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-xs"
          >
            <MdAdd size={20} /> Add New Listing
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border shadow-sm p-3 mb-4 bg-white rounded-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <MdSearch size={18} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0 shadow-none small"
                placeholder="Search by product name, SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select bg-light small shadow-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Wearables">Wearables</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="col-6 col-md-4 text-md-end">
            <span className="text-muted small">
              Showing <strong>{filtered.length}</strong> Products
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Table with Sr. No */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4" style={{ width: '80px' }}>Sr. No</th>
                <th className="py-3">Product Name & SKU</th>
                <th className="py-3">Category</th>
                <th className="py-3">Selling Price</th>
                <th className="py-3">Available Stock</th>
                <th className="py-3">Catalog Status</th>
                <th className="py-3 text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-3 p-2 bg-light rounded-3 border d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                        {item.image}
                      </div>
                      <div>
                        <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '280px' }}>
                          {item.title}
                        </div>
                        <div className="text-muted small font-monospace" style={{ fontSize: '11px' }}>
                          {item.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="badge bg-light text-dark border px-2 py-1">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="fw-bold text-dark">₹{item.price.toLocaleString('en-IN')}</div>
                    <small className="text-muted text-decoration-line-through" style={{ fontSize: '11px' }}>
                      ₹{item.mrp.toLocaleString('en-IN')}
                    </small>
                  </td>
                  <td className="py-3">
                    <span className={`fw-semibold ${item.stock === 0 ? 'text-danger' : item.stock < 10 ? 'text-warning' : 'text-success'}`}>
                      {item.stock} Units
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`badge rounded-pill px-3 py-1 fw-medium ${
                        item.status === 'Active'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : item.status === 'Low Stock'
                          ? 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
                          : 'bg-danger-subtle text-danger border border-danger-subtle'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-end px-4">
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <button
                        className="btn btn-sm btn-outline-primary p-1 rounded-2"
                        title="Edit Product"
                        onClick={() => navigate(`/products/edit/${item.id}`)}
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger p-1 rounded-2"
                        title="Delete Product"
                        onClick={() => setProducts(products.filter((p) => p.id !== item.id))}
                      >
                        <MdDeleteOutline size={16} />
                      </button>
                    </div>
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

export default ManageProducts;
