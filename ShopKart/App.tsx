import React, { useState } from 'react';
import { StatusBar, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartProvider, Order } from './src/context/CartContext';
import { BottomNavBar, TabType } from './src/components/BottomNavBar';
import {
  HomeScreen,
  CategoriesScreen,
  ProductsScreen,
  SubcategoryScreen,
  ProductShowcaseScreen,
  DealsAndFlashSaleScreen,
  BrandsScreen,
} from './src/screens/home';
import { WishlistScreen, CartScreen } from './src/screens/cart';
import { ProductDetailScreen } from './src/screens/product';
import { CheckoutScreen } from './src/screens/checkout';
import { OrdersScreen } from './src/screens/orders';
import { ProfileScreen } from './src/screens/profile';
import { AddressesScreen } from './src/screens/AddressesScreen';
import { PaymentsScreen } from './src/screens/payments';
import { NotificationsScreen } from './src/screens/notifications';
import { SupportScreen } from './src/screens/support';
import { AboutUsScreen } from './src/screens/info';
import { SettingsScreen } from './src/screens/SettingsScreen';

// Search & Filter Module Screens
import { SearchScreen } from './src/screens/search';

// Unified Auth Module Screens
import {
  LoginScreen,
  RegisterScreen,
  MobileLoginScreen,
  OTPVerificationScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  CreateNewPasswordScreen,
  SocialLoginScreen,
} from './src/screens/auth';

// Onboarding & Permissions Screens
import {
  SplashScreen,
  AppIntroScreen,
  OnboardingFlowScreen,
  LanguageSelectionScreen,
  CountrySelectionScreen,
  LocationPermissionScreen,
  NotificationPermissionScreen,
} from './src/screens/onboarding';

import { Product } from './src/data/productsData';
import { COLORS } from './src/constants/theme';

type ViewScreen =
  // Onboarding & Permissions Flow
  | { type: 'splash' }
  | { type: 'app_intro' }
  | { type: 'onboarding_flow' }
  | { type: 'language_selection' }
  | { type: 'country_selection' }
  | { type: 'location_permission' }
  | { type: 'notification_permission' }
  // Home & Main Showcase Flows
  | { type: 'subcategory'; categoryName: string }
  | { type: 'product_showcase'; showcaseType: 'featured' | 'trending' | 'bestselling' | 'new_arrivals' | 'recommended' }
  | { type: 'deals_flash_sale'; initialTab?: 'deals' | 'flash_sale' }
  | { type: 'brands'; brandName?: string }
  // Search & Filter Flow
  | { type: 'search'; initialQuery?: string }
  // Core Store & Tabs
  | { type: 'tab'; tab: TabType }
  | { type: 'product_detail'; product: Product }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'addresses' }
  | { type: 'payments' }
  | { type: 'notifications' }
  | { type: 'support' }
  | { type: 'settings' }
  // Auth Module Screens
  | { type: 'login' }
  | { type: 'register' }
  | { type: 'mobile_login' }
  | { type: 'otp_verification'; destination: string; nextScreen: 'home' | 'create_password' }
  | { type: 'social_login' }
  | { type: 'forgot_password' }
  | { type: 'reset_password'; email: string }
  | { type: 'create_new_password' };

function MainApp() {
  const insets = useSafeAreaInsets();
  // App starts with animated Splash screen!
  const [currentView, setCurrentView] = useState<ViewScreen>({
    type: 'splash',
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentUserEmail, setCurrentUserEmail] = useState('boss.developer@gmail.com');

  const handleTabChange = (tab: TabType) => {
    setCurrentView({ type: 'tab', tab });
  };

  const handleSelectProduct = (product: Product) => {
    setCurrentView({ type: 'product_detail', product });
  };

  const handleOpenCart = () => {
    setCurrentView({ type: 'cart' });
  };

  const handleCategoryFromHome = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView({ type: 'tab', tab: 'categories' });
  };

  const isMainTab = currentView.type === 'tab';

  return (
    <View style={[styles.rootContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.contentContainer}>
        {/* 1. Splash Screen */}
        {currentView.type === 'splash' && (
          <SplashScreen onFinish={() => setCurrentView({ type: 'app_intro' })} />
        )}

        {/* 2. App Introduction Screen */}
        {currentView.type === 'app_intro' && (
          <AppIntroScreen
            onGetStarted={() => setCurrentView({ type: 'onboarding_flow' })}
            onSelectLanguage={() => setCurrentView({ type: 'language_selection' })}
          />
        )}

        {/* 3. Onboarding Screens 1, 2, 3 in 1 unified swipeable flow */}
        {currentView.type === 'onboarding_flow' && (
          <OnboardingFlowScreen
            onComplete={() => setCurrentView({ type: 'language_selection' })}
            onSkip={() => setCurrentView({ type: 'language_selection' })}
          />
        )}

        {/* 4. Language Selection Screen */}
        {currentView.type === 'language_selection' && (
          <LanguageSelectionScreen
            onConfirm={(lang) => {
              setCurrentView({ type: 'country_selection' });
            }}
            onBack={() => setCurrentView({ type: 'app_intro' })}
          />
        )}

        {/* 5. Country Selection Screen */}
        {currentView.type === 'country_selection' && (
          <CountrySelectionScreen
            onConfirm={(country) => {
              setCurrentView({ type: 'location_permission' });
            }}
            onBack={() => setCurrentView({ type: 'language_selection' })}
          />
        )}

        {/* 6. Location Permission Screen */}
        {currentView.type === 'location_permission' && (
          <LocationPermissionScreen
            onAllow={() => setCurrentView({ type: 'notification_permission' })}
            onSkip={() => setCurrentView({ type: 'notification_permission' })}
            onBack={() => setCurrentView({ type: 'country_selection' })}
          />
        )}

        {/* 7. Notification Permission Screen */}
        {currentView.type === 'notification_permission' && (
          <NotificationPermissionScreen
            onAllow={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onSkip={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onBack={() => setCurrentView({ type: 'location_permission' })}
          />
        )}

        {/* Core Store Screens */}
        {currentView.type === 'tab' && currentView.tab === 'home' && (
          <HomeScreen
            onSelectProduct={handleSelectProduct}
            onOpenCart={handleOpenCart}
            onOpenNotifications={() => setCurrentView({ type: 'notifications' })}
            onCategorySelect={handleCategoryFromHome}
            onOpenShowcase={(showcaseType: 'featured' | 'trending' | 'bestselling' | 'new_arrivals' | 'recommended') =>
              setCurrentView({ type: 'product_showcase', showcaseType })
            }
            onOpenDeals={(initialTab?: 'deals' | 'flash_sale') =>
              setCurrentView({ type: 'deals_flash_sale', initialTab })
            }
            onOpenBrands={() => setCurrentView({ type: 'brands' })}
            onOpenSubcategory={(categoryName: string) =>
              setCurrentView({ type: 'subcategory', categoryName })
            }
            onOpenSearch={(initialQuery?: string) =>
              setCurrentView({ type: 'search', initialQuery })
            }
          />
        )}

        {/* 3. Home & Main Showcase Flow Screens */}
        {currentView.type === 'subcategory' && (
          <SubcategoryScreen
            categoryName={currentView.categoryName}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'product_showcase' && (
          <ProductShowcaseScreen
            showcaseType={currentView.showcaseType}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'deals_flash_sale' && (
          <DealsAndFlashSaleScreen
            initialTab={currentView.initialTab}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'brands' && (
          <BrandsScreen
            initialBrand={currentView.brandName}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
          />
        )}

        {/* 4. Search & Filter Dedicated Screen */}
        {currentView.type === 'search' && (
          <SearchScreen
            initialQuery={currentView.initialQuery}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'tab' && currentView.tab === 'categories' && (
          <CategoriesScreen
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'tab' && currentView.tab === 'wishlist' && (
          <WishlistScreen
            onSelectProduct={handleSelectProduct}
            onExplore={() => handleTabChange('home')}
            onOpenCart={handleOpenCart}
          />
        )}

        {currentView.type === 'tab' && currentView.tab === 'orders' && (
          <OrdersScreen onExplore={() => handleTabChange('home')} />
        )}

        {currentView.type === 'tab' && currentView.tab === 'profile' && (
          <ProfileScreen
            userEmail={currentUserEmail}
            onOpenOrders={() => handleTabChange('orders')}
            onOpenWishlist={() => handleTabChange('wishlist')}
            onOpenCart={handleOpenCart}
            onOpenAddresses={() => setCurrentView({ type: 'addresses' })}
            onOpenPayments={() => setCurrentView({ type: 'payments' })}
            onOpenNotifications={() => setCurrentView({ type: 'notifications' })}
            onOpenSupport={() => setCurrentView({ type: 'support' })}
            onOpenSettings={() => setCurrentView({ type: 'settings' })}
            onOpenLogin={() => setCurrentView({ type: 'login' })}
          />
        )}

        {/* Product Details Screen */}
        {currentView.type === 'product_detail' && (
          <ProductDetailScreen
            product={currentView.product}
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onOpenCart={handleOpenCart}
            onBuyNow={() => setCurrentView({ type: 'checkout' })}
          />
        )}

        {/* Cart Screen */}
        {currentView.type === 'cart' && (
          <CartScreen
            onBack={() => setCurrentView({ type: 'tab', tab: 'home' })}
            onExplore={() => handleTabChange('home')}
            onProceedCheckout={() => setCurrentView({ type: 'checkout' })}
          />
        )}

        {/* Checkout Screen */}
        {currentView.type === 'checkout' && (
          <CheckoutScreen
            onBack={() => setCurrentView({ type: 'cart' })}
            onOrderSuccess={(order: Order) => {
              handleTabChange('orders');
            }}
            onExplore={() => handleTabChange('home')}
          />
        )}

        {/* Profile Sub Screens */}
        {currentView.type === 'addresses' && (
          <AddressesScreen onBack={() => handleTabChange('profile')} />
        )}

        {currentView.type === 'payments' && (
          <PaymentsScreen onBack={() => handleTabChange('profile')} />
        )}

        {currentView.type === 'notifications' && (
          <NotificationsScreen onBack={() => handleTabChange('profile')} />
        )}

        {currentView.type === 'support' && (
          <SupportScreen onBack={() => handleTabChange('profile')} />
        )}

        {currentView.type === 'settings' && (
          <SettingsScreen onBack={() => handleTabChange('profile')} />
        )}

        {/* --- Authentication Flow Screens --- */}
        {/* 1. Login Page */}
        {currentView.type === 'login' && (
          <LoginScreen
            onLoginSuccess={(email) => {
              setCurrentUserEmail(email);
              Alert.alert('Welcome Back!', `Logged in as ${email}`);
              handleTabChange('profile');
            }}
            onNavigateRegister={() => setCurrentView({ type: 'register' })}
            onNavigateForgotPassword={() => setCurrentView({ type: 'forgot_password' })}
            onNavigateMobileLogin={() => setCurrentView({ type: 'mobile_login' })}
            onNavigateSocialLogin={() => setCurrentView({ type: 'social_login' })}
            onBack={() => handleTabChange('profile')}
          />
        )}

        {/* 2. Sign Up Page */}
        {currentView.type === 'register' && (
          <RegisterScreen
            onRegisterSuccess={({ email }) => {
              setCurrentUserEmail(email);
              Alert.alert('Registered! 🎉', 'Your account has been created successfully!');
              handleTabChange('profile');
            }}
            onNavigateLogin={() => setCurrentView({ type: 'login' })}
            onNavigateSocialLogin={() => setCurrentView({ type: 'social_login' })}
            onBack={() => setCurrentView({ type: 'login' })}
          />
        )}

        {/* 3. Mobile Number Login */}
        {currentView.type === 'mobile_login' && (
          <MobileLoginScreen
            onSendOTP={(mobile) => {
              setCurrentView({
                type: 'otp_verification',
                destination: mobile,
                nextScreen: 'home',
              });
            }}
            onNavigateEmailLogin={() => setCurrentView({ type: 'login' })}
            onBack={() => setCurrentView({ type: 'login' })}
          />
        )}

        {/* 4. OTP Verification Screen */}
        {currentView.type === 'otp_verification' && (
          <OTPVerificationScreen
            destination={currentView.destination}
            onVerifySuccess={() => {
              if (currentView.nextScreen === 'create_password') {
                setCurrentView({ type: 'create_new_password' });
              } else {
                setCurrentUserEmail(currentView.destination);
                Alert.alert('Verified! ✅', 'Logged in via mobile OTP successfully!');
                handleTabChange('home');
              }
            }}
            onResendOTP={() => {}}
            onBack={() => setCurrentView({ type: 'mobile_login' })}
          />
        )}

        {/* 5. Social Login (Google / Apple / Facebook) */}
        {currentView.type === 'social_login' && (
          <SocialLoginScreen
            onSocialSuccess={(provider, email) => {
              setCurrentUserEmail(email);
              Alert.alert('Signed in! 🎉', `Authenticated with ${provider} (${email})`);
              handleTabChange('profile');
            }}
            onNavigateEmailLogin={() => setCurrentView({ type: 'login' })}
            onBack={() => setCurrentView({ type: 'login' })}
          />
        )}

        {/* 6. Forgot Password Screen */}
        {currentView.type === 'forgot_password' && (
          <ForgotPasswordScreen
            onSubmitEmail={(email) => {
              setCurrentView({
                type: 'otp_verification',
                destination: email,
                nextScreen: 'create_password',
              });
            }}
            onNavigateLogin={() => setCurrentView({ type: 'login' })}
            onBack={() => setCurrentView({ type: 'login' })}
          />
        )}

        {/* 7. Reset Password Screen */}
        {currentView.type === 'reset_password' && (
          <ResetPasswordScreen
            email={currentView.email}
            onResetSuccess={() => {
              setCurrentView({ type: 'login' });
            }}
            onBack={() => setCurrentView({ type: 'forgot_password' })}
          />
        )}

        {/* 8. Create New Password Screen */}
        {currentView.type === 'create_new_password' && (
          <CreateNewPasswordScreen
            onSuccess={() => {
              setCurrentView({ type: 'login' });
            }}
            onBack={() => setCurrentView({ type: 'forgot_password' })}
          />
        )}
      </View>

      {/* Bottom Bar on Main Tabs */}
      {isMainTab && (
        <BottomNavBar
          activeTab={currentView.tab}
          onTabChange={handleTabChange}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
