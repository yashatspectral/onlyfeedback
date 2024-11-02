import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MapPin, AlertCircle } from 'lucide-react';
import { useUploadAvatar } from '../hooks/useUploadAvatar';
import { useStripeConnect } from '../hooks/useStripeConnect';
import { cn } from '../lib/utils';

export function SignupPage() {
  const navigate = useNavigate();
  const { uploadAvatar, uploading } = useUploadAvatar();
  const { startOnboarding, loading: connectingStripe } = useStripeConnect();
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [basePrice, setBasePrice] = useState('25');
  const [multiplier, setMultiplier] = useState('2');
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      let avatarUrl = null;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      const feedbackGiverData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        avatar_url: avatarUrl,
        twitter_handle: formData.get('twitter') as string,
        github_handle: formData.get('github') as string,
        location: formData.get('location') as string,
        bio: formData.get('bio') as string,
        followers: formData.get('followers') as string,
        base_price: Number(basePrice),
        public_multiplier: Number(multiplier)
      };

      // Start Stripe onboarding with form data
      await startOnboarding(feedbackGiverData);

      // The user will be redirected back after completing Stripe onboarding
      navigate('/browse');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const isSubmitting = uploading || connectingStripe;

  const inputClassName = "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1.5";

  // Rest of the JSX remains exactly the same
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Become an OnlyFeedback Creator</h1>
            <p className="mt-2 text-gray-600">They say it's easy to be a critic.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              
              {/* Avatar Upload */}
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Profile Picture</h3>
                  <p className="text-sm text-gray-500">Upload a professional photo</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className={labelClassName}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={inputClassName}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClassName}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={inputClassName}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className={labelClassName}>Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    required
                    rows={3}
                    className={inputClassName}
                    placeholder="Tell us about your experience and expertise..."
                  />
                </div>

                <div>
                  <label htmlFor="location" className={labelClassName}>Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      className={cn(inputClassName, "pl-10")}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Social Profiles</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="twitter" className={labelClassName}>Twitter Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">@</span>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      required
                      className={cn(inputClassName, "pl-8")}
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="followers" className={labelClassName}>Twitter Followers</label>
                  <input
                    type="text"
                    id="followers"
                    name="followers"
                    required
                    className={inputClassName}
                    placeholder="e.g. 10K"
                  />
                </div>

                <div>
                  <label htmlFor="github" className={labelClassName}>GitHub Username</label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    required
                    className={inputClassName}
                    placeholder="johndoe"
                  />
                </div>
              </div>
            </div>
            
            {/* Pricing Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
              <div>
                <label htmlFor="basePrice" className={labelClassName}>Base Price per Feedback</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    id="basePrice"
                    min="1"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className={cn(inputClassName, "pl-8")}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Each feedback includes a 5-minute Loom video review
                </p>
              </div>

              <div>
                <label htmlFor="multiplier" className={labelClassName}>Public Roast Multiplier</label>
                <select
                  id="multiplier"
                  value={multiplier}
                  onChange={(e) => setMultiplier(e.target.value)}
                  className={inputClassName}
                >
                  <option value="1.5">1.5x (${Number(basePrice) * 1.5})</option>
                  <option value="2">2x (${Number(basePrice) * 2})</option>
                  <option value="3">3x (${Number(basePrice) * 3})</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Multiplier for public roasts that can be shared on social media
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 text-lg"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account & Connect Stripe'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}