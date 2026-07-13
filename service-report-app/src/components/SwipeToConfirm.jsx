import { useRef, useState } from 'react';

export default function SwipeToConfirm({ onConfirm, onCancel }) {
  const trackRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const thumbSize = 48;

  const getMax = () => (trackRef.current ? trackRef.current.offsetWidth - thumbSize : 0);

  const handlePointerDown = () => setDragging(true);

  const handlePointerMove = (e) => {
    if (!dragging || confirmed) return;
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offset = Math.min(Math.max(clientX - rect.left - thumbSize / 2, 0), getMax());
    setDragX(offset);
  };

  const handlePointerUp = () => {
    if (confirmed) return;
    setDragging(false);
    const max = getMax();
    if (max > 0 && dragX / max > 0.85) {
      setDragX(max);
      setConfirmed(true);
      setTimeout(onConfirm, 200);
    } else {
      setDragX(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl p-5">
        <h3 className="text-base font-bold text-text-primary mb-1">Finish this report?</h3>
        <p className="text-sm text-text-secondary mb-5">
          This will clear the form so you can start a new report. Make sure you've downloaded or shared this one first.
        </p>

        <div
          ref={trackRef}
          className="relative h-14 rounded-full bg-brand-50 border border-brand-600/30 overflow-hidden select-none"
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <p className="absolute inset-0 flex items-center justify-center text-sm font-medium text-brand-700 pointer-events-none">
            {confirmed ? 'Confirmed!' : 'Swipe to confirm →'}
          </p>
          <div
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="absolute top-1 left-1 w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white text-lg font-bold cursor-pointer"
            style={{
              transform: `translateX(${dragX}px)`,
              transition: dragging ? 'none' : 'transform 0.2s ease',
            }}
          >
            {confirmed ? '✓' : '→'}
          </div>
        </div>

        <button
          onClick={onCancel}
          className="w-full mt-4 py-3 rounded-full border border-border text-text-primary font-medium text-sm active:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}