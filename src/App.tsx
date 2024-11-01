import React, { useState } from 'react';
import { Settings, Activity } from 'lucide-react';
import { Header } from './components/Header';
import { LogPanel } from './components/LogPanel';
import { ConfigPanel } from './components/ConfigPanel';

function App() {
  const [activeTab, setActiveTab] = useState('logs');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Header />
              <div className="ml-6 flex space-x-8">
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'logs'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Logs
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'config'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'logs' ? <LogPanel /> : <ConfigPanel />}
      </main>
    </div>
  );
}

export default App;