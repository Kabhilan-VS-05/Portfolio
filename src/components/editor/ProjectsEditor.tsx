"use client";
import React, { useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { ResumeProject } from '@/types/resume';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function ProjectsEditor() {
  const { profileData, addProject, updateProject, deleteProject } = useProfile();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ResumeProject>>({});

  const handleSaveNew = () => {
    if (formData.name) {
      addProject({
        name: formData.name,
        context: formData.context || '',
        description: formData.description || [],
        techStack: formData.techStack || [],
        visible: true
      });
      setFormData({});
    }
  };

  const handleUpdate = (id: string) => {
    updateProject(id, formData);
    setEditingId(null);
    setFormData({});
  };

  const startEdit = (proj: ResumeProject) => {
    setEditingId(proj.id);
    setFormData(proj);
  };

  return (
    <div className="space-y-6">
      {profileData.projects.map(proj => (
        <div key={proj.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
          {editingId === proj.id ? (
            <div className="space-y-4">
              <input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Project Name" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <input value={formData.context || ''} onChange={e => setFormData({...formData, context: e.target.value})} placeholder="Context (e.g. STATATHON Finale)" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <textarea value={(formData.description || []).join('\n')} onChange={e => setFormData({...formData, description: e.target.value.split('\n')})} placeholder="Description (one bullet per line)" rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <input value={(formData.techStack || []).join(', ')} onChange={e => setFormData({...formData, techStack: e.target.value.split(',').map(s=>s.trim())})} placeholder="Tech Stack (comma separated)" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <div className="flex gap-2">
                <button onClick={() => handleUpdate(proj.id)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors"><Check size={16}/> Save</button>
                <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg flex items-center gap-2 transition-colors"><X size={16}/> Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{proj.name} {proj.context && <span className="text-sm text-zinc-400 font-normal">({proj.context})</span>}</h3>
                {proj.description && proj.description.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-sm text-zinc-400 space-y-1">
                    {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                  </ul>
                )}
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="mt-3 text-xs text-indigo-400 bg-indigo-500/10 inline-block px-2 py-1 rounded">
                    Tech Stack: {proj.techStack.join(', ')}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(proj)} className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 transition-colors"><Edit2 size={16}/></button>
                <button onClick={() => deleteProject(proj.id)} className="p-2 hover:bg-red-900/30 text-red-500 rounded-md transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
          )}
        </div>
      ))}

      {!editingId && (
        <div className="border border-dashed border-zinc-700 rounded-lg p-5">
          <h4 className="font-medium text-white mb-4">Add New Project</h4>
          <div className="space-y-4">
              <input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Project Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <input value={formData.context || ''} onChange={e => setFormData({...formData, context: e.target.value})} placeholder="Context (e.g. STATATHON Finale)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <textarea value={(formData.description || []).join('\n')} onChange={e => setFormData({...formData, description: e.target.value.split('\n')})} placeholder="Description (one bullet per line)" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <input value={(formData.techStack || []).join(', ')} onChange={e => setFormData({...formData, techStack: e.target.value.split(',').map(s=>s.trim())})} placeholder="Tech Stack (comma separated)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100" />
              <button onClick={handleSaveNew} className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"><Plus size={16}/> Add Project</button>
          </div>
        </div>
      )}
    </div>
  );
}
