import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import useTheme from "../hooks/useTheme";
import { useAuthStore } from "../store/authStore";

const pageContent = {
  "/dashboard": {
    title: "Employee Dashboard",
    subtitle: "Browse employee profiles and quickly inspect key records.",
  },
  "/chart": {
    title: "Salary Insights",
    subtitle: "Compare salary distribution across the first 10 employees.",
  },
  "/map": {
    title: "Location Intelligence",
    subtitle: "Track employee city distribution across global offices.",
  },
  "/photo-result": {
    title: "Photo Result",
    subtitle: "Review the captured image before continuing.",
  },
};

function getPageMetadata(pathname) {
  if (pathname.startsWith("/details/")) {
    return {
      title: "Employee Detail",
      subtitle: "View full profile data and continue to capture flow.",
    };
  }

  if (pathname.startsWith("/camera/")) {
    return {
      title: "Capture Photo",
      subtitle: "Capture or retake a profile image using your camera.",
    };
  }

  return (
    pageContent[pathname] || {
      title: "Employee Hub",
      subtitle: "Team operations dashboard.",
    }
  );
}

export default function MainLayout({ children }) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const pageMetadata = useMemo(
    () => getPageMetadata(location.pathname),
    [location.pathname],
  );

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onLogoutRequest={() => setIsLogoutModalOpen(true)}
      />

      <div className="lg:pl-72">
        <Navbar
          title={pageMetadata.title}
          subtitle={pageMetadata.subtitle}
          isDark={isDark}
          onThemeToggle={toggleTheme}
          showMenuButton
          onMenuToggle={() => setIsMobileNavOpen(true)}
        />

        <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up">{children}</div>
        </main>
      </div>

      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log out of your session?"
        description="You can sign back in at any time with your existing credentials."
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="danger" onClick={handleLogout}>
              Log out
            </Button>
          </>
        }
      >
        <p className="text-sm text-(--text-secondary)">
          Logging out will return you to the login page and clear the current
          local session.
        </p>
      </Modal>
    </div>
  );
}
