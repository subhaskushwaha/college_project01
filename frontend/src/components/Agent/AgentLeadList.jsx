import React from 'react';

const AgentLeadList = ({
    leadFilter,
    setLeadFilter,
    searchTerm,
    setSearchTerm,
    filteredLeads,
    getStatusBadge,
    openLeadDetail
}) => {
    return (
        <div className="space-y-6 mt-24" >
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Leads</h1>
                    <p className="text-gray-500 mt-1">Manage and update your assigned leads</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add New Lead
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4 w-full">
                <div className="w-full md:w-1/3">
                    <label htmlFor="lead-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                    <select 
                        id="lead-filter" 
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={leadFilter}
                        onChange={(e) => setLeadFilter(e.target.value)}
                    >
                        <option value="all">All Leads</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                    </select>
                </div>
                <div className="w-full md:w-1/3">
                    <label htmlFor="search-leads" className="block text-sm font-medium text-gray-700 mb-1">Search Leads</label>
                    <input 
                        type="text" 
                        id="search-leads" 
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Search by name or company"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/3 flex items-end">
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium transition-colors w-full flex items-center justify-center">
                        <i className="fas fa-filter mr-2"></i> Apply Filters
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLeads.map(lead => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastContact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button 
                                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-900 px-3 py-1 rounded-md text-sm transition-colors" 
                                            onClick={() => openLeadDetail(lead.id)}
                                        >
                                            <i className="fas fa-eye"></i> View
                                        </button>
                                        <button className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-900 px-3 py-1 rounded-md text-sm transition-colors">
                                            <i className="fas fa-phone"></i> Call
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                                        No leads found matching your search.
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

export default AgentLeadList;