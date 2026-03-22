# System Wallets Architecture - Complete Setup Guide

## Overview
The wallet system has been restructured to use **system-wide managed wallets** instead of user-specific wallets.

### Old Approach ❌
- **Table**: `user_wallet_addresses` (one per user)
- **Problem**: Users had individual wallet tables, confusing and hard to maintain
- **Issue**: Wallet UI didn't sync properly with database

### New Approach ✅
- **Table**: `system_wallets` (admin manages, all users see)
- **Benefit**: Single source of truth for deposit addresses
- **How it works**: Admin adds/manages wallets → All users see active wallets

---

## Database Setup

### 1. Create System Wallets Table
Run this SQL in your Supabase SQL editor:

```sql
-- System Wallets Table (Admin manages these, all users see them)
CREATE TABLE IF NOT EXISTS system_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  crypto_id TEXT NOT NULL,
  network TEXT NOT NULL,
  address TEXT NOT NULL,
  min_deposit DECIMAL(20, 8) NOT NULL DEFAULT 10,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT (now() at time zone 'UTC'),
  updated_at TIMESTAMP DEFAULT (now() at time zone 'UTC')
);

-- Enable RLS
ALTER TABLE system_wallets ENABLE ROW LEVEL SECURITY;

-- Public read access to active wallets only
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_system_wallets_active ON system_wallets(is_active);
CREATE INDEX IF NOT EXISTS idx_system_wallets_crypto_id ON system_wallets(crypto_id);
```

### 2. (Optional) Delete Old User Wallet Table
If you had the `user_wallet_addresses` table, you can delete it:
```sql
DROP TABLE IF EXISTS user_wallet_addresses CASCADE;
```

---

## How It Works

### For Admin
1. Go to **Admin Panel → Deposit Wallet Management**
2. Click **Add Wallet**
3. Fill in:
   - **Cryptocurrency**: BTC, ETH, USDT-TRC20, USDT-ERC20, LTC, XRP
   - **Wallet Name**: e.g., "Main USDT Wallet"
   - **Wallet Address**: The deposit address
   - **Network**: Automatically set based on crypto
   - **Minimum Deposit**: e.g., 10 USDT
4. Click **Add Wallet**
5. Toggle **Active/Deactivate** to show/hide from users
6. Active wallets appear in the deposit section

### For Users
1. Go to **Wallet → Deposits**
2. **Active wallets** from admin are automatically displayed
3. Select a wallet and enter deposit amount
4. Deposit to the provided address

---

## Updated Code Changes

### 1. Wallet Page (`src/pages/Wallet.tsx`)
**Changed from**:
```tsx
{user?.wallets && user.wallets.length === 0 && (
  // "No wallet addresses" message
)}
```

**Changed to**:
```tsx
{activeWallets.length === 0 && (
  // Shows message if no active system wallets are available
)}
```

### 2. Store (`src/lib/store.tsx`)

#### Removed
- `user_wallet_addresses` table queries
- User-specific wallet fetching

#### Added
- `system_wallets` table loading from Supabase
- All admin wallet functions now sync with Supabase:
  - `addSystemWallet()` - Creates wallet in DB
  - `editSystemWallet()` - Updates wallet in DB
  - `removeSystemWallet()` - Deletes wallet from DB
  - `toggleSystemWalletStatus()` - Activates/deactivates in DB

#### Data Flow
```
Admin adds wallet
    ↓
API call to Supabase
    ↓
Inserted into system_wallets table
    ↓
Store updates state
    ↓
User refreshes → sees new wallet in deposit section
```

---

## Wallet Schema (Database)

```
system_wallets {
  id: UUID                     (Primary Key)
  name: TEXT                   (e.g., "Main USDT Wallet")
  crypto_id: TEXT              (BTC, ETH, USDT-TRC20, etc.)
  network: TEXT                (Bitcoin, ERC-20, TRC20, etc.)
  address: TEXT                (The actual wallet address)
  min_deposit: DECIMAL         (Minimum deposit amount)
  is_active: BOOLEAN           (true = shown to users)
  created_at: TIMESTAMP        (UTC)
  updated_at: TIMESTAMP        (UTC)
}
```

---

## User Display Logic

### What Users See
✅ Only **active** wallets (`is_active = true`)
✅ All active wallets from the same table (no duplicates)
✅ Clean, consistent wallet list

### What Users Don't See
❌ Inactive wallets (`is_active = false`)
❌ Deleted wallets
❌ User-specific wallets (no longer used)

---

## Admin Functions Reference

```typescript
// Store API
systemWallets              // Array of SystemWallet objects
addSystemWallet()          // Async - saves to DB
editSystemWallet()         // Async - updates DB
removeSystemWallet()       // Async - deletes from DB
toggleSystemWalletStatus() // Async - toggles is_active in DB
```

---

## Testing Checklist

- [ ] Create `system_wallets` table with SQL above
- [ ] Admin logs in
- [ ] Admin adds a new wallet
- [ ] Check Supabase → `system_wallets` table has the wallet
- [ ] Admin activates wallet
- [ ] Regular user logs in
- [ ] User sees wallet in **Wallet → Deposits** section
- [ ] Admin deactivates wallet
- [ ] User no longer sees wallet (may need to refresh)
- [ ] Admin edits wallet
- [ ] Changes appear in user's deposit section
- [ ] Admin deletes wallet
- [ ] Wallet is gone from Supabase

---

## Troubleshooting

### Users Don't See Wallets
✓ Check if wallets exist in Supabase `system_wallets` table
✓ Verify `is_active = true`
✓ Clear browser cache and refresh
✓ Check browser console for errors

### Admin Can't Add Wallets
✓ Verify `system_wallets` table exists
✓ Check RLS policies allow admin access
✓ Check Network tab in DevTools for API errors

### Wallets Revert After Refresh
✓ Check Supabase connection
✓ Verify env variables are set correctly
✓ Check console for SQL errors

---

## Migration Notes

**If you had the old `user_wallet_addresses` table**:
1. Back up any important data
2. Run the SQL above to create `system_wallets`
3. Manually re-add wallets in admin panel
4. Delete the old table: `DROP TABLE user_wallet_addresses;`
