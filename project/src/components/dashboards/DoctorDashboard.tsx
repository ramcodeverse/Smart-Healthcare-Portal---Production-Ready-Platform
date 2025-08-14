import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Users, Calendar, FileText, MessageSquare, Activity, Clock, AlertCircle } from 'lucide-react';
import PatientManagement from '../features/PatientManagement';
import TelemedicineConsole from '../features/TelemedicineConsole';
import ScheduleManager from '../features/ScheduleManager';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const todayStats = {
    appointments: 12,
    completed: 8,
    pending: 2,
    urgent: 2
  };

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'confirmed',
      urgent: false
    },
    {
      id: 2,
      patient: 'Emma Johnson',
      time: '3:00 PM',
      type: 'Consultation',
      status: 'pending',
      urgent: true
    },
    {
      id: 3,
      patient: 'Michael Davis',
      time: '3:30 PM',
      type: 'Telemedicine',
      status: 'confirmed',
      urgent: false
    }
  ];

  const recentPatients = [
    { name: 'John Smith', lastVisit: '2 hours ago', condition: 'Hypertension', status: 'stable' },
    { name: 'Emma Johnson', lastVisit: '1 day ago', condition: 'Diabetes', status: 'monitoring' },
    { name: 'Michael Davis', lastVisit: '3 days ago', condition: 'Post-surgery', status: 'recovering' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{todayStats.appointments}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{todayStats.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-orange-600">{todayStats.pending}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Cases</p>
              <p className="text-3xl font-bold text-red-600">{todayStats.urgent}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                    {appointment.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{appointment.type} • {appointment.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {appointment.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
        <div className="space-y-4">
          {recentPatients.map((patient, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://images.pexels.com/photos/${5452201 + index}/pexels-photo-${5452201 + index}.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2`}
                  alt={patient.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{patient.name}</h4>
                  <p className="text-sm text-gray-600">{patient.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{patient.lastVisit}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  patient.status === 'stable' 
                    ? 'bg-green-100 text-green-800' 
                    : patient.status === 'monitoring'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabComponents = {
    overview: renderOverview,
    patients: () => <PatientManagement />,
    schedule: () => <ScheduleManager />,
    telemedicine: () => <TelemedicineConsole />,
    records: () => <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><p>Medical Records Management</p></div>
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'telemedicine', label: 'Telemedicine', icon: MessageSquare },
    { id: 'records', label: 'Records', icon: FileText }
  ];

  return (
    <DashboardLayout 
      userRole="doctor"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
    >
      {tabComponents[activeTab as keyof typeof tabComponents]?.()}
    </DashboardLayout>
  );
};

export default DoctorDashboard;