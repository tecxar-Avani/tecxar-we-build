import React from "react";
import { Row } from "react-bootstrap";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";

const NewBuildBoxes = (props: any) => {
  
  return (
    <div className="boxesMain">
      <Ractangle />
      <Row className="m-0 px-4 innerBoxMain">
        {props.item?.map((itemData: any, index: any) => {
       
          return (
            <>
              <OuterBox
                key={index}
                id={itemData.id}
                review={props.review}
                counter={props.counter}
                arr={props.arr}
                onFocus={props.onFocus}
                acceptanceData={props.acceptanceData}
                responseCallback={(value: number,BoxData:any) => {
                  props.setArr([...props.arr, value,BoxData]);
                  if (props.arr.length > 20) {
                    const arrData = {
                      id: value + 1,
                      BoxData: "",
                    };
                    // props.setNum(arrData);
                  }
                }}
                setNum={(data:any) => {
                
                  props.setNum(data);
                }}
                modalDot={props.modalDot}

              />
            </>
          );
        })}
      </Row>
    </div>
  );
};

export default NewBuildBoxes;
