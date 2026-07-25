import { useState, useRef } from 'react';
import { useFormData } from '../context/FormContext';

function detectOrientation(file) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      resolve(img.width >= img.height ? 'landscape' : 'portrait');
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

function compressImage(file, maxDimension = 1280, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDimension) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else if (height >= width && height > maxDimension) {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', quality),
        orientation: width >= height ? 'landscape' : 'portrait',
      });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function PhotoUploadStep({ title, fieldName }) {
  const { formData, updateField } = useFormData();
  const photos = formData[fieldName] || [];
  const [showMenu, setShowMenu] = useState(false);
  const cameraInputRef = useRef();
  const galleryInputRef = useRef();

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [];
    for (const file of files) {
        const { dataUrl, orientation } = await compressImage(file);
        newPhotos.push({ id: crypto.randomUUID(), dataUrl, orientation });
    }
    updateField(fieldName, [...photos, ...newPhotos]);
    e.target.value = '';
    setShowMenu(false);
};

  const removePhoto = (id) => {
    updateField(fieldName, photos.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-text-primary">{title}</h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu((v) => !v)}
          className="w-full py-3 rounded-lg border-2 border-dashed border-brand-600 text-brand-600 text-sm font-medium text-center active:bg-brand-50"
        >
          + Add Photos
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              <button
                type="button"
                onClick={() => cameraInputRef.current.click()}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-primary active:bg-gray-100 border-b border-border"
              >
                <span className="text-lg">📷</span> Take Photo
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current.click()}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-primary active:bg-gray-100"
              >
                <span className="text-lg">🖼️</span> Choose from Gallery
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hidden inputs — one forces the camera, one opens the file/gallery picker */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFiles}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative border border-border rounded-lg overflow-hidden bg-surface">
              <img src={p.dataUrl} alt="" className="w-full h-32 object-cover" />
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {p.orientation}
              </span>
              <button
                onClick={() => removePhoto(p.id)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-danger flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-text-secondary text-center">No photos added yet.</p>
      )}
    </div>
  );
}