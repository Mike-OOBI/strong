import React, { useState } from 'react';

export const ConfigPanel = () => {
  const [bypassKinds, setBypassKinds] = useState(['30']);
  const [lookupKinds, setLookupKinds] = useState({
    hasUses: '20',
    noUses: '40',
    additional: [] as string[]
  });

  const handleAddBypassKind = () => {
    setBypassKinds([...bypassKinds, '']);
  };

  const handleAddLookupKind = () => {
    setLookupKinds(prev => ({
      ...prev,
      additional: [...prev.additional, '']
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Configuration</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Strong Parking Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">API URL</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facility</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ACP</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="505" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Operation</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue="10" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Deduplication Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultValue={10} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Bypass Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">VisualIDs (comma-separated)</label>
              <textarea 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                rows={3}
                defaultValue="136,138,139,143,148,149,150,300,400,401,402,405,409,410,419,418,600,601,501,411"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid Until</label>
              <input 
                type="datetime-local" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="2024-12-31T23:59"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Response Kinds</label>
              <div className="space-y-2">
                {bypassKinds.map((kind, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={kind}
                      onChange={(e) => {
                        const newKinds = [...bypassKinds];
                        newKinds[index] = e.target.value;
                        setBypassKinds(newKinds);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Kind value"
                    />
                    {index === 0 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                        Default
                      </span>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddBypassKind}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Kind
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Lookup Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">VisualIDs (comma-separated)</label>
              <textarea 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                rows={2}
                defaultValue="406,407,408,412,413,414,415,500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid Until</label>
              <input 
                type="datetime-local" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="2024-12-31T23:59"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Response Kinds</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Has Uses Available</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupKinds.hasUses}
                      onChange={(e) => setLookupKinds(prev => ({
                        ...prev,
                        hasUses: e.target.value
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Kind value"
                    />
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                      Uses Available
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">No Uses Remaining</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupKinds.noUses}
                      onChange={(e) => setLookupKinds(prev => ({
                        ...prev,
                        noUses: e.target.value
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Kind value"
                    />
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded">
                      No Uses
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Kinds</label>
                  {lookupKinds.additional.map((kind, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={kind}
                        onChange={(e) => {
                          const newAdditional = [...lookupKinds.additional];
                          newAdditional[index] = e.target.value;
                          setLookupKinds(prev => ({
                            ...prev,
                            additional: newAdditional
                          }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Kind value"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleAddLookupKind}
                    className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                  >
                    + Add Kind
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Save Configuration
        </button>
      </div>
    </div>
  );
};