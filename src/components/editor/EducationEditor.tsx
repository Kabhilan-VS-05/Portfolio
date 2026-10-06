"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function EducationEditor() {
  return (
    <GenericListEditor
      title="Education"
      listKey="education"
      fields={[
        { name: 'institution', label: 'Institution', type: 'text' },
        { name: 'degree', label: 'Degree', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'text' },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'details', label: 'Details (e.g. CGPA/Percentage, one per line)', type: 'array' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg">{item.institution}</h3>
          <p className="text-zinc-300">{item.degree}</p>
          <p className="text-sm text-zinc-500">{item.startDate} - {item.endDate}</p>
          {item.details && item.details.length > 0 && (
            <div className="mt-2 text-sm text-zinc-400 space-y-1">
              {item.details.map((d: string, i: number) => <div key={i}>{d}</div>)}
            </div>
          )}
        </div>
      )}
    />
  );
}
