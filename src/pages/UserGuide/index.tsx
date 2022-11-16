import ProfileCard from "@/components/Profile";
import React from "react";
import SearchBar from "@/components/SearchBar";
import HeaderTitle from "@/components/headerTitle";
import VideoCard from "@/components/VideoCard";
import { Col, Image } from "react-bootstrap";

const UserGuide = () => {
  
  return (
    <>
    <div className="userGuide">
      <p className="mx-4 my-3">Guides</p>
      <p className="mx-4 Ucontent">
        We have created these guides to improve your learning experience with
        WeBuild. Take a few minutes to <br></br>watch the videos below to
      </p>
      <div className="row justify-content-center px-3 mx-4 mb-4">
        <div className="col-4 uVideo">
          <Image src="../img/U-1.png" />
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
          <Image src="../img/U-2.png" />
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
