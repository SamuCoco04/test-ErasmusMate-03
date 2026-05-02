import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Star, MapPin, ThumbsUp, MessageCircle, Bookmark, TrendingUp, Award, Coffee, Book, Home } from 'lucide-react';
import { useState } from 'react';

interface RecommendationsProps {
  onNavigate?: (destination: string) => void;
}

export function Recommendations({ onNavigate }: RecommendationsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'study' | 'housing' | 'activities'>('all');

  const recommendations = [
    {
      id: 1,
      title: 'Café Zurich',
      category: 'food' as const,
      type: 'Restaurant',
      location: 'Plaça de Catalunya, Barcelona',
      rating: 4.7,
      reviews: 342,
      description: 'Historic café perfect for studying and meeting other students. Great coffee and WiFi!',
      tags: ['Coffee', 'Study Spot', 'WiFi', 'Central'],
      recommendedBy: ['Sarah Chen', 'Marco Rossi', '+12 others'],
      image: null,
      saved: false,
    },
    {
      id: 2,
      title: 'Biblioteca Jaume Fuster',
      category: 'study' as const,
      type: 'Library',
      location: 'Gràcia, Barcelona',
      rating: 4.9,
      reviews: 128,
      description: 'Modern library with amazing views and quiet study areas. Perfect for exam preparation.',
      tags: ['Quiet', 'Modern', 'Great Views', 'Study Rooms'],
      recommendedBy: ['Anna Schmidt', 'Luis Garcia', '+8 others'],
      image: null,
      saved: true,
    },
    {
      id: 3,
      title: 'Student Residence Diagonal',
      category: 'housing' as const,
      type: 'Student Housing',
      location: 'Diagonal, Barcelona',
      rating: 4.5,
      reviews: 89,
      description: 'Great student residence near campus. Social environment with international students.',
      tags: ['Close to Campus', 'Social', 'International', 'Gym'],
      recommendedBy: ['Emma Wilson', 'Tom Brown', '+15 others'],
      image: null,
      saved: false,
    },
    {
      id: 4,
      title: 'Park Güell Sunset Meetup',
      category: 'activities' as const,
      type: 'Social Activity',
      location: 'Park Güell, Barcelona',
      rating: 5.0,
      reviews: 234,
      description: 'Weekly meetup for international students. Watch the sunset and meet new people!',
      tags: ['Social', 'Free', 'Weekly', 'International'],
      recommendedBy: ['Sofia Martinez', 'Alex Thompson', '+28 others'],
      image: null,
      saved: true,
    },
    {
      id: 5,
      title: 'La Boqueria Market',
      category: 'food' as const,
      type: 'Market',
      location: 'La Rambla, Barcelona',
      rating: 4.8,
      reviews: 567,
      description: 'Famous food market with fresh produce and affordable meals. Must-visit for food lovers!',
      tags: ['Market', 'Fresh Food', 'Affordable', 'Iconic'],
      recommendedBy: ['Maria Lopez', 'John Davis', '+45 others'],
      image: null,
      saved: false,
    },
    {
      id: 6,
      title: 'Erasmus Sports League',
      category: 'activities' as const,
      type: 'Sports',
      location: 'Various locations, Barcelona',
      rating: 4.6,
      reviews: 178,
      description: 'Join weekly sports activities with other Erasmus students. Football, volleyball, and more!',
      tags: ['Sports', 'Weekly', 'Team Building', 'Fun'],
      recommendedBy: ['Carlos Ruiz', 'Nina Petrov', '+22 others'],
      image: null,
      saved: false,
    },
  ];

  const filteredRecommendations = activeCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return <Coffee className="w-5 h-5" />;
      case 'study':
        return <Book className="w-5 h-5" />;
      case 'housing':
        return <Home className="w-5 h-5" />;
      case 'activities':
        return <Star className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Recommendations</h1>
        <p className="text-slate-600">Discover the best places and activities recommended by other students in Barcelona</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={activeCategory === 'all' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('all')}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          All Recommendations
        </Button>
        <Button
          variant={activeCategory === 'food' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('food')}
        >
          <Coffee className="w-4 h-4 mr-2" />
          Food & Drinks
        </Button>
        <Button
          variant={activeCategory === 'study' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('study')}
        >
          <Book className="w-4 h-4 mr-2" />
          Study Spots
        </Button>
        <Button
          variant={activeCategory === 'housing' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('housing')}
        >
          <Home className="w-4 h-4 mr-2" />
          Housing
        </Button>
        <Button
          variant={activeCategory === 'activities' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('activities')}
        >
          <Star className="w-4 h-4 mr-2" />
          Activities
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl text-purple-700 mb-1">{recommendations.length}</div>
          <div className="text-sm text-slate-700">Total Recommendations</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <Bookmark className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-blue-700 mb-1">
            {recommendations.filter(r => r.saved).length}
          </div>
          <div className="text-sm text-slate-700">Saved Places</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
          <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl text-green-700 mb-1">4.8</div>
          <div className="text-sm text-slate-700">Average Rating</div>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} hoverable className="h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  rec.category === 'food' ? 'bg-orange-100 text-orange-600' :
                  rec.category === 'study' ? 'bg-blue-100 text-blue-600' :
                  rec.category === 'housing' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {getCategoryIcon(rec.category)}
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-slate-600">{rec.type}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={rec.saved ? 'text-yellow-600' : ''}
              >
                <Bookmark className={`w-5 h-5 ${rec.saved ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-slate-900">{rec.rating}</span>
              </div>
              <span className="text-sm text-slate-600">•</span>
              <span className="text-sm text-slate-600">{rec.reviews} reviews</span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-600">{rec.location}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 mb-4">{rec.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {rec.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Recommended By */}
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 pb-4 border-t border-slate-100 pt-4">
              <ThumbsUp className="w-4 h-4" />
              <span>Recommended by {rec.recommendedBy.join(', ')}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Ask
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Recommendation CTA */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 text-center">
        <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <h3 className="text-xl text-slate-900 mb-2">Know a great place?</h3>
        <p className="text-slate-600 mb-4">Share your favorite spots with other students in Barcelona!</p>
        <Button variant="primary">
          Add Recommendation
        </Button>
      </Card>
    </div>
  );
}
