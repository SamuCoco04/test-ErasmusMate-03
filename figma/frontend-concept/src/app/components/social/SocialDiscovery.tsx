import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Input } from '../design-system/Input';
import { Users, MapPin, Calendar, Star, MessageSquare, UserPlus, Filter, Search } from 'lucide-react';

interface SocialDiscoveryProps {
  onNavigate?: (destination: string) => void;
}

export function SocialDiscovery({ onNavigate }: SocialDiscoveryProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Discover Students</h1>
        <p className="text-slate-600">Connect with other Erasmus students at your destination</p>
      </div>

      {/* Information Banner */}
      <Card className="border-l-4 border-l-orange-500 bg-[--social-bg]">
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-[--social-primary] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">Social Discovery Guidelines</h3>
            <p className="text-sm text-slate-600">
              You can discover and send connection requests to students with overlapping Erasmus contexts.
              Messaging becomes available only after connection acceptance. All content is moderated.
            </p>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, university, or city..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs px-3 py-1.5 bg-[--social-primary] text-white rounded-full flex items-center gap-2">
            Destination: Barcelona
            <button className="hover:bg-white/20 rounded-full p-0.5">×</button>
          </span>
          <span className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
            Spring 2026
            <button className="hover:bg-blue-200 rounded-full p-0.5">×</button>
          </span>
        </div>
      </Card>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            name: 'Anna Kowalski',
            university: 'University of Warsaw',
            destination: 'Barcelona, Spain',
            host: 'University of Barcelona',
            period: 'Feb - Jun 2026',
            stage: 'During Mobility',
            interests: ['Architecture', 'Food', 'Language Exchange'],
            mutualConnections: 3,
            available: true,
          },
          {
            name: 'Johan Andersson',
            university: 'Stockholm University',
            destination: 'Barcelona, Spain',
            host: 'Autonomous University',
            period: 'Jan - Jun 2026',
            stage: 'During Mobility',
            interests: ['Sports', 'Travel', 'Music'],
            mutualConnections: 1,
            available: true,
          },
          {
            name: 'Sophie Laurent',
            university: 'University of Lyon',
            destination: 'Barcelona, Spain',
            host: 'Pompeu Fabra University',
            period: 'Sep 2025 - Feb 2026',
            stage: 'After Mobility',
            interests: ['Art', 'Photography', 'Culture'],
            mutualConnections: 0,
            available: true,
          },
          {
            name: 'Luca Bianchi',
            university: 'University of Milan',
            destination: 'Barcelona, Spain',
            host: 'University of Barcelona',
            period: 'Mar - Jul 2026',
            stage: 'Before Mobility',
            interests: ['Technology', 'Food', 'Hiking'],
            mutualConnections: 2,
            available: true,
          },
          {
            name: 'Emma Dubois',
            university: 'Sorbonne University',
            destination: 'Barcelona, Spain',
            host: 'University of Barcelona',
            period: 'Feb - Jun 2026',
            stage: 'During Mobility',
            interests: ['History', 'Museums', 'Coffee'],
            mutualConnections: 0,
            available: true,
          },
          {
            name: 'Carlos Martinez',
            university: 'University of Lisbon',
            destination: 'Barcelona, Spain',
            host: 'Polytechnic University',
            period: 'Jan - May 2026',
            stage: 'During Mobility',
            interests: ['Beach', 'Nightlife', 'Football'],
            mutualConnections: 1,
            available: true,
          },
        ].map((student, idx) => (
          <Card key={idx} hoverable className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[--social-primary] to-[--social-secondary] rounded-full flex items-center justify-center text-white flex-shrink-0">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 mb-1 truncate">{student.name}</h3>
                <p className="text-xs text-slate-600 truncate">{student.university}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[--social-primary] flex-shrink-0" />
                <span className="truncate">{student.destination}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-[--social-primary] flex-shrink-0" />
                <span>{student.period}</span>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {student.stage}
              </span>
            </div>

            {student.mutualConnections > 0 && (
              <div className="text-xs text-[--social-primary] mb-3 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {student.mutualConnections} mutual connection{student.mutualConnections > 1 ? 's' : ''}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-4">
              {student.interests.slice(0, 3).map((interest, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                  {interest}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100">
              <Button variant="social" size="sm" className="flex-1" onClick={() => onNavigate?.('connections')}>
                <UserPlus className="w-4 h-4" /> Connect
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate?.('social-profile')}>
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Students</Button>
      </div>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-[--social-primary] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-2">Connection Tips</h3>
            <ul className="space-y-1 text-sm text-slate-700">
              <li>• Personalize your connection request to increase acceptance rate</li>
              <li>• Students with mutual connections are more likely to respond</li>
              <li>• You can message after a connection is accepted</li>
              <li>• Respect privacy settings and community guidelines</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
