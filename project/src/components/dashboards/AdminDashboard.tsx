import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { BarChart3, Users, Calendar, Shield, Settings, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import AnalyticsDashboard from '../features/AnalyticsDashboard';
import UserManagement from '../features/UserManagement';
import SystemMonitoring from '../features/SystemMonitoring';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalUsers: 1247,
    activePatients: 856,
    activeDoctors: 42,
    appointmentsToday: 234,
    systemUptime: '99.9%',
    avgResponseTime: '1.2s'
  };

  const recentActivity = [
    { type: 'user_registration', user: 'New patient registered', time: '5 min ago', status: 'success' },
    { type: 'appointment_booked', user: 'Appointment scheduled', time: '12 min ago', status: 'info' },
    { type: 'system_alert', user: 'High server load detected', time: '1 hour ago', status: 'warning' },
    { type: 'backup_completed', user: 'Daily backup completed', time: '2 hours ago', status: 'success' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Patients</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.activePatients}</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last week</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.appointmentsToday}</p>
              <p className="text-xs text-orange-600 mt-1">↓ 3% from yesterday</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.systemUptime}</p>
              <p className="text-xs text-green-600 mt-1">Excellent performance</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Load</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">62%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Performance</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-28 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Response Time</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-16 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">{systemStats.avgResponseTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('users')}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Manage Users</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="font-medium">View Analytics</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('monitoring')}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="font-medium">System Monitor</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <Activity className={`w-4 h-4 ${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                activity.status === 'success' ? 'bg-green-100 text-green-800' :
                activity.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabComponents = {
    overview: renderOverview,
    analytics: () => <AnalyticsDashboard />,
    users: () => <UserManagement />,
    monitoring: () => <SystemMonitoring />,
    settings: () => <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><p>System Settings</p></div>
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'monitoring', label: 'Monitoring', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <DashboardLayout 
      userRole="admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
    >
      {tabComponents[activeTab as keyof typeof tabComponents]?.()}
    </DashboardLayout>
  );
};

export default AdminDashboard;