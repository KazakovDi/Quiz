import React from "react";
import RequireAuth from "../RequireAuth/RequireAuth";
import { Outlet } from "react-router-dom";
const AuthWrapper = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};

export default AuthWrapper;
