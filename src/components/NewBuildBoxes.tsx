import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";
// interface IVideosCard {
//   VideoCardData: any;
// }
const NewBuildBoxes = (props: any) => {
  return (
    <div className="boxesMain">
      <Ractangle />
      <Row className="m-0 px-4 innerBoxMain">
        {props.item?.map((itemData: any, index: any) => {
          return (
            <OuterBox key={index} id={itemData.id} boxData={itemData.message} />
          );
        })}
      </Row>
    </div>
  );
};

export default NewBuildBoxes;
