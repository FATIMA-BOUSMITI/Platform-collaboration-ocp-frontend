
interface SidebarSectionProps {
  title: string;
}

function SidebarSection({
  title,
}: SidebarSectionProps) {
  return (
    <p className="sidebar-section">
      {title}
    </p>
  );
}

export default SidebarSection;