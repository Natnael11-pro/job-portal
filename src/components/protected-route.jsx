/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  if (
    !user?.unsafeMetadata?.role &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
