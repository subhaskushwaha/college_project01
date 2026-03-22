import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [currentUser, setCurrentUser] = useState(null);
    const [filters, setFilters] = useState({
        dateRange: '30d',
        agent: 'all',
        campaign: 'all',
        startDate: '2023-09-01',
        endDate: '2023-09-30'
    });
    
    const navigate = useNavigate();
    const chartRefs = useRef({});

    // Check authentication on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!user.id) {
            navigate('/login');
            return;
        }
        setCurrentUser(user);
    }, [navigate]);

    // Initialize charts when component mounts or tab changes
    useEffect(() => {
        if (currentUser) {
            // Small delay to ensure DOM is ready
            setTimeout(initializeCharts, 100);
        }
    }, [currentUser, activeTab]);

    const initializeCharts = () => {
        // Call Volume Chart
        initializeChart('call-volume-chart', {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calls Received',
                    data: [120, 190, 170, 160, 150, 180, 200],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });

        // Conversion Funnel Chart
        initializeChart('conversion-funnel-chart', {
            type: 'doughnut',
            data: {
                labels: ['Leads', 'Contacted', 'Qualified', 'Converted'],
                datasets: [{
                    data: [1000, 650, 320, 185],
                    backgroundColor: [
                        '#4361ee',
                        '#4895ef',
                        '#4cc9f0',
                        '#38b000'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Agent Performance Chart
        initializeChart('agent-performance-chart', {
            type: 'bar',
            data: {
                labels: ['John S', 'Sarah J', 'Mike D', 'Emily W', 'Robert B'],
                datasets: [{
                    label: 'Conversion Rate %',
                    data: [22, 19, 15, 25, 18],
                    backgroundColor: '#4361ee'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30
                    }
                }
            }
        });

        // Call Outcomes Chart
        initializeChart('call-outcomes-chart', {
            type: 'polarArea',
            data: {
                labels: ['Successful', 'Follow-up', 'No Answer', 'Busy', 'Wrong Number'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#4361ee',
                        '#4895ef',
                        '#4cc9f0',
                        '#f8961e',
                        '#f72585'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Additional charts for other tabs
        if (activeTab === 'conversion') {
            initializeChart('conversion-by-day-chart', {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Conversion Rate %',
                        data: [18, 22, 19, 24, 20, 15, 12],
                        borderColor: '#38b000',
                        backgroundColor: 'rgba(56, 176, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('conversion-by-campaign-chart', {
                type: 'bar',
                data: {
                    labels: ['Q4 Sales', 'Retention', 'Upsell', 'New Leads'],
                    datasets: [{
                        label: 'Conversion Rate %',
                        data: [22, 18, 25, 15],
                        backgroundColor: '#4361ee'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('lead-source-chart', {
                type: 'pie',
                data: {
                    labels: ['Website', 'Referral', 'Social Media', 'Email', 'Direct'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#4361ee',
                            '#4895ef',
                            '#4cc9f0',
                            '#f8961e',
                            '#7209b7'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('conversion-time-chart', {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Avg. Conversion Time (Days)',
                        data: [5.2, 4.8, 4.5, 4.2],
                        borderColor: '#f72585',
                        backgroundColor: 'rgba(247, 37, 133, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        if (activeTab === 'calls') {
            initializeChart('daily-call-distribution-chart', {
                type: 'bar',
                data: {
                    labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
                    datasets: [{
                        label: 'Calls',
                        data: [120, 190, 170, 160, 150, 180, 200, 170],
                        backgroundColor: '#4361ee'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('call-duration-chart', {
                type: 'bar',
                data: {
                    labels: ['< 2min', '2-5min', '5-10min', '10-15min', '15+ min'],
                    datasets: [{
                        label: 'Number of Calls',
                        data: [150, 320, 280, 120, 80],
                        backgroundColor: '#4895ef'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('abandonment-rate-chart', {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Abandonment Rate %',
                        data: [8, 6, 7, 5, 9, 4, 6],
                        borderColor: '#f72585',
                        backgroundColor: 'rgba(247, 37, 133, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('peak-hours-chart', {
                type: 'bar',
                data: {
                    labels: ['8-10 AM', '10-12 PM', '12-2 PM', '2-4 PM', '4-6 PM'],
                    datasets: [{
                        label: 'Calls per Period',
                        data: [180, 320, 280, 240, 160],
                        backgroundColor: '#4cc9f0'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        if (activeTab === 'performance') {
            initializeChart('agent-conversion-chart', {
                type: 'radar',
                data: {
                    labels: ['Calls/Hour', 'Conversion', 'Satisfaction', 'Upsell', 'Retention'],
                    datasets: [
                        {
                            label: 'John Smith',
                            data: [8, 7, 9, 6, 8],
                            borderColor: '#4361ee',
                            backgroundColor: 'rgba(67, 97, 238, 0.2)'
                        },
                        {
                            label: 'Sarah Johnson',
                            data: [7, 8, 8, 7, 9],
                            borderColor: '#f72585',
                            backgroundColor: 'rgba(247, 37, 133, 0.2)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('agent-efficiency-chart', {
                type: 'bar',
                data: {
                    labels: ['John S', 'Sarah J', 'Mike D', 'Emily W', 'Robert B'],
                    datasets: [
                        {
                            label: 'Calls per Hour',
                            data: [12, 14, 10, 16, 11],
                            backgroundColor: '#4361ee'
                        },
                        {
                            label: 'Conversion Rate %',
                            data: [22, 25, 18, 28, 20],
                            backgroundColor: '#38b000'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('agent-trend-chart', {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'John Smith',
                            data: [20, 22, 21, 23],
                            borderColor: '#4361ee',
                            tension: 0.4
                        },
                        {
                            label: 'Sarah Johnson',
                            data: [18, 20, 22, 24],
                            borderColor: '#f72585',
                            tension: 0.4
                        },
                        {
                            label: 'Emily Wilson',
                            data: [22, 24, 26, 28],
                            borderColor: '#38b000',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            initializeChart('quality-scores-chart', {
                type: 'bar',
                data: {
                    labels: ['John S', 'Sarah J', 'Mike D', 'Emily W', 'Robert B'],
                    datasets: [{
                        label: 'Quality Score %',
                        data: [88, 92, 85, 95, 90],
                        backgroundColor: '#4895ef'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    };

    const initializeChart = (chartId, config) => {
        const canvas = document.getElementById(chartId);
        if (!canvas) return;

        // Destroy existing chart if it exists
        if (chartRefs.current[chartId]) {
            chartRefs.current[chartId].destroy();
        }

        // Create new chart
        chartRefs.current[chartId] = new window.Chart(canvas.getContext('2d'), config);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const applyFilters = () => {
        alert('Filters applied! Data is being refreshed.');
        // In a real app, this would reload the charts with filtered data
        initializeCharts();
    };

    const refreshData = () => {
        alert('Refreshing data from server...');
        // In a real app, this would fetch the latest data from the server
        initializeCharts();
    };

    const exportCSV = () => {
        alert('CSV export started. Your download will begin shortly.');
        // In a real app, this would trigger a server-side CSV generation and download
    };

    const exportPDF = () => {
        alert('PDF report generation started. Your download will begin shortly.');
        // In a real app, this would use jsPDF and html2canvas to generate a PDF
    };

    const scheduleReport = () => {
        alert('Opening report scheduler...');
        // In a real app, this would open a modal for scheduling reports
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="reports-page">
            {/* Header */}
            <header>
                <div className="container header-content">
                    <div className="logo">CallCenter Pro</div>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/admin-dashboard">Admin</a></li>
                            <li><a href="/agent-dashboard">Agent</a></li>
                            <li><a href="/reports" className="active">Reports</a></li>
                        </ul>
                    </nav>
                    <div className="user-info">
                        <span>{currentUser.name}</span>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container">
                <div className="page">
                    <div className="page-header">
                        <div>
                            <h1>Analytics & Reports</h1>
                            <p>Comprehensive insights into call center performance</p>
                        </div>
                        <div>
                            <button className="btn" onClick={refreshData}>
                                <i className="fas fa-sync-alt"></i> Refresh Data
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="filters-container">
                        <div className="filters-row">
                            <div className="filter-group">
                                <label htmlFor="date-range">Date Range</label>
                                <select 
                                    id="date-range" 
                                    className="form-control"
                                    value={filters.dateRange}
                                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                >
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                    <option value="90d">Last 90 Days</option>
                                    <option value="1y">Last Year</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="agent-select">Agent</label>
                                <select 
                                    id="agent-select" 
                                    className="form-control"
                                    value={filters.agent}
                                    onChange={(e) => handleFilterChange('agent', e.target.value)}
                                >
                                    <option value="all">All Agents</option>
                                    <option value="john">John Smith</option>
                                    <option value="sarah">Sarah Johnson</option>
                                    <option value="mike">Mike Davis</option>
                                    <option value="emily">Emily Wilson</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="campaign-select">Campaign</label>
                                <select 
                                    id="campaign-select" 
                                    className="form-control"
                                    value={filters.campaign}
                                    onChange={(e) => handleFilterChange('campaign', e.target.value)}
                                >
                                    <option value="all">All Campaigns</option>
                                    <option value="q4">Q4 Sales</option>
                                    <option value="retention">Customer Retention</option>
                                    <option value="upsell">Upsell Campaign</option>
                                </select>
                            </div>
                        </div>
                        <div className="filters-row">
                            <div className="filter-group">
                                <label htmlFor="start-date">Start Date</label>
                                <input 
                                    type="date" 
                                    id="start-date" 
                                    className="form-control" 
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                <label htmlFor="end-date">End Date</label>
                                <input 
                                    type="date" 
                                    id="end-date" 
                                    className="form-control" 
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                />
                            </div>
                            <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <button className="btn" onClick={applyFilters}>
                                    <i className="fas fa-filter"></i> Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="tabs">
                        <div 
                            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </div>
                        <div 
                            className={`tab ${activeTab === 'conversion' ? 'active' : ''}`}
                            onClick={() => setActiveTab('conversion')}
                        >
                            Conversion Analytics
                        </div>
                        <div 
                            className={`tab ${activeTab === 'calls' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calls')}
                        >
                            Call Analytics
                        </div>
                        <div 
                            className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('performance')}
                        >
                            Agent Performance
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-content active">
                            {/* KPI Cards */}
                            <div className="kpi-container">
                                <div className="kpi-card">
                                    <div className="kpi-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="kpi-value">1,247</div>
                                    <div className="kpi-label">Total Calls</div>
                                </div>
                                <div className="kpi-card">
                                    <div className="kpi-icon">
                                        <i className="fas fa-chart-line"></i>
                                    </div>
                                    <div className="kpi-value">18.5%</div>
                                    <div className="kpi-label">Conversion Rate</div>
                                </div>
                                <div className="kpi-card">
                                    <div className="kpi-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="kpi-value">4.2m</div>
                                    <div className="kpi-label">Avg. Handling Time</div>
                                </div>
                                <div className="kpi-card">
                                    <div className="kpi-icon">
                                        <i className="fas fa-user-check"></i>
                                    </div>
                                    <div className="kpi-value">87%</div>
                                    <div className="kpi-label">Customer Satisfaction</div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="charts-container">
                                <div className="chart-card">
                                    <h3>Call Volume Trends</h3>
                                    <div className="chart">
                                        <canvas id="call-volume-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Conversion Funnel</h3>
                                    <div className="chart">
                                        <canvas id="conversion-funnel-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Agent Performance</h3>
                                    <div className="chart">
                                        <canvas id="agent-performance-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Call Outcomes</h3>
                                    <div className="chart">
                                        <canvas id="call-outcomes-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conversion Analytics Tab */}
                    {activeTab === 'conversion' && (
                        <div className="tab-content active">
                            <div className="charts-container">
                                <div className="chart-card">
                                    <h3>Conversion Rate by Day</h3>
                                    <div className="chart">
                                        <canvas id="conversion-by-day-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Conversion by Campaign</h3>
                                    <div className="chart">
                                        <canvas id="conversion-by-campaign-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Lead Source Performance</h3>
                                    <div className="chart">
                                        <canvas id="lead-source-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Conversion Time Analysis</h3>
                                    <div className="chart">
                                        <canvas id="conversion-time-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Call Analytics Tab */}
                    {activeTab === 'calls' && (
                        <div className="tab-content active">
                            <div className="charts-container">
                                <div className="chart-card">
                                    <h3>Daily Call Distribution</h3>
                                    <div className="chart">
                                        <canvas id="daily-call-distribution-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Call Duration Analysis</h3>
                                    <div className="chart">
                                        <canvas id="call-duration-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Call Abandonment Rate</h3>
                                    <div className="chart">
                                        <canvas id="abandonment-rate-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Peak Call Hours</h3>
                                    <div className="chart">
                                        <canvas id="peak-hours-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Agent Performance Tab */}
                    {activeTab === 'performance' && (
                        <div className="tab-content active">
                            <div className="charts-container">
                                <div className="chart-card">
                                    <h3>Agent Conversion Comparison</h3>
                                    <div className="chart">
                                        <canvas id="agent-conversion-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Agent Efficiency</h3>
                                    <div className="chart">
                                        <canvas id="agent-efficiency-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Agent Performance Trend</h3>
                                    <div className="chart">
                                        <canvas id="agent-trend-chart"></canvas>
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Quality Scores</h3>
                                    <div className="chart">
                                        <canvas id="quality-scores-chart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Export Section */}
                    <div className="export-container">
                        <div className="export-header">
                            <h3>Export Reports</h3>
                            <div>
                                <button className="btn btn-outline" onClick={scheduleReport}>
                                    <i className="fas fa-calendar-alt"></i> Schedule Report
                                </button>
                            </div>
                        </div>
                        <div className="export-options">
                            <div className="export-option">
                                <div className="export-icon">
                                    <i className="fas fa-file-csv"></i>
                                </div>
                                <h4>CSV Export</h4>
                                <p>Export data in CSV format for further analysis in Excel or other tools</p>
                                <button className="btn btn-small" onClick={exportCSV}>
                                    <i className="fas fa-download"></i> Download CSV
                                </button>
                            </div>
                            <div className="export-option">
                                <div className="export-icon">
                                    <i className="fas fa-file-pdf"></i>
                                </div>
                                <h4>PDF Report</h4>
                                <p>Generate a comprehensive PDF report with all charts and metrics</p>
                                <button className="btn btn-small" onClick={exportPDF}>
                                    <i className="fas fa-download"></i> Download PDF
                                </button>
                            </div>
                            <div className="export-option">
                                <div className="export-icon">
                                    <i className="fas fa-chart-bar"></i>
                                </div>
                                <h4>Custom Report</h4>
                                <p>Create a custom report with selected metrics and time periods</p>
                                <button className="btn btn-small">
                                    <i className="fas fa-cog"></i> Configure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <h3>CallCenter Pro</h3>
                            <p>Advanced data allotment analysis for call centers</p>
                        </div>
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/register">Register</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Resources</h3>
                            <ul className="footer-links">
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">API</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2023 CallCenter Pro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Reports;