import { useState } from 'react';
import { Button } from './Button';

export function SignupForm() {
  const [isGiver, setIsGiver] = useState(false);
  const [price, setPrice] = useState('25');

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
            Twitter Link
          </label>
          <input
            type="url"
            id="twitter"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700">
            Github Link
          </label>
          <input
            type="url"
            id="github"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="giveFeedback"
            checked={isGiver}
            onChange={(e) => setIsGiver(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="giveFeedback" className="text-sm font-medium text-gray-700">
            I want to give feedback
          </label>
        </div>

        {isGiver && (
          <div className="space-y-4 pt-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price per feedback (USD)
              </label>
              <input
                type="number"
                id="price"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Public Humiliation Multiplier
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="2"
              >
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
              </select>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  );
}