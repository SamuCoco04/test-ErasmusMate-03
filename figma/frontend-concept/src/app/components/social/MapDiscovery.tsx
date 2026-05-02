import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { MapPin, Filter, Star, Coffee, Home, Utensils, GraduationCap, Heart, Flag, X } from 'lucide-react';
import { useState } from 'react';

export function MapDiscovery() {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(1);
  const [showFilters, setShowFilters] = useState(false);

  const mapContent = [
    {
      id: 1,
      type: 'restaurant',
      name: 'Cervecería Catalana',
      category: 'Food & Dining',
      rating: 4.8,
      reviews: 23,
      author: 'Anna K.',
      description: 'Amazing tapas place! Must try the jamón ibérico and patatas bravas.',
      location: 'Carrer de Mallorca, 236',
      coordinates: { lat: 41.3925, lng: 2.1625 },
    },
    {
      id: 2,
      type: 'cafe',
      name: 'Nomad Coffee',
      category: 'Cafés & Study',
      rating: 4.6,
      reviews: 18,
      author: 'Johan A.',
      description: 'Perfect spot for studying. Great wifi and amazing coffee.',
      location: 'Passatge Sert, 12',
      coordinates: { lat: 41.3910, lng: 2.1635 },
    },
    {
      id: 3,
      type: 'university',
      name: 'University of Barcelona - Main Campus',
      category: 'Academic',
      rating: 4.9,
      reviews: 42,
      author: 'Multiple students',
      description: 'Main campus with beautiful architecture. Library is on the second floor.',
      location: 'Gran Via de les Corts Catalanes, 585',
      coordinates: { lat: 41.3865, lng: 2.1640 },
    },
    {
      id: 4,
      type: 'accommodation',
      name: 'Student Residence Diagonal',
      category: 'Accommodation',
      rating: 4.3,
      reviews: 15,
      author: 'Sophie L.',
      description: 'Clean and affordable student housing. Close to metro.',
      location: 'Avinguda Diagonal, 442',
      coordinates: { lat: 41.3945, lng: 2.1580 },
    },
  ];

  const selectedContent = mapContent.find(c => c.id === selectedMarker);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Food')) return Utensils;
    if (category.includes('Caf')) return Coffee;
    if (category.includes('Academic')) return GraduationCap;
    if (category.includes('Accommodation')) return Home;
    return MapPin;
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Filters Sidebar */}
      <div className={`w-full md:w-80 bg-white border-r border-slate-200 flex flex-col ${showFilters ? '' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-slate-900">Map Explorer</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <Input placeholder="Search places..." />
        </div>

        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm text-slate-700 mb-3">Filters</h3>
          <div className="space-y-2">
            {[
              { label: 'Food & Dining', count: 34, icon: Utensils, color: 'text-orange-600' },
              { label: 'Cafés & Study', count: 18, icon: Coffee, color: 'text-amber-600' },
              { label: 'Academic', count: 12, icon: GraduationCap, color: 'text-blue-600' },
              { label: 'Accommodation', count: 24, icon: Home, color: 'text-green-600' },
            ].map((filter, idx) => {
              const Icon = filter.icon;
              return (
                <label key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  <Icon className={`w-4 h-4 ${filter.color}`} />
                  <span className="text-sm text-slate-700 flex-1">{filter.label}</span>
                  <span className="text-xs text-slate-500">{filter.count}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm text-slate-700 mb-3">Rating</h3>
          <div className="space-y-2">
            {['4.5+ Stars', '4.0+ Stars', '3.0+ Stars', 'All ratings'].map((rating, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="radio" name="rating" defaultChecked={idx === 0} className="text-[--social-primary]" />
                {rating}
              </label>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm text-slate-700 mb-3">Recent Recommendations ({mapContent.length})</h3>
          <div className="space-y-2">
            {mapContent.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <Card
                  key={item.id}
                  hoverable
                  padding="sm"
                  className={`cursor-pointer ${selectedMarker === item.id ? 'border-2 border-[--social-primary]' : ''}`}
                  onClick={() => setSelectedMarker(item.id)}
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-[--social-primary] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-slate-900 mb-0.5 truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-slate-600">{item.rating}</span>
                        </div>
                        <span className="text-xs text-slate-500">({item.reviews})</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate">{item.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-lg border border-slate-200"
        >
          <Filter className="w-5 h-5 text-slate-700" />
        </button>

        {/* Simulated Map Background */}
        <div className="w-full h-full bg-slate-100 relative overflow-hidden">
          {/* Map placeholder with grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

          {/* Map markers */}
          {mapContent.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedMarker(item.id)}
              className={`absolute w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
                selectedMarker === item.id
                  ? 'bg-[--social-primary] text-white scale-110 z-10'
                  : 'bg-white text-[--social-primary]'
              }`}
              style={{
                left: `${30 + idx * 15}%`,
                top: `${35 + idx * 8}%`,
              }}
            >
              <MapPin className="w-5 h-5 fill-current" />
            </button>
          ))}

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="text-slate-700">+</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <span className="text-slate-700">−</span>
            </button>
          </div>

          {/* Map Info Card */}
          {selectedContent && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:w-96">
              <Card className="shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2">
                    {(() => {
                      const Icon = getCategoryIcon(selectedContent.category);
                      return <Icon className="w-5 h-5 text-[--social-primary] mt-0.5 flex-shrink-0" />;
                    })()}
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">{selectedContent.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                        {selectedContent.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarker(null);
                    }}
                    className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-slate-900">{selectedContent.rating}</span>
                  </div>
                  <span className="text-sm text-slate-600">({selectedContent.reviews} reviews)</span>
                  <span className="text-xs text-slate-500">by {selectedContent.author}</span>
                </div>

                <p className="text-sm text-slate-700 mb-3">{selectedContent.description}</p>

                <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{selectedContent.location}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="social" size="sm" className="flex-1">
                    View Full Details
                  </Button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 max-w-md hidden md:block">
          <Card className="bg-blue-50 border-blue-200 shadow-lg">
            <p className="text-xs text-slate-700 text-center">
              <strong>Privacy Notice:</strong> Map content shows public Erasmus-relevant recommendations only.
              Personal locations are not tracked or displayed.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
