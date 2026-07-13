import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { FormProvider, useFormData } from './context/FormContext';
import ClientInfoStep from './components/steps/ClientInfoStep';
import ServiceInfoStep from './components/steps/ServiceInfoStep';
import ProblemDetailsStep from './components/steps/ProblemDetailsStep';
import NstcRepStep from './components/steps/NstcRepStep';
import ClientRepStep from './components/steps/ClientRepStep';
import PdfTemplate from './components/PdfTemplate';

const steps = [
  { component: ClientInfoStep, label: 'Client' },
  { component: ServiceInfoStep, label: 'Service' },
  { component: ProblemDetailsStep, label: 'Problem' },
  { component: NstcRepStep, label: 'NSTC Sign' },
  { component: ClientRepStep, label: 'Client Sign' },
];

function FormFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { formData } = useFormData();
  const StepComponent = steps[stepIndex].component;
  const isLastStep = stepIndex === steps.length - 1;

  const handlePreview = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PdfTemplate data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF.');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PdfTemplate data={formData} />).toBlob();
      const fileName = `ServiceReport-${formData.projectNo || 'draft'}.pdf`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to generate PDF.');
    }
    setLoading(false);
  };

  const handleGenerateAndShare = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PdfTemplate data={formData} />).toBlob();
      const fileName = `ServiceReport-${formData.projectNo || 'draft'}.pdf`;
      const file = new File([blob], fileName, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Service Report',
          text: `Service Report - ${formData.client || ''}`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        alert('Could not share the PDF. It has been downloaded instead.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="max-w-md mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-3">
            <img src="/NSTC_logo.png" alt="NSTC" className="h-8 w-auto object-contain" />
            <div>
              <h1 className="text-sm font-bold text-text-primary leading-tight">Service Report</h1>
              <p className="text-xs text-text-secondary leading-tight">NGA Systems Technologies Corp.</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <div key={step.label} className="flex-1">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    i <= stepIndex ? 'bg-brand-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-1.5">
            Step {stepIndex + 1} of {steps.length} · {steps[stepIndex].label}
          </p>
        </div>
      </header>

      {/* Step content card */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 pb-24">
        <div className="bg-white rounded-xl shadow-sm border border-border p-4">
          <StepComponent />
        </div>
      </main>

      {/* Floating bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          {!isLastStep ? (
            <div className="flex justify-between gap-2">
              {stepIndex > 0 ? (
                <button
                  onClick={() => setStepIndex((i) => i - 1)}
                  className="px-5 py-3 rounded-full border border-border text-text-primary font-medium text-sm active:bg-gray-100"
                >
                  Back
                </button>
              ) : <div />}
              <button
                onClick={() => setStepIndex((i) => i + 1)}
                className="flex-1 px-5 py-3 rounded-full bg-brand-600 text-white font-medium text-sm active:bg-brand-700"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {stepIndex > 0 && (
                  <button
                    onClick={() => setStepIndex((i) => i - 1)}
                    className="px-5 py-3 rounded-full border border-border text-text-primary font-medium text-sm active:bg-gray-100"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handlePreview}
                  disabled={loading}
                  className="flex-1 px-5 py-3 rounded-full border border-brand-600 text-brand-600 font-medium text-sm active:bg-brand-50 disabled:opacity-50"
                >
                  Preview
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="flex-1 px-5 py-3 rounded-full border border-border text-text-primary font-medium text-sm active:bg-gray-100 disabled:opacity-50"
                >
                  Download
                </button>
                <button
                  onClick={handleGenerateAndShare}
                  disabled={loading}
                  className="flex-1 px-5 py-3 rounded-full bg-brand-600 text-white font-medium text-sm active:bg-brand-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Share'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <FormProvider>
      <FormFlow />
    </FormProvider>
  );
}

export default App;