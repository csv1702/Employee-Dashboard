import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { useEmployeeStore } from "../store/employeeStore";

export default function Details() {
  const employee = useEmployeeStore((state) => state.selectedEmployee);
  const navigate = useNavigate();

  if (!employee) {
    return (
      <Card title="No employee selected">
        <p className="text-sm text-(--text-muted)">
          Open an employee card from the dashboard to see profile details.
        </p>
        <div className="mt-4">
          <Button type="button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={employee[0] || "Employee Profile"}
        subtitle="Employee detail summary and profile capture action."
        actions={
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>
        }
      />

      <Card className="mx-auto max-w-3xl">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="surface-muted px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
              Position
            </dt>
            <dd className="mt-1 text-sm font-semibold text-(--text-primary)">
              {employee[1] || "N/A"}
            </dd>
          </div>

          <div className="surface-muted px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
              City
            </dt>
            <dd className="mt-1 text-sm font-semibold text-(--text-primary)">
              {employee[2] || "N/A"}
            </dd>
          </div>

          <div className="surface-muted px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
              Employee ID
            </dt>
            <dd className="mt-1 text-sm font-semibold text-(--text-primary)">
              {employee[3] || "N/A"}
            </dd>
          </div>

          <div className="surface-muted px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
              Joining Date
            </dt>
            <dd className="mt-1 text-sm font-semibold text-(--text-primary)">
              {employee[4] || "N/A"}
            </dd>
          </div>

          <div className="surface-muted px-4 py-3 sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
              Salary
            </dt>
            <dd className="mt-1 text-base font-semibold text-(--text-primary)">
              {employee[5] || "N/A"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => navigate(`/camera/${employee[3]}`)}
            title="Capture employee profile image"
          >
            Capture Photo
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
