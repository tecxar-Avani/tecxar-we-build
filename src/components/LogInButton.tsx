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
  
     console.log("************",windowStatus)
    
  return (
    <>
      <Modal
        title=""
        centered
        open={loggedInUser?.length > 0 ? false : props.open}
        className="btnrv"
        destroyOnClose={true}
        onCancel={props.handleCancel}
      >
        <div className="mb-n3">
          <GoogleButton
            className="m-auto googleButton"
            onClick={() => {
              if (
                props.isLoggedIn == false ||
                props.isLoggedIn == undefined ||
                props.isLoggedIn == "undefined" ||
                loggedInUser?.length == 0
              ) {
                getCookie();
              }
              window.open(`/api/google`, "_blank");
            }}
          />
          <br />
        </div>
      </Modal>
     
    </>
  );
};

export default LogInButton;
