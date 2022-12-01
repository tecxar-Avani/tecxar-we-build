
import "regenerator-runtime/runtime";
import "../assets/scss/Theme.scss";
import { Provider } from "react-redux";
import store from "../store/";
import type { AppProps as NextAppProps, AppContext } from "next/app";
import "regenerator-runtime/runtime";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import Dashboard from ".";
import SideBar from "../components/SideBar";
import { Layout } from "antd";
import Home from ".";
import { useState } from "react";
import { useRouter } from "next/router";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
  userProps: P;
  setLoadings: Function;
  Component: P;
  subDomain: string;
} & Omit<NextAppProps<P>, "pageProps">;

const WeBuildApp = ({
  Component,
  pageProps,
  router,
  userProps,
  subDomain,
}: AppProps) => {
  const r = useRouter();
  return (
    <Provider store={store}>
      <Layout className="h-full">
        {/* <SideBar router={router}/> */}
        {r.pathname != "/newBuild" && <SideBar />}

        <Layout className="site-layout">
          <div className="mainPage">
            <Component {...pageProps} router={router} />
          </div>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default WeBuildApp;
