import React, { useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import GoogleButton from "react-google-button";
import { Button } from "react-bootstrap";
// import Link from "antd/lib/typography/Link";
const { Content } = Layout;

const Home: NextPage = (props) => {
  const router = useRouter();
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
        {/* <Content
            className="site-layout-background bg-black m-0"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {" "}
          </Content>
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

        <div className="position-absolute we-build top-0">
          <h1>
            We<span className="text-white">Build</span>
          </h1>
        </div> */}
        <Image
          src={`/public/landingPage.png`}
          layout="fill"
          className="landingPage"
        ></Image>
        <div className="we-build">
          <Image
            src={`/public/we-build-awareness.png`}
            layout="fill"
            className="landingPage"
          ></Image>
        </div>
        <div className="centerDiv">
          <p className="listen justify-content-center">
            LISTEN TO YOUR INNER VOICE 
          </p>
          <p className="discover">TO DISCOVER</p>
          <p className="who">WHO YOU ARE</p>
         {!props.isLoggedIn && <Button
              id={`${props?.highLight && "vlink"}`}
            className="landigPageButton px-4 py-2 my-4"
            onClick={() => {
              // if (
              //   props.isLoggedIn == false ||
              //   props.isLoggedIn == undefined ||
              //   props.isLoggedIn == "undefined" ||
              //   loggedInUser?.length == 0
              // ) {
                // getCookie();
              // }
              window.open(`/api/google`, "_self");
            }}
            // style={props?.highLight ? {background:"white"} : ""}
          >
          BOOK YOUR ONBOARDING HERE
          </Button>}
        </div>
      </div>
    </>
  );
};
export default Home;
