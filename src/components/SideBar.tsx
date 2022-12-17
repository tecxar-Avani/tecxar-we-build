import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Layout, Modal } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleButton from "react-google-button";
import { useAppSelector } from "../hooks";
import { buildSelector } from "@/store/reducers/build.reducer";

const { Sider } = Layout;

const SideBar = (toggle: any) => {
  const { buildList, userBuilds, buildListByUrl } =
    useAppSelector(buildSelector);
  const router = useRouter();
  // const url = window.location.origin;
  const [sideBarBG, setSideBarBG] = useState("profileBG");
  const [modal5Open, setModal5Open] = useState(false);

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
       (buildListByUrl?.allBuilds && buildListByUrl.allBuilds.length > 0) || (buildListByUrl?.data &&buildListByUrl?.data?.length > 0) ||
      userBuilds?.box?.length > 0 ||
      userBuilds?.data?.length > 0
    ) {
      setSideBarBG("profileBG");
    }
  }, [buildList, userBuilds]);

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
      <Modal
        title=""
        centered
        open={modal5Open}
        className="btnrv"
        onCancel={handleCancel}
      >
        <div className="mb-n3">
          <a href={`/api/google`}>
            <GoogleButton className="m-auto googleButton" />
          </a>
        </div>
      </Modal>
    </>
  );
};

export default SideBar;
