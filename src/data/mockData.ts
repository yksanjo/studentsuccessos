export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'starting' | 'progress' | 'mastered';
  progress: number;
  totalModules: number;
  completedModules: number;
  lastPracticed: string;
  streakDays: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  overallProgress: number;
  skills: Skill[];
  recentScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  modules: PathModule[];
  recommendedFor: string[];
  completionRate: number;
}

export interface PathModule {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'practice' | 'project';
  duration: number;
  completed: boolean;
  locked: boolean;
  skillsCovered: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: number;
  school: string;
  avatar: string;
  overallProgress: number;
  studyStreak: number;
  weeklyGoalHours: number;
  weeklyCompletedHours: number;
  subjects: Subject[];
  learningPaths: LearningPath[];
  recentActivity: Activity[];
  strengths: string[];
  areasForImprovement: string[];
}

export interface Activity {
  id: string;
  type: 'completed_module' | 'earned_badge' | 'improved_score' | 'started_path';
  title: string;
  subject?: string;
  timestamp: string;
  details?: string;
}

export interface ParentInsight {
  id: string;
  type: 'positive' | 'concern' | 'suggestion';
  title: string;
  description: string;
  actionItems?: string[];
  subject?: string;
}

// Mock Student Data
export const mockStudent: Student = {
  id: '1',
  name: 'Emma Chen',
  grade: 8,
  school: 'Lincoln Middle School',
  avatar: 'EC',
  overallProgress: 68,
  studyStreak: 12,
  weeklyGoalHours: 10,
  weeklyCompletedHours: 7.5,
  subjects: [
    {
      id: 'math',
      name: 'Mathematics',
      color: '#3b82f6',
      overallProgress: 75,
      recentScore: 88,
      trend: 'up',
      skills: [
        { id: 'm1', name: 'Linear Equations', category: 'Algebra', level: 'mastered', progress: 100, totalModules: 8, completedModules: 8, lastPracticed: '2026-02-12', streakDays: 5 },
        { id: 'm2', name: 'Quadratic Functions', category: 'Algebra', level: 'progress', progress: 65, totalModules: 10, completedModules: 6.5, lastPracticed: '2026-02-11', streakDays: 3 },
        { id: 'm3', name: 'Geometric Proofs', category: 'Geometry', level: 'progress', progress: 45, totalModules: 12, completedModules: 5.4, lastPracticed: '2026-02-10', streakDays: 2 },
        { id: 'm4', name: 'Probability', category: 'Statistics', level: 'starting', progress: 20, totalModules: 8, completedModules: 1.6, lastPracticed: '2026-02-08', streakDays: 0 },
        { id: 'm5', name: 'Data Analysis', category: 'Statistics', level: 'progress', progress: 55, totalModules: 6, completedModules: 3.3, lastPracticed: '2026-02-12', streakDays: 1 },
      ]
    },
    {
      id: 'science',
      name: 'Science',
      color: '#22c55e',
      overallProgress: 62,
      recentScore: 82,
      trend: 'stable',
      skills: [
        { id: 's1', name: 'Cell Biology', category: 'Biology', level: 'mastered', progress: 100, totalModules: 6, completedModules: 6, lastPracticed: '2026-02-11', streakDays: 4 },
        { id: 's2', name: 'Genetics', category: 'Biology', level: 'progress', progress: 70, totalModules: 8, completedModules: 5.6, lastPracticed: '2026-02-12', streakDays: 2 },
        { id: 's3', name: 'Chemical Reactions', category: 'Chemistry', level: 'progress', progress: 40, totalModules: 10, completedModules: 4, lastPracticed: '2026-02-09', streakDays: 1 },
        { id: 's4', name: 'Newton\'s Laws', category: 'Physics', level: 'starting', progress: 25, totalModules: 8, completedModules: 2, lastPracticed: '2026-02-07', streakDays: 0 },
      ]
    },
    {
      id: 'english',
      name: 'English',
      color: '#f59e0b',
      overallProgress: 80,
      recentScore: 91,
      trend: 'up',
      skills: [
        { id: 'e1', name: 'Essay Writing', category: 'Writing', level: 'mastered', progress: 100, totalModules: 10, completedModules: 10, lastPracticed: '2026-02-12', streakDays: 7 },
        { id: 'e2', name: 'Literary Analysis', category: 'Reading', level: 'mastered', progress: 90, totalModules: 10, completedModules: 9, lastPracticed: '2026-02-11', streakDays: 6 },
        { id: 'e3', name: 'Grammar & Mechanics', category: 'Writing', level: 'mastered', progress: 95, totalModules: 8, completedModules: 7.6, lastPracticed: '2026-02-12', streakDays: 5 },
        { id: 'e4', name: 'Vocabulary', category: 'Reading', level: 'progress', progress: 60, totalModules: 12, completedModules: 7.2, lastPracticed: '2026-02-10', streakDays: 3 },
      ]
    },
    {
      id: 'history',
      name: 'History',
      color: '#8b5cf6',
      overallProgress: 55,
      recentScore: 76,
      trend: 'down',
      skills: [
        { id: 'h1', name: 'Ancient Civilizations', category: 'World History', level: 'progress', progress: 75, totalModules: 8, completedModules: 6, lastPracticed: '2026-02-09', streakDays: 1 },
        { id: 'h2', name: 'World War II', category: 'Modern History', level: 'progress', progress: 50, totalModules: 6, completedModules: 3, lastPracticed: '2026-02-08', streakDays: 0 },
        { id: 'h3', name: 'Primary Source Analysis', category: 'Skills', level: 'starting', progress: 30, totalModules: 10, completedModules: 3, lastPracticed: '2026-02-06', streakDays: 0 },
      ]
    }
  ],
  learningPaths: [
    {
      id: 'p1',
      title: 'Algebra Mastery Path',
      description: 'Complete sequence from linear equations through quadratic functions',
      subject: 'Mathematics',
      difficulty: 'intermediate',
      estimatedHours: 15,
      completionRate: 65,
      recommendedFor: ['Students preparing for high school algebra', 'Those needing extra practice with equations'],
      modules: [
        { id: 'pm1', title: 'Review: Linear Equations', type: 'video', duration: 20, completed: true, locked: false, skillsCovered: ['Linear Equations'] },
        { id: 'pm2', title: 'Practice Problems Set 1', type: 'practice', duration: 30, completed: true, locked: false, skillsCovered: ['Linear Equations'] },
        { id: 'pm3', title: 'Introduction to Quadratics', type: 'video', duration: 25, completed: true, locked: false, skillsCovered: ['Quadratic Functions'] },
        { id: 'pm4', title: 'Graphing Parabolas', type: 'practice', duration: 35, completed: true, locked: false, skillsCovered: ['Quadratic Functions'] },
        { id: 'pm5', title: 'Quadratic Formula Quiz', type: 'quiz', duration: 15, completed: false, locked: false, skillsCovered: ['Quadratic Functions'] },
        { id: 'pm6', title: 'Real-World Applications', type: 'project', duration: 60, completed: false, locked: true, skillsCovered: ['Quadratic Functions'] },
      ]
    },
    {
      id: 'p2',
      title: 'Scientific Writing Fundamentals',
      description: 'Learn to write clear, evidence-based scientific explanations',
      subject: 'Science',
      difficulty: 'beginner',
      estimatedHours: 8,
      completionRate: 30,
      recommendedFor: ['Students improving science communication', 'Preparing for lab reports'],
      modules: [
        { id: 'sm1', title: 'Structure of Scientific Writing', type: 'video', duration: 15, completed: true, locked: false, skillsCovered: ['Scientific Communication'] },
        { id: 'sm2', title: 'Writing Hypotheses', type: 'practice', duration: 20, completed: false, locked: false, skillsCovered: ['Scientific Method'] },
        { id: 'sm3', title: 'Citing Evidence', type: 'video', duration: 18, completed: false, locked: true, skillsCovered: ['Research Skills'] },
      ]
    },
    {
      id: 'p3',
      title: 'Advanced Literary Analysis',
      description: 'Deep dive into themes, symbolism, and critical analysis',
      subject: 'English',
      difficulty: 'advanced',
      estimatedHours: 20,
      completionRate: 0,
      recommendedFor: ['Students excelling in English', 'Preparing for AP Literature'],
      modules: [
        { id: 'em1', title: 'Identifying Themes', type: 'video', duration: 22, completed: false, locked: false, skillsCovered: ['Literary Analysis'] },
        { id: 'em2', title: 'Symbolism Deep Dive', type: 'practice', duration: 40, completed: false, locked: true, skillsCovered: ['Literary Analysis'] },
      ]
    }
  ],
  recentActivity: [
    { id: 'a1', type: 'completed_module', title: 'Completed "Graphing Parabolas"', subject: 'Mathematics', timestamp: '2026-02-12T14:30:00', details: 'Score: 95%' },
    { id: 'a2', type: 'earned_badge', title: 'Earned "Algebra Ace" Badge', subject: 'Mathematics', timestamp: '2026-02-12T14:35:00', details: 'Completed 5 algebra modules with 90%+ scores' },
    { id: 'a3', type: 'improved_score', title: 'Score Improvement in Essay Writing', subject: 'English', timestamp: '2026-02-11T10:15:00', details: 'Improved from 82% to 91%' },
    { id: 'a4', type: 'completed_module', title: 'Completed "Genetics: Punnett Squares"', subject: 'Science', timestamp: '2026-02-11T16:00:00', details: 'Score: 88%' },
    { id: 'a5', type: 'started_path', title: 'Started Scientific Writing Fundamentals', subject: 'Science', timestamp: '2026-02-10T09:00:00' },
  ],
  strengths: ['Essay Writing', 'Linear Equations', 'Grammar & Mechanics'],
  areasForImprovement: ['Probability', 'Primary Source Analysis', 'Newton\'s Laws']
};

// Mock Parent Insights
export const mockParentInsights: ParentInsight[] = [
  {
    id: 'pi1',
    type: 'positive',
    title: 'Strong Writing Progress',
    description: 'Emma has shown exceptional improvement in essay writing, with scores consistently above 90%.',
    subject: 'English'
  },
  {
    id: 'pi2',
    type: 'concern',
    title: 'History Engagement Declining',
    description: 'Activity in History has decreased 40% over the past two weeks. Consider checking in about this subject.',
    actionItems: ['Schedule a conversation about History', 'Review study environment for History', 'Consider tutoring support'],
    subject: 'History'
  },
  {
    id: 'pi3',
    type: 'suggestion',
    title: 'Recommended: Increase Math Practice',
    description: 'Emma is 65% through the Algebra Mastery Path. A focused push could complete this before the midterm.',
    actionItems: ['Encourage 30 min daily math practice', 'Review upcoming path modules', 'Celebrate completion milestone'],
    subject: 'Mathematics'
  }
];

// Mock Weekly Data for Charts
export const mockWeeklyData = [
  { day: 'Mon', hours: 1.5, subjects: { math: 0.5, science: 0.5, english: 0.5, history: 0 } },
  { day: 'Tue', hours: 2.0, subjects: { math: 0.75, science: 0.5, english: 0.75, history: 0 } },
  { day: 'Wed', hours: 1.0, subjects: { math: 0.25, science: 0.25, english: 0.5, history: 0 } },
  { day: 'Thu', hours: 1.5, subjects: { math: 0.5, science: 0.5, english: 0.5, history: 0 } },
  { day: 'Fri', hours: 0.5, subjects: { math: 0, science: 0, english: 0.5, history: 0 } },
  { day: 'Sat', hours: 1.0, subjects: { math: 0.5, science: 0.25, english: 0.25, history: 0 } },
  { day: 'Sun', hours: 0, subjects: { math: 0, science: 0, english: 0, history: 0 } },
];

// Mock Progress Over Time
export const mockProgressOverTime = [
  { week: 'Week 1', math: 45, science: 40, english: 65, history: 35 },
  { week: 'Week 2', math: 52, science: 48, english: 70, history: 42 },
  { week: 'Week 3', math: 60, science: 55, english: 75, history: 48 },
  { week: 'Week 4', math: 68, science: 58, english: 78, history: 52 },
  { week: 'Week 5', math: 72, science: 60, english: 80, history: 55 },
  { week: 'Week 6', math: 75, science: 62, english: 80, history: 55 },
];
