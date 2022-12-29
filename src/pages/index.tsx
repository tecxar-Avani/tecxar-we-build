import React, { useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../hooks";
import { userSelector } from "@/store/reducers/user.reducer";
import { Toast } from "react-toastify/dist/components";
// import Link from "antd/lib/typography/Link";
const { Content } = Layout;

const Home: NextPage = (props) => {
  console.log('props',props)
  const router = useRouter();
  const { loggedInUser ,toastLog} = useAppSelector(userSelector);

  // useEffect(() => {
  //  console.log("WWWWWWWWWWWWWWWW",toastLog)
  // }, [loggedInUser]);
  console.log("WWWWWWWWWWWWWWWW",toastLog)
  useEffect(() => {
    if (router.asPath == "/?isLoggedIn") {
      window.close();
    }
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="d-flex flex-row h-full">
        <Link href={"/search?selfLearning=true"}>
          <Content
            className="site-layout-background bg-black m-0"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {" "}
          </Content>
        </Link>
        <Link href="/search?selfLeaning=false">
          <Content
            className="site-layout-background bg-danger m-0"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {" "}
          </Content>
        </Link>

        <div className="position-absolute left-66 top-0">
          <h1>
            We<span className="text-white">Build</span>
          </h1>
        </div>
      </div>
    </>
  );
};
export default Home;
