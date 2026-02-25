import { cn } from "../../utils/cn";

export default function Card({
  title,
  description,
  actions,
  className,
  bodyClassName,
  children,
  interactive = false,
  ...props
}) {
  return (
    <section
      className={cn(
        "surface-card overflow-hidden",
        interactive &&
          "transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <header className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
          <div>
            {title ? (
              <h2 className="text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
            ) : null}
          </div>
          {actions}
        </header>
      ) : null}

      <div className={cn("px-5 py-5 sm:px-6 sm:py-6", bodyClassName)}>{children}</div>
    </section>
  );
}
