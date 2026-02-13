'use client';

import { Activity } from '@/data/mockData';
import { getActivityIcon, getActivityColor, formatDate, cn } from '@/utils/helpers';

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

export default function ActivityFeed({ activities, limit }: ActivityFeedProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 group">
          {/* Icon */}
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            getActivityColor(activity.type)
          )}>
            <span className="text-lg">{getActivityIcon(activity.type)}</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">{activity.title}</p>
            {activity.details && (
              <p className="text-sm text-gray-600">{activity.details}</p>
            )}
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>{formatDate(activity.timestamp)}</span>
              {activity.subject && (
                <>
                  <span>•</span>
                  <span>{activity.subject}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
