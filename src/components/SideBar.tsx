import React, { useState } from "react";
import { Image, OverlayTrigger } from "react-bootstrap";
import { Layout, Menu, Tooltip } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
const { Sider } = Layout;

const SideBar = (toggle: any) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  // const url = window.location.origin;
  return (
    <>
      <div className="sidbar">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-full d-flex bg-white px-3 flex-column justify-content-center align-items-center mySidebar"
        >
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Link href="/">
              <a>
                <Image src={`/img/user-pre.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/search">
              <a>
                <Image src={`/img/book.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Image src={`/img/profile.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Image src={`/img/qa.png`} className="img-fluid" />
              </a>
            </Link>
          </div>
        </Sider>
      </div>
    </>
  );
};

export default SideBar;
