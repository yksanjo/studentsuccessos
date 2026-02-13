'use client';

import { useMemo } from 'react';
import { Student } from '@/data/mockData';
import { createAdaptiveEngine, Recommendation } from '@/utils/adaptiveEngine';
import { Target, BookOpen, RotateCcw, Zap, ChevronRight, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface RecommendationsPanelProps {
  student: Student;
}

export default function RecommendationsPanel({ student }: RecommendationsPanelProps) {
  const engine = useMemo(() => createAdaptiveEngine(student), [student]);
  const recommendations = useMemo(() => engine.generateRecommendations(), [engine]);
  const weeklyPlan = useMemo(() => engine.generateWeeklyPlan(), [engine]);

  const icons = {
    path: BookOpen,
    skill_focus: Target,
    review: RotateCcw,
    challenge: Zap
  };

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-warning-500 bg-warning-50',
    low: 'border-l-primary-500 bg-primary-50'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI-Powered Recommendations</h2>
            <p className="text-sm text-white/80">Personalized learning paths based on your progress</p>
          </div>
        </div>
      </div>

      {/* Priority Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Actions</h3>
          <div className="space-y-4">
            {recommendations.slice(0, 4).map((rec, idx) => {
              const Icon = icons[rec.type];
              return (
                <div 
                  key={idx} 
                  className={cn(
                    'card border-l-4',
                    priorityColors[rec.priority]
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                          rec.priority === 'medium' ? 'bg-warning-100 text-warning-700' :
                          'bg-primary-100 text-primary-700'
                        )}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                      <p className="text-xs text-gray-500 mt-2">💡 {rec.reason}</p>
                      
                      {rec.actionItems.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200/50">
                          <p className="text-xs font-medium text-gray-700 mb-2">Next steps:</p>
                          <ul className="space-y-1">
                            {rec.actionItems.slice(0, 2).map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Plan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Plan</h3>
          <div className="card">
            <div className="space-y-4">
              {weeklyPlan.map((day, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={cn(
                    'w-14 text-center flex-shrink-0',
                    day.day === 'Saturday' || day.day === 'Sunday' ? 'text-gray-400' : 'text-gray-700'
                  )}>
                    <p className="font-semibold text-sm">{day.day.slice(0, 3)}</p>
                    <p className="text-xs text-gray-500">{day.estimatedMinutes}m</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{day.focus}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{day.reason}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn-secondary text-sm">
              Customize Schedule
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="card text-center">
              <p className="text-3xl font-bold text-primary-600">{recommendations.length}</p>
              <p className="text-sm text-gray-600">Active recommendations</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-success-600">
                {Math.round(recommendations.filter(r => r.type === 'skill_focus').length / recommendations.length * 100)}%
              </p>
              <p className="text-sm text-gray-600">Focus on gaps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Pattern Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-primary-50 rounded-xl">
            <p className="text-sm text-primary-600 font-medium mb-1">Optimal Study Time</p>
            <p className="text-2xl font-bold text-primary-900">4-6 PM</p>
            <p className="text-xs text-primary-700 mt-1">Based on your best performance periods</p>
          </div>
          <div className="p-4 bg-success-50 rounded-xl">
            <p className="text-sm text-success-600 font-medium mb-1">Learning Velocity</p>
            <p className="text-2xl font-bold text-success-900">+23%</p>
            <p className="text-xs text-success-700 mt-1">Improvement rate over last 6 weeks</p>
          </div>
          <div className="p-4 bg-warning-50 rounded-xl">
            <p className="text-sm text-warning-600 font-medium mb-1">Attention Needed</p>
            <p className="text-2xl font-bold text-warning-900">3 skills</p>
            <p className="text-xs text-warning-700 mt-1">Below target progress this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
