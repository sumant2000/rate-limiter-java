'use client';

import { useState } from 'react';

interface RateLimitConfigProps {
  config: {
    maxRequests: number;
    timeWindow: number;
    algorithm: string;
  };
  onUpdate: (config: any) => void;
  clientId: string;
  onClientIdChange: (clientId: string) => void;
}

export default function RateLimitConfig({ config, onUpdate, clientId, onClientIdChange }: RateLimitConfigProps) {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(localConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Client ID</label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => onClientIdChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Requests</label>
        <input
          type="number"
          value={localConfig.maxRequests}
          onChange={(e) => setLocalConfig({ ...localConfig, maxRequests: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time Window (seconds)</label>
        <input
          type="number"
          value={localConfig.timeWindow}
          onChange={(e) => setLocalConfig({ ...localConfig, timeWindow: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Algorithm</label>
        <select
          value={localConfig.algorithm}
          onChange={(e) => setLocalConfig({ ...localConfig, algorithm: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="TOKEN_BUCKET">Token Bucket</option>
          <option value="SLIDING_WINDOW">Sliding Window</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Configuration
      </button>
    </form>
  );
} 