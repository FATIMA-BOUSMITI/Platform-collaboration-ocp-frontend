import { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/AuthStore";
import { getTasksByAssignee } from "../../../api/taskApi";
import type { TaskResponse } from "../../../api/taskApi";

function EmployeeTasksPage() {
  const currentUserId = useAuthStore((state) => state.user?.userId ?? state.user?.sub ?? "");
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) {
      setLoading(false);
      return;
    }

    async function fetchTasks() {
      try {
        const response = await getTasksByAssignee(currentUserId);
        setTasks(response);
      } catch {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [currentUserId]);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, color: "#1f3029" }}>Mes tâches à faire</h2>
          <p style={{ margin: "8px 0 0", color: "#6b7a73" }}>Liste de vos tâches assignées et à traiter.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 20, background: "#fff", borderRadius: 14, border: "1px solid #e4ece7" }}>Chargement…</div>
      ) : tasks.length === 0 ? (
        <div style={{ padding: 24, background: "#fff", borderRadius: 14, border: "1px solid #e4ece7", color: "#53635c" }}>
          Aucune tâche assignée pour le moment.
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e4ece7", padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: "#1f3029" }}>{task.title}</h3>
              <span style={{ padding: "6px 10px", borderRadius: 999, background: "#edf7f1", color: "#146a45", fontSize: 12, fontWeight: 700 }}>
                {task.priority}
              </span>
            </div>
            <p style={{ margin: "10px 0 0", color: "#586d65", lineHeight: 1.6 }}>{task.description || "Aucune description."}</p>
            <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap", color: "#4d655d", fontSize: 12 }}>
              <span>Statut : {task.status}</span>
              <span>Assignée à : {task.assigneeId ?? "Non assignée"}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployeeTasksPage;
