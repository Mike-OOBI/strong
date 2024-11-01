import React from 'react';
import { Database } from 'lucide-react';

export const Header = () => (
  <div className="flex-shrink-0 flex items-center">
    <Database className="h-8 w-8 text-blue-600" />
    <span className="ml-2 text-xl font-bold text-gray-900">Strong-TIBA Middleware</span>
  </div>
);