import Link from "next/link";
import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const VideoCard = (props: any) => {
  return (
    <Card className="p-0 border-0 rounded mb-2 videoCard01">
      <Card.Body className="p-0 rounded-0">
        <div className="position-relative">
          {props.VideoCardData.thumbnails &&
          props.VideoCardData.thumbnails.length > 0 ? (
            <>
              <CardImg
                className="img-fluid w-100"
                src={`${props.VideoCardData.thumbnails[1].url}`}
              />
              <iframe
                className="iframs"
                width="100%"
                height="215"
                src={`//www.youtube.com/embed/${props.VideoCardData.id}?autoplay=1&mute=1`}
                name="youtube embed"
                allow="autoplay; encrypted-media"
              ></iframe>
            </>
          ) : (
            <>
              <CardImg
                className="img-fluid w-100"
                src={`https://i.ytimg.com/vi/Fp8msa5uYsc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBy5JMMfllCtppR2CS4kx_WHgzEZg`}
              />
              <iframe
                className="iframs"
                width="100%"
                height="215"
                src={`//www.youtube.com/embed/${props.VideoCardData.id}?autoplay=1&mute=1`}
                name="youtube embed"
                allow="autoplay; encrypted-media"
              ></iframe>
            </>
          )}

          <div className="position-absolute bottom-0 end-0 px-2 mb-2 me-2 py-1 bg-black rounded">
            <span className="text-white">{props.VideoCardData.duration}</span>
          </div>
        </div>
        {props.VideoCardData.title && (
          <Card.Header className="title text-truncate px-0 bg-white border-0">
            {props.VideoCardData.title}
          </Card.Header>
        )}
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
