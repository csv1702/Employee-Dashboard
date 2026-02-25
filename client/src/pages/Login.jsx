import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useAuthStore } from "../store/authStore";

const DEMO_CREDENTIALS = {
  username: "testuser",
  password: "Test123",
};

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    username: DEMO_CREDENTIALS.username,
    password: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fieldErrors = useMemo(() => {
    return {
      username: form.username.trim() ? "" : "Username is required.",
      password: form.password
        ? ""
        : "Password is required. Use the provided demo credential.",
    };
  }, [form.password, form.username]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setError("");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({ username: true, password: true });

    if (fieldErrors.username || fieldErrors.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (
      form.username === DEMO_CREDENTIALS.username &&
      form.password === DEMO_CREDENTIALS.password
    ) {
      login({ username: form.username });
      navigate("/dashboard");
      return;
    }

    setError("Invalid username or password. Try the demo credentials.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      >
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand-400/25 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-accent-400/25 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="hidden border-none bg-linear-to-br from-brand-600 via-brand-500 to-accent-600 text-white shadow-lift lg:block">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                Employee Hub
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-white">
                Premium command center for employee operations
              </h1>
              <p className="mt-4 max-w-lg text-sm text-white/85">
                Monitor your workforce, inspect salary trends, and manage
                profile records in one responsive dashboard experience.
              </p>
            </div>

            <div className="surface-card border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-white">Demo Access</p>
              <p className="mt-2 text-sm text-white/90">
                Username: <span className="font-semibold">testuser</span>
              </p>
              <p className="text-sm text-white/90">
                Password: <span className="font-semibold">Test123</span>
              </p>
            </div>
          </div>
        </Card>

        <Card
          title="Welcome back"
          description="Sign in to continue to your employee dashboard."
          className="mx-auto w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-error-500/20 bg-error-500/10 px-3 py-2 text-sm font-medium text-error-500"
              >
                {error}
              </p>
            ) : null}

            <Input
              id="username"
              name="username"
              label="Username"
              required
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              placeholder="Enter your username"
              hint="Use testuser for demo access."
              error={touched.username ? fieldErrors.username : ""}
            />

            <div className="space-y-1.5">
              <Input
                id="password"
                name="password"
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                placeholder="Enter your password"
                hint="Demo password is Test123."
                error={touched.password ? fieldErrors.password : ""}
              />

              <button
                type="button"
                className="focus-ring ml-auto block text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            <div className="grid gap-3 pt-1">
              <Button type="submit" className="w-full">
                Login
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setForm({ ...DEMO_CREDENTIALS });
                  setTouched({ username: true, password: true });
                  setError("");
                }}
                title="Autofill demo credentials"
              >
                Use Demo Credentials
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
