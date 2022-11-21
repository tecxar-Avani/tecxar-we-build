import { Input, Modal, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useAppDispatch, useAppSelector } from '../hooks';
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
// import { addFlashCard, flashCardSelector } from "../store/reducers/flashCard.reducer";
import { IFlashCard } from "../../@types/common";

const { Search } = Input;

const FlashCardModal = (props: any) => {
 // const flashCard = useAppSelector(flashCardSelector);
  const dispatch = useAppDispatch();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  
  const changeFront = (event:any) => {
    setFront(event.target.value);
  };
 
  const changeBack = (event: any) => {
    setBack(event.target.value);
  };
  const onOk = ((data: IFlashCard) => {

      // dispatch(addFlashCard(data));   
  });
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
      //onOk={onOk}
      onCancel={() => props.setModal2Open(false)}
      footer={
        props.flashCard.footer &&
        props.flashCard.footer.length > 0 &&
        props.flashCard.footer.map(
          (
            btn:any
          ) => {
            return <Button>{btn}</Button>;
          }
        )
      }
    >
      <div className="py-4">
        {props.flashCard.content ||
         
           
                  <div className="inputbox">
                    Front
                      <TextArea
                      showCount
                      maxLength={100}
                      rows={4}
                      className="mb-2"
                      name="front"
                      id="front"
                      onChange={changeFront}
                      value={front}
                    ></TextArea>
 
                    Back
                     <TextArea
                      showCount
                      maxLength={100}
                      rows={4}
                      className="mb-2"
                      name="back"
                      id="back"
                      value={back}
                      onChange={changeBack}
                    ></TextArea>
                  </div>
                
}

          
      </div>
    </Modal>
  );
};

export default FlashCardModal;
