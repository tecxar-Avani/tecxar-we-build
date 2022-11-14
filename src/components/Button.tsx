import Link from "next/link";
import React from "react";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const CustomButton = (props: any) => {
    return (
        // <Button className={props.className}>{props.title}</Button>
        <Button variant={`primary ${props.className}`}>{props.title}</Button>
    // <Card className="p-0 border-0 rounded-0">
    //   {props.VideoCardData.title && (
    //     <Card.Header>{props.VideoCardData.title}</Card.Header>
    //   )}
    //   <Card.Body className="p-0 rounded-0">
    //     <div className="position-relative">
    //       <CardImg
    //         className="rounded-0"
    //         src={`/${props.VideoCardData.videoUrl}`}
    //       ></CardImg>
    //       <div className="position-absolute bottom-0 end-0 px-2 mb-2 py-1 bg-black rounded">
    //         <span className="text-white">12:45</span>
    //       </div>
    //     </div>
    //     <Card.Text className="py-2">{props.VideoCardData.subTitle}</Card.Text>
    //   </Card.Body>
    //   </Card>
  );
};

export default CustomButton;
