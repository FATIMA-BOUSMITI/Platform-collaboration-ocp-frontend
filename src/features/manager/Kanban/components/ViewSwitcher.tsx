import { FiGrid, FiList } from "react-icons/fi";

interface Props {
    view: "kanban" | "list";
    onViewChange: (view: "kanban" | "list") => void;
}

export default function ViewSwitcher({
    view,
    onViewChange
}: Props) {

    return (
        <div className="view-switcher">

            <button
                className={view === "kanban" ? "active" : ""}
                onClick={() => onViewChange("kanban")}
            >
                <FiGrid />
            </button>

            <button
                className={view === "list" ? "active" : ""}
                onClick={() => onViewChange("list")}
            >
                <FiList />
            </button>

        </div>
    );
}