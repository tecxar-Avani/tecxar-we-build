import { Modal, Button } from "antd";
import React from "react";
import Image from "react-bootstrap/Image";
import AddFlashCardModal from "./AddFlashCardModal";

const FlashCardModal = (props: any) => {
  const headerIcon = ["deleteFlash.svg" ,"edit.svg"]
  const title = headerIcon && headerIcon?.length > 0 && headerIcon?.map((btn: any) => {
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
                };
               

                props.setEditFlashCardData(flashCardData);
               
                props.setAddFlashcard(true);
              }
            }}
          />
        );
      })
  const userId = props.flashCard.userId;
  const questionId = props.flashCard.questionId;
  const index = props.flashCard.index;
  const arrayLength = props.flashCard.arrayLength;
  const handleFlash = (data: any) => {
    if (data == "Good" || data == "Hard" || data == "Again" || data == "Easy") {
      //add dispatch API here instead of console
     

      if (index <= arrayLength) {
        if (userId) {
          props.questionCallback(userId, index, questionId);
        } else {
          props.questionCallback(index, questionId);
        }
      }
    } else if (data == "Reveal Answer") {
      if (userId) {
        props.responseCallback(data, userId, questionId, index, arrayLength,title);
      } else {
        props.responseCallback(questionId, index, arrayLength,title );
      }
    }
  };


  return (
    <>
      {
        <Modal
          open={props.modal}
          title={
            props?.flashCard?.title 
            // (headerIcon &&
            //   headerIcon?.length > 0 &&
            //   headerIcon.map((btn: any) => {
            //     return (
            //       <Image
            //         src={`/img/${btn}`}
            //         className="mx-1"
            //         style={{ height: "31.61px", width: "26.22px" }}
            //         onClick={() => {
            //           if (btn == "edit.svg") {
            //             const indexValue = index - 1;
            //             const flashCardData = {
            //               question: props.flashCardArr[indexValue].question,
            //               answer: props.flashCardArr[indexValue].answer,
            //             };
            //             console.log("!!!!!!!!!!!!!!!!", flashCardData);

            //             props.setEditFlashCardData(flashCardData);
            //             props.setAddFlashcard(true);
            //           }
            //         }}
            //       />
            //     );
            //   }))
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

      <AddFlashCardModal
        modal2Open={props.addFlashCard}
        setModal2Open={()=>props.setAddFlashcard()}
        visible={props.addFlashCard}
        flashCardData={props.editFlashCardData}
      />
    </>
  );
};

export default FlashCardModal;
