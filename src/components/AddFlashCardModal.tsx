import { Input, Modal, Button, Form } from "antd";
import { useAppDispatch } from "../hooks";
import React, {  } from "react";
import {
  addFlashCard,
} from "../store/reducers/flashCard.reducer";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    dispatch(addFlashCard(data));
   

    form.resetFields();
  };
  return (
    <>
      <Modal
        open={props.modal3Open}
        title=""
        centered
        visible={props.modal2Open}
        onOk={form.submit}
        onCancel={() => props.setModal2Open(false)}
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
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="question" label="Front">
            <TextArea
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props.flashCardData.question}
            />
          </Form.Item>
          <Form.Item name={"answer"} label={"Back"}>
            <TextArea
              showCount
              maxLength={100}
              rows={4}
              defaultValue={props.flashCardData.answer}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddFlashCardModal;
