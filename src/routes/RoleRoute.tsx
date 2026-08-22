import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/AuthStore";

interface Props {
    allowedRoles: string[];
}

export default function RoleRoute({ allowedRoles }: Props) {

    const role = useAuthStore(
        state => state.role
    );

    if (!role) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}