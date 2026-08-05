import "../styles/TableCard.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function TableCard({ children }: Props) {
  return (
    <div className="table-card">
      {children}
    </div>
  );
}