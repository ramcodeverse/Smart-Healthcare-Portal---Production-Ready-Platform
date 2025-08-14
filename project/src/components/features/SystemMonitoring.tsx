import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, Shield, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  status: 'normal' | 'warning' | 'critical';
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const SystemMonitoring = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const systemMetrics: SystemMetric[] = [
    { name: 'CPU Usage', value: 68, status: 'normal', unit: '%', trend: 'stable' },
    { name: 'Memory Usage', value: 82, status: 'warning', unit: '%', trend: 'up' },
    { name: 'Disk Usage', value: 45, status: 'normal', unit: '%', trend: 'stable' },
    { name: 'Network I/O', value: 234, status: 'normal', unit: 'MB/s', trend: 'down' },
    { name: 'Database Connections', value: 127, status: 'normal', unit: '', trend: 'stable' },
    { name: 'API Response Time', value: 1.2, status: 'normal', unit: 's', trend: 'stable' }
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'warning',
      message: 'High memory usage detected on server-02',
      timestamp: '2024-01-15T10:45:00',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Database backup completed successfully',
      timestamp: '2024-01-15T06:00:00',
      resolved: true
    },
    {
      id: '3',
      type: 'error',
      message: 'Failed login attempts threshold exceeded',
      timestamp: '2024-01-15T08:30:00',
      resolved: false
    },
    {
      id: '4',
      type: 'info',
      message: 'System maintenance window scheduled',
      timestamp: '2024-01-14T16:20:00',
      resolved: true
    }
  ];

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getMetricIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">System Monitoring</h2>
            <p className="text-gray-600">Real-time system health and performance metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-sm text-gray-600">Last updated</p>
            <p className="font-mono text-sm text-gray-900">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-green-700">All Systems Operational</span>
          </div>
          <div className="text-sm text-gray-600">
            Uptime: 99.9% • Response Time: 1.2s • Active Users: 1,247
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">{metric.name}</h4>
              {getMetricIcon(metric.status)}
            </div>
            
            <div className="flex items-end space-x-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {metric.value}
              </span>
              <span className="text-gray-600">{metric.unit}</span>
              <span className="text-sm text-gray-500">
                {getTrendIcon(metric.trend)}
              </span>
            </div>

            {/* Progress Bar for percentage metrics */}
            {metric.unit === '%' && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.status === 'critical' ? 'bg-red-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            )}

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMetricColor(metric.status)}`}>
              {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Service Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Web Server', status: 'online', icon: Server },
            { name: 'Database', status: 'online', icon: Database },
            { name: 'Authentication', status: 'online', icon: Shield },
            { name: 'API Gateway', status: 'warning', icon: Zap }
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <div className={`p-2 rounded-full ${
                  service.status === 'online' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    service.status === 'online' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className={`text-sm ${
                      service.status === 'online' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <span className="text-sm text-gray-600">
            {systemAlerts.filter(alert => !alert.resolved).length} active alerts
          </span>
        </div>
        
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} ${
                alert.resolved ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.type === 'error' ? 'bg-red-100 text-red-800' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    {alert.resolved && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        RESOLVED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 ml-4">
                  <Activity className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends (24h)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">CPU & Memory Usage</p>
              <p className="text-sm text-blue-500">Interactive chart would display here</p>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Database className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-600 font-medium">Database Performance</p>
              <p className="text-sm text-green-500">Interactive chart would display here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;