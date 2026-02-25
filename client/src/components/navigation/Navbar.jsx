import Button from "../ui/Button";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M20.4 14.7a8.5 8.5 0 1 1-11.1-11A7 7 0 1 0 20.4 14.7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar({
  title,
  subtitle,
  onMenuToggle,
  showMenuButton,
  isDark,
  onThemeToggle,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {showMenuButton ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuToggle}
              aria-label="Open navigation menu"
              iconLeft={<MenuIcon />}
            >
              Menu
            </Button>
          ) : null}

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            {subtitle ? (
              <p className="truncate text-xs text-[var(--text-muted)] sm:text-sm">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onThemeToggle}
          iconLeft={isDark ? <SunIcon /> : <MoonIcon />}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? "Light" : "Dark"}
        </Button>
      </div>
    </header>
  );
}
