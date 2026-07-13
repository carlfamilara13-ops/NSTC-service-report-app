import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignaturePad({ onSave, onClose }) {
  const sigRef = useRef();

  const handleClear = () => {
    sigRef.current.clear();
  };

  const handleSave = () => {
    if (sigRef.current.isEmpty()) {
      alert('Please sign before saving.');
      return;
    }
    const dataUrl = sigRef.current.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={onClose} className="text-sm font-medium text-text-secondary">
          Cancel
        </button>
        <p className="text-sm font-bold text-text-primary">Sign Here</p>
        <span className="text-sm font-medium text-transparent select-none">Cancel</span>
      </div>

      <p className="text-center text-xs text-text-secondary py-2">
        Tip: turn your phone sideways for more space
      </p>

      <div className="flex-1 min-h-0 mx-4 mb-4 border-2 border-dashed border-brand-600 rounded-xl overflow-hidden">
        <SignatureCanvas
          ref={sigRef}
          penColor="#000000"
          minWidth={2}
          maxWidth={4}
          canvasProps={{ className: 'w-full h-full' }}
        />
      </div>

      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={handleClear}
          className="flex-1 py-3 rounded-full border border-border text-text-primary font-medium text-sm active:bg-gray-100"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3 rounded-full bg-brand-600 text-white font-medium text-sm active:bg-brand-700"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}