import { FeedbackGiverGallery } from '../components/FeedbackGiverGallery';
import { BrowserRouter } from 'react-router-dom';

export function EmbedPage() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <FeedbackGiverGallery 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
      </div>
    </BrowserRouter>
  );
}