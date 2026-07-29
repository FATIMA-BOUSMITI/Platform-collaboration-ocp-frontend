import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css" ;

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AdminLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

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

    <Sidebar
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
  );
}

export default AdminLayout;