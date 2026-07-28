import "./DashboardHeader.css"
interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

function DashboardHeader({title,subtitle,}: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <h1>{title}</h1>

      <p>{subtitle}</p>
    </div>
  );
}

export default DashboardHeader;