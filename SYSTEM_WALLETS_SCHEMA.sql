-- System Wallets Table (Admin manages these, all users see them)
-- This is the single source of truth for deposit addresses
CREATE TABLE IF NOT EXISTS system_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., "Main USDT Wallet"
  crypto_id TEXT NOT NULL, -- BTC, ETH, USDT-TRC20, USDT-ERC20, LTC, XRP
  network TEXT NOT NULL, -- Bitcoin, ERC-20, TRC20, XRP Ledger, etc.
  address TEXT NOT NULL, -- The actual wallet address
  min_deposit DECIMAL(20, 8) NOT NULL DEFAULT 10, -- Minimum deposit amount
  is_active BOOLEAN NOT NULL DEFAULT true, -- Active wallets shown to users
  created_at TIMESTAMP DEFAULT (now() at time zone 'UTC'),
  updated_at TIMESTAMP DEFAULT (now() at time zone 'UTC')
);

-- Enable RLS
ALTER TABLE system_wallets ENABLE ROW LEVEL SECURITY;

-- Public read access to active wallets only (users can see active wallets)
CREATE POLICY "Users can view active system wallets"
  ON system_wallets
  FOR SELECT
  USING (is_active = true);

-- Admin full access
CREATE POLICY "Admins can manage system wallets"
  ON system_wallets
  USING (
    auth.jwt() ->> 'email' = 'admin@work.com' OR
    (SELECT is_admin FROM user_profiles WHERE id = auth.uid()) = true
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_system_wallets_active ON system_wallets(is_active);
CREATE INDEX IF NOT EXISTS idx_system_wallets_crypto_id ON system_wallets(crypto_id);
