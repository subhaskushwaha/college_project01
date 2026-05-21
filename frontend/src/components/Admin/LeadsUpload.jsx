import React from 'react';

const LeadsUpload = ({
    selectedFile,
    setSelectedFile,
    handleFileDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    agentList,
    uploadLeads,
    uploadHistory,
    getStatusBadge,
    handleViewFile,

    selectedAgent,       // ✅ NEW
    setSelectedAgent,    // ✅ NEW
    leadSource,          // ✅ NEW
    setLeadSource        // ✅ NEW
}) => {
    return (
        <div className="space-y-6 mt-24" >
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Upload Customer Data</h1>
                <p className="text-gray-500">Import customer leads from CSV or Excel files</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div
                    className={`border-2 border-dashed rounded-lg p-10 text-center mb-6 transition-colors ${
                        selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {selectedFile ? (
                        <div className="flex flex-col items-center">
                            <i className="fas fa-file-alt text-5xl text-blue-500 mb-4"></i>
                            <h3 className="text-lg font-semibold text-gray-800">{selectedFile.name}</h3>
                            <p className="text-gray-500">Ready to upload</p>
                            <button
                                className="mt-4 border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors"
                                onClick={() => document.getElementById('leads-file').click()}
                            >
                                Change File
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('leads-file').click()}>
                            <i className="fas fa-cloud-upload-alt text-5xl text-blue-600 mb-4"></i>
                            <h3 className="text-lg font-semibold text-gray-800">Drag & drop your file here</h3>
                            <p className="text-gray-500 mt-2">Supported formats: CSV, XLSX, XLS</p>
                            <input
                                type="file"
                                id="leads-file"
                                accept=".csv,.xlsx,.xls"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
                                Browse Files
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="assign-agent" className="block text-sm font-medium text-gray-700 mb-1">Assign to Agent (optional)</label>
                      <select
  id="assign-agent"
  value={selectedAgent}
  onChange={(e) => setSelectedAgent(e.target.value)}
  className="w-full border border-gray-300 rounded-md px-4 py-2"
>
                            <option value="">-- Select Agent --</option>
                            {agentList.map(agent => (
                                <option key={agent.id} value={agent.id}>
                                    {agent.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="lead-source" className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                       <select
  id="lead-source"
  value={leadSource}
  onChange={(e) => setLeadSource(e.target.value)}
  className="w-full border border-gray-300 rounded-md px-4 py-2"
>
                            <option value="website">Website</option>
                            <option value="referral">Referral</option>
                            <option value="social">Social Media</option>
                            <option value="campaign">Marketing Campaign</option>
                        </select>
                    </div>
                </div>
                
                <button
                    className={`w-full md:w-auto px-6 py-2 rounded-md font-medium text-white transition-colors ${
                        selectedFile ? 'bg-green-600 hover:bg-green-700 shadow-sm' : 'bg-green-300 cursor-not-allowed'
                    }`}
                    onClick={uploadLeads}
                    disabled={!selectedFile}
                >
                    Upload Leads
                </button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Upload History</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {uploadHistory.map((upload, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.createdAt?.slice(0,10)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{upload.customer_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{upload.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(upload.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md"
                                            onClick={() => handleViewFile(upload)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {uploadHistory.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No upload history found.
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

export default LeadsUpload;