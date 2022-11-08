// import 'tailwindcss/tailwind.css';
// import '../styles/globals.css';
import 'regenerator-runtime/runtime';
import '../assets/scss/Theme.scss';
import { Provider } from 'react-redux';
import store from '../store/';
import type { AppProps as NextAppProps, AppContext } from 'next/app';
import { useEffect, useState } from 'react';
import * as utils from '../utils';
import App from 'next/app';
import * as api from '../plugins/api';
import Head from 'next/head';
import 'regenerator-runtime/runtime';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { SSRProvider } from 'react-bootstrap';

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
  userProps: P;
  setLoadings: Function;
  Component: P;
  subDomain: string;
} & Omit<NextAppProps<P>, 'pageProps'>;

let allowPages: string[] = [
  '/',
  '/forgetPassword',
  '/resetPassword',
  '/register',
  '/register/registerCompany',
  '/404',
  '/register/success',
  '/register/success',
  '/register/verifyEmail',
];

const WeBuildApp = ({ Component, pageProps, router, userProps, subDomain }: AppProps) => {
  useEffect(() => {
    getLocation();
  }, [Component]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      // console.log('Geolocation is not supported by your browser');
      // setStatus('Geolocation is not supported by your browser');
    } else {
      // setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        position => {
          // console.log('Geolocation latitude', position.coords.latitude);
          // console.log('Geolocation longitude', position.coords.longitude);
          // setStatus(null);
          // setLat(position.coords.latitude);
          // setLng(position.coords.longitude);
        },
        () => {
          // console.log('Unable to retrieve your location');
          // setStatus('Unable to retrieve your location');
        },
      );
    }
  };

  const favicon = userProps.user && userProps.user.favicon ? `/uploads/Company/${userProps.user.favicon}` : '/favicon.ico';

  return (
    <Provider store={store}>
      <SSRProvider>
        <Head>
          <title>{userProps.user && userProps.user.companyName ? userProps.user.companyName : 'PeoplePro'}</title>
          <link rel="shortcut icon" id="favicon" href={favicon}></link>
        </Head>
        {/* {(loading ? <div className="absolute inset-0 z-50 bg-white opacity-90 flex items-center"><img className="m-auto" src="/loading.svg" /></div> : '')} */}
        <ToastContainer autoClose={2000} />
        {/* {console.log('userProps', userProps)}
        {console.log('pageProps', pageProps)} */}
        {/* <ConnectedRouter> */}

        {userProps.loggedIn !== false && !allowPages.includes(router.pathname) ? (
         ''
         
        ) : (
         ''
        )}
      </SSRProvider>
    </Provider>
  );
};

WeBuildApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { ctx } = context;
  let subDomain;
  const domain = utils.isBrowser() ? window.location.host : ctx.req?.headers.host;
  const hostArr = domain?.split('.');
  if (hostArr && hostArr?.length > 1) {
    subDomain = hostArr[0];
  }
  const originalUrl = ctx.pathname;
  let loggedIn = false;
  let permission;
  let modulesForMenu;
  let loggedInUser;
   if (utils.isBrowser()) {
    
    const { data } = await api.default.get('/auth');
    loggedIn = data.status;
    if (loggedIn) {
      loggedInUser = data.data;
      permission = data.permissionData;
      modulesForMenu = data.modulesForMenu;
      if (loggedInUser.userGuideFlag) {
        if (originalUrl == '/' || originalUrl == '/userGuide') {
          return window.location.replace('/dashboard');
        }
      } else {
        if (loggedInUser.role_id === 1) {
          if (originalUrl == '/' || originalUrl == '/dashboard') {
            return window.location.replace('/userGuide');
          }
        } else {
          if (originalUrl == '/' || originalUrl == '/userGuide') {
            return window.location.replace('/dashboard');
          }
        }
      }
     
    } else {
      if (!allowPages.includes(originalUrl)) {
        return window.location.replace('/');
      }
     
    }
  } else {

  }
  // Pass data to the page via props
  return {
    pageProps,
    userProps: {
      user: loggedInUser,
      loggedIn,
      permissionData: permission,
      moduleData: modulesForMenu,
    },
    subDomain: subDomain,
  };
};
export default WeBuildApp;
