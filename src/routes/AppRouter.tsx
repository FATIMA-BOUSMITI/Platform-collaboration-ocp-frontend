import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";
import { Dashboard as AdminDashboardPage, TeamsPage, ProfilePage, SessionsPage, SettingsPage, NotificationsPage, ActivityPage } from "../features/admin/AdminPages";
import AdminLayout from "../layouts/AdminLayout";
import DirectorLayout from "../layouts/DirectorLayout";
import DirectorDashboardPage from "../features/director/pages/DirectorDashboardPage";
import ManagerDashboardPage from "../features/manager/pages/ManagerDashboardPage";
import ManagerLayout from "../layouts/ManagerLayout";
import EmployeeDashboardPage from "../features/employee/pages/EmployeeDashboardPage";
import EmployeeTasksPage from "../features/employee/pages/EmployeeTasksPage";
import EmployeeLayout from "../layouts/EmployeeLayout";
import RolesPage from "../features/roles/Pages/RolesPage";
import PermissionsPage from "../features/permissions/pages/PermissionsPage";
import UsersPage from "../features/users/UsersPage";
import DepartmentsPage from "../features/departments/DepartmentsPage";


import ManagerKanbanPage from "../features/manager/Kanban/pages/KanbanPage";
import CommunicationPage from "../features/communication/pages/CommunicationPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";
import DocumentsLayout from "../layouts/DocumentsLayout";
import CommunicationLayout from "../layouts/CommunicationLayout";
import ProjectsLayout from "../layouts/ProjectsLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const router=createBrowserRouter(createRoutesFromElements(
      <>
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
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/activity" element={<ActivityPage />} />
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={["DIRECTOR"]} />}>
            <Route element={<DirectorLayout />}>
              <Route path="/director" element={<DirectorDashboardPage />} />
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={["MANAGER"]} />}>
            <Route element={<ManagerLayout />}>
              <Route path="/manager" element={<ManagerDashboardPage />} />
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={["EMPLOYEE"]} />}>
            <Route element={<EmployeeLayout />}>
              <Route path="/employee" element={<EmployeeDashboardPage />} />
              <Route path="/tasks" element={<EmployeeTasksPage />} />
            </Route>
          </Route>

          <Route element={<ProjectsLayout />}>
            <Route path="/projects" element={<ManagerKanbanPage />} />
            <Route path="/kanban" element={<ManagerKanbanPage />} />
          </Route>
          <Route element={<DocumentsLayout />}>
            <Route path="/documents" element={<DocumentsPage />} />
          </Route>
          <Route element={<CommunicationLayout />}>
            <Route path="/messages" element={<CommunicationPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </>
));
function AppRouter(){return <RouterProvider router={router}/>;}

export default AppRouter;
