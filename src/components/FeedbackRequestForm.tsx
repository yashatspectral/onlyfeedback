import { useState } from 'react';
import { Button } from './Button';
import { Toggle } from './Toggle';
import { formatPrice } from '../lib/utils';
import { loadStripe } from '@stripe/stripe-js';

interface FeedbackRequestFormProps {
  giverName: string;
  basePrice: number;
  onSubmit: (data: {
    name: string;
    email: string;
    productLink: string;
    publicRoast: boolean;
  }) => Promise<void>;
}

export function FeedbackRequestForm({
  giverName,
  basePrice,
  onSubmit,
}: FeedbackRequestFormProps) {
  const [publicRoast, setPublicRoast] = useState(false);
  const [loading, setLoading] = useState(false);
  const finalPrice = publicRoast ? basePrice * 2 : basePrice;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        productLink: formData.get('productLink') as string,
        publicRoast,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Feedback</h2>
      <p className="text-gray-600 mb-6">from {giverName}</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="productLink" className="block text-sm font-medium text-gray-700">
            Product Link
          </label>
          <input
            type="url"
            id="productLink"
            name="productLink"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://your-product.com"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Toggle
              checked={publicRoast}
              onCheckedChange={setPublicRoast}
              id="publicRoast"
            />
            <label
              htmlFor="publicRoast"
              className="text-sm font-medium text-gray-700"
            >
              Enable Public Roast
            </label>
          </div>
          <span className="text-lg font-bold">{formatPrice(finalPrice)}</span>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ${formatPrice(finalPrice)}`}
        </Button>
      </form>
    </div>
  );
}