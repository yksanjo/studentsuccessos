'use client';

import { Skill } from '@/data/mockData';
import { getSkillLevelBadgeClass, cn } from '@/utils/helpers';

interface SkillMasteryChartProps {
  skills: Skill[];
  subjectColor: string;
}

export default function SkillMasteryChart({ skills, subjectColor }: SkillMasteryChartProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{skill.name}</span>
              <span className={cn('text-xs', getSkillLevelBadgeClass(skill.level))}>
                {skill.level === 'mastered' ? 'Mastered' : skill.level === 'progress' ? 'In Progress' : 'Starting'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {skill.completedModules}/{skill.totalModules} modules
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${skill.progress}%`,
                backgroundColor: skill.level === 'mastered' ? '#22c55e' : 
                                 skill.level === 'progress' ? subjectColor : '#9ca3af'
              }}
            />
          </div>
          
          {/* Skill metadata */}
          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
            <span>Category: {skill.category}</span>
            <div className="flex items-center gap-3">
              {skill.streakDays > 0 && (
                <span className="text-orange-500">🔥 {skill.streakDays} day streak</span>
              )}
              <span>Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
