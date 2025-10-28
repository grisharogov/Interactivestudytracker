import React from 'react';
import { Button } from './ui/button';
import { DayCell } from './DayCell';
import { ProgressRing } from './ProgressRing';
import { CheckCircle2 } from 'lucide-react';

interface WeekRowProps {
  week: {
    weekNumber: number;
    dates: string;
    focus: string;
  };
  weekIndex: number;
  checkStates: Record<string, boolean>;
  onCheckChange: (weekIndex: number, dayIndex: number, activityType: string, checked: boolean) => void;
  onMarkWeekComplete: (weekIndex: number) => void;
  isEven: boolean;
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function WeekRow({ week, weekIndex, checkStates, onCheckChange, onMarkWeekComplete, isEven }: WeekRowProps) {
  // Calculate week completion percentage
  const totalBoxesInWeek = 7 * 4; // 7 days × 4 activities
  let checkedBoxesInWeek = 0;
  
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    ['pages', 'video', 'activity', 'test'].forEach((activityType) => {
      const key = `${weekIndex}-${dayIndex}-${activityType}`;
      if (checkStates[key]) {
        checkedBoxesInWeek++;
      }
    });
  }
  
  const weekPercentage = (checkedBoxesInWeek / totalBoxesInWeek) * 100;

  // Special handling for Week 10 (no Dec 23-24) and Week 11 (only final day)
  const isWeek10 = week.weekNumber === 10;
  const isWeek11 = week.weekNumber === 11;

  return (
    <div className={`${isEven ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200`}>
      <div className="flex items-stretch">
        {/* Week Info */}
        <div className="flex items-center gap-3 p-4 border-r border-gray-200 min-w-[280px]">
          <ProgressRing percentage={weekPercentage} />
          <div className="flex-1">
            <div className="text-sm">Week {week.weekNumber}</div>
            <div className="text-xs text-gray-500">{week.dates}</div>
          </div>
        </div>

        {/* Focus */}
        <div className="flex items-center p-4 border-r border-gray-200 min-w-[200px]">
          <p className="text-xs text-gray-700">{week.focus}</p>
        </div>

        {/* Days */}
        {dayNames.map((dayName, dayIndex) => {
          // Disable Dec 23 (Sat) and Dec 24 (Sun) for Week 10
          const isDisabled = isWeek10 && (dayIndex === 5 || dayIndex === 6);
          
          // Only show Monday for Week 11
          if (isWeek11 && dayIndex > 0) {
            return <div key={dayName} className="border-r border-gray-200 p-3 min-w-[100px] bg-gray-100" />;
          }
          
          return (
            <DayCell
              key={dayName}
              weekIndex={weekIndex}
              dayIndex={dayIndex}
              dayName={dayName}
              checkStates={checkStates}
              onCheckChange={onCheckChange}
              isDisabled={isDisabled}
            />
          );
        })}

        {/* Action Button */}
        <div className="flex items-center p-4 min-w-[160px]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkWeekComplete(weekIndex)}
            className="w-full"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
