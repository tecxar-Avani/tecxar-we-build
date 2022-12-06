import { Modal, Button } from "antd";
import { useAppSelector } from "../hooks";
import React, { useState,useEffect } from "react";
import Image from "react-bootstrap/Image";
import { deleteFlashCardId, flashCardData, flashCardSelector } from "../store/reducers/flashCard.reducer";
import AddFlashCardModal from "./AddFlashCardModal";

const FlashCardModal = (props: any) => {
  console.log("propspropspropspropspropspropspropspropsprops")
  console.log(props)
  const deleteData = useAppSelector(flashCardSelector)
  const [deleteId , setDeleteId] = useState(false);
  useEffect(() => {
  
  }, [props]);
const onDelete = () =>{
    // dispatch(deleteFlashCardById(id))
}
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
              const indexValue = index;
              const flashCardData = {
                question: props.flashCardArr[indexValue].question,
                answer: props.flashCardArr[indexValue].answer,
                id:props.flashCardArr[indexValue].id,
              };

              props.setEditFlashCardData(flashCardData);
              props.setAddFlashcard(true);
            }
            else if(btn == "deleteFlash.svg"){
              const id = props.flashCardArr[index].id
            }
          }}
        />
      );
    });
  const userId = props.flashCard.userId;
  const questionId = props.flashCard?.questionId;
  const index = props.flashCard.index;
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
          }}
      // } else {
      //   props.questionCallback(index, questionId);
      // }
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

  console.log("###################FlashCardModal")
  console.log(props)
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

      {/* <AddFlashCardModal
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
      /> */}
      <AddFlashCardModal
        modal2Open={props.addFlashCard}
        setModal2Open={() => props.setAddFlashcard()}
        visible={props.addFlashCard}
        flashCardData={props.editFlashCardData}
        flashCardArr={props.flashCardArr}
        handleSubmit={props.handleSubmit}
        defaultQuestionIndex={props.defaultQuestionIndex}
      />
    </>
  );
};

export default FlashCardModal;
