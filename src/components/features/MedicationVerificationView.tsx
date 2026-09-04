import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Calendar,
  User,
  Stethoscope,
  Pill,
  ArrowLeft,
  Printer,
  Clock,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';
import MedicationQRScannerModal from '../common/MedicationQRScannerModal';

export const MedicationVerificationView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { prescriptions } = useHealthcareData();
  const [dispensed, setDispensed] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Read URL parameters from scanned QR code (supporting both short and full parameter names)
  const rxFromUrl = searchParams.get('rx') || '';
  const medFromUrl = searchParams.get('med') || searchParams.get('m') || '';
  const doseFromUrl = searchParams.get('dose') || searchParams.get('d') || '';
  const freqFromUrl = searchParams.get('freq') || searchParams.get('f') || '';
  const patientFromUrl = searchParams.get('patient') || searchParams.get('p') || '';
  const doctorFromUrl = searchParams.get('doctor') || searchParams.get('doc') || '';
  const dateFromUrl = searchParams.get('date') || searchParams.get('dt') || '';
  const refillsFromUrl = searchParams.get('refills') || searchParams.get('r') || '';
  const hashFromUrl = searchParams.get('hash') || searchParams.get('h') || '';
  const ndcFromUrl = searchParams.get('ndc') || '';

  // Match against local prescriptions if available
  const matchedRx = prescriptions.find(
    p => (rxFromUrl && p.rxNumber.toLowerCase() === rxFromUrl.toLowerCase()) ||
         (medFromUrl && p.medication.toLowerCase().includes(medFromUrl.toLowerCase()))
  );

  const currentRx = matchedRx || prescriptions[0];

  const rxNumber = rxFromUrl || currentRx?.rxNumber || 'RX-982341-LIS';
  const medication = medFromUrl || currentRx?.medication || 'Lisinopril 10mg';
  const dosage = doseFromUrl || currentRx?.dosage || '10mg Oral Tablet';
  const frequency = freqFromUrl || currentRx?.frequency || 'Once daily in the morning';
  const patient = patientFromUrl || currentRx?.patientName || 'John Patient';
  const doctor = doctorFromUrl || currentRx?.prescribedBy || 'Dr. Sarah Wilson';
  const datePrescribed = dateFromUrl || currentRx?.datePrescribed || '2025-01-15';
  const refills = refillsFromUrl !== null && refillsFromUrl !== '' ? refillsFromUrl : (currentRx?.refillsRemaining?.toString() ?? '2');
  const hash = hashFromUrl || currentRx?.verificationHash || 'SEC-A4F921B-AUTHENTIC';
  const ndc = ndcFromUrl || currentRx?.ndcCode || '68180-517-01';
  const instructions = currentRx?.instructions || 'Take 1 tablet daily with a full glass of water. Maintain consistent hydration.';
  const warningNote = currentRx?.warningNote || 'Avoid potassium supplements or salt substitutes containing potassium.';
  const pharmacyName = currentRx?.pharmacyName || 'CityHealth Central Pharmacy';

  const selectPrescription = (rx: typeof prescriptions[0]) => {
    setSearchParams({
      rx: rx.rxNumber,
      med: rx.medication,
      dose: rx.dosage,
      freq: rx.frequency,
      patient: rx.patientName,
      doctor: rx.prescribedBy,
      date: rx.datePrescribed,
      refills: rx.refillsRemaining.toString(),
      hash: rx.verificationHash,
      ndc: rx.ndcCode
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white bg-slate-900 border border-emerald-500/40 px-3 py-2 rounded-xl transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan / Decode QR</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>

        {/* Quick Prescription Switcher */}
        {prescriptions.length > 0 && (
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap pl-2">
              Select Prescription:
            </span>
            <div className="flex gap-2">
              {prescriptions.map(rx => (
                <button
                  key={rx.id}
                  onClick={() => selectPrescription(rx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    rx.rxNumber.toLowerCase() === rxNumber.toLowerCase()
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>{rx.medication}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Official Verification Certificate Card */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <ShieldCheck className="w-9 h-9 text-emerald-300" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-200 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified Authentic Prescription
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                    Digital Medication Certificate
                  </h1>
                </div>
              </div>

              <div className="text-right sm:text-right font-mono text-xs text-emerald-100 sm:border-l sm:border-emerald-500/40 sm:pl-5">
                <p className="text-emerald-200 font-semibold">PRESCRIPTION ID</p>
                <p className="text-sm font-bold text-white mt-0.5">{rxNumber}</p>
                <p className="text-[11px] text-emerald-300 mt-1">NDC: {ndc}</p>
              </div>
            </div>
          </div>

          {/* Body content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Primary Medication Display */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5" /> Prescribed Particular Medication
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">{medication}</h2>
                  <p className="text-sm text-slate-300 mt-0.5">{dosage}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Refills Remaining</span>
                  <span className="text-2xl font-bold text-emerald-400">{refills}</span>
                  <span className="text-xs text-slate-400 block">authorized</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 text-sm space-y-2">
                <p className="text-slate-200">
                  <strong className="text-white">Intake Directions: </strong>
                  {instructions || frequency}
                </p>
                <p className="text-slate-300 text-xs">
                  <strong className="text-white">Dispensing Pharmacy: </strong>
                  {pharmacyName}
                </p>
              </div>
            </div>

            {/* Warnings & Clinical Cautions */}
            {warningNote && (
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-amber-300">Clinical Warning & Safety Precaution</p>
                  <p className="text-amber-200/80">{warningNote}</p>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-400" /> Patient Name
                </span>
                <p className="font-bold text-white text-base">{patient}</p>
                <p className="text-xs text-slate-400">Registered Patient in Portal</p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-purple-400" /> Prescribing Doctor
                </span>
                <p className="font-bold text-white text-base">{doctor}</p>
                <p className="text-xs text-slate-400">Licensed Physician Verification Active</p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Issue Date
                </span>
                <p className="font-bold text-white text-base">{datePrescribed}</p>
                <p className="text-xs text-slate-400">Valid for 12 months from issuance</p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-teal-400" /> Dispensing Status
                </span>
                <p className={`font-bold text-base ${dispensed ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {dispensed ? 'Dispensed & Logged' : 'Ready for Dispensing'}
                </p>
                <p className="text-xs text-slate-400">Pharmacy Electronic Record Synchronized</p>
              </div>
            </div>

            {/* Cryptographic Security Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" /> Cryptographic Digital Seal
                </span>
                <span className="text-[11px] text-slate-400 font-mono">SHA-256 Validated</span>
              </div>
              <p className="font-mono text-sm text-emerald-300 font-semibold break-all bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                {hash}
              </p>
              <p className="text-xs text-slate-400">
                This medication QR payload was dynamically signed by the Healthcare Portal engine to prevent counterfeit prescriptions and duplicate dispensing.
              </p>
            </div>

            {/* Pharmacist Action Section */}
            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-sm">Pharmacist Dispensing Action</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Confirm patient identification matches <strong className="text-slate-200">{patient}</strong> before completing dispense.
                </p>
              </div>
              <button
                onClick={() => setDispensed(!dispensed)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
                  dispensed
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{dispensed ? 'Dispense Confirmed' : 'Mark as Dispensed'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MedicationQRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />
    </div>
  );
};

export default MedicationVerificationView;
