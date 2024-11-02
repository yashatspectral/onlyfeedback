import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useStripeConnect } from '../hooks/useStripeConnect';

export function OnboardingRefreshPage() {
  const navigate = useNavigate();
  const { startOnboarding } = useStripeConnect();

  useEffect(() => {
    const retryOnboarding = async () => {
      try {
        // Get user ID from local storage or context
        const userId = localStorage.getItem('userId');
        if (userId) {
          await startOnboarding(userId);
        } else {
          navigate('/signup');
        }
      } catch (error) {
        console.error('Failed to refresh onboarding:', error);
        navigate('/signup');
      }
    };

    retryOnboarding();
  }, [navigate, startOnboarding]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Refreshing Your Connection
        </h1>
        <p className="text-gray-600">
          Please wait while we reconnect your Stripe account...
        </p>
      </div>
    </div>
  );
}