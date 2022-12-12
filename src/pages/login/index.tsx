import ProfileCard from "@/components/Profile";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeaderTitle from "@/components/headerTitle";
import VideoCard from "@/components/VideoCard";
import { Col, Image, Modal } from "react-bootstrap";
import GoogleButton from "react-google-button";

const Login = () => {
  const [modal5Open, setModal5Open] = useState(false);

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
