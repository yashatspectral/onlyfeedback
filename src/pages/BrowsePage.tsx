import { FeedbackGiverCard } from '../components/FeedbackGiverCard';
import { useFeedbackGivers } from '../hooks/useFeedbackGivers';

export function BrowsePage() {
  const { feedbackGivers, loading, error } = useFeedbackGivers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feedback givers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading feedback givers. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Feedback from Builders You Trust
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            5 minute Loom with honest, actionable feedback to improve your product.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackGivers.map((giver) => (
            <FeedbackGiverCard
              key={giver.id}
              name={giver.name}
              avatar={giver.avatar_url || ''}
              twitterHandle={giver.twitter_handle}
              githubHandle={giver.github_handle}
              price={giver.base_price}
              followers={giver.followers}
              location={giver.location}
              bio={giver.bio}
              onRequest={() => {/* Handle request */}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}