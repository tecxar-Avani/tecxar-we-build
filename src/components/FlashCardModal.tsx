import { Input, Modal ,Button} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

const { Search } = Input;
const onSearch = (value: any) => console.log(value);

const FlashCardModal = (props: any) => {

    return (
        <Modal
        title={props.flashCard.title}
        centered
        visible={props.modal2Open}
        onOk={() => props.setModal2Open(false)}
        onCancel={() => props.setModal2Open(false)}
        footer={props.flashCard.footer && props.flashCard.footer.length>0 && props.flashCard.footer.map((btn: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => {return (<Button>{btn}</Button>) })}
      >
      
       <div className="py-4">{props.flashCard.content}</div>
      </Modal>
    );
  };
  
  export default FlashCardModal;
