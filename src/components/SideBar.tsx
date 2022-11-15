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
  const [isActive, setIsActive] = useState(false);
  const [IsOn ,setIsOn ] = useState(false)
  const [IsChange , setIsChange] = useState(false)
  const handleAClick = () => {
    setIsActive(currentA => !currentA)
  };
  const handleBClick = () => {
    setIsOn(currentB => !currentB)
  };
  const handleCClick = () => {
    setIsChange(currentC => !currentC)
  };
  return (
    <>
      <div className="sidbar" >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-full d-flex px-3 flex-column justify-content-center align-items-center mySidebar"
          style={{backgroundColor: isActive ? '#FFEB3D' : IsOn ? '#214DEA' : IsChange ? '#44A82B' : 'white'}}
        >
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Link href="/search">
              <a onClick={handleAClick}>
                <Image src={`/img/user-pre.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/search">
              <a onClick={handleBClick}>
                <Image src={`/img/book.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Image src={`/img/profile.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/UserGuide">
              <a onClick={handleCClick}>
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
