-- Add Stripe-related columns to feedback_givers table
ALTER TABLE feedback_givers
ADD COLUMN stripe_account_id text,
ADD COLUMN stripe_account_status text DEFAULT 'pending',
ADD COLUMN stripe_details_submitted boolean DEFAULT false;

-- Add indexes for better query performance
CREATE INDEX idx_feedback_givers_stripe_account_id ON feedback_givers(stripe_account_id);
CREATE INDEX idx_feedback_givers_stripe_account_status ON feedback_givers(stripe_account_status);