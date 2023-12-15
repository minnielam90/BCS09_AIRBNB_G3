import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import adminRoute from "../route/adminRoute";
import { NavLink, useLocation } from "react-router-dom";

const MenuAdmin = () => {
  const [selectKey, setSelectKey] = useState(null);
  const pathname = useLocation();

  useEffect(() => {
    if (pathname) {
      switch (pathname) {
        case adminRoute.room:
          handleSelectedKey(2);
          break;
        case adminRoute.location:
          handleSelectedKey(3);
          break;
        case adminRoute.booking:
          handleSelectedKey(4);
          break;
        default:
          handleSelectedKey(1);
          break;
      }
    }
  }, [pathname]);

  const handleSelectedKey = (index) => {
    setSelectKey([`${index}`]);
  };

  return (
    <Menu
      className="space-y-6 pt-5"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={selectKey}
      selectedKeys={selectKey}
      items={[
        {
          key: "1",
          icon: <i className="fas fa-user"></i>,
          label: <NavLink to={adminRoute.user}>Người dùng</NavLink>,
        },
        {
          key: "2",
          icon: <i className="fas fa-house"></i>,
          label: <NavLink to={adminRoute.room}>Quản lý phòng</NavLink>,
        },
        {
          key: "3",
          icon: <i className="fas fa-location"></i>,
          label: <NavLink to={adminRoute.location}>Quản lý vị trí</NavLink>,
        },
        {
          key: "4",
          icon: <i className="fas fa-ticket"></i>,
          label: <NavLink to={adminRoute.booking}>Quản lý đặt phòng</NavLink>,
        },
        {
          type: "divider",
          style: { borderColor: "white" },
        },
        {
          key: "5",
          icon: <i className="fas fa-arrow-rotate-left"></i>,
          label: <NavLink>Trang chủ</NavLink>,
        },
      ]}
    />
  );
};

export default MenuAdmin;
