import React from "react";
import { Button } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const CustomButton = (props: any) => {
  return (
    <Button onClick={props.onClick} variant={` ${props.className}`}>
      {props.title}
    </Button>
  );
};

export default CustomButton;
