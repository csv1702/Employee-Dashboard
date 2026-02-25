import { cn } from "../../utils/cn";

const variantClasses = {
  primary:
    "bg-brand-500 text-white shadow-lift hover:bg-brand-600 active:bg-brand-700",
  secondary:
    "bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-neutral-200 dark:hover:bg-neutral-700",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-muted)]",
  success:
    "bg-success-500 text-white shadow-soft hover:bg-success-600 active:bg-success-600",
  danger: "bg-error-500 text-white shadow-soft hover:bg-error-600 active:bg-error-600",
};

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm sm:text-base",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  ...props
}) {
  const disabled = loading || props.disabled;

  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      ) : (
        iconLeft
      )}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  );
}
