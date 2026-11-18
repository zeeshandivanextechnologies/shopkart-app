import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdCloudUpload,
  MdArrowBack,
  MdCheckCircle,
  MdInfoOutline,
} from 'react-icons/md';

export const AddProduct = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    category: 'Electronics',
    brand: '',
    sku: '',
    sellingPrice: '',
    mrp: '',
    stock: '',
    description: '',
    hsnCode: '',
    taxRate: '18%',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  return (
    <div className="add-product-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <button
            className="btn btn-sm btn-link text-decoration-none text-muted p-0 mb-1 d-flex align-items-center gap-1"
            onClick={() => navigate('/products')}
          >
            <MdArrowBack size={16} /> Back to Products Catalog
          </button>
          <h4 className="fw-bold mb-0 text-dark">Add New Product Listing</h4>
        </div>
      </div>

      {success && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Product submitted successfully! Sent for catalog QC verification. Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Main Info */}
          <div className="col-12 col-lg-8">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark mb-3">Product Basic Information</h6>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Product Title / Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. ShopKart ANC Wireless Headphones V2 - Active Noise Cancelling"
                  required
                  value={productData.title}
                  onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Category *</label>
                  <select
                    className="form-select"
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables & Smartwatches</option>
                    <option value="Mobile Accessories">Mobile Accessories</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-dark">Brand Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ShopKart Elite"
                    required
                    value={productData.brand}
                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-0">
                <label className="form-label small fw-semibold text-dark">Product Detailed Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Key features, warranty details, box contents..."
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* Pricing & Stock Card */}
            <div className="card border shadow-sm p-4 rounded-4 bg-white">
              <h6 className="fw-bold text-dark mb-3">Pricing, Stock & Taxation</h6>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Selling Price (₹) *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="2499"
                    required
                    value={productData.sellingPrice}
                    onChange={(e) => setProductData({ ...productData, sellingPrice: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">MRP (₹) *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="4999"
                    required
                    value={productData.mrp}
                    onChange={(e) => setProductData({ ...productData, mrp: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Available Stock Quantity *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="50"
                    required
                    value={productData.stock}
                    onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Seller SKU Code *</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    placeholder="SKU-HEAD-001"
                    required
                    value={productData.sku}
                    onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">HSN Code</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    placeholder="85183000"
                    value={productData.hsnCode}
                    onChange={(e) => setProductData({ ...productData, hsnCode: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-dark">Applicable GST Tax</label>
                  <select
                    className="form-select"
                    value={productData.taxRate}
                    onChange={(e) => setProductData({ ...productData, taxRate: e.target.value })}
                  >
                    <option value="18%">18% GST (Standard Electronics)</option>
                    <option value="12%">12% GST</option>
                    <option value="5%">5% GST (Apparel & Essentials)</option>
                    <option value="0%">0% Exempted</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Media Upload & Actions */}
          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
              <h6 className="fw-bold text-dark mb-3">Product High-Res Images</h6>
              <div className="border border-2 border-dashed rounded-4 p-4 text-center bg-light">
                <div className="p-3 bg-white rounded-circle shadow-xs d-inline-flex align-items-center justify-content-center text-primary mb-2">
                  <MdCloudUpload size={28} />
                </div>
                <div className="fw-semibold small text-dark">Click or Drag Product Images</div>
                <small className="text-muted d-block mt-1">JPEG, PNG, WebP up to 5MB each (Min 800x800 px)</small>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-xs">
              <MdAdd size={20} /> Publish Product to Catalog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
