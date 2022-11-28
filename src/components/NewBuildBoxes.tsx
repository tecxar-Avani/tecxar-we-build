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
                boxData={itemData.message}
                counter={props.counter}
                arr={props.arr}
                responseCallback={(value: number) => {
                  props.setArr([...props.arr, value]);
                  if (props.arr.length > 20) {
                    const arrData = {
                      id: value + 1,
                      message: "",
                    };
                    // props.setNum(arrData);
                  }
                }}
                setNum={(data) => {
                  console.log("data",data)
                  props.setNum(data);
                }}
              />
            </>
          );
        })}
      </Row>
    </div>
  );
};

export default NewBuildBoxes;
