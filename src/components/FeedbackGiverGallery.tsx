import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackGiverCard } from './FeedbackGiverCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_FEEDBACK_GIVERS = [
  {
    id: '1',
    name: 'Sarah Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    twitterHandle: 'sarahdev',
    githubHandle: 'sarahdev',
    price: 25,
    followers: '12.5K',
    location: 'San Francisco, CA',
    bio: 'Senior Frontend Engineer @Netflix. Building beautiful UIs since 2015.',
  },
  {
    id: '2',
    name: 'Alex Builder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    twitterHandle: 'alexbuilds',
    githubHandle: 'alexbuilder',
    price: 50,
    followers: '34.2K',
    location: 'New York, NY',
    bio: 'Staff Engineer @Stripe. Open source enthusiast.',
  },
  {
    id: '3',
    name: 'Emma Tech',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    twitterHandle: 'emmatech',
    githubHandle: 'emmatech',
    price: 75,
    followers: '89.1K',
    location: 'London, UK',
    bio: 'Tech Lead @Vercel. Teaching web development.',
  },
  {
    id: '4',
    name: 'David Code',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    twitterHandle: 'davidcodes',
    githubHandle: 'davidcode',
    price: 100,
    followers: '156K',
    location: 'Berlin, DE',
    bio: 'Principal Engineer @Meta. Web3 developer.',
  },
];

interface FeedbackGiverGalleryProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function FeedbackGiverGallery({ 
  className,
  title = "Get Honest Feedback from Top Builders",
  subtitle = "Connect with experienced developers and get brutally honest feedback about your product."
}: FeedbackGiverGalleryProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(MOCK_FEEDBACK_GIVERS.length / itemsPerPage);
  
  const currentItems = MOCK_FEEDBACK_GIVERS.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className={cn("py-12 space-y-8", className)}>
      {(title || subtitle) && (
        <div className="text-center space-y-4">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      <div className="relative">
        <div className="grid grid-cols-4 gap-6">
          {currentItems.map((giver) => (
            <FeedbackGiverCard
              key={giver.id}
              {...giver}
              onRequest={() => navigate(`/request/${giver.id}`)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevPage}
              className="pointer-events-auto p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors -translate-x-1/2"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPage}
              className="pointer-events-auto p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors translate-x-1/2"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentPage === index
                  ? "bg-gray-900"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}