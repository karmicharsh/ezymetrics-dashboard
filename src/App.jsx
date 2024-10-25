import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, Moon } from 'lucide-react';

// dumb data  
const performanceData = [
  { month: 'Jan', sales: 4000, leads: 2400 },
  { month: 'Feb', sales: 3000, leads: 1398 },
  { month: 'Mar', sales: 2000, leads: 9800 },
  { month: 'Apr', sales: 2780, leads: 3908 },
  { month: 'May', sales: 1890, leads: 4800 },
  { month: 'Jun', sales: 2390, leads: 3800 },
];

const leadsData = [
  { id: 1, name: 'Harsh', email: 'john@example.com', status: 'New' },
  { id: 2, name: 'Rahul', email: 'jane@example.com', status: 'Contacted' },
  { id: 3, name: 'Deep', email: 'bob@example.com', status: 'Qualified' },
  { id: 1, name: 'Pushp', email: 'john@example.com', status: 'New' },
  { id: 2, name: 'Sachin', email: 'jane@example.com', status: 'Contacted' },
  { id: 3, name: 'Rishabh', email: 'bob@example.com', status: 'Qualified' },
];

const leadStatusData = [
  { name: 'New', value: 400 },
  { name: 'Contacted', value: 300 },
  { name: 'Qualified', value: 300 },
  { name: 'Lost', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformanceWidget = ({ onPin, isPinned, onExport, isDarkMode }) => {
  const [chartType, setChartType] = useState('line');

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Performance Metrics</h3>
      <div className="flex justify-between mb-4">
        <select 
          value={chartType} 
          onChange={(e) => setChartType(e.target.value)}
          className={`border rounded p-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
        <div>
          <button onClick={onPin} className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-2 py-1 rounded mr-2`}>
            {isPinned ? 'Unpin' : 'Pin'}
          </button>
          <button onClick={onExport} className={`${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-2 py-1 rounded`}>
            Export
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={isDarkMode ? '#fff' : '#000'} />
              <YAxis stroke={isDarkMode ? '#fff' : '#000'} />
              <Tooltip contentStyle={isDarkMode ? { backgroundColor: '#4a5568', color: '#fff' } : {}} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="leads" stroke="#82ca9d" />
            </LineChart>
          ) : (
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={isDarkMode ? '#fff' : '#000'} />
              <YAxis stroke={isDarkMode ? '#fff' : '#000'} />
              <Tooltip contentStyle={isDarkMode ? { backgroundColor: '#4a5568', color: '#fff' } : {}} />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="leads" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const LeadManagementWidget = ({ onPin, isPinned, onExport, isDarkMode }) => {
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Lead Management</h3>
      <div className="flex justify-end mb-4">
        <button onClick={onPin} className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-2 py-1 rounded mr-2`}>
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
        <button onClick={onExport} className={`${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-2 py-1 rounded`}>
          Export
        </button>
      </div>
      <ul className={`divide-y ${isDarkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
        {leadsData.map((lead) => (
          <li key={lead.id} onClick={() => setSelectedLead(lead)} className={`py-2 cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-800'}`}>
            {lead.name} - {lead.status}
          </li>
        ))}
      </ul>
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-4 rounded-lg`}>
            <h4 className="text-lg font-bold mb-2">{selectedLead.name}</h4>
            <p>Email: {selectedLead.email}</p>
            <p>Status: {selectedLead.status}</p>
            <button onClick={() => setSelectedLead(null)} className={`mt-4 ${isDarkMode ? 'bg-red-600' : 'bg-red-500'} text-white px-2 py-1 rounded`}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const LeadStatusWidget = ({ onPin, isPinned, onExport, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Lead Status</h3>
      <div className="flex justify-end mb-4">
        <button onClick={onPin} className={`${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-2 py-1 rounded mr-2`}>
          {isPinned ? 'Unpin' : 'Pin'}
        </button>
        <button onClick={onExport} className={`${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-2 py-1 rounded`}>
          Export
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leadStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {leadStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={isDarkMode ? { backgroundColor: '#4a5568', color: '#fff' } : {}} />
            <Legend formatter={(value) => <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [pinnedWidgets, setPinnedWidgets] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const togglePin = (widgetId) => {
    setPinnedWidgets((prev) =>
      prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]
    );
  };

  const exportData = (widgetId) => {
    console.log(`Exporting data for ${widgetId}`);
    // Implement export logic here
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 flex justify-between items-center`}>
        <h1 className="text-2xl font-bold">EzyMetrics Dashboard</h1>
        <button onClick={toggleTheme} className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} p-2 rounded-full`}>
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </header>
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PerformanceWidget
          onPin={() => togglePin('performance')}
          isPinned={pinnedWidgets.includes('performance')}
          onExport={() => exportData('performance')}
          isDarkMode={isDarkMode}
        />
        <LeadManagementWidget
          onPin={() => togglePin('leads')}
          isPinned={pinnedWidgets.includes('leads')}
          onExport={() => exportData('leads')}
          isDarkMode={isDarkMode}
        />
        <LeadStatusWidget
          onPin={() => togglePin('leadStatus')}
          isPinned={pinnedWidgets.includes('leadStatus')}
          onExport={() => exportData('leadStatus')}
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  );
};

export default Dashboard;