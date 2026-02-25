import { forwardRef, useMemo } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input(
  {
    id,
    label,
    hint,
    error,
    required = false,
    className,
    inputClassName,
    ...props
  },
  ref,
) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy = useMemo(() => {
    return [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  }, [error, errorId, hint, hintId]);

  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[var(--text-secondary)]"
        >
          {label}
          {required ? <span className="ml-1 text-error-500">*</span> : null}
        </label>
      ) : null}

      <input
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={cn(
          "focus-ring h-11 w-full rounded-xl border bg-[var(--bg-elevated)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition",
          error
            ? "border-error-500 ring-1 ring-error-500/20"
            : "border-[var(--border-subtle)] hover:border-brand-300",
          inputClassName,
        )}
        {...props}
      />

      {hint ? (
        <p id={hintId} className="text-xs text-[var(--text-muted)]">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-error-500">
          {error}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
