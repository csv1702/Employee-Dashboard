import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Salary Chart", to: "/chart" },
  { label: "Employee Map", to: "/map" },
];

export default function Sidebar({ isOpen, onClose, onLogoutRequest }) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-neutral-950/40 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 shadow-soft transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="surface-muted px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
            Employee Hub
          </p>
          <h2 className="mt-1 text-xl font-semibold">Operations Console</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Manage team profiles, salaries, and locations.
          </p>
        </div>

        <nav className="mt-6 flex-1 space-y-2" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "focus-ring flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-500 text-white shadow-soft"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button
          type="button"
          variant="danger"
          className="w-full"
          onClick={onLogoutRequest}
        >
          Logout
        </Button>
      </aside>
    </>
  );
}
