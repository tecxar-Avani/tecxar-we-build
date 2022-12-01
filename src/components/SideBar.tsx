import React, { useState } from "react";
import { Image, OverlayTrigger } from "react-bootstrap";
import { Layout, Menu, Tooltip } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import HeaderTitle from "./headerTitle";

const { Sider } = Layout;

const SideBar = (toggle: any) => {

  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  // const url = window.location.origin;
  const [IsSelfLearning, setIsSelfLearning] = useState(false);
  const [IsOtherLearning, setIsOtherLearning] = useState(false);
  const [IsProfile, setIsProfile] = useState(false);
  const [IsUserGuide, setIsUserGuide] = useState(false);
  const selfLearning = () => {
    setIsSelfLearning(true);
  };
  const otherLearnning = () => {
    setIsSelfLearning(false);
    setIsUserGuide(false);
    setIsProfile(false);
    setIsOtherLearning(true);
  };
  const profile = () => {
    setIsSelfLearning(false);
    setIsOtherLearning(false);
    setIsUserGuide(false);
    setIsProfile(true);
  };
  const userGuide = () => {
    setIsSelfLearning(false);
    setIsOtherLearning(false);
    setIsProfile(false);
    setIsUserGuide(true);
  };

  return (
    <>
      
      <div
        className={
          toggle.router?.state?.pathname == "/newBuild"
            ? `sidbar sssssss d-none`
            : "sidbar sssssss"
        }
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`h-full d-flex px-3 flex-column justify-content-center align-items-center mySidebar ${
            IsSelfLearning
              ? "SelfLearningBG"
              : IsOtherLearning
              ? "ThingsLearningBG"
              : IsUserGuide
              ? "UserGuideBG"
              : IsProfile
              ? "bg-white"
              : "bg-white"
          }`}
        >
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Link href={"/search?selfLearning=true"}>
              <a onClick={selfLearning}>
                <Image src={`/img/user-pre.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/search?selfLeaning=false">
              <a onClick={otherLearnning}>
                <Image src={`/img/book.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/profile">
              <a onClick={profile}>
                <Image src={`/img/profile.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/UserGuide">
              <a onClick={userGuide}>
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
