import "./styles/Sidebar.css";

import {
  MdOutlineDashboard,
  MdBusiness,
  MdOutlineShield,
  MdOutlineLogout,
  MdOutlineClose
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiTeamFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}



function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      {/* Haut */}
      <div className="sidebar-top">

        <div className="sidebar-header">
          <img
            src="/ocp-logo.png"
            alt="OCP"
            className="sidebar-logo"
          />

          <button
            className="close-button"
            onClick={onClose}
          >
            <MdOutlineClose />
          </button>
        </div>

        {/* Zone qui peut défiler */}
        <nav className="sidebar-menu">

          <SidebarSection title="DASHBOARD" />

      <SidebarItem
        to="/dashboard"
        icon={<MdOutlineDashboard />}
        label="Dashboard"
      />

      <SidebarSection title="USERS" />

      <SidebarItem
        to="/users"
        icon={<FiUsers/>}
        label="Liste des utilisateurs"
      />
      <SidebarItem
        to="/users"
        icon={<FaRegUser />}
        label="Profile"
      />
      

      <SidebarSection title="ORGANISATION" />

      <SidebarItem
        to="/departments"
        icon={<MdBusiness />}
        label="Départements"
      />
      <SidebarItem
        to="/users"
        icon={<RiTeamFill/>}
        label="Équipes"
      />

      <SidebarSection title="SECURITY" />

      <SidebarItem
        to="/roles"
        icon={<MdOutlineShield />}
        label="Rôles"
      />
      <SidebarItem
        to="/roles"
        icon={<MdOutlineShield />}
        label="Permissions"
      />
      <SidebarItem
        to="/roles"
        icon={<MdOutlineShield />}
        label="Sessions"
      />
      <SidebarSection title=" MONITORING" />
      <SidebarSection title=" SETTINGS" />

     

        </nav>

      </div>

      {/* Bas */}
       <div className="sidebar-bottom">
    <button className="logout-button">
      <MdOutlineLogout />
      Déconnexion
    </button>
  </div>


    </aside>
  );
}

export default Sidebar;