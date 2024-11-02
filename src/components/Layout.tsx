import { Outlet, Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Button } from './Button';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8" />
              <span className="text-xl font-bold">OnlyFeedback</span>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} OnlyFeedback. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}