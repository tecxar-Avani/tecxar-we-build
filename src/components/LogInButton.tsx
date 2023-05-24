import { Input, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
const cookieCutter = require("cookie-cutter");
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getAuthCookie,
  getUserByEmail,
  userSelector,
} from "../store/reducers/user.reducer";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Button } from "react-bootstrap";
import userService from "../service/user.service";

const LogInButton = (props: any) => {
  const { loggedInUser ,toastLog , windowStatus,callBack} = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();  
    const getCookie = () => {
      setTimeout(() => {
        dispatch(getAuthCookie());
        dispatch(getUserByEmail());
      }, 5000);
    };
// //   useEffect(() => {
// //     setTimeout(() => {
// //       dispatch(getAuthCookie());
// //       dispatch(getUserByEmail());
// //     }, 1000);
// // }, []);
// // useEffect(() => {
//   const getCallBack:any= () => {
//     console.log("FFFFFFFFF")
//     dispatch(googleCallBack())
//   }
// // },[])
    
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
              // getCallBack();
              window.open(`/api/google`,"_self");
            }}
          >BOOK YOUR ONBOARDING HERE</Button>
          <br />
        </div>
      </Modal>
     
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext | any
// ) => {
//   const cookie = context.req ? context.req.cookies : null;
//   const ctx = context.req;

//   let cookies = "";
//   if (cookie) {
//     Object.keys(cookie).forEach((key) => {
//       cookies += key + "=" + cookie[key] + ";";
//     });
//   }

//   const headers = { cookie: cookies };
//   const { id } = context.query;
//   if(id) {
//     const { status, data } = await userService.googleCallBack(headers);
//     if (ctx.session && ctx.session?.dbUser) {
//       return {
//         props: {
//           UserData: data,
//         },
//       };
//     } else {
//       return {
//         props: {}
//       }
//     }
//   } else {
//     return {
//       props: {
//         userData: null
//       }
//     }
//   }
// };
export default LogInButton;
