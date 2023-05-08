import "regenerator-runtime/runtime";
import "../assets/scss/Theme.scss";
import { Provider } from "react-redux";
import store from "../store/";
import type { AppProps as NextAppProps } from "next/app";
import "regenerator-runtime/runtime";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/SideBar";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
const cookieCutter = require("cookie-cutter");

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
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setAuthorization(cookieCutter.get("authorization"));
  }, []);

  useEffect(() => {
    if (authorization) {
      setIsLoggedIn(true);
    }
  }, [authorization, isFocus]);

  useEffect(() => {
    window.addEventListener("focus", () => setIsFocus(true));
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Provider store={store}>
        <Layout className="h-full">
          {/* <SideBar router={router}/> */}
          {r.pathname != "/newBuild" && <SideBar isLoggedIn={isLoggedIn} />}

          <Layout className="site-layout">
            <div className="mainPage">
              <Component
                {...pageProps}
                router={router}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </Layout>
        </Layout>
      </Provider>
    </>
  );
};

export default WeBuildApp;
