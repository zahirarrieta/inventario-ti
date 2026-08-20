import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./components/ThemeProvider";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";
import Monitores from "./pages/Monitores";
import Impresoras from "./pages/Impresoras";
import Perifericos from "./pages/Perifericos";
import Software from "./pages/Software";
import Usuarios from "./pages/Usuarios";
import Mantenimientos from "./pages/Mantenimientos";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 80;

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [toast, setToast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const toggleCollapse = () => setSidebarCollapsed((prev) => !prev);
  const closeSidebar = () => { if (isMobile) setSidebarOpen(false); };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH);

  return (
    <div className="app-shell flex min-h-screen">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar-ctp fixed top-0 left-0 h-full z-50 overflow-visible transition-all duration-300 ease-in-out ${
          isMobile
            ? sidebarOpen ? "translate-x-0" : "-translate-x-full"
            : ""
        }`}
        style={{
          width: isMobile ? 260 : (sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH),
        }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onNavigate={closeSidebar}
          onToggleCollapse={toggleCollapse}
        />
      </aside>

      <div
        className="app-main flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed} />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<PageWrapper><Dashboard showToast={showToast} /></PageWrapper>} />
              <Route path="/equipos" element={<PageWrapper><Equipos showToast={showToast} /></PageWrapper>} />
              <Route path="/monitores" element={<PageWrapper><Monitores showToast={showToast} /></PageWrapper>} />
              <Route path="/impresoras" element={<PageWrapper><Impresoras showToast={showToast} /></PageWrapper>} />
              <Route path="/perifericos" element={<PageWrapper><Perifericos showToast={showToast} /></PageWrapper>} />
              <Route path="/software" element={<PageWrapper><Software showToast={showToast} /></PageWrapper>} />
              <Route path="/usuarios" element={<PageWrapper><Usuarios showToast={showToast} /></PageWrapper>} />
              <Route path="/mantenimientos" element={<PageWrapper><Mantenimientos showToast={showToast} /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 z-[100]">
          <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
