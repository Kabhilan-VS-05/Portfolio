"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function LeadershipEditor() {
  return (
    <GenericListEditor
      title="Leadership Role"
      listKey="leadership"
      fields={[
        { name: 'role', label: 'Role & Organization (e.g., Executive Head - Coding Club)', type: 'text' },
        { name: 'responsibilities', label: 'Responsibilities (one per line)', type: 'array' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg text-white">{item.role}</h3>
          {item.responsibilities && item.responsibilities.length > 0 && (
            <ul className="list-disc list-inside mt-2 text-sm text-zinc-400 space-y-1">
              {item.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
            </ul>
          )}
        </div>
      )}
    />
  );
}
