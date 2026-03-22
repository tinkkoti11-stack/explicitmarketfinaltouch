const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wlfmhwbsqocrvylufnyt.supabase.co';
const supabaseAnonKey = 'sb_publishable_xfbsc_CFq8nN45MuGfvzng_1fu8TqBu';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTopReferrersFunction() {
  console.log('🔧 Creating get_top_referrers SQL function...\n');

  const functionSQL = `
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
  `;

  try {
    // Use rpc to execute raw SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: functionSQL });

    if (error) {
      console.error('❌ Error creating function:', error.message);
      return;
    }

    console.log('✅ get_top_referrers function created successfully!');

    // Test the function
    console.log('\n🧪 Testing the function...');
    const { data: testData, error: testError } = await supabase.rpc('get_top_referrers');

    if (testError) {
      console.error('❌ Error testing function:', testError.message);
    } else {
      console.log('✅ Function works! Found', testData?.length || 0, 'referrers');
      if (testData && testData.length > 0) {
        console.log('Sample referrer:', testData[0]);
      }
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

createTopReferrersFunction();