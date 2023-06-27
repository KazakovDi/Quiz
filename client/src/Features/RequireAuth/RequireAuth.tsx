import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
const RequireAuth = (props: any) => {
  const token = window.localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }
  return <>{props.children}</>;
};

export default RequireAuth;
