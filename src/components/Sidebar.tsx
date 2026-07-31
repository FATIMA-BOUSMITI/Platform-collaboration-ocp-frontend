import "./styles/Sidebar.css";

import {
  MdOutlineDashboard,
  MdBusiness,
  MdOutlineLogout,
  MdOutlineClose
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiTeamFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiShield } from "react-icons/fi";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";
import { FiClock } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { FiShieldOff } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}



function Sidebar({ isOpen, onClose,onLogout }: SidebarProps) {
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
        onClick={onClose}
      />

      <SidebarSection title="USERS" />

      <SidebarItem
        to="/users"
        icon={<FiUsers/>}
        label="Liste des utilisateurs"
        onClick={onClose}
      />
      <SidebarItem
        to="/profile"
        icon={<FaRegUser />}
        label="Profile"
        onClick={onClose}
      />
      

      <SidebarSection title="ORGANISATION" />

      <SidebarItem
        to="/departments"
        icon={<MdBusiness />}
        label="Départements"
        onClick={onClose}
      />
      <SidebarItem
        to="/teams"
        icon={<RiTeamFill/>}
        label="Équipes"
        onClick={onClose}
      />

      <SidebarSection title="SECURITY" />

      <SidebarItem
        to="/roles"
        icon={<FiShield />}
        label="Rôles"
        onClick={onClose}
      />
      <SidebarItem
        to="/permissions"
        icon={<FiShieldOff />}
        label="Permissions"
        onClick={onClose}
      />
     

      <SidebarItem
        to="/sessions"
        icon={<FiShield />}
        label="Sessions"
        onClick={onClose}
      />
      <SidebarSection title=" MONITORING" />
      <SidebarItem
        to="/logs"
        icon={<FiClock />}
        label="Logs"
        onClick={onClose}
      />
      <SidebarItem
        to="/metrics"
        icon={<FiActivity />}
        label="Metrics"
        onClick={onClose}
      />
      <SidebarItem
        to="/alerts"
        icon={<FiAlertTriangle />}
        label="Alertes"
        onClick={onClose}
      />

      <SidebarSection title=" SETTINGS" />
      <SidebarItem
        to="/settings"
        icon={<FiSettings />}
        label="General"
        onClick={onClose}
      />
      <SidebarItem
        to="/notifications"
        icon={<FiBell />}
        label="Notifications"
        onClick={onClose}
      />
       <SidebarItem
        to="/backup"
        icon={<FiDatabase />}
        label="Backup"
        onClick={onClose}
      />


     

        </nav>

      </div>

      {/* Bas */}
      <div className="sidebar-bottom">
        <button className="logout-button" onClick={onLogout}>
          <MdOutlineLogout />
          Déconnexion
        </button>
      </div>


    </aside>
  );
}

export default Sidebar;