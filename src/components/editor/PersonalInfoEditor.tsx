"use client";
import React from 'react';
import { useProfile } from '@/context/ProfileContext';

export default function PersonalInfoEditor() {
  const { profileData, updatePersonalInfo } = useProfile();
  const info = profileData.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const handleArrayChange = (name: 'areasOfInterest' | 'languages', value: string) => {
    updatePersonalInfo({ [name]: value.split(',').map(s => s.trim()) });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
          <input name="fullName" value={info.fullName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Professional Title</label>
          <input name="title" value={info.title} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
          <input name="email" value={info.email} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Phone</label>
          <input name="phone" value={info.phone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Location</label>
          <input name="location" value={info.location} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">LinkedIn URL</label>
          <input name="linkedin" value={info.linkedin} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">GitHub URL</label>
          <input name="github" value={info.github} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Professional Summary</label>
        <textarea name="summary" value={info.summary} onChange={handleChange} rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Areas of Interest (Comma separated)</label>
        <input value={info.areasOfInterest.join(', ')} onChange={(e) => handleArrayChange('areasOfInterest', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-2">Languages (Comma separated)</label>
        <input value={info.languages.join(', ')} onChange={(e) => handleArrayChange('languages', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors" />
      </div>
    </div>
  );
}
