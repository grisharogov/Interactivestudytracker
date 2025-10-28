import React from 'react';
import { Checkbox } from './ui/checkbox';

interface DayCellProps {
  weekIndex: number;
  dayIndex: number;
  dayName: string;
  checkStates: Record<string, boolean>;
  onCheckChange: (weekIndex: number, dayIndex: number, activityType: string, checked: boolean) => void;
  isDisabled?: boolean;
}

const activities = [
  { key: 'pages', label: 'Pages', emoji: '✅', color: 'bg-blue-500' },
  { key: 'video', label: 'Video', emoji: '🎬', color: 'bg-purple-500' },
  { key: 'activity', label: 'Activity', emoji: '🧩', color: 'bg-orange-500' },
  { key: 'test', label: 'Test', emoji: '🧠', color: 'bg-red-500' },
];

export function DayCell({ weekIndex, dayIndex, dayName, checkStates, onCheckChange, isDisabled }: DayCellProps) {
  return (
    <div className="border-r border-gray-200 p-3 min-w-[100px]">
      <div className="space-y-2">
        {activities.map((activity) => {
          const key = `${weekIndex}-${dayIndex}-${activity.key}`;
          const isChecked = checkStates[key] || false;
          
          return (
            <div
              key={activity.key}
              className={`flex items-center gap-2 p-1.5 rounded transition-colors ${
                isChecked ? activity.color + ' bg-opacity-10' : 'bg-gray-50'
              }`}
            >
              <Checkbox
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={(checked) =>
                  onCheckChange(weekIndex, dayIndex, activity.key, checked as boolean)
                }
                className={isChecked ? activity.color + ' border-none' : ''}
              />
              <span className="text-xs">{activity.emoji}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
