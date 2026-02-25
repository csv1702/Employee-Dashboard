import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Details = lazy(() => import("../pages/Details"));
const Camera = lazy(() => import("../pages/Camera"));
const PhotoResult = lazy(() => import("../pages/PhotoResult"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ChartPage = lazy(() => import("../pages/Chart"));
const MapPage = lazy(() => import("../pages/Map"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="surface-card px-6 py-4">
        <p className="text-sm font-medium text-(--text-secondary)">
          Loading page...
        </p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Details />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/camera/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Camera />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/photo-result"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PhotoResult />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/chart"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ChartPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MapPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
