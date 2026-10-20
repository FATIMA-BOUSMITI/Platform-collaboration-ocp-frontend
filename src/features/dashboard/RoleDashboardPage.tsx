import { Link } from "react-router-dom";
import { FiFolder, FiMessageSquare, FiFileText, FiCheckSquare } from "react-icons/fi";
import { useAuthStore, getCurrentUserDisplayInfo } from "../auth/AuthStore";
import DashboardHeader from "./components/DashboardHeader";
import "./RoleDashboard.css";

interface Props { title: string; description: string; }

export default function RoleDashboardPage({ title, description }: Props) {
  const token = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const identity = getCurrentUserDisplayInfo(token);
  const actions = [
    { to: "/projects", label: "Projets", description: "Consulter les projets auxquels vous avez accès.", icon: FiFolder },
    { to: "/messages", label: "Messagerie", description: "Retrouver vos conversations et vos collaborateurs.", icon: FiMessageSquare },
    { to: "/documents", label: "Documents", description: "Consulter les documents partagés avec vous.", icon: FiFileText },
    ...(role === "EMPLOYEE" ? [{ to: "/tasks", label: "Mes tâches", description: "Retrouver les tâches qui vous sont attribuées.", icon: FiCheckSquare }] : []),
  ];

  return (
    <section className="role-dashboard">
      <DashboardHeader title={title} subtitle={description} />
      <p className="role-dashboard-account">Connecté avec <strong>{identity.email}</strong></p>
      <nav className="role-dashboard-actions" aria-label="Accès à votre espace">
        {actions.map(({ to, label, description: detail, icon: Icon }) => (
          <Link to={to} key={to} className="role-dashboard-card">
            <Icon aria-hidden="true" />
            <h2>{label}</h2>
            <p>{detail}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
}
