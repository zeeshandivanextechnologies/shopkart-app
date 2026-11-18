import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// 1. Auth Module (Independent Views)
import SellerRegister from './pages/auth/SellerRegister';
import SellerLogin from './pages/auth/SellerLogin';
import SellerOTPVerification from './pages/auth/SellerOTPVerification';

// 2. Dashboard
import DashboardOverview from './pages/dashboard/DashboardOverview';

// 3. Store & Profile Module
import SellerProfile from './pages/profile/SellerProfile';
import StoreSetup from './pages/store/StoreSetup';
import StoreDetails from './pages/store/StoreDetails';
import BankDetails from './pages/store/BankDetails';
import KYCVerification from './pages/store/KYCVerification';

// 4. Products, Catalog & Inventory
import AddProduct from './pages/products/AddProduct';
import ManageProducts from './pages/products/ManageProducts';
import EditProduct from './pages/products/EditProduct';
import ProductApprovalStatus from './pages/products/ProductApprovalStatus';
import InventoryManagement from './pages/products/InventoryManagement';
import StockManagement from './pages/products/StockManagement';

// 5. Orders & Logistics
import OrdersList from './pages/orders/OrdersList';
import OrderDetails from './pages/orders/OrderDetails';
import AcceptOrder from './pages/orders/AcceptOrder';
import RejectOrder from './pages/orders/RejectOrder';
import ShipmentManagement from './pages/orders/ShipmentManagement';
import ReturnRequests from './pages/orders/ReturnRequests';

// 6. Reviews & Analytics
import SellerReviews from './pages/reviews/SellerReviews';
import AnalyticsOverview from './pages/analytics/AnalyticsOverview';

// 7. Finance & Settlements
import EarningsOverview from './pages/finance/EarningsOverview';
import CommissionDetails from './pages/finance/CommissionDetails';
import PayoutHistory from './pages/finance/PayoutHistory';
import WithdrawMoney from './pages/finance/WithdrawMoney';

// 8. Settings & Support
import SettingsHub from './pages/settings/SettingsHub';
import SupportHub from './pages/support/SupportHub';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (Clean layout without sidebar) */}
        <Route path="/register" element={<SellerRegister />} />
        <Route path="/login" element={<SellerLogin />} />
        <Route path="/verify-otp" element={<SellerOTPVerification />} />

        {/* Seller Panel Protected/Main Routes (With Fixed Header & Collapsible Submenu Sidebar) */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<DashboardOverview />} />

                {/* Store & Profile */}
                <Route path="/profile" element={<SellerProfile />} />
                <Route path="/store-setup" element={<StoreSetup />} />
                <Route path="/store-details" element={<StoreDetails />} />
                <Route path="/bank-details" element={<BankDetails />} />
                <Route path="/kyc-verification" element={<KYCVerification />} />

                {/* Products & Catalog */}
                <Route path="/products" element={<ManageProducts />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/products/approvals" element={<ProductApprovalStatus />} />
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/stock-management" element={<StockManagement />} />

                {/* Orders & Logistics */}
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/orders/:id/accept" element={<AcceptOrder />} />
                <Route path="/orders/:id/reject" element={<RejectOrder />} />
                <Route path="/shipments" element={<ShipmentManagement />} />
                <Route path="/returns" element={<ReturnRequests />} />

                {/* Customer Reviews & Sales Analytics */}
                <Route path="/reviews" element={<SellerReviews />} />
                <Route path="/analytics" element={<AnalyticsOverview />} />

                {/* Finance & Payouts */}
                <Route path="/earnings" element={<EarningsOverview />} />
                <Route path="/commissions" element={<CommissionDetails />} />
                <Route path="/payouts" element={<PayoutHistory />} />
                <Route path="/withdraw" element={<WithdrawMoney />} />

                {/* Settings & Support */}
                <Route path="/settings" element={<SettingsHub />} />
                <Route path="/support" element={<SupportHub />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
