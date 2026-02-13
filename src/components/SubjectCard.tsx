'use client';

import { Subject } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface SubjectCardProps {
  subject: Subject;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SubjectCard({ subject, isSelected, onClick }: SubjectCardProps) {
  const TrendIcon = subject.trend === 'up' ? TrendingUp : 
                    subject.trend === 'down' ? TrendingDown : Minus;
  
  const trendColor = subject.trend === 'up' ? 'text-success-500' : 
                     subject.trend === 'down' ? 'text-danger-500' : 'text-gray-400';

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        isSelected 
          ? 'border-primary-500 bg-primary-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: subject.color }}
          >
            {subject.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{subject.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{subject.skills.length} skills</span>
              <span>•</span>
              <span>{subject.overallProgress}% complete</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <TrendIcon className={cn('w-4 h-4', trendColor)} />
              <span className="font-medium text-gray-900">{subject.recentScore}%</span>
            </div>
            <span className="text-xs text-gray-500">Recent score</span>
          </div>
          <ChevronRight className={cn(
            'w-5 h-5 transition-transform',
            isSelected ? 'text-primary-500 rotate-90' : 'text-gray-400'
          )} />
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${subject.overallProgress}%`,
            backgroundColor: subject.color
          }}
        />
      </div>
    </button>
  );
}
