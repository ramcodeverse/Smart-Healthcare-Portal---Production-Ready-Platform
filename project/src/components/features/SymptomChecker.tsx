import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface Symptom {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
}

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  const commonSymptoms: Symptom[] = [
    { id: '1', name: 'Headache', severity: 'low' },
    { id: '2', name: 'Fever', severity: 'medium' },
    { id: '3', name: 'Chest Pain', severity: 'high' },
    { id: '4', name: 'Shortness of Breath', severity: 'high' },
    { id: '5', name: 'Cough', severity: 'low' },
    { id: '6', name: 'Nausea', severity: 'medium' },
    { id: '7', name: 'Dizziness', severity: 'medium' },
    { id: '8', name: 'Fatigue', severity: 'low' },
    { id: '9', name: 'Joint Pain', severity: 'low' },
    { id: '10', name: 'Abdominal Pain', severity: 'medium' }
  ];

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.find(s => s.id === symptom.id)
  );

  const addSymptom = (symptom: Symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm('');
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No Symptoms Selected',
        message: 'Please select at least one symptom to analyze.'
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const hasHighSeverity = selectedSymptoms.some(s => s.severity === 'high');
    const hasMediumSeverity = selectedSymptoms.some(s => s.severity === 'medium');

    const mockResults = {
      riskLevel: hasHighSeverity ? 'high' : hasMediumSeverity ? 'medium' : 'low',
      possibleConditions: hasHighSeverity 
        ? ['Cardiovascular Emergency', 'Respiratory Distress', 'Acute Infection']
        : hasMediumSeverity
          ? ['Viral Infection', 'Digestive Issues', 'Stress/Anxiety']
          : ['Common Cold', 'Minor Strain', 'Dehydration'],
      recommendations: hasHighSeverity
        ? ['Seek immediate medical attention', 'Call emergency services if severe', 'Do not delay treatment']
        : hasMediumSeverity
          ? ['Schedule appointment with your doctor', 'Monitor symptoms closely', 'Rest and stay hydrated']
          : ['Rest and monitor symptoms', 'Stay hydrated', 'Consider over-the-counter medication'],
      urgency: hasHighSeverity ? 'immediate' : hasMediumSeverity ? 'soon' : 'routine'
    };

    setResults(mockResults);
    setLoading(false);

    addNotification({
      type: hasHighSeverity ? 'error' : hasMediumSeverity ? 'warning' : 'info',
      title: 'Analysis Complete',
      message: `Based on your symptoms, we recommend ${mockResults.urgency} medical attention.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Symptom Checker</h2>
        <p className="text-gray-600">
          Describe your symptoms and get AI-powered insights. This tool is for informational purposes only and does not replace professional medical advice.
        </p>
      </div>

      {/* Symptom Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Symptoms</h3>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search symptoms..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(symptom.severity)}`}
                >
                  {symptom.name}
                  <button
                    onClick={() => removeSymptom(symptom.id)}
                    className="ml-2 text-current hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Available Symptoms */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom.id}
              onClick={() => addSymptom(symptom)}
              className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{symptom.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  symptom.severity === 'high' ? 'bg-red-500' :
                  symptom.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
              </div>
            </button>
          ))}
        </div>

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={analyzeSymptoms}
            disabled={loading || selectedSymptoms.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Symptoms</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
          
          {/* Risk Level */}
          <div className={`p-4 rounded-lg border-l-4 mb-4 ${
            results.riskLevel === 'high' 
              ? 'bg-red-50 border-red-500' 
              : results.riskLevel === 'medium'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center space-x-2">
              {results.riskLevel === 'high' ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : results.riskLevel === 'medium' ? (
                <Clock className="w-5 h-5 text-yellow-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <span className={`font-semibold ${
                results.riskLevel === 'high' ? 'text-red-800' :
                results.riskLevel === 'medium' ? 'text-yellow-800' : 'text-green-800'
              }`}>
                {results.riskLevel === 'high' ? 'High Priority' :
                 results.riskLevel === 'medium' ? 'Medium Priority' : 'Low Priority'}
              </span>
            </div>
          </div>

          {/* Possible Conditions */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Possible Conditions:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {results.possibleConditions.map((condition: string, index: number) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {results.recommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Book Appointment
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <strong>Medical Disclaimer:</strong> This symptom checker is powered by AI and is for informational purposes only. 
            It does not provide medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional 
            for proper medical evaluation and care.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;