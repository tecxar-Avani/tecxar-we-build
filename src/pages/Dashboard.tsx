import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

const Dashboard = () => {
  return (
    <>
      <Layout className="site-layout">
        {/* <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header> */}
        <div className="d-flex flex-row h-full">
          <Content
            className="site-layout-background bg-black m-0"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* Content */}
          </Content>
          <Content
            className="site-layout-background bg-danger m-0"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* Content */}
          </Content>
        </div>
      </Layout>
      <div className="position-absolute left-10">
        <h1>
          We<span className="text-white">Build</span>
        </h1>
      </div>
    </>
  );
};
export default Dashboard;
