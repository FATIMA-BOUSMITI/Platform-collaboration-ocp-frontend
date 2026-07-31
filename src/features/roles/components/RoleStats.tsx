import "../styles/RoleStats.css";

const stats = [

  {
    count: 1,
    label: "Administrateur",
    color: "admin"
  },

  {
    count: 1,
    label: "Directeur",
    color: "director"
  },

  {
    count: 2,
    label: "Chef de Projet",
    color: "manager"
  },

  {
    count: 3,
    label: "Employé",
    color: "employee"
  }

];

function RoleStats() {

  return (

    <div className="role-stats">

      {stats.map((item) => (

        <div
          key={item.label}
          className={`role-stat-card ${item.color}`}
        >

          <h2>{item.count}</h2>

          <span>{item.label}</span>

        </div>

      ))}

    </div>

  );

}

export default RoleStats;