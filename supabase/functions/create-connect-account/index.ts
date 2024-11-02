import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.19.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') as string,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
)

serve(async (req) => {
  try {
    const { userId } = await req.json()

    // Create a Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })

    // Store the Stripe account ID in your database
    const { error: updateError } = await supabase
      .from('feedback_givers')
      .update({ stripe_account_id: account.id })
      .eq('id', userId)

    if (updateError) throw updateError

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${req.headers.get('origin')}/onboarding/refresh`,
      return_url: `${req.headers.get('origin')}/dashboard`,
      type: 'account_onboarding',
    })

    return new Response(
      JSON.stringify({ accountLink: accountLink.url }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})