import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackGiverCard } from '../components/FeedbackGiverCard';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Button } from '../components/Button';

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

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Instant Feedback',
    description: 'Get detailed feedback from top developers within 24 hours.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Honest Reviews',
    description: 'Receive brutally honest feedback to improve your product.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Expert Network',
    description: 'Connect with a curated network of experienced builders.',
  },
];

const testimonials = [
  {
    quote: "The feedback I received was invaluable. It helped us identify critical issues before our launch.",
    author: "Jane Cooper",
    role: "Founder, TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    quote: "OnlyFeedback connected us with amazing developers who gave honest, actionable insights.",
    author: "Alex Thompson",
    role: "CTO, BuildCo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [feedbackGivers] = useState(MOCK_FEEDBACK_GIVERS);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="relative -mt-8 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-indigo-50/80" />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-r from-indigo-50/50 via-indigo-100/20 to-indigo-200/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get Brutally Honest Feedback from Top Builders
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with experienced developers and get unfiltered feedback about your product.
                Double the price for public roasts!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-gray-900 text-gray-900 hover:bg-gray-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80" 
                alt="Developer feedback"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose OnlyFeedback?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the insights you need to build better products
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Feedback Givers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Feedback Givers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get feedback from experienced developers who've built and scaled successful products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbackGivers.map((giver) => (
            <FeedbackGiverCard
              key={giver.id}
              {...giver}
              onRequest={() => navigate(`/request/${giver.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Builders Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied developers who've improved their products
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-indigo-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Honest Feedback?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join OnlyFeedback today and start getting the insights you need to build better products.
          </p>
          <Button 
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90"
            onClick={() => navigate('/signup')}
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}