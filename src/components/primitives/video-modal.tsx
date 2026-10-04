"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title: string;
};

/**
 * Native <dialog> so Escape, focus trapping and `aria-modal` come for free.
 * The <video> element is only mounted while open, so nothing loads up front.
 */
export function VideoModal({ open, onClose, src, poster, title }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", onClose);
    };
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} — wedding film`}
      className="m-auto w-full max-w-5xl bg-transparent p-4 text-ivory backdrop:bg-ink/90 open:block"
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {open ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-ivory/70">{title}</p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
              aria-label="Close film"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <video
              className="h-full w-full"
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
