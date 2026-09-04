import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import {
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle2,
  QrCode,
  Check
} from 'lucide-react';
import PatientManagement from '../features/PatientManagement';
import TelemedicineConsole from '../features/TelemedicineConsole';
import ScheduleManager from '../features/ScheduleManager';
import PrescriptionManager from '../features/PrescriptionManager';
import MedicalRecords from '../features/MedicalRecords';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';

const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { appointments, patients, stats, updateAppointmentStatus } = useHealthcareData();

  // Appointments assigned to doctor or today's schedule
  const todayAppointments = appointments.slice(0, 6);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Real Quick Stats Computed Dynamically */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Today's Appointments</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{stats.appointmentsToday}</p>
              <p className="text-xs text-blue-600 mt-1 font-medium">Real-time schedule count</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Completed Consultations</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{stats.completedAppointmentsToday}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                {stats.appointmentsToday > 0
                  ? `${Math.round((stats.completedAppointmentsToday / stats.appointmentsToday) * 100)}% progress today`
                  : 'All up to date'}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Pending Review</p>
              <p className="text-3xl font-black text-amber-600 mt-1">{stats.pendingAppointmentsToday}</p>
              <p className="text-xs text-amber-600 mt-1 font-medium">In waiting room</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Urgent Priority</p>
              <p className="text-3xl font-black text-red-600 mt-1">{stats.urgentAppointmentsToday}</p>
              <p className="text-xs text-red-600 mt-1 font-medium">Flagged for immediate care</p>
            </div>
            <div className="bg-red-100 p-3 rounded-2xl text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-white">Clinical Prescriptions & Digital QR Issuance</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Issue cryptographically certified medication QR codes directly to patient records & pharmacies.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-xs"
        >
          <QrCode className="w-4 h-4" />
          <span>Open Medication QR Generator</span>
        </button>
      </div>

      {/* Today's Schedule with Live Status Update Handlers */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Today's Live Schedule</h3>
            <p className="text-xs text-gray-500">Click actions to mark completed or update state in real-time</p>
          </div>
          <button
            onClick={() => setActiveTab('schedule')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            Manage Time Slots
          </button>
        </div>

        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/80 gap-3 hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-2.5 h-10 rounded-full ${
                    appointment.status === 'completed'
                      ? 'bg-emerald-500'
                      : appointment.urgent
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-900 text-sm">{appointment.patientName}</h4>
                    {appointment.urgent && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold uppercase rounded-full">
                        Urgent Case
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-semibold uppercase rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {appointment.time} • {appointment.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full border ${
                    appointment.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : appointment.status === 'confirmed'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {appointment.status}
                </span>

                {appointment.status !== 'completed' ? (
                  <button
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    title="Mark consultation completed"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-semibold px-2 py-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Done
                  </span>
                )}

                {appointment.type === 'telemedicine' && (
                  <button
                    onClick={() => setActiveTab('telemedicine')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Console
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Patients Monitored */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Active Patients Under Care</h3>
          <button
            onClick={() => setActiveTab('patients')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            View All ({patients.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.slice(0, 3).map((patient) => (
            <div
              key={patient.id}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200/70 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={patient.avatar}
                  alt={patient.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{patient.name}</h4>
                  <p className="text-xs text-gray-500">{patient.gender}, {patient.age} yrs • Blood: {patient.bloodType}</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 font-medium">{patient.condition}</p>
              <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="text-gray-500">Last: {patient.lastVisit}</span>
                <span className={`font-semibold capitalize ${
                  patient.status === 'stable' ? 'text-emerald-700' : 'text-amber-700'
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
    prescriptions: () => <PrescriptionManager />,
    records: () => <MedicalRecords />
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'telemedicine', label: 'Telemedicine', icon: MessageSquare },
    { id: 'prescriptions', label: 'Prescription QRs', icon: QrCode },
    { id: 'records', label: 'Medical Records', icon: FileText }
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
