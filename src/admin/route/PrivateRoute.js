import React, { useEffect } from "react";
import { adminRoute } from "./adminRoute";
import { useNavigate } from "react-router-dom";
import { getAdminLocalStore } from "../api/localServiceAdmin";

export default function PrivateRoute({ children }) {
  const admin = getAdminLocalStore("admin_info");
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.role !== "ADMIN") {
      navigate(adminRoute.login.path);
    }
  }, [admin]);

  return admin && admin.role === "ADMIN" && <>{children}</>;
}
