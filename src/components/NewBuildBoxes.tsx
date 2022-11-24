import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";

import { Col, Row } from "react-bootstrap";
import InnerBox from "./InnerBox";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";
// interface IVideosCard {
//   VideoCardData: any;
// }
const NewBuildBoxes = (props: any) => {
  const [arr, setArr] = useState([1]);
  // if (arr.length == 4) {
  //   props.callback(3);
  // }
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
                arr={arr}
                responseCallback={(value: number) => {
                  setArr([...arr, value]);
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
