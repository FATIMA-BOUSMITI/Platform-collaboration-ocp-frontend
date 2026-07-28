import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";

import { FiUsers } from "react-icons/fi";
import { MdOutlineShield } from "react-icons/md";
import { LuActivity, LuClock3 } from "react-icons/lu";

function AdminDashboardPage() {

    const stats = [

        {

            title:"Utilisateurs Actifs",

            value:"2,405",

            trend:"↑ +12%",

            trendColor:"#16a34a",

            description:"vs le mois dernier",

            icon:<FiUsers />,

            iconColor:"#15803d"

        },

        {

            title:"Tentatives Échouées (24h)",

            value:"142",

            trend:"↗ -5%",

            trendColor:"#16a34a",

            description:"vs le mois dernier",

            icon:<MdOutlineShield />,

            iconColor:"#ea580c"

        },

        {

            title:"Temps de réponse",

            value:"45ms",

            trend:"↘ +2ms",

            trendColor:"#dc2626",

            description:"vs le mois dernier",

            icon:<LuActivity />,

            iconColor:"#2563eb"

        },

        {

            title:"Sessions Actives",

            value:"891",

            trend:"↑ +18%",

            trendColor:"#16a34a",

            description:"vs le mois dernier",

            icon:<LuClock3 />,

            iconColor:"#9333ea"

        }

    ];

    return (

        <div className="dashboard">

            <DashboardHeader
                title="Tableau de bord"
                subtitle="Vue d'ensemble de la plateforme d'authentification OCP."
            />

            <StatsGrid stats={stats}/>

        </div>

    );

}

export default AdminDashboardPage;