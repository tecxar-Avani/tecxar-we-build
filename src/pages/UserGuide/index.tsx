import React from "react";
import { Image } from "react-bootstrap";
import Head from "next/head";
import VideoCard from "@/components/VideoCard";

const UserGuide = () => {
  const videoData = {
    description: "#mindfulness #emotionalintelligence #learning",
duration: "0:3:2",
newVideoId: "MwHGUAFDjHM",
publishedAt: "2023-01-31T16:22:03Z",
thumbnails: {
  height: 180,
url: "https://i.ytimg.com/vi/MwHGUAFDjHM/medium.jpg",
width: 320,
},
// title: "LEARN BETTER ON YOUTUBE with WeBuildMinds! BREAK DOWN VIDEOS|ANKI FLASHCARDS|EMOTIONAL INTELLIGENCE",
url: "https://www.youtube.com/embed/MwHGUAFDjHM",
videoId: "MwHGUAFDjHM",
  }
  return (
    <>
        <Head>
        <title>UserGuide</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <div className="userGuide">
      <p className="mx-4 my-3">Guides</p>
      <p className="mx-4 Ucontent">
        We have created these guides to improve your learning experience with
        WeBuild. Take a few minutes to <br></br>watch the videos below to
      </p>
      <div className="row justify-content-center px-3 mx-4 mb-4">
        <div className="col-4 uVideo">
        <iframe  
        width="100%"
        height="400" 
        src={videoData.url}
        name="youtube embed" 
        title="YouTube video player"
         allowFullScreen frameBorder={0}></iframe><div className="position-absolute bottom-0 end-0 px-2 mb-2 me-2 py-1 bg-black rounded">
         {/* <span className="text-white">{videoData?.duration}</span> */}
       </div>
        </div>
        <div className="videoContent col-4">
          <div>
            For when you want to learn about something<br></br>
            <br></br>
            <div className="videoContent2 text-justify">
              Maecenas pellentesque sem vel semper fermentum. Aenean tincidunt
              urna id ligula lobortis, ut euismod mi dictum. Sed facilisis vitae
              sapien vitae rutrum. Ut ut congue ante, non varius libero. Mauris
              ac aliquam ante. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere ASD and we thing that you wll be ok if
              you just cary on with what you are doing{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center px-3 mx-4 Ucontent-2 mt-0">
        <div className="col-4  uVideo">
          <Image src="../img/U-2.png"  width="100%"
        height="400"/>
        </div>
        <div className="videoContent col-4">
          <div>
            For when you want to learn about yourself <br></br>
            <br></br>
            <div className="videoContent2 text-justify">
              Maecenas pellentesque sem vel semper fermentum. Aenean tincidunt
              urna id ligula lobortis, ut euismod mi dictum. Sed facilisis vitae
              sapien vitae rutrum. Ut ut congue ante, non varius libero. Mauris
              ac aliquam ante. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere ASD and we thing that you wll be ok if
              you just cary on with what you are doing
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default UserGuide;
