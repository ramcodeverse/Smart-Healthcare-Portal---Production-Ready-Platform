import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, MapPin, Video } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface TimeSlot {
  id: string;
  time: string;
  patient?: string;
  type: 'available' | 'booked' | 'blocked';
  appointmentType?: 'in-person' | 'telemedicine';
  location?: string;
}

const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day');
  const { addNotification } = useNotifications();

  // Mock schedule data
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const hours = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    hours.forEach((time, index) => {
      let slot: TimeSlot = {
        id: `${selectedDate}-${time}`,
        time,
        type: 'available'
      };

      // Add some mock appointments
      if (index === 2) {
        slot = {
          ...slot,
          type: 'booked',
          patient: 'John Smith',
          appointmentType: 'in-person',
          location: 'Room 205'
        };
      } else if (index === 5) {
        slot = {
          ...slot,
          type: 'booked',
          patient: 'Emma Johnson',
          appointmentType: 'telemedicine'
        };
      } else if (index === 8) {
        slot = {
          ...slot,
          type: 'blocked'
        };
      }

      slots.push(slot);
    });

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getSlotColor = (type: string) => {
    switch (type) {
      case 'booked': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'blocked': return 'bg-gray-100 border-gray-300 text-gray-600';
      default: return 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100';
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.type === 'available') {
      addNotification({
        type: 'info',
        title: 'Time Slot Selected',
        message: `${slot.time} on ${selectedDate} is available for booking.`
      });
    } else if (slot.type === 'booked') {
      addNotification({
        type: 'info',
        title: 'View Appointment',
        message: `Appointment with ${slot.patient} at ${slot.time}.`
      });
    }
  };

  const blockTimeSlot = (slot: TimeSlot) => {
    addNotification({
      type: 'success',
      title: 'Time Slot Blocked',
      message: `${slot.time} has been blocked for appointments.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Manager</h2>
            <p className="text-gray-600">Manage your appointments and availability</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Date Selection and View Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${getSlotColor(slot.type)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                
                {slot.type === 'booked' && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addNotification({
                          type: 'info',
                          title: 'Edit Appointment',
                          message: 'Edit appointment functionality would open here.'
                        });
                      }}
                      className="p-1 hover:bg-blue-200 rounded"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addNotification({
                          type: 'warning',
                          title: 'Cancel Appointment',
                          message: 'Appointment cancellation confirmation would appear here.'
                        });
                      }}
                      className="p-1 hover:bg-red-200 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {slot.type === 'available' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      blockTimeSlot(slot);
                    }}
                    className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Block
                  </button>
                )}
              </div>

              {slot.type === 'booked' && slot.patient && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{slot.patient}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {slot.appointmentType === 'telemedicine' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {slot.appointmentType === 'telemedicine' 
                        ? 'Video Call' 
                        : slot.location || 'In-Person'}
                    </span>
                  </div>
                </div>
              )}

              {slot.type === 'available' && (
                <p className="text-sm opacity-75">Available</p>
              )}

              {slot.type === 'blocked' && (
                <p className="text-sm opacity-75">Blocked</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Slots</p>
              <p className="text-2xl font-bold text-gray-900">{timeSlots.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Booked</p>
              <p className="text-2xl font-bold text-blue-600">
                {timeSlots.filter(slot => slot.type === 'booked').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {timeSlots.filter(slot => slot.type === 'available').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blocked</p>
              <p className="text-2xl font-bold text-gray-600">
                {timeSlots.filter(slot => slot.type === 'blocked').length}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">
              <Trash2 className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;