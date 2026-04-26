import React, { useState } from 'react';

const AgentManagement = ({
    agents,
    searchTerm,
    setSearchTerm,
    agentForm,
    setAgentForm,
    handleAddAgent,
    handleEditAgent,
    handleDeleteAgent,
    getStatusBadge
}) => {
    const [open, setOpen] = useState(false);

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 mt-24" >
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Agent Management</h1>
                <p className="text-gray-500">Manage agent accounts and permissions</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="w-full md:w-1/2">
                    <label htmlFor="search-agent" className="block text-sm font-medium text-gray-700 mb-1">Search Agents</label>
                    <input
                        type="text"
                        id="search-agent"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                        onClick={() => {
                            setAgentForm({
                                name: "",
                                email: "",
                                phone: "",
                                status: "active",
                            });
                            setOpen(true);
                        }}
                    >
                        Add New Agent
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4">{agentForm.id ? 'Edit Agent' : 'Add New Agent'}</h3>
                        <form 
                            className="flex flex-col gap-4" 
                            onSubmit={(e) => {
                                if(agentForm.id) {
                                    handleEditAgent(e);
                                } else {
                                    handleAddAgent(e);
                                }
                                setOpen(false);
                            }}
                        >
                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={agentForm.name}
                                onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })} 
                                required
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={agentForm.email}
                                onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })} 
                                required
                            />
                            <input 
                                type="text" 
                                placeholder="Phone" 
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={agentForm.phone}
                                onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })} 
                                required
                            />
                            <select 
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={agentForm.status}
                                onChange={(e) => setAgentForm({ ...agentForm, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <div className="flex gap-4 mt-2">
                                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                                    Save
                                </button>
                                <button 
                                    type="button" 
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors" 
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Leads</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAgents.map(agent => (
                                <tr key={agent.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.activeLeads || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(agent.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button 
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md" 
                                            onClick={() => {
                                                setAgentForm(agent);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md" 
                                            onClick={() => handleDeleteAgent(agent.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredAgents.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No agents found.
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

export default AgentManagement;
