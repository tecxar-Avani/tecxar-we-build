import "regenerator-runtime/runtime";
import "../assets/scss/Theme.scss";
import { Provider } from "react-redux";
import store from "../store/";
import type { AppContext, AppProps as NextAppProps } from "next/app";
import App from "next/app";
import "regenerator-runtime/runtime";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/SideBar";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import * as utils from '../utils';
import userService from "../service/user.service";
const cookieCutter = require("cookie-cutter");

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
  userProps: P;
  setLoadings: Function;
  Component: P;
  subDomain: string;
} & Omit<NextAppProps<P>, "pageProps">;

const WeBuildApp = ({ Component, pageProps, router ,userProps}: AppProps) => {
  const { user } = userProps
  const r = useRouter();
  const [authorization, setAuthorization] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [highLight, setHightLight] = useState(false);

  

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
          {r.pathname != "/newBuild" && <SideBar isLoggedIn={isLoggedIn} user={userProps.user} setHightLight={(data:boolean) => setHightLight(data)}/>}

          <Layout className="site-layout">
            <div className="mainPage">
              <Component
                {...pageProps}
                router={router}
                isLoggedIn={isLoggedIn}
                user={userProps}
                highLight={highLight}
              />
            </div>
          </Layout>
        </Layout>
      </Provider>
    </>
  );
};
WeBuildApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { ctx } = context;
  const originalUrl = ctx.pathname;
  let loggedInUser: any = {};
  loggedInUser = (ctx as NextPageContextRequest)!.req?.session?.user;
  if (utils.isBrowser()) {
    if (loggedInUser) { 
      // Logged In
      if (originalUrl == '/' && loggedInUser !== undefined) {
        ctx.res?.writeHead(302, { location: '/' });
        ctx.res?.end();
      } else if(!loggedInUser) {
        if(originalUrl == '/') {
          ctx.res?.writeHead(302, { location: '/' });
          ctx.res?.end();
        }
      }
    } else {
      // Not Logged In
      if (utils.isServer() && originalUrl != '/') ctx.res?.writeHead(302, { location: '/' }) && ctx.res?.end();
      // Show not logged in page instead
    }
    
  }
  // Pass data to the page via props
  return { pageProps, userProps: { user: loggedInUser } };
};
export default WeBuildApp;
