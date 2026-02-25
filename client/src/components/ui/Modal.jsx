import { useEffect } from "react";
import { cn } from "../../utils/cn";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <div
        className="absolute inset-0 bg-neutral-950/45 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn("surface-card relative w-full max-w-md", className)}
      >
        <div className="border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
          {title ? (
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
          ) : null}
        </div>

        <div className="px-5 py-5 sm:px-6">{children}</div>

        {footer ? (
          <footer className="flex items-center justify-end gap-3 border-t border-[var(--border-subtle)] px-5 py-4 sm:px-6">
            {footer}
          </footer>
        ) : null}
      </section>
    </div>
  );
}
