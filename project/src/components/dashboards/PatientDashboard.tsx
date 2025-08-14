import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Calendar, FileText, MessageSquare, Activity, QrCode, Clock, MapPin, Phone } from 'lucide-react';
import SymptomChecker from '../features/SymptomChecker';
import AppointmentBooking from '../features/AppointmentBooking';
import MedicalRecords from '../features/MedicalRecords';
import PrescriptionManager from '../features/PrescriptionManager';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      date: 'Today',
      time: '2:30 PM',
      type: 'In-person',
      location: 'Room 205, Main Building'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Practice',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Telemedicine',
      location: 'Video Call'
    }
  ];

  const recentResults = [
    { test: 'Blood Test', date: '2 days ago', status: 'Normal', urgent: false },
    { test: 'X-Ray Chest', date: '1 week ago', status: 'Reviewed', urgent: false },
    { test: 'ECG', date: '2 weeks ago', status: 'Abnormal', urgent: true }
  ];

  const vitals = [
    { label: 'Heart Rate', value: '72 BPM', status: 'normal' },
    { label: 'Blood Pressure', value: '120/80', status: 'normal' },
    { label: 'Temperature', value: '98.6°F', status: 'normal' },
    { label: 'Oxygen Saturation', value: '98%', status: 'normal' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
        <p className="text-blue-100">Your next appointment is today at 2:30 PM</p>
        <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          Join Video Call
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Book Appointment', color: 'bg-blue-500', onClick: () => setActiveTab('appointments') },
          { icon: FileText, label: 'View Records', color: 'bg-green-500', onClick: () => setActiveTab('records') },
          { icon: Activity, label: 'Symptom Checker', color: 'bg-purple-500', onClick: () => setActiveTab('symptoms') },
          { icon: QrCode, label: 'Prescriptions', color: 'bg-orange-500', onClick: () => setActiveTab('prescriptions') }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className={`${action.color} p-3 rounded-full mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {appointment.date} at {appointment.time}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {appointment.location}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                {appointment.type === 'Telemedicine' ? 'Join Call' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Test Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h3>
          <div className="space-y-3">
            {recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{result.test}</p>
                  <p className="text-sm text-gray-600">{result.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  result.urgent 
                    ? 'bg-red-100 text-red-800' 
                    : result.status === 'Normal' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {result.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Vitals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Vitals</h3>
          <div className="space-y-3">
            {vitals.map((vital, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{vital.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{vital.value}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabComponents = {
    overview: renderOverview,
    appointments: () => <AppointmentBooking />,
    records: () => <MedicalRecords />,
    symptoms: () => <SymptomChecker />,
    prescriptions: () => <PrescriptionManager />
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'symptoms', label: 'Symptom Checker', icon: MessageSquare },
    { id: 'prescriptions', label: 'Prescriptions', icon: QrCode }
  ];

  return (
    <DashboardLayout 
      userRole="patient"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
    >
      {tabComponents[activeTab as keyof typeof tabComponents]?.()}
    </DashboardLayout>
  );
};

export default PatientDashboard;