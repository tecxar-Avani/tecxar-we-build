import { Button, Form, Input, Space,Modal,Affix } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

const { Search } = Input;

const AwarenessDotModal = (props: any) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!",props)
  const [form] = Form.useForm();
  const handleFlash = () => {
    const title=props.title
    const content = "hello Avani"
    const header = props.header
    const awareLabel = props.awareLabel
    const challengeLabel = props.label
    const awareValue = props.awareValue
    const id = props.acceptanceValue.map((ids:any) => ids.id)
    const idOfAcceptance = props.acceptanceValue.id
        props.callBack(title,content,header,idOfAcceptance,awareLabel,challengeLabel,awareValue,id); 
     
    }
  
 console.log("$$$$$$$$$$$$$$$$$$$$$",props)
   
    return (
      
        <Modal
        title={props.title}
        visible={props.awarenessModal}
      
        onCancel={() => props.setAwarenessModal(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 290px)' }}
       
        className={`${props.className} awarenessDotModal `}
      > 
      
         <Form
          form={form}
          id="form"
          // onFinish={(data:any)=> props.handleSubmit(data,props.title)}
          layout="vertical"
          autoComplete="off"
        >
      { props.title != props.challenge.title ? (
        props.acceptanceValue && props.acceptanceValue.length > 0 && props.acceptanceValue.map((data:any) => 
      {  return(
          <>
           
        <div className="header mt-2">{props.header}</div>
        <Form.Item name="comment">
       <div className={` header ${props.className}`}><TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" defaultValue={data.description}></TextArea></div>

       </Form.Item>
       <Form.Item>
              <Button
                onClick={handleFlash}
               className="openmodal"
              >
               {props.btnName}
              </Button>
              {/* ()=>{const callbackData = {
                  id :data.id,
                  title:props.title
                }} */}
            </Form.Item>
      {/* <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'challenge' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                    
                    },
                  ]}
                  noStyle
                >
                  <TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" />
                </Form.Item>
               
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                // type="dashed"
                onClick={() => add()}
               className="openmodal"
             
              >
               Challenge
              </Button>
             
            </Form.Item>
          </>
        )}
      </Form.List> */}

       </>
   );})
       ): (<>
       <Form.Item name="comment" label={props.challenge.awareLabel}>
      <div className={` header ${props.className}`}><TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" defaultValue={props.awareValue}></TextArea></div>

      </Form.Item>
       
      <Form.Item name="awarenessType"  label={props.challenge.challengeLabel}>
      <div className={` header ${props.className}`}><TextArea maxLength={500} rows={5} className="mb-2 AwareInputFirst" ></TextArea></div>

      </Form.Item>
      <Button className='challenge'>Add</Button>
      </>)
      }
    
       </Form>
</Modal>
      
    );
  };
  
  export default AwarenessDotModal;
