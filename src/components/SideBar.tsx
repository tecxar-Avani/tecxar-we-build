import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Layout } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "../hooks";
import { buildSelector } from "@/store/reducers/build.reducer";
import LogInButton from "./LogInButton";

const { Sider } = Layout;

const SideBar = (toggle: any) => {
  const { buildList, userBuilds, buildListByUrl } =
    useAppSelector(buildSelector);
  const router = useRouter();
  // const url = window.location.origin;
  const [sideBarBG, setSideBarBG] = useState("profileBG");
  const [modal5Open, setModal5Open] = useState(false);
  const [buildListData, setBuildListData] = useState([buildList?.box]);

  useEffect(() => {
    setBuildListData(buildList?.box);
  }, [buildList]);

  useEffect(() => {
    setBuildListData([]);
  }, [buildListByUrl]);

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
  }, [router.asPath]);

  useEffect(() => {
    if (
      (buildListByUrl?.data && buildListByUrl?.data?.length > 0 && buildListData?.length == 0) ||
      (buildListByUrl?.results && buildListByUrl?.results?.length > 0 && buildListData?.length == 0) ||
      (userBuilds?.box?.length > 0 && buildListData?.length == 0)||
      (userBuilds?.data?.length > 0&& buildListData?.length == 0) ||
      (buildListByUrl?.allBuilds?.length > 0  && buildListData?.length == 0)

      // (buildListByUrl.allBuilds &&
      //         buildListByUrl.allBuilds.length > 0 &&
      //         buildListData?.length == 0) || (!buildListByUrl.allBuilds &&
      //           buildListByUrl?.box?.length == 0 &&
      //           buildListByUrl.data?.length > 0 &&
      //           buildListData?.length == 0) || ( buildListByUrl?.results?.length > 0 &&
      //             buildListData?.length == 0)
    ) {
      setSideBarBG("profileBG");
    }
  }, [buildList, userBuilds,buildListByUrl,buildListData]);

  const handleCancel = () => {
    setModal5Open(false);
  };
  console.log("testtest",buildList)
  console.log("buildListByUrl",buildListByUrl)
  console.log("userBuilds",userBuilds)
  console.log("buildListData",buildListData)
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
          className={`h-full d-flex px-3 flex-column justify-content-center align-items-center mySidebar ${sideBarBG}`}
        >
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Link href={"/search?selfLearning=true"}>
              <a>
                <Image src={`/img/user-pre.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href="/search?selfLeaning=false">
              <a>
                <Image src={`/img/book.png`} className="img-fluid" />
              </a>
            </Link>
            <Link href={toggle.isLoggedIn ? "/profile" : router.asPath}>
              <a>
                <span onClick={(e) => setModal5Open(!toggle.isLoggedIn)}>
                  <Image src={`/img/profile.png`} className="img-fluid" />
                </span>
              </a>
            </Link>
            <Link href="/UserGuide">
              <a>
                <Image src={`/img/qa.png`} className="img-fluid" />
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
      />
    </>
  );
};

export default SideBar;
