import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageSquare, Users, Settings, Monitor } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const TelemedicineConsole = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { addNotification } = useNotifications();

  const upcomingCalls = [
    {
      id: '1',
      patient: 'John Smith',
      time: '2:30 PM',
      type: 'Follow-up',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '2',
      patient: 'Emma Johnson',
      time: '3:00 PM',
      type: 'Consultation',
      avatar: 'https://images.pexels.com/photos/5452219/pexels-photo-5452219.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '3',
      patient: 'Michael Davis',
      time: '3:30 PM',
      type: 'Post-op Check',
      avatar: 'https://images.pexels.com/photos/5452240/pexels-photo-5452240.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    }
  ];

  const startCall = (patient: any) => {
    setActiveCall(patient);
    addNotification({
      type: 'info',
      title: 'Video Call Started',
      message: `Connected with ${patient.patient}`
    });
  };

  const endCall = () => {
    setActiveCall(null);
    addNotification({
      type: 'success',
      title: 'Call Ended',
      message: 'Video consultation completed successfully'
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setChatMessages([...chatMessages, {
      id: Date.now(),
      sender: 'doctor',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }]);
    setNewMessage('');
  };

  if (activeCall) {
    return (
      <div className="space-y-6">
        {/* Active Call Interface */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Video Area */}
          <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Patient Video (Simulated) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <img
                  src={activeCall.avatar}
                  alt={activeCall.patient}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
                />
                <h3 className="text-2xl font-bold">{activeCall.patient}</h3>
                <p className="text-gray-300">{activeCall.type}</p>
              </div>
            </div>

            {/* Doctor Video (Picture-in-Picture) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">You</span>
              </div>
            </div>

            {/* Connection Status */}
            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
              <span className="text-white text-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Connected</span>
              </span>
            </div>
          </div>

          {/* Call Controls */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isVideoOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`p-3 rounded-full transition-colors ${
                  isAudioOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {isAudioOn ? (
                  <Mic className="w-6 h-6 text-white" />
                ) : (
                  <MicOff className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={endCall}
                className="p-3 bg-red-600 hover:bg-red-500 rounded-full transition-colors"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>

              <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors">
                <Monitor className="w-6 h-6 text-white" />
              </button>

              <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors">
                <MessageSquare className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Call Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Patient</p>
              <p className="text-gray-900">{activeCall.patient}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Appointment Type</p>
              <p className="text-gray-900">{activeCall.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Duration</p>
              <p className="text-gray-900">15:32</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Telemedicine Console</h2>
        <p className="text-gray-600">Conduct secure video consultations with your patients</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors">
          <Video className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Start Video Call</h3>
          <p className="text-sm text-blue-100">Begin a new consultation</p>
        </button>

        <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors">
          <Phone className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Audio Call</h3>
          <p className="text-sm text-green-100">Voice-only consultation</p>
        </button>

        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors">
          <MessageSquare className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Chat Session</h3>
          <p className="text-sm text-purple-100">Text-based consultation</p>
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Telemedicine Schedule</h3>
        <div className="space-y-4">
          {upcomingCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={call.avatar}
                  alt={call.patient}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{call.patient}</h4>
                  <p className="text-sm text-gray-600">{call.type} • {call.time}</p>
                </div>
              </div>
              <button
                onClick={() => startCall(call)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>Join Call</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Calls</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Duration</p>
              <p className="text-2xl font-bold text-gray-900">4.2h</p>
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
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">4.9</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Telemedicine Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <ul className="space-y-1">
              <li>• End-to-end encrypted video calls</li>
              <li>• HIPAA compliant platform</li>
              <li>• HD video and audio quality</li>
              <li>• Cross-platform compatibility</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              <li>• Screen sharing capabilities</li>
              <li>• Real-time chat messaging</li>
              <li>• Session recording (with consent)</li>
              <li>• Integration with EHR systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineConsole;