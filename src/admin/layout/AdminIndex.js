import React, { useState } from "react";
import { Layout, theme } from "antd";

const { Sider, Content } = Layout;
const AdminIndex = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout h-auto">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo flex justify-center p-10">
          <img
            src="https://www.theriver.asia/wp-content/uploads/2020/01/pngkey.com-airbnb-logo-png-605967.png"
            width="100%"
            height="100%"
          />
        </div>
      </Sider>
      <Layout>
        {/* <Headers setCollapsed={setCollapsed} collapsed={collapsed} /> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {/* {children} */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminIndex;
