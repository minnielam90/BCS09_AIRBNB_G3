import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import adminRoute from "../route/adminRoute";
import { NavLink, useLocation } from "react-router-dom";
import { userRoute } from "../../user/route/userRoute";

const MenuAdmin = () => {
  const [selectKey, setSelectKey] = useState(null);
  const pathname = useLocation();

  useEffect(() => {
    if (pathname) {
      switch (pathname.pathname) {
        case adminRoute.room.path:
          handleSelectedKey(2);
          break;
        case adminRoute.location.path:
          handleSelectedKey(3);
          break;
        case adminRoute.booking.path:
          handleSelectedKey(4);
          break;
        default:
          handleSelectedKey(1);
          break;
      }
    }
  }, [pathname]);

  const handleSelectedKey = (key) => {
    setSelectKey([`${key}`]);
  };

  return (
    <Menu
      className="space-y-6 pt-5"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[pathname.pathname]}
      selectedKeys={selectKey}
      items={[
        {
          key: "1",
          icon: <i className="fas fa-user"></i>,
          label: <NavLink to={adminRoute.user.path}>Người dùng</NavLink>,
        },
        {
          key: "2",
          icon: <i className="fas fa-house"></i>,
          label: <NavLink to={adminRoute.room.path}>Quản lý phòng</NavLink>,
        },
        {
          key: "3",
          icon: <i className="fas fa-location"></i>,
          label: (
            <NavLink to={adminRoute.location.path}>Quản lý vị trí</NavLink>
          ),
        },
        {
          key: "4",
          icon: <i className="fas fa-ticket"></i>,
          label: (
            <NavLink to={adminRoute.booking.path}>Quản lý đặt phòng</NavLink>
          ),
        },
        {
          type: "divider",
          style: { borderColor: "white" },
        },
        {
          key: "5",
          icon: <i className="fas fa-arrow-rotate-left"></i>,
          label: <NavLink to={userRoute.home.path}>Trang chủ</NavLink>,
        },
      ]}
    />
  );
};

export default MenuAdmin;
