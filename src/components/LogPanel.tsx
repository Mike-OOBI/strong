import React from 'react';
import { LogEntry } from './LogEntry';

export const LogPanel = () => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-6">Transaction Logs</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VisualID/Credential</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <LogEntry 
            timestamp="2024-03-14 15:30:22"
            visualId="50001632230645"
            action="Lookup"
            status="Success"
            credential={{
              passNo: "586733",
              passAcct: "106226968",
              first: "Tester",
              last: "Ticket"
            }}
          />
        </tbody>
      </table>
    </div>
  </div>
);