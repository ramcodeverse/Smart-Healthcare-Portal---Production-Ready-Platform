import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import {
  BarChart3,
  Users,
  Calendar,
  Shield,
  TrendingUp,
  Activity,
  QrCode,
  Server,
  RefreshCw
} from 'lucide-react';
import AnalyticsDashboard from '../features/AnalyticsDashboard';
import UserManagement from '../features/UserManagement';
import SystemMonitoring from '../features/SystemMonitoring';
import PrescriptionManager from '../features/PrescriptionManager';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, activityLogs, telemetry, resetToDefaults } = useHealthcareData();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Real Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Total System Accounts</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{stats.totalUsers}</p>
              <p className="text-xs text-blue-600 mt-1 font-medium">
                {stats.totalPatients} Patients • {stats.totalDoctors} Doctors
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Active Patients</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{stats.activePatients}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">Under active clinical care</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Today's Appointments</p>
              <p className="text-3xl font-black text-purple-600 mt-1">{stats.appointmentsToday}</p>
              <p className="text-xs text-purple-600 mt-1 font-medium">
                {stats.completedAppointmentsToday} completed • {stats.pendingAppointmentsToday} pending
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Portal Uptime & SLA</p>
              <p className="text-2xl font-black text-gray-900 mt-1 font-mono">{stats.systemUptimeDuration}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                {stats.systemUptimePercentage} availability SLA
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time System Performance & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Real System Telemetry & Performance</h3>
              <p className="text-xs text-gray-500">Live metrics measured from client engine & runtime container</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Telemetry
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Client Heap Memory ({telemetry.jsHeapSizeMB} MB)</span>
                <span>Optimal (Cap: 512 MB)</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((telemetry.jsHeapSizeMB / 128) * 100))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>DOM Nodes Rendered ({telemetry.domNodesCount} elements)</span>
                <span>Standard Layout</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((telemetry.domNodesCount / 800) * 100))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                <span>Network Latency / RTT ({telemetry.networkLatencyMs} ms)</span>
                <span className="text-emerald-600 font-bold">Fast</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, telemetry.networkLatencyMs * 2))}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-500 block">Connection</span>
                <strong className="text-gray-900 uppercase font-mono">{telemetry.effectiveConnectionType}</strong>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-500 block">Page Load</span>
                <strong className="text-gray-900 font-mono">{telemetry.pageLoadTimeMs} ms</strong>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-500 block">Network</span>
                <strong className={`font-semibold ${telemetry.isOnline ? 'text-emerald-700' : 'text-red-700'}`}>
                  {telemetry.isOnline ? 'Online' : 'Offline'}
                </strong>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <span className="text-gray-500 block">Active Rx Seals</span>
                <strong className="text-blue-700 font-mono">{stats.totalPrescriptions} verified</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Management</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab('users')}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center space-x-3 group"
              >
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Manage Users</p>
                  <p className="text-[11px] text-gray-500">Add or edit doctors and patients</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('prescriptions')}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all flex items-center space-x-3 group"
              >
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-105 transition-transform">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Medication QR Manager</p>
                  <p className="text-[11px] text-gray-500">Audit & generate authentic QR seals</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('monitoring')}
                className="w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-purple-50/50 hover:border-purple-200 transition-all flex items-center space-x-3 group"
              >
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-105 transition-transform">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Live System Monitoring</p>
                  <p className="text-[11px] text-gray-500">Container health & audit logs</p>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data Store to Certified Baseline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Live Activity Log */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Real System Activity Stream</h3>
          <span className="text-xs text-gray-400 font-mono">Last update: {telemetry.lastUpdated}</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-xl ${
                    activity.level === 'success'
                      ? 'bg-emerald-100 text-emerald-700'
                      : activity.level === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : activity.level === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{activity.message}</p>
                  <p className="text-[11px] text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  activity.level === 'success'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activity.level === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {activity.level}
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
    prescriptions: () => <PrescriptionManager />
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'monitoring', label: 'Monitoring', icon: Shield },
    { id: 'prescriptions', label: 'Medication QRs', icon: QrCode }
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
