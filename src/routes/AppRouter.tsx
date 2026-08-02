import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import AdminDashboardPage from "../features/dashboard/AdminDashboardPage";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import RolesPage from "../features/roles/Pages/RolesPage";
import PermissionsPage from "../features/permissions/pages/PermissionsPage";

import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes publiques */}
        {/* Routes publiques */}
        {/* Routes publiques */}
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
/>

        {/* Routes protégées */}
        <Route element={ <ProtectedRoute>
              <AdminLayout />
         </ProtectedRoute>}>

          <Route
            path="/dashboard"
            element={<AdminDashboardPage />}
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

        {/* Route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
    path="/reset-password"
    element={<ResetPasswordPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;