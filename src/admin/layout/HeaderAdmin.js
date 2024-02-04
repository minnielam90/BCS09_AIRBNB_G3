import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Space, Menu } from "antd";
import { useSelector } from "react-redux";
import { logout } from "../../user/api/localUser";
import { NavLink } from "react-router-dom";
import "../pages/components/Admin.css";

const { Header } = Layout;

const HeaderAdmin = ({ setCollapsed, collapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useSelector((state) => state.userSlice);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {user ? (
        <Space>
          <Menu
            mode="horizontal"
            visible={isMenuOpen}
            onOpenChange={(open) => setIsMenuOpen(open)}
          >
            <Menu.SubMenu
              className="pr-60"
              key="user-menu"
              title={
                <div className="dropbtn flex space-x-2 items-center">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      fill: "none",
                      height: 16,
                      width: 16,
                      stroke: "currentcolor",
                      strokeWidth: 3,
                      overflow: "visible",
                      color: "black",
                    }}
                  >
                    <g fill="none" fillRule="nonzero">
                      <path d="m2 16h28" />
                      <path d="m2 24h28" />
                      <path d="m2 8h28" />
                    </g>
                  </svg>
                  <div>
                    <NavLink to={`/personalPage/${user.id}`}>
                      {user.avatar ? (
                        <img
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                          }}
                          src={user.avatar}
                          alt=""
                        />
                      ) : (
                        <svg
                          className=""
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: "30px",
                            width: "30px",
                          }}
                        >
                          <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                        </svg>
                      )}
                    </NavLink>
                  </div>
                </div>
              }
              style={{ borderBottom: "none" }}
            >
              <Menu.Item
                key="personalInfo"
                onClick={() => console.log("Redirect to personal info")}
              >
                {user.name}
              </Menu.Item>
              <Menu.Item
                key="logout"
                onClick={() => logout()}
                style={{ borderBottom: "none" }}
              >
                Đăng xuất
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Space>
      ) : (
        <Space direction="vertical">
          <Space wrap>
            <Menu
              mode="horizontal"
              triggerSubMenuAction="click"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu.SubMenu
                key="dropdown-menu"
                title={
                  <Button className="rounded-full flex items-center py-5">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        fill: "none",
                        height: 16,
                        width: 16,
                        stroke: "currentcolor",
                        strokeWidth: 3,
                        overflow: "visible",
                      }}
                    >
                      <g fill="none" fillRule="nonzero">
                        <path d="m2 16h28" />
                        <path d="m2 24h28" />
                        <path d="m2 8h28" />
                      </g>
                    </svg>
                    <svg
                      className="ml-3"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "30px",
                        width: "30px",
                        fill: "currentcolor",
                      }}
                    >
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                    </svg>
                  </Button>
                }
              >
                <Menu.Item
                  key="personalInfo"
                  onClick={() => console.log("Redirect to personal info")}
                >
                  Thông tin cá nhân
                </Menu.Item>
                <Menu.Item key="logout" onClick={() => logout()}>
                  Đăng xuất
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Space>
        </Space>
      )}
    </Header>
  );
};

export default HeaderAdmin;
