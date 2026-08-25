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
import DirectorDashboardPage from "../features/employee/pages/EmployeeDashboardPage";
import ManagerDashboardPage from "../features/manager/pages/ManagerDashboardPage";
import EmployeeDashboardPage from "../features/employee/pages/EmployeeDashboardPage";
import ManagerLayout from "../layouts/ManagerLayout";
import EmployeeLayout from "../layouts/EmployeeLayout"; 
import RoleRoute from "./RoleRoute";
import ManagerKanbanPage from "../features/manager/Kanban/pages/ManagerKanbanPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes publiques */}
      
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>

       {/* ADMIN */}
       <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
       <Route element={<AdminLayout />}>

        <Route
            path="/dashboard"
            element={<AdminDashboardPage />}
        />

        <Route
            path="/users"
            element={<UsersPage />}
        />

        <Route
            path="/roles"
            element={<RolesPage />}
        />

        <Route
            path="/permissions"
            element={<PermissionsPage />}
        />
     </Route>
    </Route>


    {/* DIRECTOR */}
    <Route element={<DirectorLayout />}>

        <Route
            path="/director"
            element={<DirectorDashboardPage />}
        />

    </Route>


    {/* MANAGER */}
    <Route element={<ManagerLayout />}>

        <Route
            path="/manager"
            element={<ManagerDashboardPage />}
        />
        <Route path="/manager/kanban"  element={<ManagerKanbanPage />}/>

    </Route>


    {/* EMPLOYEE */}
    <Route element={<EmployeeLayout />}>

        <Route
            path="/employee"
            element={<EmployeeDashboardPage />}
        />

    </Route>

</Route>

        {/* Route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
       />
      <Route path="/users" element={<UsersPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;