import { Button, Form, Input, Space,Modal,Affix } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;



const AwarenessDotModal = (props: any) => {
  console.log("!!!!!!!!!!!!",props)
  const [form] = Form.useForm();
  form.resetFields();
    return (
      <div className="awarenessModal">
        <Modal
        title={props.title}
        visible={props.awarenessModal}
      
        onCancel={() => props.setAwarenessModal(false)}
       
        className={`${props.className} awarenessDotModal `}
      > 
      
         <Form
          form={form}
          id="form"
          onFinish={(data:any)=> props.handleSubmit(data,props.title)}
          layout="vertical"
          autoComplete="off"
        >
         
        {props.acceptanceValue && props.acceptanceValue.length > 0 && props.acceptanceValue.map((Data:any) => 
      {  return(
          <>
           
        <div className="header mt-2">{props.header}</div>
        <Form.Item name="comment">
       <div className={` header ${props.className}`}><TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" defaultValue={Data.description}></TextArea></div>

       </Form.Item>
      <Form.Item>
      <Button  form="form"
        key="submit"
        htmlType="submit"
        className="openmodal"
        onClick={() => add()}
       >Challenge</Button> 
      </Form.Item>
        {(fields, { add }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              
              </Space>
            ))}
            </>
             )} 
       </>
   );})}
    
       {/* {(fields, { add }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              
              </Space>
            ))}
            </>
             )}
                 <Form.Item>
              <Button type="dashed" onClick={() => add()}/>
                Add field
              </Button>
            </Form.Item> */}
       </Form>
</Modal>
      </div>
    );
  };
  
  export default AwarenessDotModal;
