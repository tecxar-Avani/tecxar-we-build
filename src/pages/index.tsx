import React from "react";
import type { NextPage } from "next";
import { Layout } from "antd";
import Head from "next/head";
const { Content } = Layout;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>dashboard</title>
      </Head>

      <Content
        className="site-layout-background bg-black m-0"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      ></Content>
      <Content
        className="site-layout-background bg-danger m-0"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      ></Content>
      <div className="position-absolute left-66 top-0">
        <h1>
          We<span className="text-white">Build</span>
        </h1>
      </div>
    </>
  );
};
export default Home;
