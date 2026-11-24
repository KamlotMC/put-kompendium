import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

export function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 text-sm font-semibold min-w-0">
            <ZoomIn className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="truncate">{image.caption || 'Schemat z wykładu'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
            aria-label="Zamknij podgląd"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white p-3 flex items-center justify-center max-h-[78vh] overflow-auto">
          <img
            src={image.src}
            alt={image.caption || 'Slajd z wykładu'}
            className="max-w-full max-h-[72vh] object-contain"
          />
        </div>
        {image.source && (
          <div className="px-5 py-2.5 text-xs text-[var(--text-muted)] border-t border-[var(--border)] flex justify-between">
            <span>Źródło: {image.source}</span>
            <span>Naciśnij Esc aby zamknąć</span>
          </div>
        )}
      </div>
    </div>
  );
}
