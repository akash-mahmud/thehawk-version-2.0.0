import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./hooks/user-auth";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoutes({ children, ...rest }) {
  const auth = useAuth();

  if (auth.loadingUser) {
    return <p>Loading</p>;
  }

  return (
    <>
      {auth.user && !auth.loadingUser ? (
        <>
          <Outlet />{" "}
        </>
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
