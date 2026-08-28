


import { FiUsers } from "react-icons/fi";
import { MdOutlineShield } from "react-icons/md";
import { LuActivity, LuClock3 } from "react-icons/lu";

import { useState } from "react";
import { useEffect } from "react";

import "../../dashboard/AdminDashboard.css";
import type { UserStats } from "../../dashboard/dashboard.types";
import { getUsersStats } from "../../../api/userApi";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import StatsGrid from "../../dashboard/components/StatsGrid";

import QuickActions from "../components/QuickActions";
 function ManagerDashboardPage() {

    const [stat,setStat]=useState<UserStats>('' as unknown as UserStats);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await getUsersStats();
                setStat(data);
            }

             catch(error){
                console.error("Erreur lors de la récupération des statistiques :", error);
             }
            }
            fetchStats();
    },[]);

    const stats = [

        {

            title:"Utilisateurs Actifs",

            value:stat?.activeUsers,

            

            trendColor:"#16a34a",

            description:"",

            icon:<FiUsers />,

            iconColor:"#15803d"

        },

        {

            title:"Tentatives Échouées (24h)",

            value:  stat?.totalFailedAttempts ,

            

            trendColor:"#16a34a",

            description:"",

            icon:<MdOutlineShield />,

            iconColor:"#ea580c"

        },

        {

            title:"locked accounts",

            value:stat?.lockedAccounts,

            

            trendColor:"#dc2626",

            description:"",

            icon:<LuActivity />,

            iconColor:"#2563eb"

        },

        {

            title:"Sessions Actives",

            value:stat?.totalUsers ,

        

            trendColor:"#16a34a",

            description:"",

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

            <div className="dashboard-bottom">
               
               <QuickActions />
            </div>

        </div>

    );

}

export default ManagerDashboardPage;