'use client';

import { mockProgressOverTime } from '@/data/mockData';
import { TrendingUp } from 'lucide-react';

export default function ProgressTrendChart() {
  const subjects = ['math', 'science', 'english', 'history'] as const;
  const colors = {
    math: '#3b82f6',
    science: '#22c55e',
    english: '#f59e0b',
    history: '#8b5cf6'
  };
  const labels = {
    math: 'Math',
    science: 'Science',
    english: 'English',
    history: 'History'
  };

  const maxValue = 100;
  const height = 150;
  const padding = 20;
  const chartWidth = 100;
  const chartHeight = height - padding * 2;

  return (
    <div>
      {/* Chart */}
      <svg viewBox={`0 0 ${chartWidth} ${height}`} className="w-full h-40">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <line
            key={tick}
            x1={padding}
            y1={padding + chartHeight * (1 - tick / 100)}
            x2={chartWidth - padding}
            y2={padding + chartHeight * (1 - tick / 100)}
            stroke="#e5e7eb"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        ))}

        {/* Lines for each subject */}
        {subjects.map((subject) => {
          const points = mockProgressOverTime.map((d, i) => {
            const x = padding + (i / (mockProgressOverTime.length - 1)) * (chartWidth - padding * 2);
            const y = padding + chartHeight * (1 - d[subject] / maxValue);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polyline
              key={subject}
              points={points}
              fill="none"
              stroke={colors[subject]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Data points */}
        {subjects.map((subject) =>
          mockProgressOverTime.map((d, i) => {
            const x = padding + (i / (mockProgressOverTime.length - 1)) * (chartWidth - padding * 2);
            const y = padding + chartHeight * (1 - d[subject] / maxValue);
            const isLast = i === mockProgressOverTime.length - 1;
            
            return (
              <circle
                key={`${subject}-${i}`}
                cx={x}
                cy={y}
                r={isLast ? 3 : 2}
                fill={colors[subject]}
                className={isLast ? 'animate-pulse' : ''}
              />
            );
          })
        )}

        {/* Week labels */}
        {mockProgressOverTime.map((d, i) => (
          <text
            key={i}
            x={padding + (i / (mockProgressOverTime.length - 1)) * (chartWidth - padding * 2)}
            y={height - 5}
            textAnchor="middle"
            className="text-[8px] fill-gray-500"
          >
            W{i + 1}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2">
        {subjects.map((subject) => (
          <div key={subject} className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[subject] }}
            />
            <span className="text-xs text-gray-600">{labels[subject]}</span>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="mt-4 p-3 bg-success-50 rounded-lg flex items-start gap-2">
        <TrendingUp className="w-4 h-4 text-success-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-success-800">Overall improvement: +23%</p>
          <p className="text-xs text-success-600">Average progress across all subjects over 6 weeks</p>
        </div>
      </div>
    </div>
  );
}
