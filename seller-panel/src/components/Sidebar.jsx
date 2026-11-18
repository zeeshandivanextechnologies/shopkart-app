import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdStorefront,
  MdInventory2,
  MdShoppingCart,
  MdAccountBalanceWallet,
  MdStar,
  MdAnalytics,
  MdHelpOutline,
  MdClose,
  MdVerified,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from 'react-icons/md';

export const Sidebar = ({ isCollapsed, isMobileOpen, onCloseMobile }) => {
  const location = useLocation();

  // State to track open submenus
  const [openSubmenus, setOpenSubmenus] = useState({
    store: location.pathname.startsWith('/store') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/bank') || location.pathname.startsWith('/kyc'),
    products: location.pathname.startsWith('/products') || location.pathname.startsWith('/inventory') || location.pathname.startsWith('/stock'),
    orders: location.pathname.startsWith('/orders') || location.pathname.startsWith('/shipments') || location.pathname.startsWith('/returns'),
    finance: location.pathname.startsWith('/earnings') || location.pathname.startsWith('/commissions') || location.pathname.startsWith('/payouts') || location.pathname.startsWith('/withdraw') || location.pathname.startsWith('/payments'),
  });

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`seller-sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="sidebar-brand d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 overflow-hidden">
            <div className="brand-icon-box shadow-xs">
              <MdStorefront className="text-white" size={24} />
            </div>
            {!isCollapsed && (
              <div className="brand-text-wrap text-truncate">
                <div className="d-flex align-items-center gap-1">
                  <span className="brand-name">ShopKart</span>
                  <MdVerified className="text-warning" size={17} title="Verified Merchant Ecosystem" />
                </div>
                <div className="text-white-50" style={{ fontSize: '11px', fontWeight: 500 }}>
                  Multi-Vendor Central
                </div>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            className="btn btn-sm btn-link text-white d-lg-none p-1 rounded-circle"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Navigation Menu with Submenus */}
        <nav className="sidebar-nav">
          {!isCollapsed && (
            <div className="nav-heading">
              Main Operations
            </div>
          )}

          <ul className="nav flex-column mb-0">
            {/* 1. Dashboard */}
            <li className="nav-item mb-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? 'active-nav-link' : ''
                  }`
                }
                title={isCollapsed ? 'Dashboard' : undefined}
                onClick={() => {
                  if (window.innerWidth < 992) onCloseMobile();
                }}
              >
                <span className="nav-icon">
                  <MdDashboard size={21} />
                </span>
                {!isCollapsed && <span className="nav-text ms-3 flex-grow-1 text-truncate">Dashboard</span>}
              </NavLink>
            </li>

            {/* 2. Store & Profile Submenu */}
            <li className="nav-item mb-1">
              <div
                className={`nav-link d-flex align-items-center cursor-pointer ${
                  openSubmenus.store ? 'bg-light text-primary fw-semibold' : ''
                }`}
                onClick={() => !isCollapsed && toggleSubmenu('store')}
                title={isCollapsed ? 'Store & Profile' : undefined}
                style={{ cursor: 'pointer' }}
              >
                <span className="nav-icon">
                  <MdStorefront size={21} />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="nav-text ms-3 flex-grow-1 text-truncate">Store & Profile</span>
                    {openSubmenus.store ? <MdKeyboardArrowDown size={19} /> : <MdKeyboardArrowRight size={19} />}
                  </>
                )}
              </div>

              {!isCollapsed && openSubmenus.store && (
                <ul className="nav flex-column submenu-list my-1">
                  <li className="nav-item">
                    <NavLink to="/profile" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Seller Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/store-setup" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Store Setup Wizard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/store-details" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Store Hub Details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/bank-details" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Bank Account
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/kyc-verification" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      KYC Compliance
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. Products & Inventory Submenu */}
            <li className="nav-item mb-1">
              <div
                className={`nav-link d-flex align-items-center cursor-pointer ${
                  openSubmenus.products ? 'bg-light text-primary fw-semibold' : ''
                }`}
                onClick={() => !isCollapsed && toggleSubmenu('products')}
                title={isCollapsed ? 'Catalog & Stock' : undefined}
                style={{ cursor: 'pointer' }}
              >
                <span className="nav-icon">
                  <MdInventory2 size={21} />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="nav-text ms-3 flex-grow-1 text-truncate">Catalog & Stock</span>
                    {openSubmenus.products ? <MdKeyboardArrowDown size={19} /> : <MdKeyboardArrowRight size={19} />}
                  </>
                )}
              </div>

              {!isCollapsed && openSubmenus.products && (
                <ul className="nav flex-column submenu-list my-1">
                  <li className="nav-item">
                    <NavLink to="/products" end className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Manage Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/products/add" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Add New Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/products/approvals" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      QC Approvals
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/inventory" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Warehouse Inventory
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/stock-management" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Quick Stock Adjust
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 4. Orders & Shipments Submenu */}
            <li className="nav-item mb-1">
              <div
                className={`nav-link d-flex align-items-center cursor-pointer ${
                  openSubmenus.orders ? 'bg-light text-primary fw-semibold' : ''
                }`}
                onClick={() => !isCollapsed && toggleSubmenu('orders')}
                title={isCollapsed ? 'Orders & Logistics' : undefined}
                style={{ cursor: 'pointer' }}
              >
                <span className="nav-icon">
                  <MdShoppingCart size={21} />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="nav-text ms-3 flex-grow-1 text-truncate">Orders & Logistics</span>
                    {openSubmenus.orders ? <MdKeyboardArrowDown size={19} /> : <MdKeyboardArrowRight size={19} />}
                  </>
                )}
              </div>

              {!isCollapsed && openSubmenus.orders && (
                <ul className="nav flex-column submenu-list my-1">
                  <li className="nav-item">
                    <NavLink to="/orders" end className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Seller Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/shipments" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Shipment Tracking
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/returns" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Return Requests
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* 5. Finance & Payouts Submenu */}
            <li className="nav-item mb-1">
              <div
                className={`nav-link d-flex align-items-center cursor-pointer ${
                  openSubmenus.finance ? 'bg-light text-primary fw-semibold' : ''
                }`}
                onClick={() => !isCollapsed && toggleSubmenu('finance')}
                title={isCollapsed ? 'Finance & Settlements' : undefined}
                style={{ cursor: 'pointer' }}
              >
                <span className="nav-icon">
                  <MdAccountBalanceWallet size={21} />
                </span>
                {!isCollapsed && (
                  <>
                    <span className="nav-text ms-3 flex-grow-1 text-truncate">Finance & Payouts</span>
                    {openSubmenus.finance ? <MdKeyboardArrowDown size={19} /> : <MdKeyboardArrowRight size={19} />}
                  </>
                )}
              </div>

              {!isCollapsed && openSubmenus.finance && (
                <ul className="nav flex-column submenu-list my-1">
                  <li className="nav-item">
                    <NavLink to="/earnings" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Earnings Overview
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/commissions" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Commission Schedule
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/payouts" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Payout History
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/withdraw" className={({ isActive }) => `nav-link submenu-link ${isActive ? 'submenu-link-active' : ''}`}>
                      Instant Withdrawal
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {!isCollapsed && (
              <div className="nav-heading mt-2">
                Insights & Support
              </div>
            )}

            {/* 6. Reviews & Analytics */}
            <li className="nav-item mb-1">
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? 'active-nav-link' : ''
                  }`
                }
                title={isCollapsed ? 'Customer Reviews' : undefined}
              >
                <span className="nav-icon">
                  <MdStar size={21} />
                </span>
                {!isCollapsed && <span className="nav-text ms-3 flex-grow-1 text-truncate">Seller Reviews</span>}
              </NavLink>
            </li>

            <li className="nav-item mb-1">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? 'active-nav-link' : ''
                  }`
                }
                title={isCollapsed ? 'Sales Analytics' : undefined}
              >
                <span className="nav-icon">
                  <MdAnalytics size={21} />
                </span>
                {!isCollapsed && <span className="nav-text ms-3 flex-grow-1 text-truncate">Sales Analytics</span>}
              </NavLink>
            </li>

            {/* 7. Seller Support */}
            <li className="nav-item mb-1">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? 'active-nav-link' : ''
                  }`
                }
                title={isCollapsed ? 'Seller Support' : undefined}
              >
                <span className="nav-icon">
                  <MdHelpOutline size={21} />
                </span>
                {!isCollapsed && <span className="nav-text ms-3 flex-grow-1 text-truncate">Seller Support</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
