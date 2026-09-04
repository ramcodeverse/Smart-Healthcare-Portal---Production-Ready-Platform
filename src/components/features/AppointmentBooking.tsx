import React, { useState } from 'react';
import { Calendar, MapPin, Video, AlertCircle } from 'lucide-react';
import { useHealthcareData } from '../../contexts/HealthcareDataContext';
import { useNotifications } from '../../contexts/NotificationContext';

const AppointmentBooking: React.FC = () => {
  const { doctors, bookAppointment, appointments } = useHealthcareData();
  const { addNotification } = useNotifications();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || 'doc-1');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telemedicine' | 'follow-up'>('in-person');
  const [reason, setReason] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDoctorId || !reason.trim()) {
      addNotification({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please provide consultation reason, preferred date, time, and doctor.'
      });
      return;
    }

    bookAppointment({
      patientId: 'pat-1',
      patientName: 'John Patient',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      status: 'pending',
      reason: reason.trim(),
      urgent: isUrgent,
      location: appointmentType === 'telemedicine' ? 'Telehealth Video Room' : 'Room 205, Main Clinical Wing'
    });

    addNotification({
      type: 'success',
      title: 'Appointment Confirmed & Synced!',
      message: `Your appointment with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime} is confirmed.`
    });

    setReason('');
    setIsUrgent(false);
  };

  // Appointments for this patient
  const myAppointments = appointments.filter(
    a => a.patientId === 'pat-1' || a.patientName.toLowerCase().includes('john')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Medical Appointment</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Schedule in-person or telemedicine consultations with certified specialists. Real schedule synchronization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <form onSubmit={handleBookAppointment} className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              1. Select Certified Specialist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {doctors.map((doctor) => (
                <button
                  type="button"
                  key={doctor.id}
                  onClick={() => setSelectedDoctorId(doctor.id)}
                  className={`p-3.5 border rounded-2xl text-left transition-all flex items-center space-x-3 ${
                    selectedDoctorId === doctor.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-2xs ring-1 ring-blue-600'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{doctor.name}</h4>
                    <p className="text-xs text-gray-600 truncate">{doctor.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs">
                      <span className="text-amber-500 font-bold">★ {doctor.rating}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-emerald-700 font-semibold">{doctor.available}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                2. Select Date
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Consultation Modality
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAppointmentType('in-person')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    appointmentType === 'in-person'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" /> In-Person
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('telemedicine')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                    appointmentType === 'telemedicine'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" /> Video Telehealth
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              3. Select Available Time Slot
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              4. Reason for Consultation & Symptoms *
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe your primary symptoms, concern, or ongoing treatment need..."
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={e => setIsUrgent(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="flex items-center gap-1 text-red-700 font-bold">
                <AlertCircle className="w-3.5 h-3.5" /> Mark as Urgent Care Case
              </span>
            </label>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm & Book Appointment</span>
            </button>
          </div>
        </form>

        {/* Real Schedule Sidebar & Active Appointments */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">Appointment Summary</h3>
            <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div>
                <span className="text-gray-500 block">Doctor</span>
                <span className="font-bold text-gray-900">{selectedDoctor.name} ({selectedDoctor.specialty})</span>
              </div>
              <div>
                <span className="text-gray-500 block">Date & Time</span>
                <span className="font-bold text-gray-900">{selectedDate} at {selectedTime}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Format</span>
                <span className="font-bold text-blue-700 capitalize">{appointmentType}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">Your Booked Visits ({myAppointments.length})</h3>
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {myAppointments.map(a => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{a.doctorName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      a.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : a.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {a.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] mt-1">{a.date} at {a.time} • {a.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
