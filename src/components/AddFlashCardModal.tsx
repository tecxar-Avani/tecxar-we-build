import { Input, Modal, Button, Form, } from "antd";
import React from "react";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const [form] = Form.useForm();

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
          onFinish={(data) =>
            props.handleSubmit({ ...data, id: props.flashCardData.id })
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
    </>
  );
};

export default AddFlashCardModal;
