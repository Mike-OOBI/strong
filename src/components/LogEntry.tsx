import React from 'react';

interface LogEntryProps {
  timestamp: string;
  visualId: string;
  action: string;
  status: string;
  credential?: {
    passNo: string;
    passAcct: string;
    first: string;
    last: string;
  };
}

export const LogEntry: React.FC<LogEntryProps> = ({ 
  timestamp, 
  visualId, 
  action, 
  status,
  credential 
}) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{timestamp}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      <div>{visualId}</div>
      {credential && (
        <div className="text-xs text-gray-500">
          {credential.first} {credential.last} - #{credential.passNo}
        </div>
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{action}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);