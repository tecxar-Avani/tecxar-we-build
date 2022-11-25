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

const FlashCardModal = (props: any) => {
  const flashCardData = useAppSelector(flashCardSelector);
  const dispatch = useAppDispatch();
  const handleFlash = (data: any) => {
    const userId = props.flashCard.userId;
    const questionId = props.flashCard.questionId;
    const index = props.flashCard.index;
    const arrayLength = props.flashCard.arrayLength;
    if (data == "Good" || data == "Hard" || data == "Again" || data == "Easy") {
      //add dispatch API here instead of console
      if (index <= arrayLength) {
        props.questionCallback(userId,index);
      }
    }
    props.responseCallback(data, userId, questionId, index, arrayLength);
  };

  return (
    <>
      {
        <Modal
          open={props.modal}
          title={
            props?.flashCard?.title ||
            (props?.flashCard?.headerIcon &&
              props?.flashCard?.headerIcon?.length > 0 &&
              props?.flashCard?.headerIcon.map((btn: any) => {
                return <Image src={`/img/${btn}`} className="mx-1" />;
              }))
          }
          centered
          visible={props.modalVisible}
          onCancel={() => props.setmodalOpen(false)}
          footer={
            props?.flashCard?.footer &&
            props?.flashCard?.footer.length > 0 &&
            props?.flashCard?.footer.map((btn: any) => {
              return (
                <Button
                  form="form"
                  key="submit"
                  htmlType="submit"
                  className="openmodal"
                  onClick={() => handleFlash(btn)}
                >
                  {btn}
                </Button>
              );
            })
          }
        >
          <div className="p-4">{props?.flashCard?.content}</div>
        </Modal>
      }
    </>
  );
};

export default FlashCardModal;
