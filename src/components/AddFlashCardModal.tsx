import { Input, Modal, Button, Form } from "antd";
import React,{useEffect} from "react";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const [form] = Form.useForm();


  useEffect(() => {
    console.log("%%%%%%%AddFlashCardModal%%%%%%%%%%")
    console.log(props)
    console.log(props?.flashCardArr[props.defaultQuestionIndex-1]?.question)
  }, [props]);
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
            props.handleSubmit({ ...data, id: props.flashCardArr[props.defaultQuestionIndex-1].id })
          }
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item key={1} name="question" label="Front">
            <TextArea
              key={1}
              showCount
              maxLength={100}
              rows={4}
              // defaultValue={"question"}
              defaultValue={props?.flashCardArr[props.defaultQuestionIndex-1]?.question}
            />
          </Form.Item>
          <Form.Item key={2} name={"answer"} label={"Back"}>
            <TextArea
              key={2}
              showCount
              maxLength={100}
              rows={4}
              // defaultValue={"answer"}
              defaultValue={props?.flashCardArr[props.defaultQuestionIndex-1]?.answer}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddFlashCardModal;
