import Link from "next/link";
import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const VideoCard = (props: any) => {
  console.log("$$$$$$$$$$$$",props.VideoCardData.videoUrl)
  return (

    // <Card className="p-0 border-0 rounded-0 mx-2">
    //   {props.VideoCardData.title && (
    //     <Card.Header>{props.VideoCardData.title}</Card.Header>
    //   )}
    //   <Card.Body className="p-0 rounded-0">
        <div className="position-relative">
          {/* <iframe
            className="rounded-0"
            src={`` }
          ></iframe> */}
          <iframe width="560" height="315" src="https://www.youtube.com/embed/eJ1UDdQbE-k" title="YouTube video player" allow=" picture-in-picture" allowFullScreen={true}></iframe>
          <div className="position-absolute bottom-0 end-0 px-2 mb-2 py-1 bg-black rounded">
            <span className="text-white">12:45</span>
          </div>
        </div>
      //   <Card.Text className="">{props.VideoCardData.subTitle}</Card.Text>
      // </Card.Body>
      // </Card>
  );
};

export default VideoCard;
