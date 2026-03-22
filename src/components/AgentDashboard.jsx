import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AgentHeader from './Agent/AgentHeader';
import AgentDashboardOverview from './Agent/AgentDashboardOverview';
import AgentLeadList from './Agent/AgentLeadList';
import AgentLeadDetail from './Agent/AgentLeadDetail';

const AgentDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [leadFilter, setLeadFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);

    const [callLogs, setCallLogs] = useState([
        { date: 'October 15, 2023', duration: '12 minutes', notes: 'Customer expressed interest in our premium package. Asked for more details about implementation timeline.' },
        { date: 'October 10, 2023', duration: '8 minutes', notes: 'Initial contact. Customer was busy but agreed to follow-up call next week.' }
    ]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!user.id || user.role !== 'agent') {
            navigate('/login');
            return;
        }
        setCurrentUser(user);
        fetchLeads();
    }, [navigate]);

    const fetchLeads = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/agent/leads`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.data.success) {
                setLeads(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        }
    };

    const openLeadDetail = (leadId) => {
        const lead = leads.find(l => l.id === leadId);
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLead(null);
    };

    const saveLeadChanges = async (updatedLeadData) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/agent/leads/${selectedLead.id || selectedLead._id}`, updatedLeadData, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.data.success) {
                alert('Lead details updated successfully!');
                setLeads(prev => prev.map(l => (l.id === selectedLead.id || l._id === selectedLead._id) ? { ...l, ...updatedLeadData } : l));
                closeModal();
            } else {
                alert(res.data.message || 'Failed to update lead');
            }
        } catch (error) {
            alert('Server error while updating lead');
            console.error(error);
        }
    };

    const addCallLog = () => {
        const duration = document.getElementById('call-duration')?.value || '10';
        const notes = document.getElementById('call-notes')?.value || '';
        
        if (!notes) {
            alert('Please enter call notes');
            return;
        }
        
        const newCallLog = {
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            duration: `${duration} minutes`,
            notes: notes
        };
        
        setCallLogs(prev => [newCallLog, ...prev]);
        alert(`Call log added: ${duration} minutes\nNotes: ${notes}`);
        
        if (document.getElementById('call-notes')) {
            document.getElementById('call-notes').value = '';
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesFilter = leadFilter === 'all' || lead.status === leadFilter;
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const config = {
            new: { class: 'bg-red-100 text-red-800', text: 'New' },
            contacted: { class: 'bg-yellow-100 text-yellow-800', text: 'Contacted' },
            qualified: { class: 'bg-green-100 text-green-800', text: 'Qualified' },
            converted: { class: 'bg-blue-100 text-blue-800', text: 'Converted' }
        }[status] || { class: 'bg-red-100 text-red-800', text: 'New' };
        
        return <span className={`inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>{config.text}</span>;
    };

    if (!currentUser) return <div className="flex h-screen items-center justify-center text-xl text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <AgentHeader 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentUser={currentUser}
            />

            <main className="container mx-auto px-4 py-8 flex-1 w-full max-w-7xl">
                {currentPage === 'dashboard' && (
                    <AgentDashboardOverview openLeadDetail={openLeadDetail} />
                )}
                {currentPage === 'leads' && (
                    <AgentLeadList 
                        leadFilter={leadFilter}
                        setLeadFilter={setLeadFilter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filteredLeads={filteredLeads}
                        getStatusBadge={getStatusBadge}
                        openLeadDetail={openLeadDetail}
                    />
                )}
            </main>

            {isModalOpen && (
                <AgentLeadDetail 
                    selectedLead={selectedLead}
                    closeModal={closeModal}
                    saveLeadChanges={saveLeadChanges}
                    callLogs={callLogs}
                    addCallLog={addCallLog}
                />
            )}
        </div>
    );
};

export default AgentDashboard;