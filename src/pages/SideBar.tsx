import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="h-full d-flex bg-white px-3 flex-column justify-content-center align-items-center mySidebar"
    >
      <div className="d-flex flex-column justify-content-between align-items-center">
        <Image src="../../img/user-pre.png" className="img-fluid" />
        <Image src="../../img/book.png" className="img-fluid" />
        <Image src="../../img/profile.png" className="img-fluid" />
        <Image src="../../img/qa.png" className="img-fluid" />
      </div>
    </Sider>
  );
};

export default SideBar;
