import Link from "next/link";
import React from "react";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const Ractangle = (props: any) => {
    return (
        <>
        {props.ractBox && props.ractBox.map((out: {length: any;}) => {return(
             <div className="rectangle"></div>
     ) })}</>
            );
};

export default Ractangle;
