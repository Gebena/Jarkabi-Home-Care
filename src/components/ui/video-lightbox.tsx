"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type VideoLightboxProps = {
  open: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
};

export function VideoLightbox({ open, onClose, videoUrl, title }: VideoLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const embed =
    videoUrl ??
    "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0";

  return (
    <div className="video-lightbox" role="dialog" aria-modal="true" aria-label={title ?? "Video"}>
      <button type="button" className="video-lightbox-backdrop" aria-label="Close" onClick={onClose} />
      <div className="video-lightbox-dialog">
        <button type="button" className="video-lightbox-close" onClick={onClose} aria-label="Close video">
          <X size={20} />
        </button>
        <div className="video-lightbox-frame">
          <iframe
            src={embed}
            title={title ?? "Care video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
