import Link from "next/link";
import React from "react";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const CustomButton = (props: any) => {
    return (

        <Button variant={` ${props.className}`}>{props.title}</Button>

    );
};

export default CustomButton;
