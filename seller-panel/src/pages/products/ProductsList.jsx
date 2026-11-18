import React, { useState } from 'react';
import {
  MdAdd,
  MdSearch,
  MdFilterList,
  MdEdit,
  MdDeleteOutline,
  MdCheckCircle,
  MdWarningAmber,
  MdInventory,
  MdCategory,
  MdCurrencyRupee,
  MdClose,
} from 'react-icons/md';

export const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

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

  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Electronics',
    price: '',
    mrp: '',
    stock: '',
    sku: '',
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;

    const created = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      title: newProduct.title,
      sku: newProduct.sku || `SKU-${Date.now().toString().slice(-4)}`,
      category: newProduct.category,
      price: Number(newProduct.price),
      mrp: Number(newProduct.mrp || newProduct.price * 1.5),
      stock: Number(newProduct.stock || 10),
      status: Number(newProduct.stock) > 5 ? 'Active' : 'Low Stock',
      image: '📦',
    };

    setProducts([created, ...products]);
    setShowAddModal(false);
    setNewProduct({ title: '', category: 'Electronics', price: '', mrp: '', stock: '', sku: '' });
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Catalog & Inventory Management</h4>
          <p className="text-muted small mb-0">
            Add new items, track warehouse stocks, and control price markdowns.
          </p>
        </div>
        <div>
          <button
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold shadow-xs"
            onClick={() => setShowAddModal(true)}
          >
            <MdAdd size={20} /> Add New Product
          </button>
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
                placeholder="Search by product name, SKU ID..."
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
              Showing <strong>{filtered.length}</strong> of {products.length} Products
            </span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="py-3 px-4">Item & SKU</th>
                <th className="py-3">Category</th>
                <th className="py-3">Selling Price</th>
                <th className="py-3">Available Stock</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4">
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
                      <button className="btn btn-sm btn-outline-secondary p-1 rounded-2" title="Edit Product">
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

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)', zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white py-3 px-4 d-flex align-items-center justify-content-between">
                <h5 className="modal-title fw-bold fs-6 mb-0">Add New Product to Store</h5>
                <button type="button" className="btn btn-sm btn-link text-white p-1 rounded-circle" onClick={() => setShowAddModal(false)}>
                  <MdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleAddProduct}>
                <div className="modal-body p-4 bg-light">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Product Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Wireless Noise Cancelling Earbuds"
                      required
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-dark">Category</label>
                      <select
                        className="form-select"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Fashion">Fashion</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-dark">SKU Code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. SKU-EAR-99"
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-4">
                      <label className="form-label small fw-semibold text-dark">Selling Price (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="1499"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label small fw-semibold text-dark">MRP (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="2999"
                        value={newProduct.mrp}
                        onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label small fw-semibold text-dark">Initial Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="25"
                        required
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-white px-4 py-3 d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary btn-sm px-3" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm px-4 fw-semibold">
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
