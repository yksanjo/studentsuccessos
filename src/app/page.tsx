'use client';

import { useState } from 'react';
import { mockStudent } from '@/data/mockData';
import { 
  LayoutDashboard, 
  Route, 
  Sparkles, 
  Users, 
  Settings,
  Bell,
  Search
} from 'lucide-react';
import StudentDashboard from '@/components/StudentDashboard';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import { cn } from '@/utils/helpers';

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'paths', label: 'Learning Paths', icon: Route },
  { id: 'ai', label: 'AI Recommendations', icon: Sparkles },
  { id: 'family', label: 'Family', icon: Users },
];

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden lg:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
            <div>
              <h1 className="font-bold text-gray-900">StudentSuccess</h1>
              <p className="text-xs text-gray-500">OS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                activeView === item.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="font-semibold text-sm mb-1">Pro Plan</p>
            <p className="text-xs text-white/80 mb-3">Unlock all features</p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm py-2 rounded-lg transition-colors">
              Upgrade
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-gray-900">StudentSuccessOS</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
              {mockStudent.avatar}
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto px-4 pb-2 gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeView === item.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-24 lg:pt-0">
        {/* Top bar */}
        <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills, paths, or topics..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="font-medium text-gray-900">{mockStudent.name}</p>
                <p className="text-xs text-gray-500">Grade {mockStudent.grade}</p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                {mockStudent.avatar}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {activeView === 'dashboard' && <StudentDashboard />}
          {activeView === 'paths' && (
            <div className="text-center py-20">
              <Route className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">Learning Paths</h2>
              <p className="text-gray-600 mt-2">Switch to the Dashboard tab to see your learning paths</p>
            </div>
          )}
          {activeView === 'ai' && <RecommendationsPanel student={mockStudent} />}
          {activeView === 'family' && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900">Family View</h2>
              <p className="text-gray-600 mt-2">Switch to the Dashboard tab and select "Family View"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
