import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { Star, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function CreateRecommendation() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Share a Recommendation</h1>
        <p className="text-slate-600">Help other Erasmus students discover great places</p>
      </div>

      {/* Information Banner */}
      <Card className="border-l-4 border-l-orange-500 bg-[--social-bg]">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-[--social-primary] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">Community Guidelines</h3>
            <p className="text-sm text-slate-600">
              Share honest, helpful recommendations. All content is moderated and must respect community standards.
              Avoid commercial promotion or misleading information.
            </p>
          </div>
        </div>
      </Card>

      {/* Recommendation Form */}
      <Card>
        <form className="space-y-6">
          {/* Place Name */}
          <Input
            label="Place Name"
            placeholder="e.g., Cervecería Catalana"
            required
          />

          {/* Category */}
          <div>
            <label className="text-sm text-slate-700 mb-2 block">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Food & Dining',
                'Cafés & Study',
                'Accommodation',
                'Nightlife',
                'Cultural',
                'Shopping',
                'Sports & Fitness',
                'Other',
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:border-[--social-primary] cursor-pointer transition-colors"
                >
                  <input type="radio" name="category" className="text-[--social-primary]" />
                  <span className="text-sm text-slate-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <Input
              label="Location"
              placeholder="Address or area"
              icon={<MapPin className="w-4 h-4" />}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Provide the address or neighborhood. This will be used for map placement.
            </p>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm text-slate-700 mb-2 block">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-slate-600 self-center">
                  {rating} star{rating > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-slate-700 mb-2 block">
              Your Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Share your experience and why you recommend this place to other Erasmus students..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg min-h-32 resize-none focus:border-[--social-primary] focus:ring-2 focus:ring-orange-100 transition-colors"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Minimum 50 characters. Be specific and helpful.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm text-slate-700 mb-2 block">Tags (Optional)</label>
            <Input placeholder="e.g., budget-friendly, student-discount, wifi" />
            <p className="text-xs text-slate-500 mt-1">
              Separate tags with commas. Max 5 tags.
            </p>
          </div>

          {/* Visibility */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 rounded border-slate-300"
              />
              <div>
                <span className="text-sm text-slate-900 block mb-1">
                  Make this recommendation publicly visible
                </span>
                <span className="text-xs text-slate-600">
                  Your recommendation will be visible to eligible Erasmus students in this destination.
                  You can change this setting later.
                </span>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button variant="social" className="flex-1">
              <Send className="w-4 h-4" /> Publish Recommendation
            </Button>
          </div>
        </form>
      </Card>

      {/* Preview Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <h3 className="text-slate-900 mb-2">Preview</h3>
        <p className="text-xs text-slate-600 mb-4">
          Your recommendation will appear similar to this on the map and in discovery feeds
        </p>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex items-start gap-3 mb-2">
            <MapPin className="w-5 h-5 text-[--social-primary]" />
            <div className="flex-1">
              <h4 className="text-slate-900 mb-1">Place Name</h4>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">by You</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-700">Your experience description will appear here...</p>
        </div>
      </Card>
    </div>
  );
}
