import { useState } from 'react';
import { Github, Twitter, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { formatPrice } from '../lib/utils';
import { useStripeConnect } from '../hooks/useStripeConnect';
import { Modal } from './Modal';
import { FeedbackRequestForm } from './FeedbackRequestForm';

interface FeedbackGiverProps {
  id: string;
  name: string;
  avatar: string;
  twitterHandle: string;
  githubHandle: string;
  price: number;
  followers: string;
  location: string;
  bio: string;
  stripeAccountId?: string;
  isOwner?: boolean;
}

export function FeedbackGiverCard({
  id,
  name,
  avatar,
  twitterHandle,
  githubHandle,
  price,
  followers,
  location,
  bio,
  stripeAccountId,
  isOwner
}: FeedbackGiverProps) {
  const { getLoginLink, loading: stripeLoading } = useStripeConnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDashboardClick = async () => {
    if (stripeAccountId) {
      await getLoginLink(stripeAccountId);
    }
  };

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async (data: {
    name: string;
    email: string;
    productLink: string;
    publicRoast: boolean;
  }) => {
    // Handle the form submission
    console.log('Form submitted:', data);
    // Close the modal after successful submission
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {name}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                <span>{followers}</span>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{location}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{bio}</p>

            {/* Social Links and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <a
                  href={`https://twitter.com/${twitterHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://github.com/${githubHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
              <div className="text-right flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(price)}
                </span>
                {isOwner && stripeAccountId ? (
                  <Button 
                    onClick={handleDashboardClick}
                    disabled={stripeLoading}
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={handleRequestClick}
                  >
                    Request
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <FeedbackRequestForm
          giverName={name}
          basePrice={price}
          onSubmit={handleSubmitRequest}
        />
      </Modal>
    </>
  );
}