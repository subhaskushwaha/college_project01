import React from 'react';

const AdminReports = ({ activeTab, setActiveTab }) => {
    
    const exportReport = async () => {
        try {
            const reportType = document.getElementById('report-type')?.value || 'performance';
            const dateRange = document.getElementById('date-range')?.value || '7d';
            
            // Assume we're downloading CSV for now, or you could add a format selector
            const format = 'csv'; 
            const url = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/reports/export/${format}?type=${reportType}&range=${dateRange}`;
            
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to export report');

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `report_${reportType}_${dateRange}.${format}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('Error exporting report: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
                <p className="text-gray-500">Detailed insights into call center performance</p>
            </div>

            <div className="flex space-x-2 border-b border-gray-200 mb-6">
                <button
                    className={`pb-2 px-4 text-sm font-medium outline-none transition-colors ${
                        activeTab === 'performance'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('performance')}
                >
                    Performance
                </button>
                <button
                    className={`pb-2 px-4 text-sm font-medium outline-none transition-colors ${
                        activeTab === 'conversion'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('conversion')}
                >
                    Conversion
                </button>
                <button
                    className={`pb-2 px-4 text-sm font-medium outline-none transition-colors ${
                        activeTab === 'calls'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('calls')}
                >
                    Call Analytics
                </button>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${activeTab === 'performance' ? 'block' : 'hidden'}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Agent Performance Comparison</h3>
                    <div className="h-64 relative">
                        <canvas id="agent-comparison-chart"></canvas>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Volume by Hour</h3>
                    <div className="h-64 relative">
                        <canvas id="call-volume-chart"></canvas>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${activeTab === 'conversion' ? 'block' : 'hidden'}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
                    <div className="h-64 relative">
                        <canvas id="conversion-funnel-chart"></canvas>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Leads by Source</h3>
                    <div className="h-64 relative">
                        <canvas id="leads-source-chart"></canvas>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${activeTab === 'calls' ? 'block' : 'hidden'}`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Duration Distribution</h3>
                    <div className="h-64 relative">
                        <canvas id="call-duration-chart"></canvas>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Outcomes</h3>
                    <div className="h-64 relative">
                        <canvas id="call-outcomes-chart"></canvas>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Export Reports</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                        <select id="report-type" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="performance">Performance Report</option>
                            <option value="conversion">Conversion Report</option>
                            <option value="calls">Call Analytics Report</option>
                            <option value="comprehensive">Comprehensive Report</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <select id="date-range" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                            <option value="1y">Last Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button 
                            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors shadow-sm"
                            onClick={exportReport}
                        >
                            Export Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
