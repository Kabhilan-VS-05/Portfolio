"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function AchievementsEditor() {
  return (
    <GenericListEditor
      title="Achievement"
      listKey="achievements"
      fields={[
        { name: 'title', label: 'Title (e.g., First Prize - KEC Hackathon)', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg text-white">{item.title}</h3>
          <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
        </div>
      )}
    />
  );
}
