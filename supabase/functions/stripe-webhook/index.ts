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

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No signature found')
    }

    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, endpointSecret)

    switch (event.type) {
      case 'account.updated': {
        const account = event.data.object as Stripe.Account
        
        // Update the feedback giver's status based on their Stripe account status
        const { error } = await supabase
          .from('feedback_givers')
          .update({ 
            stripe_account_status: account.charges_enabled ? 'active' : 'pending',
            stripe_details_submitted: account.details_submitted
          })
          .eq('stripe_account_id', account.id)

        if (error) throw error
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})