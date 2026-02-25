import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import useEmployees from "../hooks/useEmployees";

const cityCoordinates = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  London: [51.5074, -0.1278],
  NewYork: [40.7128, -74.006],
  "New York": [40.7128, -74.006],
  SanFrancisco: [37.7749, -122.4194],
  "San Francisco": [37.7749, -122.4194],
  Sydney: [-33.8688, 151.2093],
  Singapore: [1.3521, 103.8198],
};

export default function MapPage() {
  const { data, loading, error } = useEmployees();
  const navigate = useNavigate();

  const markers = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .map((employee, index) => {
        const city = employee?.[2];
        const coordinates = cityCoordinates[city];

        if (!coordinates) {
          return null;
        }

        return {
          key: `${employee?.[3] || index}-${city}`,
          name: employee?.[0] || "Unknown Employee",
          city,
          coordinates,
        };
      })
      .filter(Boolean);
  }, [data]);

  if (loading) {
    return (
      <Card title="Loading employee map">
        <div className="h-80 animate-pulse rounded-2xl bg-(--bg-muted)" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Unable to load map" className="border-error-500/30">
        <p className="text-sm font-medium text-error-500">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Locations"
        subtitle="Mapped offices based on employee city records."
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

      <Card description="Only employees with supported city mappings are displayed.">
        <div className="overflow-hidden rounded-2xl border border-(--border-subtle)">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="h-85 w-full sm:h-125"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((marker) => (
              <Marker key={marker.key} position={marker.coordinates}>
                <Popup>
                  <strong>{marker.name}</strong>
                  <br />
                  {marker.city}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <p className="mt-4 text-sm text-(--text-muted)">
          Showing{" "}
          <span className="font-semibold text-(--text-primary)">
            {markers.length}
          </span>{" "}
          mapped employee location{markers.length === 1 ? "" : "s"}.
        </p>
      </Card>
    </div>
  );
}
