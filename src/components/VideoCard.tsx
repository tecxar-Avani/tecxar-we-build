import React from "react";
import { Card, CardImg } from "react-bootstrap";

const VideoCard = (props: any) => {
  const parsedData = props?.VideoCardData?.thumbnails?.url
    ? props.VideoCardData.thumbnails
    : JSON.parse(props.VideoCardData.thumbnails);

  return (
    <Card className="p-0 border-0 rounded mb-2 videoCard01">
      <Card.Body className="p-0 rounded-0">
        <div className="position-relative">
          {parsedData && (
            <>
              <CardImg className="img-fluid w-100" src={`${parsedData.url}`} />
              <iframe
                className="iframs"
                width="100%"
                height="215"
                src={`${props.VideoCardData.embed_url}?autoplay=false&mute=1`}
                name="youtube embed"
                allow="autoplay; encrypted-media"
              ></iframe>
            </>
          )}

          <div className="position-absolute bottom-0 end-0 px-2 mb-2 me-2 py-1 bg-black rounded">
            <span className="text-white">{props?.VideoCardData?.duration}</span>
          </div>
        </div>
        {props.VideoCardData.title && (
          <Card.Header className="title text-truncate px-0 bg-white border-0">
            {props?.VideoCardData?.title}
          </Card.Header>
        )}
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
