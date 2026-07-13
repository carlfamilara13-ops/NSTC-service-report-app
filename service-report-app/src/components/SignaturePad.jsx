import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

// Manually trims transparent whitespace from a canvas, since the library's
// built-in getTrimmedCanvas() is broken on newer bundlers.
function trimCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  let top = null, bottom = null, left = null, right = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        if (top === null) top = y;
        bottom = y;
        if (left === null || x < left) left = x;
        if (right === null || x > right) right = x;
      }
    }
  }

  if (top === null) return canvas; // blank canvas, nothing to trim

  const padding = 10;
  const trimX = Math.max(left - padding, 0);
  const trimY = Math.max(top - padding, 0);
  const trimWidth = Math.min(right + padding, width) - trimX;
  const trimHeight = Math.min(bottom + padding, height) - trimY;

  const trimmed = document.createElement('canvas');
  trimmed.width = trimWidth;
  trimmed.height = trimHeight;
  trimmed.getContext('2d').drawImage(
    canvas, trimX, trimY, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight
  );
  return trimmed;
}

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
    const rawCanvas = sigRef.current.getCanvas();
    const trimmed = trimCanvas(rawCanvas);
    const dataUrl = trimmed.toDataURL('image/png');
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