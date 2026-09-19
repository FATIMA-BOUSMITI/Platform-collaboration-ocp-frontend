
import { FiUsers } from "react-icons/fi";
import { MdOutlineShield } from "react-icons/md";
import { LuActivity, LuClock3 } from "react-icons/lu";
import { useEffect, useState } from "react";

import "../../dashboard/AdminDashboard.css";
import type { UserStats } from "../../dashboard/dashboard.types";
import { getUsersStats } from "../../../api/userApi";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import StatsGrid from "../../dashboard/components/StatsGrid";

export default function DirectorDashboardPage() {
    const [stats, setStats] = useState<UserStats>({} as UserStats);

    useEffect(() => {
        getUsersStats()
            .then(setStats)
            .catch((error) => console.error("Erreur lors de la récupération des statistiques :", error));
    }, []);

    return (
        <div className="dashboard">
            <DashboardHeader
                title="Tableau de bord directeur"
                subtitle="Vue d'ensemble de l'activité de votre organisation."
            />
            <StatsGrid stats={[
                { title: "Utilisateurs actifs", value: stats?.activeUsers, trendColor: "#16a34a", description: "", icon: <FiUsers />, iconColor: "#15803d" },
                { title: "Tentatives échouées (24h)", value: stats?.totalFailedAttempts, trendColor: "#16a34a", description: "", icon: <MdOutlineShield />, iconColor: "#ea580c" },
                { title: "Comptes verrouillés", value: stats?.lockedAccounts, trendColor: "#dc2626", description: "", icon: <LuActivity />, iconColor: "#2563eb" },
                { title: "Sessions actives", value: stats?.totalUsers, trendColor: "#16a34a", description: "", icon: <LuClock3 />, iconColor: "#9333ea" },
            ]} />
        </div>
    );
}