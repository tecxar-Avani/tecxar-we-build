import { Input, Modal, Button, Form, } from "antd";
import React, { useState } from "react";
import GoogleButton from "react-google-button";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const [form] = Form.useForm();
  const [modal5Open, setModal5Open] = useState(false);

  return (
    <>
      <Modal
        open={props.modal3Open}
        title=""
        centered
        visible={props.modal2Open}
        onOk={form.submit}
        onCancel={() => {
          props.setEditFlashCardData && props.setEditFlashCardData();
          props.setModal2Open(false);
        }}
        footer={
          <Button
            form="form"
            key="submit1"
            htmlType="submit"
            className="openmodal"
          >
            Save
          </Button>
        }
      >
        <Form
          form={form}
          id="form"
          onFinish={
            (data) =>
            {
               props.isLoggedIn ? props.handleSubmit(data) : setModal5Open(true);
            form.resetFields()}
           
          }
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="question" label="Front">
            <TextArea
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props?.flashCardData?.question}
            />
          </Form.Item>
          <Form.Item name={"answer"} label={"Back"}>
            <TextArea
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props?.flashCardData?.answer}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="" centered open={modal5Open} className="btnrv">
        <div className="mb-n3">
          <a href={`/api/google`}>
            <GoogleButton className="m-auto googleButton" />
          </a>
          <br />
          <span className="fs-5">Add Google Sign In Button To Website</span>
        </div>
      </Modal>
    </>
  );
};

export default AddFlashCardModal;
