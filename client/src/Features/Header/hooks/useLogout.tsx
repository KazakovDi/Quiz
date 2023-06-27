import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/UserSlice";
import { useAppDispatch } from "../../../Redux/store";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const Func = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  return Func;
};
