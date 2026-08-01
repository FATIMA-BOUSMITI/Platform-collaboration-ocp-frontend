import { useEffect, useState } from "react";
import "../styles/RoleStats.css";
import type { RoleCount } from "../../../types/role.types";
import { getRolesCountByUsers } from "../../../api/roleApi";


function RoleStats() {
  const [stat, setStat] = useState<RoleCount[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getRolesCountByUsers();
        setStat(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (

    <div className="role-stats">

      {stat.map((item: RoleCount) => (

        <div
          key={item.roleName}
          className={`role-stat-card ${item.roleName}`}
        >

          <h2>{item.userCount}</h2>

          <span>{item.roleName}</span>

        </div>

      ))}

    </div>

  );

}

export default RoleStats;