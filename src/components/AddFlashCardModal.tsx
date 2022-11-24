import { Input, Modal, Button, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  addFlashCard,
  flashCardSelector,
  getFlashCardByBuildId,
} from "../store/reducers/flashCard.reducer";
import { IFlashCard } from "../../@types/common";
import { Prev } from "react-bootstrap/esm/PageItem";

const { Search } = Input;
const { TextArea } = Input;

const AddFlashCardModal = (props: any) => {
  const flashCardData = useAppSelector(flashCardSelector);
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
            key="submit"
            htmlType="submit"
            className="openmodal"
          >
            Save
          </Button>
        }
      >
        <Form id="form" form={form} onFinish={handleSubmit}>
          <div className="inputbox">
            <Form.Item name={"question"} label={"Front"}>
              <TextArea
                showCount
                maxLength={100}
                rows={4}
                className="mb-2"
              ></TextArea>
            </Form.Item>
            <Form.Item name={"answer"} label={"Back"}>
              <TextArea
                showCount
                maxLength={100}
                rows={4}
                className="mb-2"
              ></TextArea>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddFlashCardModal;
