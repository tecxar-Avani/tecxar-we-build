import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Layout } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../hooks";
import { buildSelector } from "@/store/reducers/build.reducer";
import { userSelector, windowStatus } from "@/store/reducers/user.reducer";

import LogInButton from "./LogInButton";

const { Sider } = Layout;

const SideBar = (toggle: any) => {
  const { buildList, userBuilds, buildListByUrl } =
    useAppSelector(buildSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sideBarBG, setSideBarBG] = useState("profileBG");
  const [modal5Open, setModal5Open] = useState(false);
  const [buildListData, setBuildListData] = useState(buildList?.box);
  const { loggedInUser } = useAppSelector(userSelector);

  useEffect(() => {
    if (loggedInUser.length > 0) {
      setTimeout(() => {
        router.reload();
      }, 3000);
    }
  }, [loggedInUser]);

  useEffect(() => {
    setBuildListData(buildList?.box);
  }, [buildList]);
  
  useEffect(() => {
      // if (router.asPath == "/?isLoggedIn") {
       dispatch(windowStatus())
      // }
  }, []);

  useEffect(() => {
    setBuildListData([]);
  }, [buildListByUrl, userBuilds]);

  useEffect(() => {
    if (buildListByUrl?.data?.length > 0 && buildListData?.length === 0) {
      setSideBarBG("profileBG");
    } else if (
      buildListByUrl.results?.length > 0 &&
      buildListData?.length == 0
    ) {
      setSideBarBG("profileBG");
    } else if (userBuilds?.data?.length > 0 && buildListData?.length == 0) {
      setSideBarBG("profileBG");
    } else if (
      buildListByUrl?.allBuilds?.length > 0 &&
      buildListData?.length == 0
    ) {
      setSideBarBG("profileBG");
    } else if (router.asPath == "/search?selfLearning=true") {
      setSideBarBG("SelfLearningBG");
    } else if (router.asPath == "/search?selfLeaning=false") {
      setSideBarBG("ThingsLearningBG");
    }
  }, [userBuilds, buildListByUrl, buildListData]);

  useEffect(() => {
    if (router.asPath == "/search?selfLearning=true") {
      setSideBarBG("SelfLearningBG");
    }
    if (router.asPath == "/search?selfLeaning=false") {
      setSideBarBG("ThingsLearningBG");
    }
    if (router.asPath == "/profile") {
      setSideBarBG("profileBG");
    }
    if (router.asPath == "/UserGuide") {
      setSideBarBG("UserGuideBG");
    }
    if(router.asPath == "/"){
      setSideBarBG("profileBG");
    }
  }, [router.asPath]);
  const handleCancel = () => {
    setModal5Open(false);
  };

  return (
    <>
      <div
        className={
          toggle.router?.state?.pathname == "/newBuild"
            ? `sidbar d-none`
            : "sidbar"
        }
      >
        <Sider
          trigger={null}
          collapsible
          className={`h-full d-flex flex-column justify-content-center mySidebar ${sideBarBG} ${router.asPath == `/` ? 'Myborder' : ''}`}
        >
          <div className="d-flex flex-column justify-content-between align-items-center">
            {/* <Link href={"/search?selfLearning=true"}>
              <a>
                <Image src={`/img/user-pre.png`} className="img-fluid sideImg" />
              </a>
            </Link> */}
            <Link href="/search?selfLeaning=false">
              <a>
                <Image src={`/img/user-pre.png`} className="img-fluid sideImg" />
              </a>
            </Link>
            <Link
              href={
                toggle.isLoggedIn || loggedInUser?.length > 0
                  ? "/profile"
                  : router.asPath
              }
            >
              <a>
                <span
                  onClick={(e) =>
                    toggle.isLoggedIn || loggedInUser?.length > 0
                      ? router.asPath == `/` ? toggle.setHightLight(false) : setModal5Open(false)
                      : router.asPath == `/` ? toggle.setHightLight(true) : setModal5Open(true)
                  }
                >
                  <Image src={`/img/profile.png`} className="img-fluid sideImg" />
                </span>
              </a>
            </Link>
            <Link href="/UserGuide">
              <a>
                <Image src={`/img/qa.png`} className="img-fluid sideImg" />
              </a>
            </Link>
          </div>
        </Sider>
      </div>
      <LogInButton
        title=""
        open={modal5Open}
        className="btnrv"
        handleCancel={handleCancel}
        isLoggedIn={toggle.isLoggedIn}
        user={toggle.user}
        // setAuth={(data: any) => {
        //   setAuth(data);
        //   setModal5Open(false);
        // }}
      />
    </>
  );
};

export default SideBar;
