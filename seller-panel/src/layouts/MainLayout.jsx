import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import './MainLayout.css';

export const MainLayout = ({ children }) => {
  // Desktop collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Mobile drawer open state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Toggle handler: on mobile it opens/closes drawer, on desktop it collapses/expands
  const handleToggleSidebar = () => {
    if (window.innerWidth < 992) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="seller-dashboard-wrapper d-flex min-vh-100">
      {/* 1. Sidebar Component */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* 2. Main Body Area */}
      <div
        className={`seller-main-wrapper d-flex flex-column flex-grow-1 ${
          isCollapsed ? 'sidebar-collapsed' : ''
        }`}
      >
        {/* Top Header */}
        <Header onToggleSidebar={handleToggleSidebar} />

        {/* Dynamic Page Content */}
        <main className="seller-content p-3 flex-grow-1">
          <div className="container-fluid px-0">{children}</div>
        </main>

        {/* Footer */}
        <footer className="seller-footer p-3 bg-white border-top text-center text-muted small">
          © 2026 <strong>ShopKart Seller Central</strong> • Trusted by 5,000+ Verified Indian Merchants
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
