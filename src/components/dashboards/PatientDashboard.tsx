import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Calendar, FileText, MessageSquare, Activity, QrCode, Clock, MapPin, Plus, Heart, Pill, Zap } from 'lucide-react';
import SymptomChecker from '../features/SymptomChecker';
import AppointmentBooking from '../features/AppointmentBooking';
import MedicalRecords from '../features/MedicalRecords';
import PrescriptionManager from '../features/PrescriptionManager';
import { MedicationQRCode } from '../common/MedicationQRCode';
import { MedicationQRScannerModal } from '../common/MedicationQRScannerModal';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';
import { useNotifications } from '../../contexts/NotificationContext';

const PatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { appointments, currentVitals, recordNewVitals, medicalRecords, stats, prescriptions } = useHealthcareData();
  const { addNotification } = useNotifications();

  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [inputHeartRate, setInputHeartRate] = useState(currentVitals.heartRate.toString());
  const [inputSystolic, setInputSystolic] = useState(currentVitals.bloodPressureSystolic.toString());
  const [inputDiastolic, setInputDiastolic] = useState(currentVitals.bloodPressureDiastolic.toString());
  const [inputTemp, setInputTemp] = useState(currentVitals.temperature.toString());
  const [inputO2, setInputO2] = useState(currentVitals.oxygenSaturation.toString());

  // Filter patient's appointments
  const patientAppointments = appointments.filter(
    a => a.patientId === 'pat-1' || a.patientName.toLowerCase().includes('john')
  );

  const upcomingAppointments = patientAppointments.filter(a => a.status !== 'completed' && a.status !== 'cancelled');
  const nextAppointment = upcomingAppointments[0];

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    recordNewVitals({
      heartRate: parseInt(inputHeartRate, 10) || 72,
      bloodPressureSystolic: parseInt(inputSystolic, 10) || 120,
      bloodPressureDiastolic: parseInt(inputDiastolic, 10) || 80,
      temperature: parseFloat(inputTemp) || 98.6,
      oxygenSaturation: parseInt(inputO2, 10) || 98,
      respiratoryRate: 16
    });

    addNotification({
      type: 'success',
      title: 'Vitals Recorded',
      message: `Updated vitals: ${inputSystolic}/${inputDiastolic} mmHg, ${inputHeartRate} BPM.`
    });
    setShowVitalsModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner with Real Next Appointment */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-600 rounded-2xl p-6 text-white shadow-md">
        <h2 className="text-2xl font-bold mb-1">Welcome back, John!</h2>
        {nextAppointment ? (
          <p className="text-blue-100 text-sm">
            Your next appointment is <strong className="text-white">{nextAppointment.date} at {nextAppointment.time}</strong> with {nextAppointment.doctorName} ({nextAppointment.specialty})
          </p>
        ) : (
          <p className="text-blue-100 text-sm">You have no upcoming appointments scheduled today.</p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {nextAppointment && nextAppointment.type === 'telemedicine' ? (
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors shadow-xs"
            >
              Join Telehealth Room
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors shadow-xs"
            >
              Book New Appointment
            </button>
          )}

          <button
            onClick={() => setIsScannerOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Live QR Scanner & Decoder</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className="bg-blue-900/40 hover:bg-blue-900/60 border border-white/20 text-white px-4 py-2 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>All Prescription QRs</span>
          </button>
        </div>
      </div>

      {/* Real Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Upcoming Visits</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{upcomingAppointments.length}</p>
          <span className="text-[11px] text-gray-400">Scheduled visits</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Active Medications</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{stats.activePrescriptions}</p>
          <span className="text-[11px] text-emerald-600">With verified QR</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Medical Records</p>
          <p className="text-2xl font-black text-purple-600 mt-1">{medicalRecords.length}</p>
          <span className="text-[11px] text-purple-600">Reports available</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs font-semibold text-gray-500 uppercase">Refill Alerts</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{stats.refillNeededCount}</p>
          <span className="text-[11px] text-amber-600">Pending renewal</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Book Appointment', color: 'bg-blue-600', onClick: () => setActiveTab('appointments') },
          { icon: FileText, label: 'Medical Records', color: 'bg-emerald-600', onClick: () => setActiveTab('records') },
          { icon: Activity, label: 'Symptom Checker', color: 'bg-purple-600', onClick: () => setActiveTab('symptoms') },
          { icon: QrCode, label: 'Medication QRs', color: 'bg-amber-600', onClick: () => setActiveTab('prescriptions') }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className={`${action.color} p-3 rounded-2xl mb-2 text-white group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Real Upcoming Appointments List */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Your Scheduled Appointments</h3>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            + Book Appointment
          </button>
        </div>

        <div className="space-y-3">
          {upcomingAppointments.map(appointment => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/80 gap-3"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-sm">{appointment.doctorName}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {appointment.type}
                    </span>
                    {appointment.urgent && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-red-100 text-red-800">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{appointment.specialty} • {appointment.reason}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                      {appointment.date} at {appointment.time}
                    </span>
                    {appointment.location && (
                      <span className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        {appointment.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs"
                >
                  {appointment.type === 'telemedicine' ? 'Join Video Room' : 'View Details'}
                </button>
              </div>
            </div>
          ))}

          {upcomingAppointments.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-6">
              No appointments pending. Click above to schedule a visit with any specialist.
            </p>
          )}
        </div>
      </div>

      {/* Active Prescriptions with Scannable QR Codes */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Active Prescriptions & Verified QR Codes</h3>
            </div>
            <p className="text-xs text-gray-500">
              Click any QR code or 'Show Details' to inspect dosage instructions, pharmacy dispense status, and digital certificate
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Test QR Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Manage All ({prescriptions.length}) →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {prescriptions.map(prescription => (
            <div
              key={prescription.id}
              className="p-4 bg-slate-50/60 rounded-2xl border border-gray-200 flex flex-col justify-between hover:border-blue-300 transition-all shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                    {prescription.rxNumber}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-1">{prescription.medication}</h4>
                  <p className="text-xs text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  prescription.refillsRemaining > 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {prescription.refillsRemaining} Refills Left
                </span>
              </div>

              {/* Scannable QR Component with Direct Inspection */}
              <MedicationQRCode
                prescription={prescription}
                size={120}
                showDetailsButton={true}
                showActions={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Real Vitals & Test Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real Current Vitals */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Current Vitals</span>
            </h3>
            <button
              onClick={() => setShowVitalsModal(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
            >
              <Plus className="w-3 h-3" /> Log New Vitals
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 block font-medium">Heart Rate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-gray-900">{currentVitals.heartRate}</span>
                <span className="text-xs text-gray-500">BPM</span>
              </div>
              <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-1">
                Normal (60-100)
              </span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 block font-medium">Blood Pressure</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-gray-900">
                  {currentVitals.bloodPressureSystolic}/{currentVitals.bloodPressureDiastolic}
                </span>
                <span className="text-xs text-gray-500">mmHg</span>
              </div>
              <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-1">
                Controlled
              </span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 block font-medium">Body Temperature</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-gray-900">{currentVitals.temperature}</span>
                <span className="text-xs text-gray-500">°F</span>
              </div>
              <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-1">
                Normal (98.6°F)
              </span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 block font-medium">Oxygen Saturation</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-gray-900">{currentVitals.oxygenSaturation}%</span>
                <span className="text-xs text-gray-500">SpO2</span>
              </div>
              <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-1">
                Optimal
              </span>
            </div>
          </div>
        </div>

        {/* Real Test Results & Diagnostic Reports */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Diagnostic Reports</h3>
            <button
              onClick={() => setActiveTab('records')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              View All ({medicalRecords.length})
            </button>
          </div>

          <div className="space-y-3">
            {medicalRecords.slice(0, 3).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div>
                  <p className="font-bold text-xs text-gray-900">{record.title}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{record.date} • {record.doctor}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Log New Vitals */}
      {showVitalsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Log Real-Time Vitals</h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter your measured readings to update clinical telemetry immediately.
            </p>

            <form onSubmit={handleSaveVitals} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Heart Rate (BPM)</label>
                <input
                  type="number"
                  min="40"
                  max="220"
                  value={inputHeartRate}
                  onChange={e => setInputHeartRate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    min="70"
                    max="220"
                    value={inputSystolic}
                    onChange={e => setInputSystolic(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    min="40"
                    max="140"
                    value={inputDiastolic}
                    onChange={e => setInputDiastolic(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="95"
                    max="106"
                    value={inputTemp}
                    onChange={e => setInputTemp(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">SpO2 Oxygen (%)</label>
                  <input
                    type="number"
                    min="80"
                    max="100"
                    value={inputO2}
                    onChange={e => setInputO2(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowVitalsModal(false)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-xs"
                >
                  Save Readings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    { id: 'prescriptions', label: 'Prescription QRs', icon: QrCode }
  ];

  return (
    <>
      <DashboardLayout
        userRole="patient"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      >
        {tabComponents[activeTab as keyof typeof tabComponents]?.()}
      </DashboardLayout>

      <MedicationQRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </>
  );
};

export default PatientDashboard;
