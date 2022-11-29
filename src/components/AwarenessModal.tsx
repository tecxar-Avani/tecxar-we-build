import { Input, Modal ,Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;

const AwarenessModal = (props: any) => {
 
    return (
      <div>
        <Modal
        title={props.title }
        centered
        visible={props.awarenessModal}
        onOk={() => props.setAwarenessModal(false)}
        onCancel={() => props.setAwarenessModal(false)}
        footer={props.awareness && props.awareness.footer && props.awareness.footer.length>0 && props.awareness.footer.map((btn: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {return (<Button>{btn}</Button>) })}
        className={`${props.className} awarenessModal`}
        
      >
        <div className={`inputbox awarenessModal AwareInput ${props.className}`}><TextArea id={props.id} rows={3} className="mb-2 AwareInput" value={props.textValue}></TextArea></div>
        <div className="header mt-2">{props.header}</div>
       <div className={`awarenessModal header ${props.className}`}><TextArea  showCount maxLength={500} rows={5} className="mb-2 AwareInputFirst"></TextArea></div>
      </Modal>
      </div>
    );
  };
  
  export default AwarenessModal;
