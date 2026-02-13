'use client';

import { mockWeeklyData } from '@/data/mockData';

export default function WeeklyChart() {
  const maxHours = Math.max(...mockWeeklyData.map(d => d.hours));
  const totalHours = mockWeeklyData.reduce((sum, d) => sum + d.hours, 0);

  return (
    <div>
      <div className="flex items-end justify-between h-32 gap-2">
        {mockWeeklyData.map((day, idx) => {
          const heightPercent = maxHours > 0 ? (day.hours / maxHours) * 100 : 0;
          const isToday = idx === new Date().getDay() - 1;
          
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative group">
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {day.hours} hrs
                </div>
                {/* Bar */}
                <div
                  className={cn(
                    'w-full rounded-t transition-all duration-500',
                    isToday ? 'bg-primary-500' : 'bg-primary-300 hover:bg-primary-400'
                  )}
                  style={{ height: `${Math.max(heightPercent, 4)}%` }}
                />
              </div>
              <span className={cn(
                'text-xs',
                isToday ? 'font-semibold text-primary-600' : 'text-gray-500'
              )}>
                {day.day}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="text-gray-600">This week: <strong className="text-gray-900">{totalHours} hours</strong></span>
        <span className="text-gray-500">Goal: 10 hours</span>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
