import { FiFilter } from "react-icons/fi";

import "../styles/FilterButton.css";

interface Props {
  onClick?: () => void;
}

export default function FilterButton({ onClick }: Props) {
  return (
    <button
      className="filter-button"
      onClick={onClick}
    >
      <FiFilter />
      <span>Filtres</span>
    </button>
  );
}