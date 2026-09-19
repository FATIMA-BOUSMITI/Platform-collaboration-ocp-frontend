
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css" ;
import Header from "../components/Header";
import DirectorSidebar from "../components/DirectorSidebar";
import { useAuthStore } from "../features/auth/AuthStore";

export default function DirectorLayout() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout();

    navigate("/");
  };


  return (
    <>
      <Header onToggleSidebar={ToggleSidebar} />

      {isSidebarOpen && (
     <div
    className="sidebar-overlay"
    onClick={ToggleSidebar}
     />
    )}

    <DirectorSidebar
       isOpen={isSidebarOpen}
       onClose={ToggleSidebar}
       onLogout={handleLogout}
    />

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
)}