import { Input, Modal, Button, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  addFlashCard,
  flashCardSelector,
  getFlashCard,
} from "../store/reducers/flashCard.reducer";
import { IFlashCard } from "../../@types/common";
import { Prev } from "react-bootstrap/esm/PageItem";


const { Search } = Input;
const { TextArea } = Input;

const FlashCardModal = (props: any) => {
  const flashCardData = useAppSelector(flashCardSelector);
  const dispatch = useAppDispatch();
  const handleShow = (value: any) => {
    const data = {
      content: "answer"
    };
    props.responseCallback(data);
  };

  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    dispatch(addFlashCard(data));
     form.resetFields();
     dispatch(getFlashCard())
  };

  return (
    <>


      {<Modal
        open={props.modal3Open}
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
        // onOk={form.submit}
        onCancel={() => props.setModal2Open(false)}
        footer={
          props.flashCard.footer &&
          props.flashCard.footer.length > 0 &&
          props.flashCard.footer.map((btn: any) => {
            return (
              <Button form="form" key="submit" htmlType="submit" className="openmodal" onClick={handleShow} >
                {btn}
              </Button>
            );
          })
        }
      >

        <div className="">
          {props.flashCard.content ? (
            <div className="p-4">{props.flashCard.content}</div>
          ) : (
            <Form id="form" form={form} onFinish={handleSubmit}>
              <div className="inputbox">
                <Form.Item name={"question"} label={"Front"}>
                  {/* <span>Front</span> */}
                  {/* <br></br> */}
                  <TextArea
                    showCount
                    maxLength={100}
                    rows={4}
                    className="mb-2"
                  // name={"questions"}
                  // id="question"
                  ></TextArea>
                </Form.Item>
              </div>
            </Form>
          )}

        </div>
      </Modal>}
    </>
  );
};

export default FlashCardModal;




function setModal3Open(arg0: boolean) {
  throw new Error("Function not implemented.");
}

