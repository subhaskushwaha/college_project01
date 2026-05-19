import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminHeader from './Admin/AdminHeader';
import DashboardOverview from './Admin/DashboardOverview';
import AgentManagement from './Admin/AgentManagement';
import LeadsUpload from './Admin/LeadsUpload';
import AdminReports from './Admin/AdminReports';

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [activeTab, setActiveTab] = useState('performance');
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState("");
    const [leadSource, setLeadSource] = useState("website");
    const [agentForm, setAgentForm] = useState({
        name: "", email: "", phone: "", status: "active",
    });

    const [filePreview, setFilePreview] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [uploadHistory] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (!user.id || user.role !== 'admin') {
            navigate('/login');
            return;
        }
        setCurrentUser(user);
        loadAgents();
    }, [navigate]);

 const loadAgents = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/getAgents`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 🔥 token header
            },
        });

        const data = await res.json();

        if (data.success) {
            setAgents(data.data); // 👈 table me show hoga
        } else {
            console.error(data.message);
        }

    } catch (error) {
        console.error("Failed to load agents:", error);
    }
};
    const handleAddAgent = async (e) => {
  
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:4000/api/admin/agents", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: agentForm.name, email: agentForm.email, phone: agentForm.phone, status: agentForm.status }),
            });
            const data = await response.json();
            if (data.success) {
               
                setAgents(prev => [...prev, { id: data.agent_id, ...agentForm }]);
                setAgentForm({ name: "", email: "", phone: "", status: "Active" });
            } else { console.log(data.message || "Failed to add agent"); }
        } catch (err) { console.log("Server error: " + err.message); }
    };

    const handleEditAgent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:4000/api/admin/agents/${agentForm.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(agentForm),
            });
            const data = await response.json();
            if (data.success) {
                console.log("Agent updated successfully!");
                setAgents(prev => prev.map(a => (a.id === agentForm.id ? { ...a, ...agentForm } : a)));
            } else { console.log(data.message || "Failed to update agent"); }
        } catch (error) { console.log("Server error: " + error.message); }
    };

    const handleDeleteAgent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this agent?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:4000/api/admin/agents/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                console.log("Agent deleted successfully!");
                setAgents(prev => prev.filter(a => a.id !== id));
            } else { console.log(data.message || "Failed to delete agent"); }
        } catch (error) { console.log("Server error: " + error.message); }
    };

    const uploadLeads = async () => {
    if (!selectedFile) {
        console.log("Please select a file first");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("source", leadSource);       
        formData.append("agent_name", selectedAgent);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,  },
            }
        );

        console.log(res.data);

        console.log("Leads Uploaded Successfully!");
        setSelectedFile(null);

    } catch (err) {
        console.error(err);
        console.log("Error uploading leads");
    }
};

    const handleFileSelect = (event) => { if (event.target.files[0]) setSelectedFile(event.target.files[0]); };
    const handleFileDrop = (event) => { event.preventDefault(); if (event.dataTransfer.files.length > 0) setSelectedFile(event.dataTransfer.files[0]); };
    const handleDragOver = (event) => { event.preventDefault(); };
    const handleDragLeave = (event) => { event.preventDefault(); };

    const getStatusBadge = (status) => {
        if (status === 'active' || status === 'completed') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">{status}</span>;
        } else {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">{status === 'inactive' ? 'Inactive' : 'Failed'}</span>;
        }
    };

    if (!currentUser) return <div className="flex h-screen items-center justify-center text-xl text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <AdminHeader 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                currentUser={currentUser} 
            />

            <main className="container mx-auto px-4 py-8 flex-1 w-full max-w-7xl">
                {currentPage === 'dashboard' && <DashboardOverview getStatusBadge={getStatusBadge} />}
                {currentPage === 'agents' && (
                    <AgentManagement 
                        agents={agents}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        agentForm={agentForm}
                        setAgentForm={setAgentForm}
                        handleAddAgent={handleAddAgent}
                        handleEditAgent={handleEditAgent}
                        handleDeleteAgent={handleDeleteAgent}
                        getStatusBadge={getStatusBadge}
                    />
                )}
                {currentPage === 'leads-upload' && (
                    <LeadsUpload 
    selectedFile={selectedFile}
    setSelectedFile={setSelectedFile}
    handleFileDrop={handleFileDrop}
    handleDragOver={handleDragOver}
    handleDragLeave={handleDragLeave}
    handleFileSelect={handleFileSelect}
    agentList={agents}
    uploadLeads={uploadLeads}
    uploadHistory={uploadHistory}
    getStatusBadge={getStatusBadge}
    handleViewFile={(upload) => { setFilePreview(upload); setShowPreviewModal(true); }}

    selectedAgent={selectedAgent}
    setSelectedAgent={setSelectedAgent}
    leadSource={leadSource}
    setLeadSource={setLeadSource}
/>
                )}
                {currentPage === 'reports' && (
                    <AdminReports activeTab={activeTab} setActiveTab={setActiveTab} />
                )}
            </main>

            {showPreviewModal && filePreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">File Preview: {filePreview.fileName}</h3>
                            <button onClick={() => { setShowPreviewModal(false); setFilePreview(null); }} className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm text-gray-500 block">Date</span>
                                <span className="font-semibold">{filePreview.date}</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm text-gray-500 block">Records</span>
                                <span className="font-semibold">{filePreview.records}</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm text-gray-500 block">Status</span>
                                <span>{getStatusBadge(filePreview.status)}</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">File Content:</h4>
                            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
                                {filePreview.fileContent || 'No content available'}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={() => { setShowPreviewModal(false); setFilePreview(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;