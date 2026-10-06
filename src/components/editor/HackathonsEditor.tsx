"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function HackathonsEditor() {
  return (
    <GenericListEditor
      title="Hackathon"
      listKey="hackathons"
      fields={[
        { name: 'name', label: 'Hackathon Name', type: 'text' },
        { name: 'roleAndProject', label: 'Role & Project (e.g., Team Leader | Community Guardian)', type: 'text' },
        { name: 'status', label: 'Status (e.g., Selected for Round 2)', type: 'text' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg text-white">{item.name}</h3>
          <p className="text-sm font-medium text-indigo-400 mt-1">{item.roleAndProject}</p>
          <p className="text-sm text-zinc-400 mt-1">{item.status}</p>
        </div>
      )}
    />
  );
}
