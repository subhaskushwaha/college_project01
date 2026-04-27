import React from 'react';

const AgentLeadDetail = ({
    selectedLead,
    closeModal,
    saveLeadChanges,
    callLogs,
    addCallLog
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
                
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Lead Details</h2>
                    <button 
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors" 
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column - Lead Info Form */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    id="lead-name" 
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    defaultValue={selectedLead?.name || ''}
                                />
                            </div>
                            <div>
                                <label htmlFor="lead-company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input 
                                    type="text" 
                                    id="lead-company" 
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    defaultValue={selectedLead?.company || ''}
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    id="lead-email" 
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    defaultValue={selectedLead?.email || ''}
                                />
                            </div>
                            <div>
                                <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input 
                                    type="text" 
                                    id="lead-phone" 
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    defaultValue={selectedLead?.phone || ''}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="lead-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select 
                                id="lead-status" 
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                defaultValue={selectedLead?.status || 'new'}
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="qualified">Qualified</option>
                                <option value="converted">Converted</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="lead-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea 
                                id="lead-notes" 
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                rows="4" 
                                placeholder="Add notes about this lead..."
                                defaultValue="Customer expressed interest in our premium package. Asked for more details about implementation timeline."
                            ></textarea>
                        </div>
                    </div>

                    {/* Right Column - Call History */}
                    <div className="border-l border-gray-200 pl-0 md:pl-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Call History</h3>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {callLogs.map((log, index) => (
                                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                                            <span className="font-medium text-gray-700">{log.date}</span>
                                            <span><i className="far fa-clock"></i> {log.duration}</span>
                                        </div>
                                        <div className="text-sm text-gray-800">
                                            {log.notes}
                                        </div>
                                    </div>
                                ))}
                                {callLogs.length === 0 && (
                                    <p className="text-gray-500 italic">No previous calls logged.</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                            <h4 className="font-semibold text-blue-900 mb-3">Add Call Log</h4>
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="call-duration" className="block text-sm font-medium text-blue-800 mb-1">Call Duration (minutes)</label>
                                    <input 
                                        type="number" 
                                        id="call-duration" 
                                        className="w-full border border-blue-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                                        min="1" 
                                        defaultValue="10" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="call-notes" className="block text-sm font-medium text-blue-800 mb-1">Call Notes</label>
                                    <textarea 
                                        id="call-notes" 
                                        className="w-full border border-blue-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                                        rows="3" 
                                        placeholder="Enter call notes..."
                                    ></textarea>
                                </div>
                                <button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center space-x-2" 
                                    onClick={addCallLog}
                                >
                                    <i className="fas fa-plus"></i> <span>Add Call Log</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end space-x-4 rounded-b-lg">
                    <button 
                        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors" 
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md shadow-sm flex items-center space-x-2 transition-colors" 
                        onClick={saveLeadChanges}
                    >
                        <i className="fas fa-save"></i> <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentLeadDetail;
