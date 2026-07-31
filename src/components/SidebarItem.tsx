import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?:()=>void
}

function SidebarItem({to,icon,label,onClick}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "sidebar-item active"
          : "sidebar-item"
      }
      onClick={onClick}
    >
      <span className="sidebar-icon">
        {icon}
      </span>

      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;