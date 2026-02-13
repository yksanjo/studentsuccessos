'use client';

import { useState } from 'react';
import { mockStudent, mockParentInsights, mockWeeklyData } from '@/data/mockData';
import { BookOpen, Target, TrendingUp, Clock, Award, ChevronRight } from 'lucide-react';
import ProgressRing from './ProgressRing';
import SubjectCard from './SubjectCard';
import SkillMasteryChart from './SkillMasteryChart';
import LearningPathCard from './LearningPathCard';
import ActivityFeed from './ActivityFeed';
import WeeklyChart from './WeeklyChart';
import ProgressTrendChart from './ProgressTrendChart';
import StreakCard from './StreakCard';
import ParentInsightCard from './ParentInsightCard';

export default function StudentDashboard() {
  const [selectedSubject, setSelectedSubject] = useState(mockStudent.subjects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'paths' | 'parent'>('overview');

  const student = mockStudent;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">StudentSuccessOS</h1>
                <p className="text-xs text-gray-500">Learning Progress Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success-50 text-success-700 rounded-full text-sm">
                <Award className="w-4 h-4" />
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">Grade {student.grade}</p>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                  {student.avatar}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation tabs */}
          <div className="flex gap-6 border-t border-gray-100">
            {[
              { id: 'overview', label: 'Overview', icon: Target },
              { id: 'paths', label: 'Learning Paths', icon: BookOpen },
              { id: 'parent', label: 'Family View', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card flex items-center gap-4">
                <ProgressRing percentage={student.overallProgress} size={80} strokeWidth={8}>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{student.overallProgress}%</p>
                    <p className="text-xs text-gray-500">Overall</p>
                  </div>
                </ProgressRing>
                <div>
                  <p className="text-sm text-gray-500">Total Progress</p>
                  <p className="text-lg font-semibold text-gray-900">Across all subjects</p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Study Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{student.studyStreak} days</p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Skills Mastered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {student.subjects.reduce((acc, s) => acc + s.skills.filter(sk => sk.level === 'mastered').length, 0)}
                  </p>
                </div>
              </div>
              
              <div className="card flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{student.weeklyCompletedHours}h</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Subjects column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Subject selector */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Subjects</h2>
                  <div className="space-y-3">
                    {student.subjects.map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        isSelected={selectedSubject?.id === subject.id}
                        onClick={() => setSelectedSubject(subject)}
                      />
                    ))}
                  </div>
                </div>

                {/* Skill mastery */}
                {selectedSubject && (
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Skill Mastery: {selectedSubject.name}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {selectedSubject.skills.filter(s => s.level === 'mastered').length} of {selectedSubject.skills.length} mastered
                      </span>
                    </div>
                    <SkillMasteryChart 
                      skills={selectedSubject.skills} 
                      subjectColor={selectedSubject.color} 
                    />
                  </div>
                )}

                {/* Weekly activity */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h2>
                  <WeeklyChart />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Progress over time */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h2>
                  <ProgressTrendChart />
                </div>

                {/* Streak card */}
                <StreakCard 
                  streakDays={student.studyStreak}
                  weeklyGoalHours={student.weeklyGoalHours}
                  weeklyCompletedHours={student.weeklyCompletedHours}
                />

                {/* Recent activity */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View all
                    </button>
                  </div>
                  <ActivityFeed activities={student.recentActivity} limit={4} />
                </div>

                {/* Strengths & areas for improvement */}
                <div className="card">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Strengths</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {student.strengths.map((strength, idx) => (
                      <span key={idx} className="skill-badge-mastered">
                        ✓ {strength}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Focus Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {student.areasForImprovement.map((area, idx) => (
                      <span key={idx} className="skill-badge-starting">
                        📈 {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
                <p className="text-gray-600">Structured learning journeys tailored to your goals</p>
              </div>
              <button className="btn-primary">
                Browse All Paths
              </button>
            </div>

            {/* Active paths */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">In Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.learningPaths
                  .filter(p => p.completionRate > 0 && p.completionRate < 100)
                  .map(path => (
                    <LearningPathCard key={path.id} path={path} />
                  ))}
              </div>
            </div>

            {/* Recommended paths */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.learningPaths
                  .filter(p => p.completionRate === 0)
                  .map(path => (
                    <LearningPathCard key={path.id} path={path} isRecommended />
                  ))}
              </div>
            </div>

            {/* Completed paths */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.learningPaths
                  .filter(p => p.completionRate === 100)
                  .map(path => (
                    <LearningPathCard key={path.id} path={path} />
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parent' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Parent Dashboard</h2>
              <p className="text-primary-100">
                Monitor {student.name}'s progress, receive insights, and support their learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Insights column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
                  <div className="space-y-4">
                    {mockParentInsights.map(insight => (
                      <ParentInsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                </div>

                {/* Detailed progress */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress Details</h3>
                  <div className="space-y-4">
                    {student.subjects.map(subject => (
                      <div key={subject.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: subject.color }}
                        >
                          {subject.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{subject.name}</span>
                            <span className="text-sm text-gray-600">{subject.overallProgress}% complete</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ width: `${subject.overallProgress}%`, backgroundColor: subject.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary sidebar */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Summary</h3>
                  <WeeklyChart />
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <ActivityFeed activities={student.recentActivity} limit={5} />
                </div>

                <div className="card bg-primary-50 border-primary-200">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">Family Plan</h3>
                  <p className="text-sm text-primary-700 mb-4">
                    You're on the Premium Family Plan. Upgrade for district-level features.
                  </p>
                  <button className="w-full btn-primary text-sm">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
