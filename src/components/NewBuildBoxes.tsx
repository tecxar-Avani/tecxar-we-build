import React from "react";
import { Row } from "react-bootstrap";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";

const NewBuildBoxes = (props: any) => {
  return (
    <>
    {[...Array(Math.ceil(props.item.length / 3))].map((_rows, index) => {
    const subArray = props.item.slice(index * 3, index * 3 + 3);
    return (
        <div className="boxesMain">
        <div className="h-30 border border-color-25" />
     <Row className="m-0 px-4 innerBoxMain">
          {subArray.map((itemData: any, index: any) => (
            <OuterBox
              key={index}
              id={itemData.id}
              counter={props.counter}
              arr={props.arr}
              onFocus={props.onFocus}
              visible={props.arr.includes(itemData.id)}
              acceptanceData={props.acceptanceData}
              modalDot={props.modalDot}
              responseCallback={(value: number) =>
                props.setArr([...props.arr, value])
              }
            />
          ))}
        </Row>
      </div> 
    );
  })}</>)
 
};

export default NewBuildBoxes;
