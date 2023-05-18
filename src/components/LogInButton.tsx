import { Input, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
const cookieCutter = require("cookie-cutter");
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getAuthCookie,
  getUserByEmail,
  googleCallBack,
  userSelector,
} from "../store/reducers/user.reducer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";

const LogInButton = (props: any) => {
  const { loggedInUser ,toastLog , windowStatus} = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();  
    const getCookie = () => {
      setTimeout(() => {
        dispatch(getAuthCookie());
        dispatch(getUserByEmail());
      }, 5000);
    };
 console.log("OOOOOOOOOOOOOOO",router.pathname)
//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(getAuthCookie());
//       dispatch(getUserByEmail());
//     }, 1000);
// }, []);
// useEffect(() => {
  const getCallBack:any= () => {
    console.log("FFFFFFFFF")
    dispatch(googleCallBack())
  }
// },[])
    
  return (
    <>
      <Modal
        title=""
        centered
        open={props?.user?.id ? false : props.open}
        className="btnrv"
        destroyOnClose={true}
        onCancel={props.handleCancel}
      >
        <div className="mb-n3">
          <Button
            className="m-auto landigPageButton"
            onClick={() => {
              // if (
              //   props.isLoggedIn == false ||
              //   props.isLoggedIn == undefined ||
              //   props.isLoggedIn == "undefined" ||
              //   loggedInUser?.length == 0
              // ) {
                // getCookie();
              // }
              getCallBack();
              window.open(`/api/google`,"_self");
            }}
          >BOOK YOUR ONBOARDING HERE</Button>
          <br />
        </div>
      </Modal>
     
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext | any) => {
  const ctx = context.req;
  if (ctx.session && ctx.session?.dbUser) {
    
    return {
      props: {
        user: ctx.session?.dbUser,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
export default LogInButton;
