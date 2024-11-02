import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FeedbackGiverGallery } from './FeedbackGiverGallery';
import '../index.css';

declare global {
  interface Window {
    OnlyFeedback?: {
      init: (element: HTMLElement, options?: {
        title?: string;
        subtitle?: string;
      }) => void;
    };
  }
}

function EmbedWrapper({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <BrowserRouter>
      <FeedbackGiverGallery title={title} subtitle={subtitle} />
    </BrowserRouter>
  );
}

// Initialize the embed code
window.OnlyFeedback = {
  init: (element: HTMLElement, options = {}) => {
    const root = createRoot(element);
    root.render(<EmbedWrapper {...options} />);
  },
};