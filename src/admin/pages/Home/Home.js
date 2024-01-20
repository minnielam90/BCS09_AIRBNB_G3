import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminRoute from "../../route/adminRoute";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(adminRoute.user.path);
  }, []);

  return <div>Đang chuyển hướng</div>;
};

export default Home;
