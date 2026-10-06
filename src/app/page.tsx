"use client";

import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Trophy, Award, Layout, Users, Star } from 'lucide-react';

// We'll create these components next
import PersonalInfoEditor from '@/components/editor/PersonalInfoEditor';
import ProjectsEditor from '@/components/editor/ProjectsEditor';
import ExperienceEditor from '@/components/editor/ExperienceEditor';
import EducationEditor from '@/components/editor/EducationEditor';
import SkillsEditor from '@/components/editor/SkillsEditor';
import AchievementsEditor from '@/components/editor/AchievementsEditor';
import CertificationsEditor from '@/components/editor/CertificationsEditor';
import LeadershipEditor from '@/components/editor/LeadershipEditor';
import HackathonsEditor from '@/components/editor/HackathonsEditor';

export default function ResumeOSDashboard() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'projects', icon: Layout, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Technical Skills' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'achievements', icon: Trophy, label: 'Achievements' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'leadership', icon: Users, label: 'Leadership' },
    { id: 'hackathons', icon: Star, label: 'Hackathons' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-200">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Layout className="text-indigo-500" /> ResumeOS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Master Profile Studio</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-400' : ''} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Manage your master CV data</p>
          </header>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            {activeTab === 'personal' && <PersonalInfoEditor />}
            {activeTab === 'projects' && <ProjectsEditor />}
            {activeTab === 'skills' && <SkillsEditor />}
            {activeTab === 'experience' && <ExperienceEditor />}
            {activeTab === 'education' && <EducationEditor />}
            {activeTab === 'achievements' && <AchievementsEditor />}
            {activeTab === 'certifications' && <CertificationsEditor />}
            {activeTab === 'leadership' && <LeadershipEditor />}
            {activeTab === 'hackathons' && <HackathonsEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}
