import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, User } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [reason, setReason] = useState('');
  const { addNotification } = useNotifications();

  const doctors = [
    { id: '1', name: 'Dr. Sarah Wilson', specialty: 'Cardiology', rating: 4.9, nextAvailable: 'Today' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'General Practice', rating: 4.8, nextAvailable: 'Tomorrow' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', rating: 4.9, nextAvailable: '2 days' },
    { id: '4', name: 'Dr. James Thompson', specialty: 'Orthopedics', rating: 4.7, nextAvailable: '3 days' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !reason) {
      addNotification({
        type: 'warning',
        title: 'Missing Information',
        message: 'Please fill in all required fields to book your appointment.'
      });
      return;
    }

    addNotification({
      type: 'success',
      title: 'Appointment Booked!',
      message: `Your ${appointmentType} appointment has been scheduled for ${selectedDate} at ${selectedTime}.`
    });

    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h2>
        <p className="text-gray-600">Schedule your visit with our healthcare professionals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
          
          {/* Doctor Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Doctor</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    selectedDoctor === doctor.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://images.pexels.com/photos/${5452293 + parseInt(doctor.id)}/pexels-photo-${5452293 + parseInt(doctor.id)}.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2`}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600">{doctor.rating}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-green-600">Available {doctor.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm border rounded-lg transition-all ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Appointment Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'in-person', label: 'In-Person', icon: MapPin },
                { value: 'telemedicine', label: 'Video Call', icon: Video },
                { value: 'phone', label: 'Phone Call', icon: Phone }
              ].map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setAppointmentType(type.value)}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      appointmentType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Please describe the reason for your appointment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleBookAppointment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Book Appointment
          </button>
        </div>

        {/* Appointment Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="font-medium text-gray-900">
                  {selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.name : 'Not selected'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium text-gray-900">{selectedDate || 'Not selected'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium text-gray-900">{selectedTime || 'Not selected'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {appointmentType === 'in-person' ? (
                <MapPin className="w-5 h-5 text-gray-400" />
              ) : appointmentType === 'telemedicine' ? (
                <Video className="w-5 h-5 text-gray-400" />
              ) : (
                <Phone className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium text-gray-900">
                  {appointmentType === 'in-person' ? 'In-Person' :
                   appointmentType === 'telemedicine' ? 'Video Call' : 'Phone Call'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Before Your Appointment:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Prepare your list of symptoms</li>
              <li>• Bring your insurance card</li>
              <li>• List current medications</li>
              <li>• Arrive 15 minutes early</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;