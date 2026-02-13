'use client';

import { LearningPath } from '@/data/mockData';
import { Clock, Target, Users, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { cn, formatDuration, getDifficultyColor } from '@/utils/helpers';

interface LearningPathCardProps {
  path: LearningPath;
  isRecommended?: boolean;
}

export default function LearningPathCard({ path, isRecommended }: LearningPathCardProps) {
  const completedModules = path.modules.filter(m => m.completed).length;
  const totalModules = path.modules.length;
  const progress = (completedModules / totalModules) * 100;

  return (
    <div className={cn(
      'card card-hover relative overflow-hidden',
      isRecommended && 'ring-2 ring-primary-500 ring-offset-2'
    )}>
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          Recommended
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={cn('inline-block px-2 py-0.5 rounded text-xs font-medium mb-2', getDifficultyColor(path.difficulty))}>
            {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
          </span>
          <h3 className="font-semibold text-gray-900">{path.title}</h3>
        </div>
        <span className="text-sm text-gray-500">{path.subject}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{path.description}</p>
      
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(path.estimatedHours * 60)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Target className="w-4 h-4" />
          <span>{totalModules} modules</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{path.completionRate}% completion rate</span>
        </div>
      </div>
      
      {/* Progress bar */}
      {progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Your progress</span>
            <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Module preview */}
      <div className="space-y-2 mb-4">
        {path.modules.slice(0, 3).map((module, idx) => (
          <div 
            key={module.id} 
            className={cn(
              'flex items-center gap-2 text-sm p-2 rounded-lg',
              module.completed ? 'bg-success-50' : module.locked ? 'bg-gray-50 opacity-60' : 'bg-gray-50'
            )}
          >
            {module.completed ? (
              <CheckCircle2 className="w-4 h-4 text-success-500" />
            ) : module.locked ? (
              <Lock className="w-4 h-4 text-gray-400" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span className={cn(
              'flex-1',
              module.completed ? 'text-success-700 line-through' : 'text-gray-700'
            )}>
              {module.title}
            </span>
            <span className="text-xs text-gray-400">{formatDuration(module.duration)}</span>
          </div>
        ))}
        {path.modules.length > 3 && (
          <p className="text-xs text-gray-500 pl-2">+{path.modules.length - 3} more modules</p>
        )}
      </div>
      
      {/* Recommended for */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Recommended for:</p>
        <div className="flex flex-wrap gap-1">
          {path.recommendedFor.map((rec, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {rec}
            </span>
          ))}
        </div>
      </div>
      
      {/* Action button */}
      <button className="w-full btn-primary flex items-center justify-center gap-2">
        {progress > 0 ? 'Continue Learning' : 'Start Path'}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
