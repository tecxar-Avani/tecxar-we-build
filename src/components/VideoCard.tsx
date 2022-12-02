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
                src={`//www.youtube.com/embed/${props.VideoCardData.id}?autoplay=false&mute=1`}
                name="youtube embed"
                allow="autoplay; encrypted-media"
                
              ></iframe>

              {/* <video
                src={props.VideoCardData.url}
                controls
                muted
                autoPlay={true}
                preload="auto"
                loop
              >
                {" "}
              </video> */}
              
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
                
                src={`//www.youtube.com/embed/${props.VideoCardData.id}?autoplay=false&mute=1`}
                name="youtube embed"
                allow="autoplay; encrypted-media"
              ></iframe>
              {/* <video
                src={`//www.youtube.com/embed/${props.VideoCardData.id}?autoplay=false&mute=1`}
                // src={props.VideoCardData.url}
                controls
                muted
                autoPlay={true}
                preload="auto"
                loop
              >
                {" "}
              </video> */}
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

    // <Card className="p-0 border-0 rounded-0 mx-2">
    //   {props.VideoCardData.title && (
    //     <Card.Header>{props.VideoCardData.title}</Card.Header>
    //   )}
    //   <Card.Body className="p-0 rounded-0">
    //     <div className="position-relative">
    //       {/* <iframe
    //         className="rounded-0"
    //         src={`` }
    //       ></iframe> */}
    //       <iframe
    //         // width="120"
    //         // height="120"
    //         className="rounded-0"
    //         src={`${props.VideoCardData.videoUrl}`}
    //         title="YouTube video player"
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //         allowFullScreen={true}
    //       ></iframe>
    //       {/* <div className="position-absolute bottom-0 end-0 px-2 mb-2 py-1 bg-black rounded">
    //         <span className="text-white">12:45</span>
    //       </div> */}
    //     </div>
    //     <Card.Text className="">{props.VideoCardData.subTitle}</Card.Text>
    //   </Card.Body>
    // </Card>
  );
};

export default VideoCard;
