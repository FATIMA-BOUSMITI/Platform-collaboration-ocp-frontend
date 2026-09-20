


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
 function EmployeeDashboardPage() {

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

            title:"Utilisateurs actifs",

            value:stat?.activeUsers,

            

            trendColor:"#16a34a",

            description:"",

            icon:<FiUsers />,

            iconColor:"#15803d"

        },

        {

            title:"Tentatives échouées (24h)",

            value:  stat?.totalFailedAttempts ,

            

            trendColor:"#16a34a",

            description:"",

            icon:<MdOutlineShield />,

            iconColor:"#ea580c"

        },

        {

            title:"Comptes verrouillés",

            value:stat?.lockedAccounts,

            

            trendColor:"#dc2626",

            description:"",

            icon:<LuActivity />,

            iconColor:"#2563eb"

        },

        {

            title:"Sessions actives",

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
                title="Tableau de bord employee"
                subtitle="Vue d'ensemble de votre activité sur la plateforme OCP."
            />

            <StatsGrid stats={stats}/>

            <div className="dashboard-bottom">
               
               <QuickActions />
            </div>

        </div>

    );

}

export default EmployeeDashboardPage;