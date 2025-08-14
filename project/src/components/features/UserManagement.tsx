import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Shield, User, Stethoscope, UserCheck, MoreVertical } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  avatar: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { addNotification } = useNotifications();

  const users: User[] = [
    {
      id: '1',
      name: 'John Patient',
      email: 'patient@healthcare.com',
      role: 'patient',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00',
      createdAt: '2023-06-15T08:00:00',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '2',
      name: 'Dr. Sarah Wilson',
      email: 'doctor@healthcare.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00',
      createdAt: '2022-03-10T14:20:00',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '3',
      name: 'Admin Manager',
      email: 'admin@healthcare.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T11:45:00',
      createdAt: '2021-01-20T16:30:00',
      avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '4',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@healthcare.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-01-14T16:20:00',
      createdAt: '2022-08-05T10:15:00',
      avatar: 'https://images.pexels.com/photos/5452240/pexels-photo-5452240.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '5',
      name: 'Emma Johnson',
      email: 'emma.johnson@healthcare.com',
      role: 'patient',
      status: 'pending',
      lastLogin: 'Never',
      createdAt: '2024-01-14T12:00:00',
      avatar: 'https://images.pexels.com/photos/5452219/pexels-photo-5452219.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return <UserCheck className="w-4 h-4" />;
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (action: string, user: User) => {
    switch (action) {
      case 'edit':
        addNotification({
          type: 'info',
          title: 'Edit User',
          message: `Edit form for ${user.name} would open here.`
        });
        break;
      case 'delete':
        addNotification({
          type: 'warning',
          title: 'Delete User',
          message: `Confirmation dialog for deleting ${user.name} would appear.`
        });
        break;
      case 'activate':
        addNotification({
          type: 'success',
          title: 'User Activated',
          message: `${user.name} has been activated successfully.`
        });
        break;
      case 'deactivate':
        addNotification({
          type: 'warning',
          title: 'User Deactivated',
          message: `${user.name} has been deactivated.`
        });
        break;
    }
  };

  const roleStats = {
    patients: users.filter(u => u.role === 'patient').length,
    doctors: users.filter(u => u.role === 'doctor').length,
    admins: users.filter(u => u.role === 'admin').length,
    total: users.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage system users and their permissions</p>
          </div>
          <button
            onClick={() => addNotification({
              type: 'info',
              title: 'Add User',
              message: 'User creation form would open here.'
            })}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{roleStats.total}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Patients</p>
              <p className="text-3xl font-bold text-blue-600">{roleStats.patients}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Doctors</p>
              <p className="text-3xl font-bold text-green-600">{roleStats.doctors}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Stethoscope className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-3xl font-bold text-purple-600">{roleStats.admins}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''} Found
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Created</th>
                <th className="text-center py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleUserAction('edit', user)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction(user.status === 'active' ? 'deactivate' : 'activate', user)}
                        className={`p-1 rounded ${
                          user.status === 'active' 
                            ? 'text-orange-600 hover:bg-orange-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUserAction('delete', user)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;