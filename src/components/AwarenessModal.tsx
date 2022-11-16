import { Input, Modal ,Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;

const AwarenessModal = (props: any) => {

    return (
        <Modal
        title={props.awareness.title }
        centered
        visible={props.modal1Open}
        onOk={() => props.setModal1Open(false)}
        onCancel={() => props.setModal1Open(false)}
        footer={props.awareness.footer && props.awareness.footer.length>0 && props.awareness.footer.map((btn: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {return (<Button>{btn}</Button>) })}
      >
       <div className="py-4">{props.awareness.content || props.awareness.textbox && props.awareness.textbox.length>0 && props.awareness.textbox.map((btn: { header: any; box: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {return (<div className="inputbox">{btn.header}<TextArea  showCount maxLength={100} rows={4} className="mb-2">{btn.box}</TextArea></div>) })}</div>
      </Modal>
    );
  };
  
  export default AwarenessModal;
