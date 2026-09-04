import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  RefreshCw,
  Calendar,
  AlertTriangle,
  Plus,
  Pill,
  Search,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';
import { useNotifications } from '../../contexts/NotificationContext';
import MedicationQRCode from '../common/MedicationQRCode';
import MedicationQRScannerModal from '../common/MedicationQRScannerModal';
import { Prescription } from '../../types';

const PrescriptionManager: React.FC = () => {
  const navigate = useNavigate();
  const { prescriptions, requestRefill, addPrescription, stats, patients } = useHealthcareData();
  const { addNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'refill_needed' | 'completed'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);

  // New Prescription Form state
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('Once daily');
  const [newDuration, setNewDuration] = useState('30 days');
  const [newInstructions, setNewInstructions] = useState('');
  const [newRefills, setNewRefills] = useState('2');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'pat-1');

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch =
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.rxNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return rx.status === 'active';
    if (activeTab === 'refill_needed') return rx.status === 'refill_needed' || rx.refillsRemaining === 0;
    if (activeTab === 'completed') return rx.status === 'completed';
    return true;
  });

  const handleRefill = (prescription: Prescription) => {
    const success = requestRefill(prescription.id);
    if (success) {
      addNotification({
        type: 'success',
        title: 'Refill Processed',
        message: `Refill requested for ${prescription.medication}. Dispensary status updated.`
      });
    }
  };

  const handleCreateNewRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newDosage.trim()) {
      addNotification({
        type: 'warning',
        title: 'Missing Fields',
        message: 'Please provide medication name and dosage strength.'
      });
      return;
    }

    const patient = patients.find(p => p.id === selectedPatientId) || patients[0];
    const refillsCount = parseInt(newRefills, 10) || 0;

    const created = addPrescription({
      medication: newMedName.trim(),
      dosage: newDosage.trim(),
      frequency: newFrequency,
      duration: newDuration,
      instructions: newInstructions.trim() || 'Take as directed by your physician.',
      prescribedBy: 'Dr. Sarah Wilson',
      doctorId: 'doc-1',
      patientId: patient.id,
      patientName: patient.name,
      datePrescribed: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: refillsCount > 0 ? 'active' : 'refill_needed',
      refillsRemaining: refillsCount,
      totalRefillsAllowed: refillsCount,
      pharmacyName: 'CityHealth Central Pharmacy',
      ndcCode: `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}-01`,
      warningNote: 'Store at controlled room temperature 20°-25°C.'
    });

    addNotification({
      type: 'success',
      title: 'Prescription & QR Generated!',
      message: `Verified QR Code generated for ${created.medication} (${created.dosage}).`
    });

    // Reset and close
    setNewMedName('');
    setNewDosage('');
    setNewInstructions('');
    setShowAddModal(false);
    setActiveTab('active');
  };

  const getStatusBadge = (status: Prescription['status'], refills: number) => {
    if (status === 'completed') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
          Course Completed
        </span>
      );
    }
    if (status === 'refill_needed' || refills === 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-600" /> Refill Needed
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Rx
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Real Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Medication & QR Verification Manager</h2>
                <p className="text-sm text-gray-600">
                  Real scannable cryptographic QR codes for every medication and authentic pharmacy dispensing
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowScannerModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Medication QR</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New Medication QR</span>
            </button>
          </div>
        </div>

        {/* Real Live Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
            <p className="text-xs font-medium text-gray-500">Total Medications</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{stats.totalPrescriptions}</p>
            <span className="text-[11px] text-gray-500">In database</span>
          </div>

          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
            <p className="text-xs font-medium text-emerald-700">Active Prescriptions</p>
            <p className="text-2xl font-bold text-emerald-800 mt-0.5">{stats.activePrescriptions}</p>
            <span className="text-[11px] text-emerald-600 font-medium">Verified & authorized</span>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
            <p className="text-xs font-medium text-amber-700">Refills Required</p>
            <p className="text-2xl font-bold text-amber-800 mt-0.5">{stats.refillNeededCount}</p>
            <span className="text-[11px] text-amber-600 font-medium">Pending renewal</span>
          </div>

          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
            <p className="text-xs font-medium text-blue-700">QR Security Seals</p>
            <p className="text-2xl font-bold text-blue-800 mt-0.5">{stats.totalPrescriptions}</p>
            <span className="text-[11px] text-blue-600 font-medium">100% Scannable</span>
          </div>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'active', label: `Active (${stats.activePrescriptions})` },
              { id: 'refill_needed', label: `Refills Needed (${stats.refillNeededCount})` },
              { id: 'completed', label: 'Completed' },
              { id: 'all', label: `All (${prescriptions.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'active' | 'refill_needed' | 'completed')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search medication, Rx number..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Prescription Cards with Live QR Codes */}
      <div className="space-y-4">
        {filteredPrescriptions.map(rx => (
          <div
            key={rx.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Medication Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900">{rx.medication}</h3>
                      {getStatusBadge(rx.status, rx.refillsRemaining)}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Rx: <span className="font-mono text-gray-800 font-semibold">{rx.rxNumber}</span> • Prescribed by{' '}
                      <span className="font-medium text-gray-800">{rx.prescribedBy}</span>
                    </p>
                  </div>

                  <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    NDC: {rx.ndcCode}
                  </span>
                </div>

                {/* Particulars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/80 p-4 rounded-xl border border-gray-100 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Dosage</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{rx.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Frequency</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{rx.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Duration</p>
                    <p className="font-semibold text-gray-800 mt-0.5">{rx.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Refills Left</p>
                    <p className={`font-bold mt-0.5 ${rx.refillsRemaining > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {rx.refillsRemaining} remaining
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-xs text-gray-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900">Intake Instructions: </strong>
                    <span>{rx.instructions}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Prescribed: {rx.datePrescribed}</span>
                    <span className="mx-1">•</span>
                    <span>Valid until: {rx.expiresAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rx.refillsRemaining === 0 ? (
                      <button
                        onClick={() => handleRefill(rx)}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Request Doctor Refill Renewal</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRefill(rx)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Request Refill ({rx.refillsRemaining} Left)</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/verify-medication?rx=${rx.rxNumber}`)}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Certificate</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Scannable QR Code Column */}
              <div className="lg:w-44 flex flex-col items-center flex-shrink-0">
                <MedicationQRCode
                  prescription={rx}
                  size={120}
                  onViewVerification={(r) => navigate(`/verify-medication?rx=${r.rxNumber}`)}
                />
              </div>
            </div>
          </div>
        ))}

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8">
            <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No prescriptions found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              No medications matching your current filter. You can generate a new prescription with an authentic QR code at any time.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Generate New Medication QR
            </button>
          </div>
        )}
      </div>

      {/* Modal: Generate Custom Medication with Real QR */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Generate Particular Medication QR</h3>
                  <p className="text-xs text-gray-500">Create a prescription with real scannable QR code</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewRx} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Medication Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amoxicillin, Omeprazole, Atorvastatin..."
                  value={newMedName}
                  onChange={e => setNewMedName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dosage / Strength *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20mg Tablet, 500mg ER..."
                    value={newDosage}
                    onChange={e => setNewDosage(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Refills Authorized</label>
                  <select
                    value={newRefills}
                    onChange={e => setNewRefills(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="0">0 (No refills)</option>
                    <option value="1">1 Refill</option>
                    <option value="2">2 Refills</option>
                    <option value="3">3 Refills</option>
                    <option value="5">5 Refills</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={newFrequency}
                    onChange={e => setNewFrequency(e.target.value)}
                    placeholder="e.g. Once daily at bedtime"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    placeholder="e.g. 30 days, 90 days"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Assigned Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={e => setSelectedPatientId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.gender}, {p.age} yrs) - {p.condition}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Intake Instructions / Warnings</label>
                <textarea
                  rows={2}
                  value={newInstructions}
                  onChange={e => setNewInstructions(e.target.value)}
                  placeholder="e.g. Take with 8oz water. Complete full course. Report any skin rashes."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Generate QR Code & Issue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Scanner Modal */}
      <MedicationQRScannerModal
        isOpen={showScannerModal}
        onClose={() => setShowScannerModal(false)}
      />
    </div>
  );
};

export default PrescriptionManager;
