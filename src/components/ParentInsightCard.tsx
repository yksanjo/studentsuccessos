'use client';

import { ParentInsight } from '@/data/mockData';
import { CheckCircle2, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface ParentInsightCardProps {
  insight: ParentInsight;
}

export default function ParentInsightCard({ insight }: ParentInsightCardProps) {
  const icons = {
    positive: CheckCircle2,
    concern: AlertCircle,
    suggestion: Lightbulb
  };
  
  const colors = {
    positive: {
      bg: 'bg-success-50',
      border: 'border-success-200',
      icon: 'text-success-600',
      title: 'text-success-800'
    },
    concern: {
      bg: 'bg-warning-50',
      border: 'border-warning-200',
      icon: 'text-warning-600',
      title: 'text-warning-800'
    },
    suggestion: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      icon: 'text-primary-600',
      title: 'text-primary-800'
    }
  };

  const Icon = icons[insight.type];
  const colorTheme = colors[insight.type];

  return (
    <div className={cn('card border-l-4', colorTheme.bg, colorTheme.border)}>
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5', colorTheme.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={cn('font-semibold', colorTheme.title)}>
            {insight.title}
          </h4>
          {insight.subject && (
            <span className="text-xs text-gray-500">{insight.subject}</span>
          )}
          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
          
          {insight.actionItems && insight.actionItems.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-700 mb-2">Suggested actions:</p>
              <ul className="space-y-1.5">
                {insight.actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
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
}
