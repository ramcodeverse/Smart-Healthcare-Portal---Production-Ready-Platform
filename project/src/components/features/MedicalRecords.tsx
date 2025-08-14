import React, { useState } from 'react';
import { FileText, Download, Upload, Eye, Calendar, User, Heart } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface MedicalRecord {
  id: string;
  type: 'lab_result' | 'prescription' | 'imaging' | 'visit_summary' | 'vaccination';
  title: string;
  date: string;
  doctor: string;
  status: 'normal' | 'abnormal' | 'pending' | 'reviewed';
  size?: string;
}

const MedicalRecords = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addNotification } = useNotifications();

  const records: MedicalRecord[] = [
    {
      id: '1',
      type: 'lab_result',
      title: 'Complete Blood Count (CBC)',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Wilson',
      status: 'normal',
      size: '234 KB'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Medication Prescription - Lisinopril',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Wilson',
      status: 'reviewed',
      size: '128 KB'
    },
    {
      id: '3',
      type: 'imaging',
      title: 'Chest X-Ray',
      date: '2024-01-08',
      doctor: 'Dr. Michael Chen',
      status: 'normal',
      size: '2.1 MB'
    },
    {
      id: '4',
      type: 'visit_summary',
      title: 'Annual Physical Examination',
      date: '2024-01-05',
      doctor: 'Dr. Sarah Wilson',
      status: 'reviewed',
      size: '456 KB'
    },
    {
      id: '5',
      type: 'lab_result',
      title: 'Lipid Panel',
      date: '2024-01-03',
      doctor: 'Dr. Sarah Wilson',
      status: 'abnormal',
      size: '198 KB'
    },
    {
      id: '6',
      type: 'vaccination',
      title: 'COVID-19 Booster Shot',
      date: '2023-12-20',
      doctor: 'Nurse Jennifer Adams',
      status: 'reviewed',
      size: '89 KB'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_result': return <Heart className="w-5 h-5" />;
      case 'prescription': return <FileText className="w-5 h-5" />;
      case 'imaging': return <Eye className="w-5 h-5" />;
      case 'visit_summary': return <User className="w-5 h-5" />;
      case 'vaccination': return <Heart className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab_result': return 'text-blue-600 bg-blue-100';
      case 'prescription': return 'text-green-600 bg-green-100';
      case 'imaging': return 'text-purple-600 bg-purple-100';
      case 'visit_summary': return 'text-orange-600 bg-orange-100';
      case 'vaccination': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'abnormal': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterTypes = [
    { value: 'all', label: 'All Records' },
    { value: 'lab_result', label: 'Lab Results' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'visit_summary', label: 'Visit Summaries' },
    { value: 'vaccination', label: 'Vaccinations' }
  ];

  const filteredRecords = records.filter(record => {
    const matchesFilter = activeFilter === 'all' || record.type === activeFilter;
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (record: MedicalRecord) => {
    addNotification({
      type: 'success',
      title: 'Download Started',
      message: `Downloading ${record.title}...`
    });
  };

  const handleUpload = () => {
    addNotification({
      type: 'info',
      title: 'Upload Feature',
      message: 'Document upload functionality would be integrated with secure file storage.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Records</h2>
            <p className="text-gray-600">Access and manage your complete medical history</p>
          </div>
          <button
            onClick={handleUpload}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records..."
              className="w-full lg:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredRecords.length} Record{filteredRecords.length !== 1 ? 's' : ''} Found
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredRecords.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(record.type)}`}>
                    {getTypeIcon(record.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{record.title}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{record.doctor}</span>
                      </div>
                      {record.size && <span>• {record.size}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(record)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Lab Results Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blood Pressure</span>
              <span className="font-medium text-green-600">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cholesterol</span>
              <span className="font-medium text-red-600">High</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blood Sugar</span>
              <span className="font-medium text-green-600">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">BMI</span>
              <span className="font-medium text-yellow-600">Overweight</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Follow-up Consultation</p>
                <p className="text-sm text-gray-600">Dr. Sarah Wilson • Jan 20, 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Heart className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Annual Physical</p>
                <p className="text-sm text-gray-600">Dr. Michael Chen • Feb 5, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;