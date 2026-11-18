import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdArrowBack,
  MdSave,
  MdCheckCircle,
} from 'react-icons/md';

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [productData, setProductData] = useState({
    title: 'ShopKart ANC Wireless Headphones V2',
    category: 'Electronics',
    brand: 'ShopKart Audio',
    sku: 'SKU-HEAD-001',
    sellingPrice: 2499,
    mrp: 4999,
    stock: 45,
    description: 'Premium active noise cancelling over-ear wireless headphones with 40h battery life.',
    hsnCode: '85183000',
    taxRate: '18%',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      navigate('/products');
    }, 1200);
  };

  return (
    <div className="edit-product-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <button
            className="btn btn-sm btn-link text-decoration-none text-muted p-0 mb-1 d-flex align-items-center gap-1"
            onClick={() => navigate('/products')}
          >
            <MdArrowBack size={16} /> Back to Products Catalog
          </button>
          <h4 className="fw-bold mb-0 text-dark">Edit Product Details ({id || 'PROD-101'})</h4>
        </div>
      </div>

      {saved && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Product changes saved successfully! Returning to catalog...</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark mb-3">Product Information</h6>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={productData.title}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Category</label>
                  <select
                    className="form-select"
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Brand Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-0">
                <label className="form-label small fw-semibold text-dark">Product Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* Pricing & Stock Card */}
            <div className="card border shadow-sm p-4 rounded-4 bg-white">
              <h6 className="fw-bold text-dark mb-3">Pricing & Inventory</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Selling Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productData.sellingPrice}
                    onChange={(e) => setProductData({ ...productData, sellingPrice: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">MRP (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productData.mrp}
                    onChange={(e) => setProductData({ ...productData, mrp: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Warehouse Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productData.stock}
                    onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark mb-3">Catalog Actions</h6>
              <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-xs mb-2">
                <MdSave size={20} /> Update Listing
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 rounded-3"
                onClick={() => navigate('/products')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
