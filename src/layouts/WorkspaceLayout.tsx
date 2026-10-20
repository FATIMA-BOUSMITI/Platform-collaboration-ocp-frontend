import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FiBell,
  FiCheckSquare,
  FiChevronRight,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";
import {
  getCurrentUserDisplayInfo,
  useAuthStore,
} from "../features/auth/AuthStore";
import NotificationBell from "../features/notifications/NotificationBell";
import api from "../api/axiosClient";
import { errorMessage } from "../api/adminApi";
import AdminLayout from "./AdminLayout";
import "../styles/erp.css";
import "../features/manager/Kanban/styles/CollaborationBoard.css";
const dashboards: Record<string, string> = {
  ADMIN: "/dashboard",
  DIRECTOR: "/director",
  MANAGER: "/manager",
  EMPLOYEE: "/employee",
};
const roles: Record<string, string> = {
  ADMIN: "Administrateur système",
  DIRECTOR: "Direction",
  MANAGER: "Responsable d’équipe",
  EMPLOYEE: "Collaborateur",
};
export default function WorkspaceLayout() {
  const role = useAuthStore((s) => s.role) || "EMPLOYEE";
  if (role === "ADMIN") return <AdminLayout />;
  return <Workspace role={role} />;
}
function Workspace({ role }: { role: string }) {
  const [open, setOpen] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const token = useAuthStore((s) => s.accessToken),
    { displayName, initials } = getCurrentUserDisplayInfo(token);
  const location = useLocation(),
    navigate = useNavigate();
  const home = dashboards[role] || "/employee";
  const links = [
    { to: home, label: "Vue d’ensemble", icon: FiGrid },
    ...(role === "EMPLOYEE"
      ? [{ to: "/tasks", label: "Mes tâches", icon: FiCheckSquare }]
      : []),
    { to: "/projects", label: "Projets & Kanban", icon: FiFolder },
    { to: "/documents", label: "Documents", icon: FiFolder },
    { to: "/messages", label: "Messagerie", icon: FiMessageSquare },
    { to: "/notifications", label: "Notifications", icon: FiBell },
  ];
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  async function logout() {
    setBusy(true);
    try {
      await api.post("/auth/logout", {
        refreshToken: useAuthStore.getState().refreshToken,
      });
      useAuthStore.getState().logout();
      navigate("/", { replace: true });
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="erp-shell">
      <a className="erp-skip" href="#workspace-content">
        Aller au contenu
      </a>
      <header className="erp-navbar">
        <button
          className="erp-mobile-toggle"
          aria-label="Ouvrir la navigation"
          aria-controls="workspace-navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <FiMenu />
        </button>
        <Link to={home} className="erp-brand">
          <img src="/ocp-logo.png" alt="OCP" />
          <span>Espace collaboratif</span>
        </Link>
        <span className="erp-breadcrumb">
          {roles[role]}
          <FiChevronRight />
          {links.find((l) => l.to === location.pathname)?.label ||
            "Espace de travail"}
        </span>
        <div className="erp-navbar-end">
          <NotificationBell />
          <div className="erp-user">
            <span className="erp-avatar">{initials}</span>
            <span>
              <strong>{displayName}</strong>
              <small>{roles[role]}</small>
            </span>
          </div>
        </div>
      </header>
      {open && (
        <button
          className="erp-backdrop"
          aria-label="Fermer la navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        id="workspace-navigation"
        className={"erp-sidebar " + (open ? "is-open" : "")}
      >
        <div className="erp-sidebar-title">
          <span>MON ESPACE</span>
          <button
            className="erp-mobile-toggle"
            aria-label="Fermer la navigation"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
        </div>
        <nav aria-label="Navigation principale">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}>
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="erp-sidebar-footer">
          <span className="erp-workspace-label">OCP · Collaboration</span>
          <button disabled={busy} onClick={() => void logout()}>
            <FiLogOut />
            {busy ? "Déconnexion…" : "Déconnexion"}
          </button>
        </div>
      </aside>
      <main id="workspace-content" className="erp-content">
        {error && (
          <p className="admin-feedback error" role="alert">
            {error}
          </p>
        )}
        <Outlet />
      </main>
    </div>
  );
}
