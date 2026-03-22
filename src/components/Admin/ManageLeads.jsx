import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageLeads = ({ getStatusBadge, agents }) => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/leads`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setLeads(res.data.data || []);
            }
        } catch (error) {
            console.error('Failed to load leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignAgent = async (leadId, agentId) => {
        if (!agentId) return;
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/leads/lead-operation`, {
                action: 'assign',
                leadId,
                agentId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (res.data.success) {
                alert('Agent assigned successfully');
                fetchLeads(); // Refresh leads
            } else {
                alert('Failed to assign agent: ' + res.data.message);
            }
        } catch (error) {
            alert('Server error while assigning agent');
        }
    };

    const filteredLeads = leads.filter(lead => {
        if (filterStatus === 'all') return true;
        return lead.status === filterStatus;
    });

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading leads...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Leads</h1>
                    <p className="text-gray-500">View and assign all leads in the system</p>
                </div>
                <div>
                    <select
                        className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email & Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company/Source</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Agent</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id || lead._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {lead.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="text-gray-900">{lead.email}</div>
                                        <div>{lead.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {lead.company || lead.source || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(lead.status || 'new')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <select 
                                            className="border border-gray-300 rounded-md px-2 py-1"
                                            value={lead.agentId || ''}
                                            onChange={(e) => handleAssignAgent(lead.id || lead._id, e.target.value)}
                                        >
                                            <option value="">Unassigned</option>
                                            {agents.map(a => (
                                                <option key={a.id || a._id} value={a.id || a._id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No leads found matching the current filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageLeads;
