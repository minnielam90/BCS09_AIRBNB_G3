import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../pages/components/Admin.css";
import { adminRoute } from "../route/adminRoute";
import { adminLogout } from "../api/localServiceAdmin";
import { userRoute } from "../../user/route/userRoute";

const { Header } = Layout;

const HeaderAdmin = ({ setCollapsed, collapsed }) => {
  const { admin } = useSelector((state) => state.adminSlice);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    adminLogout();
    window.location.href = userRoute.home.path;
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50px",
        width: "100%",
      }}
    >
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>

      {admin ? (
        <div className="pr-60">
          <span className="mr-2 text-[#ff4d4f] font-semibold">
            {admin.name}
          </span>
          <Button
            className="button-header-admin"
            type="primary"
            danger
            onClick={() => handleLogout()}
          >
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Button type="primary" danger>
          <Link to={adminRoute.login.path}>Đăng nhập</Link>
        </Button>
      )}
    </Header>
  );
};

export default HeaderAdmin;
