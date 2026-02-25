import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
          404 Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-(--text-muted)">
          The route you requested does not exist or may have moved.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button type="button">Return to Login</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
