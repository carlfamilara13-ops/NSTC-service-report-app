import { useFormData } from '../../context/FormContext';

export default function ClientInfoStep() {
  const { formData, updateField } = useFormData();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-text-primary">Client Information</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Project No.</label>
        <input
          value={formData.projectNo}
          onChange={(e) => updateField('projectNo', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Client</label>
        <input
          value={formData.client}
          onChange={(e) => updateField('client', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Address</label>
        <input
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Contact Person</label>
        <input
          value={formData.contactPerson}
          onChange={(e) => updateField('contactPerson', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>
    </div>
  );
}