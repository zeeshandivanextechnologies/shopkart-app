import React from 'react';
import {
  MdCurrencyRupee,
  MdShoppingBag,
  MdInventory,
  MdWarningAmber,
  MdArrowUpward,
  MdAdd,
  MdFileDownload,
  MdLocalShipping,
  MdVisibility,
} from 'react-icons/md';

export const DashboardOverview = () => {
  const kpiCards = [
    {
      title: "Today's Gross Sales",
      value: '₹84,250',
      change: '+14.8%',
      isPositive: true,
      icon: <MdCurrencyRupee />,
      badgeBg: 'bg-primary-subtle text-primary',
    },
    {
      title: 'Active Orders to Pack',
      value: '28 Orders',
      change: '+6 New Orders',
      isPositive: true,
      icon: <MdShoppingBag />,
      badgeBg: 'bg-warning-subtle text-warning-emphasis',
    },
    {
      title: 'Total Active Catalog',
      value: '142 Items',
      change: '12 Live Categories',
      isPositive: true,
      icon: <MdInventory />,
      badgeBg: 'bg-success-subtle text-success',
    },
    {
      title: 'Low Stock Warnings',
      value: '3 Items',
      change: 'Action Required',
      isPositive: false,
      icon: <MdWarningAmber />,
      badgeBg: 'bg-danger-subtle text-danger',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-90812',
      customer: 'Aarav Sharma',
      city: 'Mumbai, MH',
      product: 'ShopKart ANC Wireless Headphones V2',
      qty: 1,
      total: '₹2,499',
      paymentMethod: 'UPI (Prepaid)',
      status: 'Ready for Pickup',
      statusClass: 'bg-info-subtle text-info-emphasis border border-info-subtle',
      date: 'Today, 03:15 PM',
    },
    {
      id: 'ORD-90811',
      customer: 'Pooja Verma',
      city: 'Bengaluru, KA',
      product: 'Smart Fitness Tracker Band 7 Pro',
      qty: 2,
      total: '₹3,798',
      paymentMethod: 'Credit Card',
      status: 'Packing in Progress',
      statusClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
      date: 'Today, 02:40 PM',
    },
    {
      id: 'ORD-90810',
      customer: 'Rahul Nair',
      city: 'Delhi, DL',
      product: 'Ultra Fast GaN 65W Charger',
      qty: 1,
      total: '₹1,299',
      paymentMethod: 'Cash on Delivery',
      status: 'Dispatched',
      statusClass: 'bg-success-subtle text-success border border-success-subtle',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'ORD-90809',
      customer: 'Simran Kaur',
      city: 'Chandigarh, PB',
      product: 'Mechanical Gaming Keyboard RGB',
      qty: 1,
      total: '₹4,199',
      paymentMethod: 'UPI (Prepaid)',
      status: 'Delivered',
      statusClass: 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle',
      date: 'Yesterday',
    },
  ];

  return (
    <div className="dashboard-content">
      {/* 1. Header & Quick Actions Bar */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1 text-dark">Seller Operations Command Center</h3>
          <p className="text-secondary mb-0">
            Real-time multi-vendor store metrics and priority dispatch queue.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <MdFileDownload size={18} /> Export GST Summary
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 shadow-xs">
            <MdAdd size={20} /> Add New Listing
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Grid - Completely Re-designed */}
      <div className="row g-4 mb-4">
        {kpiCards.map((card, idx) => (
          <div className="col-12 col-sm-6 col-xl-3" key={idx}>
            <div className="kpi-stat-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="kpi-title">{card.title}</span>
                <div className={`kpi-icon-badge ${card.badgeBg}`}>
                  {card.icon}
                </div>
              </div>
              <div className="kpi-value">{card.value}</div>
              <div className="d-flex align-items-center justify-content-between">
                <span
                  className="badge rounded-pill px-2 py-1 small fw-medium"
                  style={{
                    backgroundColor: card.isPositive ? '#ECFDF5' : '#FEF2F2',
                    color: card.isPositive ? '#047857' : '#B91C1C',
                  }}
                >
                  {card.isPositive && <MdArrowUpward size={13} className="me-1" />}
                  {card.change}
                </span>
                <span className="text-muted" style={{ fontSize: '12px' }}>vs yesterday</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Operational Highlights & Banner */}
      <div
        className="card border-0 p-4 mb-4 text-white overflow-hidden position-relative"
        style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2874F0 100%)',
          borderRadius: '18px',
          boxShadow: '0 8px 24px rgba(40, 116, 240, 0.25)',
        }}
      >
        <div className="row align-items-center position-relative" style={{ zIndex: 1 }}>
          <div className="col-lg-8">
            <span className="badge bg-warning text-dark px-3 py-1 rounded-pill mb-2 fw-semibold">
              Festival Big Billion Dhamaka
            </span>
            <h4 className="fw-bold mb-1 text-white">Boost Catalog Visibility by 2.4x with Flipkart Smart Fulfillment</h4>
            <p className="text-white-50 small mb-0">
              Ensure same-day dispatch before 4:00 PM for all metro orders to maintain your 99.4% seller SLA rating.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <button className="btn btn-light text-primary fw-bold px-4 py-2 shadow-sm">
              View Courier Slots
            </button>
          </div>
        </div>
      </div>

      {/* 4. Live Incoming Orders Queue with Sr. No */}
      <div className="card overflow-hidden bg-white mb-4">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center">
              <MdLocalShipping size={22} />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Live Orders & Dispatch Pipeline</h5>
              <small className="text-muted">Real-time incoming customer orders requiring packing & shipping labels</small>
            </div>
          </div>
          <button className="btn btn-sm btn-outline-primary px-3 fw-semibold">
            View All Orders
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Sr. No</th>
                <th>Order ID & Date</th>
                <th>Customer & Destination</th>
                <th>Product Name & Qty</th>
                <th>Amount & Payment</th>
                <th>Fulfillment Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((ord, index) => (
                <tr key={ord.id}>
                  <td className="fw-semibold text-muted">
                    #{String(index + 1).padStart(2, '0')}
                  </td>
                  <td>
                    <span className="fw-bold text-dark font-monospace">{ord.id}</span>
                    <div className="text-muted small" style={{ fontSize: '11.5px' }}>{ord.date}</div>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{ord.customer}</div>
                    <div className="text-muted small" style={{ fontSize: '11.5px' }}>{ord.city}</div>
                  </td>
                  <td>
                    <div className="fw-medium text-dark text-truncate" style={{ maxWidth: '240px' }}>
                      {ord.product}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '11.5px' }}>Qty: {ord.qty} Unit</div>
                  </td>
                  <td>
                    <div className="fw-bold text-dark">{ord.total}</div>
                    <div className="text-muted small" style={{ fontSize: '11.5px' }}>{ord.paymentMethod}</div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill px-3 py-1 fw-medium ${ord.statusClass}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-medium d-inline-flex align-items-center gap-1">
                      <MdVisibility size={14} /> Process
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

export default DashboardOverview;
