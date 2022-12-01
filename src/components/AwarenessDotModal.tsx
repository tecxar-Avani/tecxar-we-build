import { Button, Form, Input, Space,Modal } from 'antd';
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
        footer={props.footer && props.footer.length>0 && props.footer  ? <Button  form="form"
        key="submit"
        htmlType="submit"
        className="openmodal"
       >Challenge</Button> : []}
        className={`${props.className} awarenessDotModal`}
        okText="Challenge"
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
       <div className={`awarenessDotModal header ${props.className}`}><TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" defaultValue={props.value}></TextArea></div>

       </Form.Item>
   
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
