import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { useSelector } from "react-redux";
import { saveInfoUser } from "../../user/redux/userSlice";

const { Header } = Layout;

const HeaderAdmin = ({ setCollapsed, collapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userInfo = useSelector((state) => state.userSlice.user);

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "40px",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "15px",
          width: 40,
          height: 40,
          backgroundColor: "#FF5A5F",
          transition: "0.3s ease",
          ":hover": {
            color: "#fff",
          },
        }}
      />

      <div style={{ marginRight: "20px", color: "#FF5A5F" }}>
        {userInfo && userInfo.name}
      </div>
    </Header>
  );
};

export default HeaderAdmin;
