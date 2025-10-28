import React from 'react';
import { Progress } from './ui/progress';

interface ProgressSummaryProps {
  stats: {
    pages: number;
    videos: number;
    activities: number;
    tests: number;
  };
}

export function ProgressSummary({ stats }: ProgressSummaryProps) {
  const metrics = [
    { label: 'Pages Completed', value: stats.pages, color: 'bg-blue-500', emoji: '✅' },
    { label: 'Videos Watched', value: stats.videos, color: 'bg-purple-500', emoji: '🎬' },
    { label: 'Activities Done', value: stats.activities, color: 'bg-orange-500', emoji: '🧩' },
    { label: 'Tests Taken', value: stats.tests, color: 'bg-red-500', emoji: '🧠' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="mb-6">Overall Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span>{metric.emoji}</span>
                {metric.label}
              </span>
              <span className="text-sm">{Math.round(metric.value)}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
