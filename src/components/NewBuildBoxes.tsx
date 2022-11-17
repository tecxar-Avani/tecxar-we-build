import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";
// interface IVideosCard {
//   VideoCardData: any;
// }
const NewBuildBoxes = (props: any) => {
  let arr = Array.from({ length: props.numOfBox }, () => ({
    first_name: "",
    last_name: "",
  }));
  return (
    <div className="boxesMain">
      <Ractangle />
      <Row className="m-0 px-4 innerBoxMain">
        {[...Array(props.numOfBox)].map((i, index) => {
          return <OuterBox key={index} />;
        })}
      </Row>
    </div>
  );
};

export default NewBuildBoxes;
