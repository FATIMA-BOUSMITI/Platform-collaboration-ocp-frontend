import { useState } from "react";
// If Header's exported type isn't recognized as a valid React component
// cast it to any to allow using it in JSX.
import { Outlet } from "react-router-dom";
import "./AdminLayout.css" ;

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AdminLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const ToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }


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
    />

      <main
        style={{
          marginTop: "72px",
          padding: "30px",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;