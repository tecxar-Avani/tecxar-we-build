import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
const cookieCutter = require("cookie-cutter");

const LogInButton = (props: any) => {
  const [checkAuth, setCheckAuth] = useState(false);
  let authVal: any;

  useEffect(() => {
    if (
      props.isLoggedIn == false ||
      props.isLoggedIn == undefined ||
      props.isLoggedIn == "undefined"
    ) {
      const timer = setInterval(() => {
        authVal = cookieCutter.get("authorization");
        if (authVal) {
          props.setAuth(authVal);
        }
        // return () => clearInterval(timer);
      }, 15000);
    }
  }, [checkAuth]);

  return (
    <>
      <Modal
        title=""
        centered
        open={props.open}
        className="btnrv"
        onCancel={props.handleCancel}
      >
        <div className="mb-n3">
          <GoogleButton
            className="m-auto googleButton"
            onClick={() => {
              props.isLoggedIn == false ||
              props.isLoggedIn == undefined ||
              props.isLoggedIn == "undefined"
                ? setCheckAuth(true)
                : setCheckAuth(false);
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
