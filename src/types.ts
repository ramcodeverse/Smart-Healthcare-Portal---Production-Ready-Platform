export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  condition: string;
  status: 'stable' | 'monitoring' | 'critical' | 'recovering';
  avatar: string;
  bloodType: string;
  allergies: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  avatar: string;
  status: 'available' | 'in-consultation' | 'off-duty';
  department: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "02:30 PM"
  type: 'in-person' | 'telemedicine' | 'follow-up' | 'specialist';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  urgent: boolean;
  location?: string;
  reason: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  rxNumber: string;
  medication: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedBy: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  datePrescribed: string;
  expiresAt: string;
  status: 'active' | 'completed' | 'refill_needed' | 'expired';
  refillsRemaining: number;
  totalRefillsAllowed: number;
  pharmacyName?: string;
  ndcCode: string; // National Drug Code
  warningNote?: string;
  verificationHash: string;
}

export interface VitalSign {
  id: string;
  timestamp: string;
  heartRate: number; // bpm
  bloodPressureSystolic: number; // mmHg
  bloodPressureDiastolic: number; // mmHg
  temperature: number; // Fahrenheit
  oxygenSaturation: number; // %
  respiratoryRate: number; // breaths/min
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: 'lab_result' | 'prescription' | 'imaging' | 'visit_summary' | 'vaccination';
  title: string;
  date: string;
  doctor: string;
  status: 'normal' | 'abnormal' | 'pending' | 'reviewed';
  size?: string;
  summary: string;
}

export interface LiveTelemetry {
  pageLoadTimeMs: number;
  networkLatencyMs: number;
  domNodesCount: number;
  jsHeapSizeMB: number;
  uptimeSeconds: number;
  isOnline: boolean;
  effectiveConnectionType: string;
  lastUpdated: string;
}

export interface RealPortalStats {
  totalUsers: number;
  totalPatients: number;
  activePatients: number;
  totalDoctors: number;
  appointmentsToday: number;
  completedAppointmentsToday: number;
  pendingAppointmentsToday: number;
  urgentAppointmentsToday: number;
  totalAppointments: number;
  completedAppointmentsAllTime: number;
  totalPrescriptions: number;
  activePrescriptions: number;
  refillNeededCount: number;
  systemUptimePercentage: string;
  systemUptimeDuration: string;
  avgResponseTimeMs: number;
  estimatedRevenue: number;
}
