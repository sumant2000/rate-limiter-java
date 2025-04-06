'use client';

import { useState, useEffect } from 'react';
import RateLimitConfig from './components/RateLimitConfig';
import RateLimitStats from './components/RateLimitStats';

export default function Home() {
  const [clientId, setClientId] = useState('');
  const [config, setConfig] = useState({
    maxRequests: 10,
    timeWindow: 60,
    algorithm: 'TOKEN_BUCKET'
  });
  const [stats, setStats] = useState({
    allowed: 0,
    denied: 0,
    currentRate: 0
  });

  useEffect(() => {
    // Fetch initial stats
    fetchStats();
    // Set up polling for stats
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/rate-limit/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleConfigUpdate = async (newConfig: any) => {
    try {
      const response = await fetch('http://localhost:8080/api/rate-limit/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          ...newConfig
        }),
      });
      if (response.ok) {
        setConfig(newConfig);
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Rate Limiter Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <RateLimitConfig
            config={config}
            onUpdate={handleConfigUpdate}
            clientId={clientId}
            onClientIdChange={setClientId}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <RateLimitStats stats={stats} />
        </div>
      </div>
    </main>
  );
} 