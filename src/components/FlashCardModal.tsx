import { Modal, Button } from "antd";
import React from "react";
import Image from "react-bootstrap/Image";
import AddFlashCardModal from "./AddFlashCardModal";

const FlashCardModal = (props: any) => {
  const headerIcon = ["deleteFlash.svg", "edit.svg"];
  const title =
    headerIcon &&
    headerIcon?.length > 0 &&
    headerIcon?.map((btn: any) => {
      return (
        <Image
          src={`/img/${btn}`}
          className="mx-1"
          style={{ height: "31.61px", width: "26.22px" }}
          onClick={() => {
            if (btn == "edit.svg") {
              props.setEditFlashCardData(editQuestion);

              props.setAddFlashcard(true);
            }
          }}
        />
      );
    });
  const userId = props.flashCard.userId;
  const questionId = props.flashCard?.questionId;
  const index = props.flashCard.index;
  // const editIndex = props.flashCardArr.index;
  const arrayLength = props.flashCard.arrayLength;
  const editQuestion = props.flashCard.editQuestion;
  const handleFlash = (data: any) => {
    if (data == "Good" || data == "Hard" || data == "Again" || data == "Easy") {
      // add dispatch API here instead of console

      if (index <= arrayLength) {
        if (userId) {
          props.questionCallback(userId, index, questionId);
        } else {
          props.questionCallback(index, questionId);
        }
      } else {
        props.questionCallback(index, questionId);
      }
    } else if (data == "Reveal Answer") {
      if (userId) {
        props.responseCallback(
          data,
          userId,
          questionId,
          index,
          arrayLength,
          title,
          editQuestion
        );
      } else {
        props.responseCallback(
          questionId,
          index,
          arrayLength,
          title,
          editQuestion
        );
      }
    }
  };

  return (
    <>
      <Modal
        open={props.modal}
        title={props?.flashCard?.title}
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

      <AddFlashCardModal
        modal2Open={props.addFlashCard}
        setModal2Open={props.setAddFlashcard}
        visible={props.addFlashCard}
        // questionId={modal3Open.questionId}
        setEditFlashCardData={() => {
          const questionFilter = props.flashCardArr.filter(
            (F: any) => F.id == questionId
          );
          questionFilter.length > 0 &&
            questionFilter.map((ans: any) => {
              const newData = {
                answer: ans.answer,
                question: ans.question,
              };
              props.setEditFlashCardData(newData);
            });
        }}
        flashCardData={props.editFlashCardData}
        handleSubmit={props.handleSubmit}
      />
    </>
  );
};

export default FlashCardModal;
