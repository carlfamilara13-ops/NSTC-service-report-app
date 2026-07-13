import { useFormData } from '../../context/FormContext';

export default function ProblemDetailsStep() {
  const { formData, updateField } = useFormData();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-text-primary">Problem Details</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Reported Problem</label>
        <textarea
          rows={4}
          value={formData.reportedProblem}
          onChange={(e) => updateField('reportedProblem', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Action Taken / Remarks</label>
        <textarea
          rows={6}
          value={formData.actionTaken}
          onChange={(e) => updateField('actionTaken', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Pending Items</label>
        <textarea
          rows={3}
          value={formData.pendingItems}
          onChange={(e) => updateField('pendingItems', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>
    </div>
  );
}