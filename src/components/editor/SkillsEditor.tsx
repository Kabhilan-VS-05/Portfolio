"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function SkillsEditor() {
  return (
    <GenericListEditor
      title="Skill Category"
      listKey="skills"
      fields={[
        { name: 'category', label: 'Category (e.g., Programming Languages)', type: 'text' },
        { name: 'skills', label: 'Skills (one per line)', type: 'array' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg">{item.category}</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.skills?.map((skill: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full border border-indigo-500/20">{skill}</span>
            ))}
          </div>
        </div>
      )}
    />
  );
}
