import { Input, Modal, Button, Form } from "antd";
import React, { useState } from "react";
import GoogleButton from "react-google-button";

const { Search } = Input;
const { TextArea } = Input;

const LogInButton = (props: any) => {
  
  const [modal5Open, setModal5Open] = useState(false);
  const handleCancel = () =>{
    setModal5Open(false)
  }
  return (
    <>
     
      <Modal title="" centered open={props.open} className="btnrv" onCancel={props.handleCancel}>
        <div className="mb-n3">
          <a href={`/api/google`}>
            <GoogleButton className="m-auto googleButton" />
          </a>
          <br />
        </div>
      </Modal>
    </>
  );
};

export default LogInButton;
