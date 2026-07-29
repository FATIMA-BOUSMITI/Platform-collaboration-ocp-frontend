export interface DashboardStat {
  title: string;
  value: string | number;
  trend: string;
  trendColor: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

export interface Activity {
  id: number;
  title: string;
  user: string;
  time: string;
  color: string;
}

export interface QuickAction {
  id: number;
  title: string;
  icon: React.ReactNode;
}
export interface UserStats {

    totalUsers: number;

    activeUsers: number;

    lockedAccounts: number;

    totalFailedAttempts: number;

    usersWithFailedAttempts: number;

}