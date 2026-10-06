"use client";
import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { MasterProfileData } from '@/types/resume';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

interface GenericListEditorProps<K extends keyof Omit<MasterProfileData, 'personalInfo'>> {
  listKey: K;
  fields: Field[];
  title: string;
  renderItem: (item: any) => React.ReactNode;
}

export default function GenericListEditor<K extends keyof Omit<MasterProfileData, 'personalInfo'>>({ listKey, fields, title, renderItem }: GenericListEditorProps<K>) {
  const { profileData, updateList } = useProfile();
  const list = profileData[listKey] as any[];
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSaveNew = () => {
    const newId = Math.random().toString(36).substring(7); // simple random ID generator
    const newList = [...list, { ...formData, id: newId, visible: true }];
    updateList(listKey, newList as any);
    setFormData({});
  };

  const handleUpdate = (id: string) => {
    const newList = list.map(item => item.id === id ? { ...item, ...formData } : item);
    updateList(listKey, newList as any);
    setEditingId(null);
    setFormData({});
  };

  const deleteItem = (id: string) => {
    const newList = list.filter(item => item.id !== id);
    updateList(listKey, newList as any);
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const renderField = (field: Field, isEditing: boolean) => {
    const val = formData[field.name];
    const value = field.type === 'array' ? (val || []).join('\n') : (val || '');
    const bgClass = isEditing ? 'bg-zinc-900' : 'bg-zinc-950';

    const handleChange = (e: any) => {
      if (field.type === 'array') {
        setFormData({ ...formData, [field.name]: e.target.value.split('\n') }); // keep empty strings until save maybe
      } else {
        setFormData({ ...formData, [field.name]: e.target.value });
      }
    };

    if (field.type === 'textarea' || field.type === 'array') {
      return <textarea key={field.name} value={value} onChange={handleChange} placeholder={field.placeholder || field.label} rows={3} className={`w-full ${bgClass} border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500`} />
    }
    return <input key={field.name} value={value} onChange={handleChange} placeholder={field.placeholder || field.label} className={`w-full ${bgClass} border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500`} />
  };

  return (
    <div className="space-y-6">
      {list.map((item: any, index: number) => (
        <div key={item.id || `fallback-${index}`} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5">
          {editingId === item.id ? (
            <div className="space-y-4">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">{f.label}</label>
                  {renderField(f, true)}
                </div>
              ))}
              <div className="flex gap-2">
                <button onClick={() => handleUpdate(item.id)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2"><Check size={16}/> Save</button>
                <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg flex items-center gap-2"><X size={16}/> Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div className="flex-1 text-white">
                {renderItem(item)}
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => startEdit(item)} className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 transition-colors"><Edit2 size={16}/></button>
                <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-900/30 text-red-500 rounded-md transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
          )}
        </div>
      ))}

      {!editingId && (
        <div className="border border-dashed border-zinc-700 rounded-lg p-5">
          <h4 className="font-medium text-white mb-4">Add New {title}</h4>
          <div className="space-y-4">
              {fields.map(f => (
                <div key={f.name}>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">{f.label}</label>
                    {renderField(f, false)}
                </div>
              ))}
              <button onClick={handleSaveNew} className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"><Plus size={16}/> Add {title}</button>
          </div>
        </div>
      )}
    </div>
  );
}
