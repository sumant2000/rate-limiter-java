'use client';

interface RateLimitStatsProps {
  stats: {
    allowed: number;
    denied: number;
    currentRate: number;
  };
}

export default function RateLimitStats({ stats }: RateLimitStatsProps) {
  const totalRequests = stats.allowed + stats.denied;
  const successRate = totalRequests > 0 ? (stats.allowed / totalRequests) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Allowed Requests</h3>
          <p className="text-2xl font-semibold text-green-600">{stats.allowed}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Denied Requests</h3>
          <p className="text-2xl font-semibold text-red-600">{stats.denied}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800">Current Rate (req/s)</h3>
        <p className="text-2xl font-semibold text-blue-600">{stats.currentRate.toFixed(2)}</p>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-purple-800">Success Rate</h3>
        <p className="text-2xl font-semibold text-purple-600">{successRate.toFixed(1)}%</p>
      </div>
    </div>
  );
} 