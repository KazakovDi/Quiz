import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
const RequireAuth = (props: any) => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }
  return <>{props.children}</>;
};

export default RequireAuth;
