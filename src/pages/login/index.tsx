import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import GoogleButton from "react-google-button";

const Login = () => {

  return (
    <>
      {/* <Modal title="" centered open={true} className="btnrv"> */}
      <div className="mb-n3">
        {/* <Image
            src="../img/google.png"
            className="border border-primary googleicon"
          /> */}
        <a href={`/api/google`}>
          <GoogleButton className="m-auto googleButton" />
        </a>
      
      </div>
      {/* </Modal> */}
    </>
  );
};

export default Login;
