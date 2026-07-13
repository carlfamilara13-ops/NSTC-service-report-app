import { useFormData } from '../../context/FormContext';

export default function ServiceInfoStep() {
  const { formData, updateField } = useFormData();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-text-primary">Service Information</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Service Number</label>
        <input
          value={formData.serviceNumber}
          onChange={(e) => updateField('serviceNumber', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary">Under Warranty</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateField('underWarranty', 'yes')}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              formData.underWarranty === 'yes'
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-surface border-border text-text-primary'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateField('underWarranty', 'no')}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              formData.underWarranty === 'no'
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-surface border-border text-text-primary'
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Date Called</label>
        <input
          type="date"
          value={formData.dateCalled}
          onChange={(e) => updateField('dateCalled', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-text-secondary">Date Serviced</label>
        <input
          type="date"
          value={formData.dateServiced}
          onChange={(e) => updateField('dateServiced', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
        />
      </div>
    </div>
  );
}