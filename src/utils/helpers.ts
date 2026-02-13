export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function getSkillLevelColor(level: string): string {
  switch (level) {
    case 'mastered':
      return 'bg-success-500';
    case 'progress':
      return 'bg-warning-500';
    case 'starting':
      return 'bg-gray-300';
    default:
      return 'bg-gray-300';
  }
}

export function getSkillLevelBadgeClass(level: string): string {
  switch (level) {
    case 'mastered':
      return 'skill-badge-mastered';
    case 'progress':
      return 'skill-badge-progress';
    case 'starting':
      return 'skill-badge-starting';
    default:
      return 'skill-badge-starting';
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return '↗️';
    case 'down':
      return '↘️';
    case 'stable':
      return '→';
    default:
      return '→';
  }
}

export function getInsightIcon(type: 'positive' | 'concern' | 'suggestion'): string {
  switch (type) {
    case 'positive':
      return '✅';
    case 'concern':
      return '⚠️';
    case 'suggestion':
      return '💡';
    default:
      return '💡';
  }
}

export function calculateCircleProgress(percentage: number, radius: number = 50): { 
  circumference: number; 
  strokeDashoffset: number;
} {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return { circumference, strokeDashoffset };
}

export function getActivityIcon(type: string): string {
  switch (type) {
    case 'completed_module':
      return '✓';
    case 'earned_badge':
      return '🏆';
    case 'improved_score':
      return '📈';
    case 'started_path':
      return '🚀';
    default:
      return '•';
  }
}

export function getActivityColor(type: string): string {
  switch (type) {
    case 'completed_module':
      return 'bg-success-100 text-success-600';
    case 'earned_badge':
      return 'bg-warning-100 text-warning-600';
    case 'improved_score':
      return 'bg-primary-100 text-primary-600';
    case 'started_path':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-success-100 text-success-700';
    case 'intermediate':
      return 'bg-warning-100 text-warning-700';
    case 'advanced':
      return 'bg-danger-100 text-danger-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getModuleTypeIcon(type: string): string {
  switch (type) {
    case 'video':
      return '▶️';
    case 'quiz':
      return '❓';
    case 'practice':
      return '✏️';
    case 'project':
      return '📁';
    default:
      return '📄';
  }
}
