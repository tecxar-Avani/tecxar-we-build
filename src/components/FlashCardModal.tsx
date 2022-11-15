import { Input, Modal ,Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;

const FlashCardModal = (props: any) => {

    return (
        <Modal
        title={props.flashCard.title || props.flashCard.headerIcon && props.flashCard.headerIcon.length>0 && props.flashCard.headerIcon.map((btn: any) => {return (<Image src={`/img/${btn}`} className="mx-1"/>) })}
        centered
        visible={props.modal2Open}
        onOk={() => props.setModal2Open(false)}
        onCancel={() => props.setModal2Open(false)}
        footer={props.flashCard.footer && props.flashCard.footer.length>0 && props.flashCard.footer.map((btn: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {return (<Button>{btn}</Button>) })}
      >
       <div className="py-4">{props.flashCard.content || props.flashCard.textbox && props.flashCard.textbox.length>0 && props.flashCard.textbox.map((btn: { header: any; box: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {return (<div className="inputbox">{btn.header}<TextArea  showCount maxLength={100} rows={4} className="mb-2">{btn.box}</TextArea></div>) })}</div>
      </Modal>
    );
  };
  
  export default FlashCardModal;
