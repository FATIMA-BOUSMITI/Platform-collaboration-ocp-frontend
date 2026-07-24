import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarItem({to,icon,label,}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "sidebar-item active"
          : "sidebar-item"
      }
    >
      <span className="sidebar-icon">
        {icon}
      </span>

      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;