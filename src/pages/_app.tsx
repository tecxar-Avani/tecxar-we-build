// import 'tailwindcss/tailwind.css';
// import '../styles/globals.css';
import 'regenerator-runtime/runtime';
import '../assets/scss/Theme.scss';
import { Provider } from 'react-redux';
import store from '../store/';
import type { AppProps as NextAppProps, AppContext } from 'next/app';
import 'regenerator-runtime/runtime';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { SSRProvider } from 'react-bootstrap';
import Dashboard from './Dashboard';
import SideBar from './SideBar';
import { Layout } from 'antd';


// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P;
  userProps: P;
  setLoadings: Function;
  Component: P;
  subDomain: string;
} & Omit<NextAppProps<P>, 'pageProps'>;


const WeBuildApp = ({ Component, pageProps, router, userProps, subDomain }: AppProps) => {


  return (
    <Provider store={store}>
      <SSRProvider>
      <Layout>
        <div className="sidebar-app">
          <SideBar/>
        </div>
       
        <Layout className="site-layout">
          <Dashboard />
         
          
        </Layout>
      </Layout>
       
      </SSRProvider>
    </Provider>
  );
};


export default WeBuildApp;
