import React, { useEffect } from "react";
import { userLocalStorage } from "../api/localServiceAdmin";
import { adminRoute } from "./adminRoute";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = userLocalStorage.get()?.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate(adminRoute.login.path);
    }
  }, [user]);

  return user && user.role === "ADMIN" && <>{children}</>;
}
