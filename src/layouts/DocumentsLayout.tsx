import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Managersidebar from "../components/Managersidebar";
import Employeesidebar from "../components/Employeesidebar";
import DirectorSidebar from "../components/DirectorSidebar";
import { useAuthStore } from "../features/auth/AuthStore";
import "./AdminLayout.css";

export default function DocumentsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  const toggleSidebar = () => setIsSidebarOpen((isOpen) => !isOpen);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/");
  };

  const sidebarProps = {
    isOpen: isSidebarOpen,
    onClose: toggleSidebar,
    onLogout: handleLogout,
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />

      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      {role === "ADMIN" && <Sidebar {...sidebarProps} />}
      {role === "DIRECTOR" && <DirectorSidebar {...sidebarProps} />}
      {role === "MANAGER" && <Managersidebar {...sidebarProps} />}
      {role === "EMPLOYEE" && <Employeesidebar {...sidebarProps} />}

      <main
        style={{
          marginTop: "72px",
          padding: "30px",
          width: "100%",
          minHeight: "100vh",
          background: "#f8fafb",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
