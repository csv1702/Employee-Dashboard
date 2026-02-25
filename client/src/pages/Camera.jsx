import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { useImageStore } from "../store/imageStore";

const videoConstraints = {
  width: 640,
  height: 640,
  facingMode: "user",
};

export default function Camera() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const setImage = useImageStore((state) => state.setImage);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSource = webcamRef.current?.getScreenshot();
    if (imageSource) {
      setCapturedImage(imageSource);
    }
  }, []);

  const saveImage = useCallback(() => {
    if (!capturedImage) {
      return;
    }

    setImage(capturedImage);
    navigate("/photo-result");
  }, [capturedImage, navigate, setImage]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Capture Photo"
        subtitle="Capture a clean profile photo before saving."
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

      <Card className="mx-auto max-w-3xl" bodyClassName="space-y-6">
        {!capturedImage ? (
          <>
            <div className="overflow-hidden rounded-2xl border border-(--border-subtle) bg-neutral-900">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={capture}>
                Capture
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>

            <p className="text-sm text-(--text-muted)">
              Tip: Ensure your face is centered and lighting is even for better
              results.
            </p>
          </>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-(--border-subtle) bg-neutral-900">
              <img
                src={capturedImage}
                alt="Captured employee profile"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setCapturedImage(null)}
              >
                Retake
              </Button>
              <Button type="button" variant="success" onClick={saveImage}>
                Save and Continue
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
