import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import AdminDashboardPage from "../features/dashboard/AdminDashboardPage";
import AdminLayout from "../layouts/AdminLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes publiques */}
        <Route path="/" element={<LoginPage />} />

        {/* Routes protégées (pour l'instant sans authentification) */}
        <Route element={<AdminLayout />}>

          <Route
            path="/dashboard"
            element={<AdminDashboardPage />}
          />

        </Route>

        {/* Route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;