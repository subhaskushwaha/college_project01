import React, { useEffect, useRef } from 'react';

const DashboardOverview = ({ getStatusBadge, dashboardStats, uploadHistory = [] }) => {
    const chartsRef = useRef({});
    const latestActivity = uploadHistory
        ?.slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    useEffect(() => {
        const initializeCharts = () => {
            if (!window.Chart) return;

            // Destroy all charts first
            Object.values(chartsRef.current).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') chart.destroy();
            });
            chartsRef.current = {};

            const callsStatusCtx = document.getElementById('calls-status-chart');
            if (callsStatusCtx) {
                chartsRef.current['calls-status-chart'] = new window.Chart(callsStatusCtx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Completed', 'In Progress', 'Missed', 'Scheduled'],
                        datasets: [{
                            data: [45, 25, 15, 15],
                            backgroundColor: ['#3b82f6', '#60a5fa', '#ec4899', '#8b5cf6']
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }

            const agentPerformanceCtx = document.getElementById('agent-performance-chart');
            if (agentPerformanceCtx) {
                chartsRef.current['agent-performance-chart'] = new window.Chart(agentPerformanceCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['John S', 'Sarah J', 'Mike D', 'Emily W', 'Robert B'],
                        datasets: [{ label: 'Calls Handled', data: [45, 38, 32, 50, 28], backgroundColor: '#3b82f6' }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
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
    const overview = dashboardStats?.overview || {};
    return (
        <div className="space-y-6 mt-24" >
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500">Overview of call center performance and key metrics</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium text-sm">Total Leads</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">
                        {overview.total_leads || 0}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium text-sm">Conversion Rate</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">
                        {overview.converted_leads || 0}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium text-sm">Total Agents</h3>

                    <div className="text-3xl font-bold text-gray-800 my-2">
                        {overview.total_agents || 0}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 font-medium text-sm">Today Calls</h3>
                    <div className="text-3xl font-bold text-gray-800 my-2">
                        {overview.today_calls || 0}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Agent Performance</h3>
                    <div className="h-64 relative">
                        <canvas id="agent-performance-chart"></canvas>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {latestActivity?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.assigned_agent|| "Unknown"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.campaign_type || "Lead uploaded"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleTimeString()}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(item.status || "active")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;