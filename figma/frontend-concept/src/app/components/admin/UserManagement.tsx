import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { User, Search, Filter, Plus, Edit, Trash2, Shield, Mail, Calendar, UserCheck, UserX } from 'lucide-react';
import { useState } from 'react';

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'coordinator' | 'admin'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@university.edu',
      role: 'student' as const,
      status: 'active' as const,
      lastLogin: '2026-04-18',
      createdDate: '2025-12-01',
      university: 'Technical University of Madrid',
    },
    {
      id: 2,
      name: 'Dr. Sarah Thompson',
      email: 'sarah.thompson@university.edu',
      role: 'coordinator' as const,
      status: 'active' as const,
      lastLogin: '2026-04-17',
      createdDate: '2024-01-15',
      university: 'Technical University of Madrid',
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@university.edu',
      role: 'student' as const,
      status: 'active' as const,
      lastLogin: '2026-04-18',
      createdDate: '2025-11-20',
      university: 'Technical University of Madrid',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@university.edu',
      role: 'student' as const,
      status: 'active' as const,
      lastLogin: '2026-04-16',
      createdDate: '2026-01-10',
      university: 'Technical University of Madrid',
    },
    {
      id: 5,
      name: 'Anna Jensen',
      email: 'anna.jensen@university.edu',
      role: 'coordinator' as const,
      status: 'active' as const,
      lastLogin: '2026-04-18',
      createdDate: '2024-03-01',
      university: 'Technical University of Madrid',
    },
    {
      id: 6,
      name: 'Tom Brown',
      email: 'tom.brown@university.edu',
      role: 'student' as const,
      status: 'inactive' as const,
      lastLogin: '2026-02-15',
      createdDate: '2025-09-01',
      university: 'Technical University of Madrid',
    },
    {
      id: 7,
      name: 'System Administrator',
      email: 'admin@university.edu',
      role: 'admin' as const,
      status: 'active' as const,
      lastLogin: '2026-04-18',
      createdDate: '2023-01-01',
      university: 'System',
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'coordinator':
        return 'bg-blue-100 text-blue-700';
      case 'student':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">User Management</h1>
          <p className="text-slate-600">Manage user accounts, roles, and permissions</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <User className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{users.length}</div>
          <div className="text-sm text-slate-600">Total Users</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {users.filter(u => u.role === 'student').length}
          </div>
          <div className="text-sm text-slate-700">Students</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {users.filter(u => u.role === 'coordinator').length}
          </div>
          <div className="text-sm text-slate-700">Coordinators</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-slate-700">Administrators</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={roleFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter('all')}
            >
              All
            </Button>
            <Button
              variant={roleFilter === 'student' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter('student')}
            >
              Students
            </Button>
            <Button
              variant={roleFilter === 'coordinator' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter('coordinator')}
            >
              Coordinators
            </Button>
            <Button
              variant={roleFilter === 'admin' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter('admin')}
            >
              Admins
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm text-slate-600">User</th>
              <th className="text-left py-3 px-4 text-sm text-slate-600">Email</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Role</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Status</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Last Login</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Created</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      user.role === 'admin' ? 'bg-red-600' :
                      user.role === 'coordinator' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-600">{user.university}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">{user.email}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusChip status={user.status} size="sm" />
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm text-slate-700">
                    {new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm text-slate-600">
                    {new Date(user.createdDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4" />
                    </Button>
                    {user.role !== 'admin' && (
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add User Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-slate-900 mb-4">Add New User</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@university.edu"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a role</option>
                  <option value="student">Student</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">University</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter university name"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">
                  Create User
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
