'use client';

import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreakCardProps {
  streakDays: number;
  weeklyGoalHours: number;
  weeklyCompletedHours: number;
}

export default function StreakCard({ streakDays, weeklyGoalHours, weeklyCompletedHours }: StreakCardProps) {
  const progress = Math.min((weeklyCompletedHours / weeklyGoalHours) * 100, 100);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDays = [true, true, true, true, true, true, false]; // Mock data for current week

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Study Streak</h3>
        <div className="flex items-center gap-1 text-orange-500">
          <Flame className="w-5 h-5" />
          <span className="font-bold">{streakDays}</span>
          <span className="text-sm text-gray-500">days</span>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="flex justify-between mb-4">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              activeDays[idx] 
                ? 'bg-success-500 text-white' 
                : 'bg-gray-100 text-gray-400'
            )}>
              {activeDays[idx] ? '✓' : day}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly goal progress */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning-500" />
            <span className="text-sm text-gray-600">Weekly goal</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {weeklyCompletedHours} / {weeklyGoalHours} hrs
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full rounded-full transition-all duration-500',
              progress >= 100 ? 'bg-success-500' : 'bg-warning-500'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {progress >= 100 
            ? '🎉 Goal reached! Great job this week!' 
            : `${(weeklyGoalHours - weeklyCompletedHours).toFixed(1)} hours remaining to reach your goal`}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">12</p>
          <p className="text-xs text-gray-600">Day streak</p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <p className="text-2xl font-bold text-success-600">8</p>
          <p className="text-xs text-gray-600">Skills mastered</p>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
