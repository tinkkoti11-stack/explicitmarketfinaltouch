import React, { useState } from 'react';
import { StoreProvider, useStore } from './lib/store';
import { Landing } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { TradePage } from './pages/TradePage';
import { WalletPage } from './pages/Wallet';
import { SignalsPage } from './pages/Signals';
import { BotPage } from './pages/Bot';
import { SettingsPage } from './pages/SettingsPage';
import { KYCPage } from './pages/KYC';
import { CopyTradingPage } from './pages/CopyTrading';
import { FundedAccountsPage } from './pages/FundedAccounts';
import { ReferralPage } from './pages/Referral';
import { AdminPage } from './pages/Admin';
import { HistoryPage } from './pages/History';
import { Broker } from './pages/Broker';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { Layout } from './components/Layout';
import { LockedPageMessage } from './components/LockedPageMessage';
function AppContent() {
  const { isAuthenticated, user, allUsers, theme } = useStore();
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Determine current auth page from URL
  const pathname = window.location.pathname;
  const authPath = pathname.split('/')[2]; // /auth/login or /auth/signup
  const isAuthPath = pathname.startsWith('/auth/');

  // ensure that when authentication state changes we land on dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated]);

  // Re-render when theme changes to ensure all pages update
  React.useEffect(() => {
    // This effect just needs to depend on theme to cause re-renders
  }, [theme]);

  // Check for public pages (accessible to everyone)
  if (pathname === '/broker') return <Broker />;
  if (pathname === '/about') return <About />;
  if (pathname === '/contact') return <Contact />;
  if (pathname === '/terms') return <TermsAndConditions />;

  // Not authenticated - show landing, login, or signup
  if (!isAuthenticated) {
    // If on auth path, show login/signup
    if (isAuthPath) {
      if (authPath === 'signup') {
        return <SignupPage />;
      }
      return <LoginPage />;
    }
    // Default to landing page
    return <Landing />;
  }

  const renderPage = () => {
    // Admin route protection
    if (currentPage === 'admin' && !user?.isAdmin) {
      setCurrentPage('dashboard');
      return <Dashboard onNavigate={setCurrentPage} />;
    }

    // Page lock enforcement - show locked message instead of redirecting silently
    if (user?.lockedPages?.includes(currentPage)) {
      return <LockedPageMessage />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'trade':
        return <TradePage />;
      case 'wallet':
        return <WalletPage />;
      case 'signals':
        return <SignalsPage />;
      case 'bot':
        return <BotPage />;
      case 'kyc':
        return <KYCPage />;
      case 'copy-trading':
        return <CopyTradingPage />;
      case 'funded-accounts':
        return <FundedAccountsPage />;
      case 'referral':
        return <ReferralPage />;
      case 'history':
        return <HistoryPage />;
      case 'admin':
        return <AdminPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };
  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>);

}
export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>);

}