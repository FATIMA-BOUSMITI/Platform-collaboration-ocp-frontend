import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/AuthStore";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;