import React from 'react';
import {
  MdTrendingUp,
  MdPeople,
  MdShoppingCart,
  MdStar,
  MdArrowUpward,
} from 'react-icons/md';

export const AnalyticsOverview = () => {
  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Store Performance & Analytics</h4>
          <p className="text-muted small mb-0">
            Insights on customer views, conversion funnel, repeat purchases and buyer satisfaction.
          </p>
        </div>
        <div>
          <select className="form-select form-select-sm bg-white shadow-xs fw-medium">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Quarter</option>
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Catalog Impressions</span>
              <MdTrendingUp size={22} className="text-primary" />
            </div>
            <h3 className="fw-bold text-dark mb-1">1,48,290</h3>
            <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small">
              <MdArrowUpward size={12} /> +23.4% Traffic
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Unique Visitors</span>
              <MdPeople size={22} className="text-info" />
            </div>
            <h3 className="fw-bold text-dark mb-1">34,120</h3>
            <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small">
              <MdArrowUpward size={12} /> +18.2% Reach
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Cart Conversion Rate</span>
              <MdShoppingCart size={22} className="text-warning" />
            </div>
            <h3 className="fw-bold text-dark mb-1">4.28%</h3>
            <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small">
              <MdArrowUpward size={12} /> +0.6% vs Avg
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border shadow-sm p-3 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between text-muted small mb-2">
              <span>Store Customer Rating</span>
              <MdStar size={22} className="text-warning" />
            </div>
            <h3 className="fw-bold text-dark mb-1">4.9 / 5.0</h3>
            <small className="text-muted">Based on 1,840+ buyer reviews</small>
          </div>
        </div>
      </div>

      {/* Top Performing Items */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="card-header bg-white py-3 px-4 border-bottom">
          <h6 className="fw-bold mb-0 text-dark">Top Grossing Products</h6>
        </div>
        <div className="p-4">
          <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
            <div>
              <div className="fw-semibold text-dark">ShopKart ANC Wireless Headphones V2</div>
              <small className="text-muted">142 Units Sold this month</small>
            </div>
            <div className="text-end">
              <div className="fw-bold text-primary">₹3,54,858</div>
              <small className="text-success">Rank #1 Best Seller</small>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between py-2 border-bottom">
            <div>
              <div className="fw-semibold text-dark">Smart Fitness Tracker Band 7 Pro</div>
              <small className="text-muted">98 Units Sold this month</small>
            </div>
            <div className="text-end">
              <div className="fw-bold text-primary">₹1,86,102</div>
              <small className="text-success">Rank #2</small>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between py-2">
            <div>
              <div className="fw-semibold text-dark">Mechanical Gaming Keyboard RGB</div>
              <small className="text-muted">45 Units Sold this month</small>
            </div>
            <div className="text-end">
              <div className="fw-bold text-primary">₹1,88,955</div>
              <small className="text-success">Rank #3</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
