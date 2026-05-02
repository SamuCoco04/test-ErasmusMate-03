import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { Calendar, MapPin, Users, Clock, Plus, Heart, Share2, Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface EventsProps {
  onNavigate?: (destination: string) => void;
}

export function Events({ onNavigate }: EventsProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'attending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const events = [
    {
      id: 1,
      title: 'Park Güell Sunset Meetup',
      description: 'Weekly gathering to watch the sunset and meet other Erasmus students. Bring snacks and good vibes!',
      date: '2026-04-19',
      time: '18:30',
      location: 'Park Güell Main Entrance',
      address: 'Carrer d\'Olot, Barcelona',
      organizer: 'Sofia Martinez',
      attendees: 24,
      maxAttendees: 30,
      category: 'Social',
      status: 'attending' as const,
      image: null,
    },
    {
      id: 2,
      title: 'Language Exchange - Spanish/English',
      description: 'Practice your language skills in a relaxed café environment. All levels welcome!',
      date: '2026-04-20',
      time: '17:00',
      location: 'Café Zurich',
      address: 'Plaça de Catalunya, Barcelona',
      organizer: 'Marco Rossi',
      attendees: 18,
      maxAttendees: 25,
      category: 'Learning',
      status: 'upcoming' as const,
      image: null,
    },
    {
      id: 3,
      title: 'Beach Volleyball Tournament',
      description: 'Friendly tournament at Barceloneta Beach. Teams of 4, all skill levels welcome!',
      date: '2026-04-22',
      time: '15:00',
      location: 'Barceloneta Beach',
      address: 'Platja de la Barceloneta, Barcelona',
      organizer: 'Carlos Ruiz',
      attendees: 32,
      maxAttendees: 40,
      category: 'Sports',
      status: 'upcoming' as const,
      image: null,
    },
    {
      id: 4,
      title: 'Tapas Night & Cultural Exchange',
      description: 'Discover authentic Spanish tapas and share your own culture. €15 includes food and drinks.',
      date: '2026-04-23',
      time: '20:00',
      location: 'La Boqueria Market',
      address: 'La Rambla, Barcelona',
      organizer: 'Anna Schmidt',
      attendees: 15,
      maxAttendees: 20,
      category: 'Food & Drink',
      status: 'attending' as const,
      image: null,
    },
    {
      id: 5,
      title: 'Hiking in Montserrat',
      description: 'Day trip to Montserrat mountain. Train tickets and hiking trails included. Bring water and snacks!',
      date: '2026-04-26',
      time: '08:00',
      location: 'Barcelona Sants Station',
      address: 'Plaça dels Països Catalans, Barcelona',
      organizer: 'Emma Wilson',
      attendees: 28,
      maxAttendees: 35,
      category: 'Adventure',
      status: 'upcoming' as const,
      image: null,
    },
    {
      id: 6,
      title: 'Photography Walk - Gothic Quarter',
      description: 'Explore the Gothic Quarter with cameras and capture beautiful architecture. Beginners welcome!',
      date: '2026-04-27',
      time: '10:00',
      location: 'Plaça de Catalunya',
      address: 'Plaça de Catalunya, Barcelona',
      organizer: 'Luis Garcia',
      attendees: 12,
      maxAttendees: 15,
      category: 'Culture',
      status: 'upcoming' as const,
      image: null,
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' ||
                          (filter === 'attending' && event.status === 'attending') ||
                          (filter === 'upcoming' && event.status === 'upcoming');
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Social': 'bg-purple-100 text-purple-700',
      'Learning': 'bg-blue-100 text-blue-700',
      'Sports': 'bg-green-100 text-green-700',
      'Food & Drink': 'bg-orange-100 text-orange-700',
      'Adventure': 'bg-red-100 text-red-700',
      'Culture': 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Social Events</h1>
          <p className="text-slate-600">Join activities and meet other Erasmus students in Barcelona</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl text-purple-700 mb-1">{events.length}</div>
          <div className="text-sm text-slate-700">Upcoming Events</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-blue-700 mb-1">
            {events.filter(e => e.status === 'attending').length}
          </div>
          <div className="text-sm text-slate-700">You're Attending</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
          <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl text-green-700 mb-1">
            {events.reduce((sum, e) => sum + e.attendees, 0)}
          </div>
          <div className="text-sm text-slate-700">Total Participants</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'attending' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('attending')}
            >
              Attending
            </Button>
          </div>
        </div>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => {
          const spotsLeft = event.maxAttendees - event.attendees;
          const percentFull = (event.attendees / event.maxAttendees) * 100;

          return (
            <Card key={event.id} hoverable className="h-full">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg text-slate-900">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{event.description}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-900">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-slate-600">at {event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-900">{event.location}</p>
                    <p className="text-xs text-slate-600">{event.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-slate-900">
                        {event.attendees} / {event.maxAttendees} attending
                      </p>
                      <span className={`text-xs ${
                        spotsLeft <= 5 ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {spotsLeft} spots left
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          percentFull >= 90 ? 'bg-red-500' :
                          percentFull >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentFull}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs">
                    {event.organizer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-200">
                {event.status === 'attending' ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel Attendance
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" className="flex-1">
                    Join Event
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
