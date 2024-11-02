import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FeedbackRequestForm } from '../components/FeedbackRequestForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Mock data - replace with actual API call
const MOCK_FEEDBACK_GIVERS = {
  '1': {
    name: 'Sarah Developer',
    basePrice: 25,
  },
  '2': {
    name: 'Alex Builder',
    basePrice: 50,
  },
};

export function FeedbackRequestPage() {
  const { giverId } = useParams();
  const [loading, setLoading] = useState(false);

  const giver = giverId && MOCK_FEEDBACK_GIVERS[giverId as keyof typeof MOCK_FEEDBACK_GIVERS];

  if (!giver) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          Feedback giver not found
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: {
    name: string;
    email: string;
    productLink: string;
    publicRoast: boolean;
  }) => {
    try {
      setLoading(true);
      
      // Here you would:
      // 1. Create a payment intent on your backend
      // 2. Redirect to Stripe Checkout
      // 3. Handle success/failure
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Mock checkout session creation
      // Replace with actual API call to create session
      const session = {
        id: 'mock_session_id',
      };

      // Redirect to checkout
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeedbackRequestForm
          giverName={giver.name}
          basePrice={giver.basePrice}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}