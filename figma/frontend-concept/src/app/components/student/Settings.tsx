import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { User, Bell, Lock, Globe, Mail, Phone, MapPin, Shield, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlines: true,
    documents: true,
    messages: true,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and personal information</p>
      </div>

      {/* Personal Information */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl text-slate-900">Personal Information</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">First Name</label>
              <input
                type="text"
                defaultValue="Maria"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Rodriguez"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                defaultValue="maria.rodriguez@university.edu"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                defaultValue="+34 612 345 678"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Home Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <textarea
                defaultValue="Calle Mayor 123, 28013 Madrid, Spain"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl text-slate-900">Security</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full pl-10 pr-12 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="mb-1">Password requirements:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600">
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary">Update Password</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl text-slate-900">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="text-sm text-slate-900">Email Notifications</p>
              <p className="text-xs text-slate-600">Receive updates via email</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></span>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="text-sm text-slate-900">Push Notifications</p>
              <p className="text-xs text-slate-600">Receive browser notifications</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></span>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="text-sm text-slate-900">Deadline Reminders</p>
              <p className="text-xs text-slate-600">Get notified about upcoming deadlines</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications.deadlines}
                onChange={(e) => setNotifications({ ...notifications, deadlines: e.target.checked })}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></span>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="text-sm text-slate-900">Document Updates</p>
              <p className="text-xs text-slate-600">Status changes on your documents</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications.documents}
                onChange={(e) => setNotifications({ ...notifications, documents: e.target.checked })}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></span>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <p className="text-sm text-slate-900">New Messages</p>
              <p className="text-xs text-slate-600">Notifications for new messages</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={notifications.messages}
                onChange={(e) => setNotifications({ ...notifications, messages: e.target.checked })}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer"></span>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
            </label>
          </div>
        </div>
      </Card>

      {/* Language & Region */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl text-slate-900">Language & Region</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="UTC+1">Central European Time (UTC+1)</option>
              <option value="UTC">Greenwich Mean Time (UTC)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC-8">Pacific Time (UTC-8)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Date Format</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button variant="primary">Save Preferences</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
