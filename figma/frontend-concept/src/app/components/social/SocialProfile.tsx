import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Camera, MapPin, Calendar, GraduationCap, Users, MessageSquare, Settings as SettingsIcon, Globe, Instagram, Linkedin, Mail, Heart, Award } from 'lucide-react';
import { useState } from 'react';

interface SocialProfileProps {
  onNavigate?: (destination: string) => void;
}

export function SocialProfile({ onNavigate }: SocialProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  const profile = {
    name: 'Maria Rodriguez',
    bio: 'Computer Science student from Madrid on Erasmus in Barcelona 🇪🇸 • Love exploring new places, coding, and meeting new people! ☕️📚',
    university: 'Technical University of Madrid',
    hostUniversity: 'University of Barcelona',
    major: 'Computer Science',
    erasmusPeriod: 'Feb 2026 - Jun 2026',
    location: 'Barcelona, Spain',
    hometown: 'Madrid, Spain',
    languages: ['Spanish (Native)', 'English (Fluent)', 'French (Intermediate)'],
    interests: ['Coding', 'Coffee', 'Travel', 'Photography', 'Hiking', 'Music'],
    connections: 47,
    posts: 23,
    photos: 89,
    social: {
      instagram: '@maria_codes',
      linkedin: 'maria-rodriguez',
      email: 'maria.rodriguez@university.edu',
    },
  };

  const recentPosts = [
    {
      id: 1,
      type: 'recommendation',
      content: 'Just discovered this amazing café in Gràcia! Perfect for studying 📚☕',
      likes: 23,
      comments: 5,
      date: '2 days ago',
    },
    {
      id: 2,
      type: 'event',
      content: 'Who wants to join for Park Güell sunset this Saturday? 🌅',
      likes: 18,
      comments: 12,
      date: '4 days ago',
    },
    {
      id: 3,
      type: 'photo',
      content: 'First week in Barcelona vibes! 🇪🇸',
      likes: 45,
      comments: 8,
      date: '1 week ago',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Cover Photo */}
      <Card className="relative overflow-hidden p-0">
        <div className="h-48 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur"
          >
            <Camera className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Profile Photo & Basic Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl">
                  MR
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full border-2 border-purple-500 flex items-center justify-center hover:bg-purple-50 transition-colors">
                  <Camera className="w-5 h-5 text-purple-600" />
                </button>
              </div>
              <div className="mb-4">
                <h1 className="text-3xl text-slate-900 mb-1">{profile.name}</h1>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <SettingsIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="primary" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl text-slate-900">{profile.connections}</div>
              <div className="text-sm text-slate-600">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-slate-900">{profile.posts}</div>
              <div className="text-sm text-slate-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-slate-900">{profile.photos}</div>
              <div className="text-sm text-slate-600">Photos</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - About */}
        <div className="lg:col-span-1 space-y-6">
          {/* Bio */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-3">About</h3>
            <p className="text-sm text-slate-700 mb-4">{profile.bio}</p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-slate-900">{profile.major}</p>
                  <p className="text-slate-600">{profile.university}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-slate-900">Currently in {profile.location}</p>
                  <p className="text-slate-600">From {profile.hometown}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-slate-900">Erasmus Period</p>
                  <p className="text-slate-600">{profile.erasmusPeriod}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Languages */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-3">Languages</h3>
            <div className="space-y-2">
              {profile.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                  <Globe className="w-4 h-4 text-slate-400" />
                  {lang}
                </div>
              ))}
            </div>
          </Card>

          {/* Interests */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </Card>

          {/* Social Links */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-3">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="text-sm text-slate-700">{profile.social.instagram}</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-700">{profile.social.linkedin}</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Mail className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-700">{profile.social.email}</span>
              </a>
            </div>
          </Card>
        </div>

        {/* Right Column - Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                      MR
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-900">{profile.name}</p>
                        <span className="text-xs text-slate-500">{post.date}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                        {post.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-3">{post.content}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-slate-900">Early Bird</p>
                  <p className="text-xs text-slate-600">First to arrive</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-slate-900">Social Butterfly</p>
                  <p className="text-xs text-slate-600">50+ connections</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <MessageSquare className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-slate-900">Active Member</p>
                  <p className="text-xs text-slate-600">20+ posts</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <MapPin className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-slate-900">Explorer</p>
                  <p className="text-xs text-slate-600">10+ recommendations</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
