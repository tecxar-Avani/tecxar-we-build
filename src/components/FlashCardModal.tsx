import { Input, Modal, Button, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  addFlashCard,
  flashCardSelector,
  updateFlashCardData,
} from "../store/reducers/flashCard.reducer";
import { IFlashCard } from "../../@types/common";

const { Search } = Input;
const { TextArea } = Input;

const FlashCardModal = (props: any) => {
  const flashCardData = useAppSelector(flashCardSelector);
  const dispatch = useAppDispatch();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [form] = Form.useForm();
  console.log("@@@@@@@@@@@@@@@@@@", flashCardData);
  // const onFinish = (value: IFlashCard) => {
  //   //dispatch(addFlashCard(data));
  //   console.log("#################", value);
  // };

  const handleSubmit = (data: any) => {
    console.log("#################", data);

    // dispatch(addFlashCard(data));
  };

  // const handleCancel = () => {
  //   // setVisible(false)
  //   form.resetFields()
  // };

  return (
    <Modal
      title={
        props.flashCard.title ||
        (props.flashCard.headerIcon &&
          props.flashCard.headerIcon.length > 0 &&
          props.flashCard.headerIcon.map((btn: any) => {
            return <Image src={`/img/${btn}`} className="mx-1" />;
          }))
      }
      centered
      visible={props.modal2Open}
      onOk={form.submit}
      onCancel={() => props.setModal2Open(false)}
      footer={
        props.flashCard.footer &&
        props.flashCard.footer.length > 0 &&
        props.flashCard.footer.map((btn: any) => {
          return (
            <Button form="form" key="submit" htmlType="submit">
              Submit
            </Button>
          );
        })
      }
    >
      <div className="py-4">
        {props.flashCard.content || (
          <Form
            id="form"
            form={form}
            onFinish={(data) => console.log("CCCCCCCCC", data)}
          >
            <div className="inputbox">
              <Form.Item label="Front" name={"note"}>
                <TextArea className={"w-100"} placeholder={"note"} />
              </Form.Item>
              {/* <TextArea
                showCount
                maxLength={100}
                rows={4}
                className="mb-2"
                name={"question"}
                id="question"
              ></TextArea> */}
              Back
              <TextArea
                showCount
                maxLength={100}
                rows={4}
                className="mb-2"
                name="answer"
                id="answer"
              ></TextArea>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default FlashCardModal;
