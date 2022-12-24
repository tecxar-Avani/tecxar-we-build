import { Modal, Button } from "antd";
import React, { useState,useEffect } from "react";
import Image from "react-bootstrap/Image";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createFlashCardResponse, deleteFlashCardById,flashCardSelector } from "../store/reducers/flashCard.reducer";
import AddFlashCardModal from "./AddFlashCardModal";
import { useRouter } from "next/router";


const FlashCardModal = (props: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const buildId = Number(router.query.id);


  useEffect(() => {
  
  }, [props]);
const onDelete = (id:any) =>{
     dispatch(deleteFlashCardById(id))
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
                question: props.flashCardArr[indexValue]?.question,
                answer: props.flashCardArr[indexValue]?.answer,
                id:props.flashCardArr[indexValue]?.id,
              };
            
              props.setEditFlashCardData(flashCardData);
              props.setAddFlashcard(true);
            }
            else if(btn == "deleteFlash.svg"){
              const id = props.flashCardArr[index].id
             
               onDelete(id)
               props.setmodalOpen(false)
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
      if(data == "Again"){
        {
          if (userId) {
            props.againCallback(
              data,
              userId,
              questionId,
              index,
              arrayLength,
              title,
              editQuestion
            );
          } else {
            props.againCallback(props.defaultQuestionIndex - 1);
          }
        }
      } 
      else{
        const flashCardResponseData = {
          response_type : data,
          flash_card_id : questionId,
          build_id:buildId
        }
        dispatch(createFlashCardResponse(flashCardResponseData))
        if (index <= arrayLength) {
          if (userId) {
            props.questionCallback(userId, index, questionId);
          } else {
            props.questionCallback(index, questionId);
            }}
      }
      // add dispatch API here instead of console
   
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
        setModal2Open={() => props.setAddFlashcard()}
        visible={props.addFlashCard}
        flashCardData={props.editFlashCardData}
        flashCardArr={props.flashCardArr}
        handleSubmit={props.handleSubmit}
        defaultQuestionIndex={props.defaultQuestionIndex}
        isLoggedIn={props.isLoggedIn}
      />
    </>
  );
};

export default FlashCardModal;
