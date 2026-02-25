import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import useEmployees from "../hooks/useEmployees";
import { useEmployeeStore } from "../store/employeeStore";

function parseSalaryValue(value) {
  const parsedValue = Number.parseInt(
    String(value || "").replace(/[^0-9]/g, ""),
    10,
  );
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const { data, loading, error } = useEmployees();
  const setEmployee = useEmployeeStore((state) => state.setEmployee);
  const navigate = useNavigate();

  const employees = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const summary = useMemo(() => {
    const uniqueCities = new Set();
    let totalSalary = 0;
    let salaryEntries = 0;

    employees.forEach((employee) => {
      if (employee?.[2]) {
        uniqueCities.add(employee[2]);
      }

      const salaryValue = parseSalaryValue(employee?.[5]);
      if (salaryValue > 0) {
        totalSalary += salaryValue;
        salaryEntries += 1;
      }
    });

    return {
      totalEmployees: employees.length,
      cityCount: uniqueCities.size,
      averageSalary: salaryEntries ? totalSalary / salaryEntries : 0,
    };
  }, [employees]);

  const handleEmployeeOpen = useCallback(
    (employee, index) => {
      setEmployee(employee);
      navigate(`/details/${employee.id || index}`);
    },
    [navigate, setEmployee],
  );

  if (loading) {
    return (
      <Card title="Loading employees" description="Fetching team records...">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-(--bg-muted)"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        title="Could not load employee data"
        className="border-error-500/30"
      >
        <p className="text-sm font-medium text-error-500">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Team Overview"
        subtitle="Review employee records and open detailed profiles."
        actions={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/chart")}
            >
              View Salary Chart
            </Button>
            <Button type="button" onClick={() => navigate("/map")}>
              View Map
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="bg-linear-to-br from-brand-600 to-brand-500 text-white shadow-lift">
          <p className="text-sm font-medium text-white/80">Total Employees</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.totalEmployees}
          </p>
        </Card>

        <Card className="bg-linear-to-br from-accent-600 to-accent-500 text-white shadow-lift">
          <p className="text-sm font-medium text-white/85">Cities Covered</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {summary.cityCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-(--text-muted)">
            Average Salary
          </p>
          <p className="mt-2 text-3xl font-semibold text-(--text-primary)">
            {formatCurrency(summary.averageSalary || 0)}
          </p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Based on available salary entries in the current dataset.
          </p>
        </Card>
      </section>

      {employees.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {employees.map((employee, index) => {
            const name = employee?.[0] || "Unknown Employee";
            const position = employee?.[1] || "N/A";
            const city = employee?.[2] || "N/A";
            const joiningDate = employee?.[4] || "N/A";
            const salary = employee?.[5] || "N/A";

            return (
              <Card
                key={employee?.id || index}
                interactive
                className="p-0"
                bodyClassName="p-0"
              >
                <button
                  type="button"
                  className="focus-ring block w-full rounded-3xl px-5 py-5 text-left sm:px-6"
                  onClick={() => handleEmployeeOpen(employee, index)}
                  title={`Open profile for ${name}`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-(--text-primary)">
                        {name}
                      </h2>
                      <p className="mt-1 text-sm text-(--text-muted)">
                        {position}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
                      #{employee?.[3] || index}
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div className="surface-muted px-3 py-2">
                      <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
                        City
                      </dt>
                      <dd className="mt-1 font-medium text-(--text-primary)">
                        {city}
                      </dd>
                    </div>
                    <div className="surface-muted px-3 py-2">
                      <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
                        Salary
                      </dt>
                      <dd className="mt-1 font-medium text-(--text-primary)">
                        {salary}
                      </dd>
                    </div>
                    <div className="col-span-2 surface-muted px-3 py-2">
                      <dt className="text-xs uppercase tracking-wide text-(--text-muted)">
                        Joining Date
                      </dt>
                      <dd className="mt-1 font-medium text-(--text-primary)">
                        {joiningDate}
                      </dd>
                    </div>
                  </dl>
                </button>
              </Card>
            );
          })}
        </section>
      ) : (
        <Card title="No employee data available">
          <p className="text-sm text-(--text-muted)">
            No records were returned. Try refreshing the page again.
          </p>
        </Card>
      )}
    </div>
  );
}
