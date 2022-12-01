import { Input, Modal, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;



const AwarenessDotModal = (props: any) => {
  const [form] = Form.useForm();
  form.resetFields();
    return (
      <div className="awarenessModal">
        <Modal
        title={props.title }
        visible={props.awarenessModal}
        onOk={() => props.setAwarenessModal(false)}
        onCancel={() => props.setAwarenessModal(false)}
        footer={props.footer && props.footer.length>0 && props.footer} 
        className={`${props.className} awarenessModal`}
        okText={props.btnName}
      >
         <Form
          form={form}
          id="form"
          onFinish={(data:any)=> props.handleSubmit(data,props.title)}
          layout="vertical"
          autoComplete="off"
        >
        
        <div className="header mt-2">{props.header}</div>
        <Form.Item name="comment">
       <div className={`awarenessModal header ${props.className}`}><TextArea  showCount maxLength={500} rows={5} className="mb-2 AwareInputFirst" defaultValue={props.value}></TextArea></div>
       </Form.Item>
       </Form>
</Modal>
      </div>
    );
  };
  
  export default AwarenessDotModal;
