-- ============================================================================
-- COMPLETE BOT PURCHASE → APPROVAL → ALLOCATION → ACTIVATION FLOW FIX
-- ============================================================================
-- Copy this entire file and run in Supabase SQL Editor

-- Step 1: Drop existing table to start fresh
DROP TABLE IF EXISTS user_bots CASCADE;

-- Step 2: Create complete user_bots table with ALL required fields
CREATE TABLE user_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  bot_name VARCHAR NOT NULL,
  bot_type VARCHAR DEFAULT 'AI-Trading',
  
  -- Status flow: PENDING_APPROVAL → APPROVED_FOR_ALLOCATION → ACTIVE → CLOSED/PAUSED
  status VARCHAR DEFAULT 'PENDING_APPROVAL' CHECK (status IN ('PENDING_APPROVAL', 'APPROVED_FOR_ALLOCATION', 'ACTIVE', 'PAUSED', 'CLOSED')),
  
  -- Capital management
  allocated_amount NUMERIC(18,2) DEFAULT 0 NOT NULL,
  total_earned NUMERIC(18,2) DEFAULT 0 NOT NULL,
  total_lost NUMERIC(18,2) DEFAULT 0 NOT NULL,
  
  -- Bot configuration
  performance NUMERIC(5,2) NOT NULL,
  daily_return NUMERIC(5,2),
  outcome VARCHAR CHECK (outcome IN ('win', 'lose', 'random')),
  
  -- Duration configuration
  duration_value VARCHAR DEFAULT '7',
  duration_type VARCHAR DEFAULT 'days' CHECK (duration_type IN ('minutes', 'hours', 'days')),
  max_duration_ms BIGINT,
  
  -- Timestamps for activation and tracking
  purchased_at TIMESTAMP DEFAULT NOW() NOT NULL,
  approved_at TIMESTAMP,
  started_at TIMESTAMP,
  end_date TIMESTAMP,
  
  -- Audit trail
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Step 3: Create critical indexes for performance
CREATE INDEX idx_user_bots_user_id ON user_bots(user_id);
CREATE INDEX idx_user_bots_status ON user_bots(status);
CREATE INDEX idx_user_bots_user_status ON user_bots(user_id, status);
CREATE INDEX idx_user_bots_updated ON user_bots(updated_at);

-- Step 4: Create bot_approvals table for admin tracking
CREATE TABLE IF NOT EXISTS bot_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL UNIQUE REFERENCES user_bots(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES user_profiles(id),
  approval_type VARCHAR NOT NULL CHECK (approval_type IN ('PURCHASE', 'ACTIVATION')),
  status VARCHAR DEFAULT 'APPROVED' CHECK (status IN ('APPROVED', 'REJECTED')),
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_bot_approvals_bot ON bot_approvals(bot_id);
CREATE INDEX idx_bot_approvals_admin ON bot_approvals(admin_id);

-- Step 5: Create bot_earning_history for tracking
CREATE TABLE IF NOT EXISTS bot_earning_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES user_bots(id) ON DELETE CASCADE,
  total_earned NUMERIC(18,2) NOT NULL,
  total_lost NUMERIC(18,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_bot_earning_history_bot ON bot_earning_history(bot_id);
CREATE INDEX idx_bot_earning_history_time ON bot_earning_history(recorded_at);

-- Step 6: Enable RLS on user_bots
ALTER TABLE user_bots ENABLE ROW LEVEL SECURITY;

-- Step 7: RLS Policy - Users can only see their own bots
DROP POLICY IF EXISTS "Users can view own bots" ON user_bots;
CREATE POLICY "Users can view own bots" ON user_bots
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Step 8: RLS Policy - Users can only insert their own bots
DROP POLICY IF EXISTS "Users can create own bots" ON user_bots;
CREATE POLICY "Users can create own bots" ON user_bots
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Step 9: RLS Policy - Users can only update their own bots
DROP POLICY IF EXISTS "Users can update own bots" ON user_bots;
CREATE POLICY "Users can update own bots" ON user_bots
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Step 10: Create admin view for approvals dashboard
CREATE OR REPLACE VIEW admin_pending_bots AS
SELECT 
  ub.id,
  ub.user_id,
  up.email as user_email,
  up.full_name as user_name,
  ub.bot_name,
  ub.performance,
  ub.status,
  ub.allocated_amount,
  ub.purchased_at,
  ub.created_at
FROM user_bots ub
LEFT JOIN user_profiles up ON ub.user_id = up.id
WHERE ub.status IN ('PENDING_APPROVAL', 'APPROVED_FOR_ALLOCATION')
ORDER BY ub.created_at ASC;

-- Step 11: Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_bots_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS user_bots_update_timestamp ON user_bots;
CREATE TRIGGER user_bots_update_timestamp
BEFORE UPDATE ON user_bots
FOR EACH ROW
EXECUTE FUNCTION update_user_bots_timestamp();

-- Step 12: Verify schema
SELECT 'user_bots table created successfully' as status,
       COUNT(*) as column_count 
FROM information_schema.columns 
WHERE table_name = 'user_bots';
