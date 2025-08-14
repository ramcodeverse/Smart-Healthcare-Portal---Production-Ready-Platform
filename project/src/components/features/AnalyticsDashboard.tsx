import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Activity } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('month');

  const metrics = {
    totalPatients: 1247,
    newPatients: 89,
    appointments: 234,
    revenue: 45600,
    satisfaction: 4.8,
    utilization: 85
  };

  const appointmentTypes = [
    { type: 'General Checkup', count: 89, percentage: 38 },
    { type: 'Specialist Consultation', count: 67, percentage: 29 },
    { type: 'Telemedicine', count: 45, percentage: 19 },
    { type: 'Follow-up', count: 33, percentage: 14 }
  ];

  const departmentStats = [
    { department: 'Cardiology', patients: 156, revenue: 12400 },
    { department: 'General Practice', patients: 298, revenue: 8900 },
    { department: 'Orthopedics', patients: 134, revenue: 15600 },
    { department: 'Pediatrics', patients: 187, revenue: 7800 },
    { department: 'Dermatology', patients: 98, revenue: 6200 }
  ];

  const patientAgeGroups = [
    { group: '0-18', count: 187, percentage: 15 },
    { group: '19-35', count: 342, percentage: 27 },
    { group: '36-50', count: 398, percentage: 32 },
    { group: '51-65', count: 245, percentage: 20 },
    { group: '65+', count: 75, percentage: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
            <p className="text-gray-600">Comprehensive insights into healthcare operations</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalPatients.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Patients</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.newPatients}</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% vs last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.appointments}</p>
              <p className="text-xs text-orange-600 mt-1">↓ 3% vs last month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.revenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% vs last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.satisfaction}</p>
              <p className="text-xs text-green-600 mt-1">↑ 0.2 vs last month</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.utilization}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% vs last month</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h3>
          <div className="space-y-4">
            {appointmentTypes.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Groups</h3>
          <div className="space-y-4">
            {patientAgeGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{group.group} years</span>
                    <span className="text-sm text-gray-600">{group.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Patients</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg. per Patient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="py-4 px-4 text-gray-600">{dept.patients}</td>
                  <td className="py-4 px-4 text-gray-600">${dept.revenue.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-600">${Math.round(dept.revenue / dept.patients)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(dept.revenue / 15600) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round((dept.revenue / 15600) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Patient Growth</h4>
            <p className="text-2xl font-bold text-blue-600">+12%</p>
            <p className="text-sm text-gray-600">vs last month</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Revenue Growth</h4>
            <p className="text-2xl font-bold text-green-600">+15%</p>
            <p className="text-sm text-gray-600">vs last month</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Satisfaction</h4>
            <p className="text-2xl font-bold text-purple-600">4.8/5</p>
            <p className="text-sm text-gray-600">+0.2 vs last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;