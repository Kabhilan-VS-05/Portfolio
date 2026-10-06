"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function ExperienceEditor() {
  return (
    <GenericListEditor
      title="Experience"
      listKey="experiences"
      fields={[
        { name: 'position', label: 'Position', type: 'text' },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'text' },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'description', label: 'Description (Bullet points, one per line)', type: 'array' },
        { name: 'techStack', label: 'Tech Stack (one per line)', type: 'array' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg">{item.position} <span className="text-zinc-400 font-normal">at {item.company}</span></h3>
          <p className="text-sm text-zinc-500">{item.startDate} - {item.endDate}</p>
          {item.description && item.description.length > 0 && (
            <ul className="list-disc list-inside mt-2 text-sm text-zinc-400">
              {item.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
            </ul>
          )}
        </div>
      )}
    />
  );
}
