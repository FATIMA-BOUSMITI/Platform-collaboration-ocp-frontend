import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import AdminDashboardPage from "../features/dashboard/AdminDashboardPage";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import RolesPage from "../features/roles/Pages/RolesPage";
import PermissionsPage from "../features/permissions/pages/PermissionsPage";

import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";

import UsersPage from "../features/users/UsersPage";
import DirectorLayout from "../layouts/DirectorLayout";
import DirectorDashboardPage from "../features/director/pages/DirectorDashboardPage";
import ManagerDashboardPage from "../features/manager/pages/ManagerDashboardPage";
import EmployeeDashboardPage from "../features/employee/pages/EmployeeDashboardPage";
import ManagerLayout from "../layouts/ManagerLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import RoleRoute from "./RoleRoute";
import ManagerKanbanPage from "../features/manager/Kanban/pages/KanbanPage";
import CommunicationPage from "../features/communication/pages/CommunicationPage";
import DepartmentsPage from "../features/departments/DepartmentsPage";
import TeamsPage from "../features/teams/TeamsPage";
import ProfilePage from "../features/profile/ProfilePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<AdminDashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/permissions" element={<PermissionsPage />} />
            </Route>
          </Route>

          <Route element={<DirectorLayout />}>
            <Route path="/director" element={<DirectorDashboardPage />} />
          </Route>

          <Route element={<ManagerLayout />}>
            <Route path="/manager" element={<ManagerDashboardPage />} />
            <Route path="/kanban" element={<ManagerKanbanPage />} />
            <Route path="/messages" element={<CommunicationPage />} />
          </Route>

          <Route element={<EmployeeLayout />}>
            <Route path="/employee" element={<EmployeeDashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;