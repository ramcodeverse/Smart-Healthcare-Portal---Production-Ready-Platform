import React, { useState } from 'react';
import { QrCode, Download, RefreshCw, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  datePrescribed: string;
  status: 'active' | 'completed' | 'refill_needed';
  refillsRemaining: number;
  qrCode: string;
}

const PrescriptionManager = () => {
  const [activeTab, setActiveTab] = useState('current');
  const { addNotification } = useNotifications();

  const prescriptions: Prescription[] = [
    {
      id: '1',
      medication: 'Lisinopril 10mg',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '3 months',
      prescribedBy: 'Dr. Sarah Wilson',
      datePrescribed: '2024-01-15',
      status: 'active',
      refillsRemaining: 2,
      qrCode: 'QR123456789'
    },
    {
      id: '2',
      medication: 'Metformin 500mg',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '6 months',
      prescribedBy: 'Dr. Sarah Wilson',
      datePrescribed: '2024-01-10',
      status: 'refill_needed',
      refillsRemaining: 0,
      qrCode: 'QR987654321'
    },
    {
      id: '3',
      medication: 'Amoxicillin 250mg',
      dosage: '250mg',
      frequency: 'Three times daily',
      duration: '7 days',
      prescribedBy: 'Dr. Michael Chen',
      datePrescribed: '2023-12-20',
      status: 'completed',
      refillsRemaining: 0,
      qrCode: 'QR456789123'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'refill_needed': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'refill_needed': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (activeTab === 'current') return prescription.status === 'active' || prescription.status === 'refill_needed';
    if (activeTab === 'history') return prescription.status === 'completed';
    return true;
  });

  const handleRequestRefill = (prescription: Prescription) => {
    addNotification({
      type: 'success',
      title: 'Refill Requested',
      message: `Refill request for ${prescription.medication} has been sent to your pharmacy.`
    });
  };

  const handleDownloadQR = (prescription: Prescription) => {
    addNotification({
      type: 'info',
      title: 'QR Code Downloaded',
      message: `QR code for ${prescription.medication} has been saved to your device.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Manager</h2>
        <p className="text-gray-600">Manage your medications with secure QR verification</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'current', label: 'Current Medications' },
            { id: 'history', label: 'Prescription History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                  {/* Prescription Details */}
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{prescription.medication}</h3>
                        <p className="text-gray-600">Prescribed by {prescription.prescribedBy}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(prescription.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(prescription.status)}`}>
                          {prescription.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dosage</p>
                        <p className="text-gray-600">{prescription.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Frequency</p>
                        <p className="text-gray-600">{prescription.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Duration</p>
                        <p className="text-gray-600">{prescription.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Refills Left</p>
                        <p className="text-gray-600">{prescription.refillsRemaining}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Prescribed: {new Date(prescription.datePrescribed).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code and Actions */}
                  <div className="lg:ml-6 flex flex-col items-center space-y-3">
                    {/* QR Code */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-gray-600" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-2">Secure QR Code</p>
                      <button
                        onClick={() => handleDownloadQR(prescription)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                  {prescription.status === 'refill_needed' && (
                    <button
                      onClick={() => handleRequestRefill(prescription)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Request Refill</span>
                    </button>
                  )}
                  
                  {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                    <button
                      onClick={() => handleRequestRefill(prescription)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Early Refill</span>
                    </button>
                  )}

                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Set Reminder
                  </button>

                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
              <p className="text-gray-600">
                {activeTab === 'current' 
                  ? 'You don\'t have any active prescriptions at the moment.'
                  : 'No prescription history available.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <QrCode className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">About QR-Coded Prescriptions</h3>
            <p className="text-blue-800 text-sm">
              Each prescription includes a unique QR code for secure verification at pharmacies. 
              The QR code contains encrypted prescription data that can only be read by authorized healthcare providers 
              and pharmacies, ensuring your medication safety and preventing prescription fraud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionManager;