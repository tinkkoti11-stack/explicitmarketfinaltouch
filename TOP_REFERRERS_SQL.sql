-- Function to get top referrers with aggregated data from referral_records
CREATE OR REPLACE FUNCTION get_top_referrers()
RETURNS TABLE (
  user_id TEXT,
  name TEXT,
  email TEXT,
  country TEXT,
  total_referrals BIGINT,
  total_earnings NUMERIC,
  current_balance NUMERIC,
  last_referral_date TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rr.referrer_id::TEXT,
    up.name,
    up.email,
    up.country,
    COUNT(rr.id)::BIGINT as total_referrals,
    COALESCE(SUM(rr.bonus_amount), 0)::NUMERIC as total_earnings,
    COALESCE(ub.balance, 0)::NUMERIC as current_balance,
    MAX(rr.created_at) as last_referral_date
  FROM referral_records rr
  JOIN user_profiles up ON rr.referrer_id = up.id
  LEFT JOIN user_balances ub ON rr.referrer_id = ub.user_id
  WHERE rr.status = 'COMPLETED'
  GROUP BY rr.referrer_id, up.name, up.email, up.country, ub.balance
  ORDER BY total_referrals DESC, total_earnings DESC;
END;
$$;