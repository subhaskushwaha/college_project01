import React, { useEffect, useRef } from 'react';

const AgentDashboardOverview = ({ openLeadDetail }) => {
    const chartsRef = useRef({});

    useEffect(() => {
        const initializeCharts = () => {
            if (!window.Chart) return;

            Object.values(chartsRef.current).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') chart.destroy();
            });
            chartsRef.current = {};

            const weeklyPerformanceCtx = document.getElementById('weekly-performance-chart');
            if (weeklyPerformanceCtx) {
                chartsRef.current['weekly-performance'] = new window.Chart(weeklyPerformanceCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Calls Made',
                            data: [12, 15, 10, 14, 18, 5, 2],
                            backgroundColor: '#22c55e'
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
                });
            }

            const leadStatusCtx = document.getElementById('lead-status-chart');
            if (leadStatusCtx) {
                chartsRef.current['lead-status'] = new window.Chart(leadStatusCtx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['New', 'Contacted', 'Qualified', 'Converted'],
                        datasets: [{
                            data: [8, 6, 5, 5],
                            backgroundColor: ['#3b82f6', '#f59e0b', '#06b6d4', '#22c55e']
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
        };

        const timer = setTimeout(initializeCharts, 100);
        return () => {
            clearTimeout(timer);
            Object.values(chartsRef.current).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') chart.destroy();
            });
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Agent Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here's your performance overview</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors flex items-center shadow-sm">
                        <i className="fas fa-sync-alt mr-2"></i> Refresh Data
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4">
                        <i className="fas fa-phone"></i>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">Make a Call</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4">Call your next lead</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md transition-colors font-medium">Start Calling</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl mb-4">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">Today's Tasks</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4">5 calls pending</p>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 w-full py-2 rounded-md transition-colors font-medium">View Tasks</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl mb-4">
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">Performance</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4">View your stats</p>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 w-full py-2 rounded-md transition-colors font-medium">See Reports</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                    <h3 className="text-gray-500 font-medium text-sm">Assigned Leads</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">24</div>
                    <div className="text-green-500 text-sm font-medium">↑ 5 from last week</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                    <h3 className="text-gray-500 font-medium text-sm">Converted This Month</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">8</div>
                    <div className="text-green-500 text-sm font-medium">↑ 2 from last month</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
                    <h3 className="text-gray-500 font-medium text-sm">Conversion Rate</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">33%</div>
                    <div className="text-green-500 text-sm font-medium">↑ 5% from last month</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                    <h3 className="text-gray-500 font-medium text-sm">Calls Today</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">12</div>
                    <div className="text-red-500 text-sm font-medium">↓ 3 from yesterday</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Performance</h3>
                    <div className="h-64 relative">
                        <canvas id="weekly-performance-chart"></canvas>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Status Distribution</h3>
                    <div className="h-64 relative">
                        <canvas id="lead-status-chart"></canvas>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Priority Tasks</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Follow-up Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Robert Brown</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tech Corp</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:30 AM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-900 px-3 py-1 rounded-md text-sm font-medium transition-colors" onClick={() => openLeadDetail(1)}>View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jennifer Lee</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Marketing Inc</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2:15 PM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-900 px-3 py-1 rounded-md text-sm font-medium transition-colors" onClick={() => openLeadDetail(2)}>View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Michael Taylor</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finance LLC</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4:45 PM</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-900 px-3 py-1 rounded-md text-sm font-medium transition-colors" onClick={() => openLeadDetail(3)}>View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDashboardOverview;
