import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import useEmployees from "../hooks/useEmployees";

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

export default function ChartPage() {
  const { data, loading, error } = useEmployees();
  const navigate = useNavigate();

  const chartData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.slice(0, 10).map((employee, index) => ({
      id: employee?.[3] || index + 1,
      name: employee?.[0] || `Employee ${index + 1}`,
      salary: parseSalaryValue(employee?.[5]),
    }));
  }, [data]);

  if (loading) {
    return (
      <Card title="Loading salary chart">
        <div className="h-72 animate-pulse rounded-2xl bg-(--bg-muted)" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Unable to load chart" className="border-error-500/30">
        <p className="text-sm font-medium text-error-500">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Salary Chart"
        subtitle="Top 10 employees ranked by reported salary."
        actions={
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        }
      />

      <Card
        description="This chart uses the first ten records from the API response."
        className="overflow-visible"
      >
        <div className="h-80 w-full sm:h-105">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 14, left: 0, bottom: 18 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.35)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  cursor={{ fill: "rgba(47, 123, 245, 0.1)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    backgroundColor: "rgba(15, 23, 42, 0.93)",
                    color: "#f8fafc",
                  }}
                />
                <Bar
                  dataKey="salary"
                  fill="#2f7bf5"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={44}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="surface-muted flex h-full items-center justify-center">
              <p className="text-sm text-(--text-muted)">
                No salary data available for chart rendering.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
