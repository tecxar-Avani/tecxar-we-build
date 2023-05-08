import { Input, Modal, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import LogInButton from "./LogInButton";
import { userSelector } from "../store/reducers/user.reducer";
import { useAppSelector } from "../hooks";

const { Search } = Input;

const AwarenessModal = (props: any) => {
  const [modal5Open, setModal5Open] = useState(false);
  const { loggedInUser } = useAppSelector(userSelector);

  const handleCancel = () => {
    setModal5Open(false);
  };
  const [form] = Form.useForm();

  return (
    <div className="awarenessModal">
      <Modal
        title={props.title}
        open={props.awarenessModal}
        onOk={() => props.setAwarenessModal(false)}
        onCancel={() => props.setAwarenessModal(false)}
        destroyOnClose={true}
        footer={
          props.footer && props.footer.length > 0 && props.footer ? (
            <Button
              form="form"
              key="submit"
              htmlType="submit"
              className="openmodal"
             
            >
              Add
            </Button>
          ) : (
            []
          )
        }
        className={`${props.className} awarenessModal`}
        okText="Add"
      >
        <Form
          form={form}
          id="form"
          onFinish={(data: any) =>
            props.isLoggedIn || loggedInUser?.length > 0
              ? props.handleSubmit(props.handleSubmit(data, props.title))
              : setModal5Open(true)
          }
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item>
            <div
              className={`inputbox awarenessModal AwareInput ${props.className}`}
            >
              <TextArea
                id={props.id}
                rows={3}
                className="mb-2 AwareInput"
                readOnly={true}
                defaultValue={props.textValue ? props.textValue : ""}
              ></TextArea>
            </div>
          </Form.Item>
          <div className="header mt-2">{props.header}&nbsp; Now</div>
          <Form.Item name="comment">
            <div className={`awarenessModal header ${props.className}`}>
              <TextArea
                showCount
                maxLength={500}
                rows={5}
                className="mb-2 AwareInputFirst"
              ></TextArea>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <LogInButton
        title=""
        open={modal5Open}
        className="btnrv"
        handleCancel={handleCancel}
        isLoggedIn={props.isLoggedIn}
        // setAuth={(data: any) => {
        //   setAuth(data);
        //   setModal5Open(false);
        // }}
      />
    </div>
  );
};

export default AwarenessModal;
