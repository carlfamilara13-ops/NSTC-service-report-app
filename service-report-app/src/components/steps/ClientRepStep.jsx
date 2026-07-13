import { useState } from 'react';
import { useFormData } from '../../context/FormContext';
import SignaturePad from '../SignaturePad';

export default function ClientRepStep() {
  const { formData, updateField } = useFormData();
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-text-primary">Client's Representative</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Name</label>
        <input
          value={formData.clientRepName}
          onChange={(e) => updateField('clientRepName', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Contact Number</label>
        <input
          value={formData.clientRepContact}
          onChange={(e) => updateField('clientRepContact', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Comment(s)</label>
        <textarea
          rows={3}
          value={formData.clientComments}
          onChange={(e) => updateField('clientComments', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Date</label>
        <input
          type="date"
          value={formData.clientDate}
          onChange={(e) => updateField('clientDate', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
        <label className="text-xs font-medium text-text-secondary mt-2">Signature</label>
        {formData.clientSignature ? (
          <div className="flex flex-col gap-2">
            <div className="border border-border rounded-lg bg-surface p-2">
              <img
                src={formData.clientSignature}
                alt="Client Signature"
                className="h-20 object-contain mx-auto"
              />
            </div>
            <button
              onClick={() => setShowSignaturePad(true)}
              className="self-start text-sm font-medium text-brand-600 active:text-brand-700"
            >
              Re-sign
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSignaturePad(true)}
            className="w-full py-3 rounded-lg border-2 border-dashed border-brand-600 text-brand-600 text-sm font-medium active:bg-brand-50"
          >
            + Add Signature
          </button>
        )}
      </div>

      {showSignaturePad && (
        <SignaturePad
          onSave={(dataUrl) => updateField('clientSignature', dataUrl)}
          onClose={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
}