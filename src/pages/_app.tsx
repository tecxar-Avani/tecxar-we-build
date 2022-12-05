import "regenerator-runtime/runtime";
import "../assets/scss/Theme.scss";
import { Provider } from "react-redux";
import store from "../store/";
import type { AppContext, AppProps as NextAppProps } from "next/app";
import "regenerator-runtime/runtime";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/SideBar";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import { getUserAuth, userSelector } from "../store/reducers/user.reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import App from "next/app";
import * as utils from "../utils";
import api from "../plugins/api";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
  userProps: P;
  setLoadings: Function;
  Component: P;
  subDomain: string;
} & Omit<NextAppProps<P>, "pageProps">;

const WeBuildApp = ({ Component, pageProps, router }: AppProps) => {
  const r = useRouter();
  const [authorization, setAuthorization] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let authorization = cookieCutter.get("authorization");
    setAuthorization(authorization);
  }, []);

  useEffect(() => {
    if (authorization) {
      setIsLoggedIn(true);
    }
  }, [authorization]);

  return (
    <Provider store={store}>
      <Layout className="h-full">
        {/* <SideBar router={router}/> */}
        {r.pathname != "/newBuild" && <SideBar />}

        <Layout className="site-layout">
          <div className="mainPage">
            <Component {...pageProps} router={router} isLoggedIn={isLoggedIn} />
          </div>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default WeBuildApp;
