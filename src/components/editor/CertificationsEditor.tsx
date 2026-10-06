"use client";
import React from 'react';
import GenericListEditor from './GenericListEditor';

export default function CertificationsEditor() {
  return (
    <GenericListEditor
      title="Certification"
      listKey="certifications"
      fields={[
        { name: 'name', label: 'Certification Name', type: 'text' },
        { name: 'issuer', label: 'Issuer (e.g., Infosys Springboard)', type: 'text' },
      ]}
      renderItem={(item) => (
        <div>
          <h3 className="font-semibold text-lg text-white">{item.name}</h3>
          <p className="text-sm text-zinc-400 mt-1">{item.issuer}</p>
        </div>
      )}
    />
  );
}
