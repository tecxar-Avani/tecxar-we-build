import { Input, Modal, Button, Form } from "antd";
import { useAppSelector } from "../hooks";
import React, { useState } from "react";
import LogInButton from "./LogInButton";
import { userSelector } from "../store/reducers/user.reducer";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const [form] = Form.useForm();
  const [modal5Open, setModal5Open] = useState(false);
  const [auth, setAuth] = useState();
  const { loggedInUser } = useAppSelector(userSelector);

  const handleCancel = () => {
    setModal5Open(false);
  };

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
        className="flashCardsModal"
        destroyOnClose={true}
        footer={
          <Button
            form="form"
            key="submit1"
            htmlType="submit"
            className="openmodal"
            // type="text"
          >
            Save
          </Button>
        }
      >
        <Form
          form={form}
          id="form"
          onFinish={(data) => {
            if (props.isLoggedIn || loggedInUser?.length > 0) {
              props.handleSubmit({
                ...data,
                id:
                  props.defaultQuestionIndex &&
                  props.flashCardArr &&
                  props.flashCardArr[props.defaultQuestionIndex]?.id,
              });
              form.resetFields();
            } else {
              setModal5Open(true);
            }
          }}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item key={1} name="question" label="Front">
            <TextArea
              key={1}
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props?.flashCardData?.question}
            />
          </Form.Item>
          <Form.Item key={2} name={"answer"} label={"Back"}>
            <TextArea
              key={2}
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props?.flashCardData?.answer}
            />
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
    </>
  );
};

export default AddFlashCardModal;
