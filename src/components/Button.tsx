import React from "react";
import { Button } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const CustomButton = (props: any) => {
    return (

        <Button variant={` ${props.className}`} >{props.title}</Button>

    );
};

export default CustomButton;
