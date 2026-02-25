import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { useImageStore } from "../store/imageStore";

export default function PhotoResult() {
  const image = useImageStore((state) => state.image);
  const clearImage = useImageStore((state) => state.clearImage);
  const navigate = useNavigate();

  const handleBack = () => {
    clearImage();
    navigate("/dashboard");
  };

  if (!image) {
    return (
      <Card title="No image found">
        <p className="text-sm text-(--text-muted)">
          Capture a photo first to view the result screen.
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
        title="Captured Image"
        subtitle="Review your photo before returning to the dashboard."
      />

      <Card className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-(--border-subtle) bg-neutral-900">
          <img src={image} alt="Captured employee result" className="w-full" />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Retake
          </Button>
          <Button type="button" onClick={handleBack}>
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
