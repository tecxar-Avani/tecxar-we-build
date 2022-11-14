import CustomButton from "@/components/Button";
import ProfileCard from "@/components/Profile";
import VideoCard from "@/components/VideoCard";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import OuterBox from "../../components/OuterBox"

const NewBuild = () => {
    const videosData = [
        {
          id: "1",
          title: "",
          subTitle: "Therapist reacts to Big Ed",
          videoUrl: "img/RectangleVideoImg.png",
        },]
  return (
    <>
      <div className="overflow-auto">
            <div className="d-flex overflow-auto">
              {videosData.length > 0 &&
                videosData.map((videoData, index) => (
                    <div className="videoProfile" key={index}>
                        <Link href="/newBuild">

                    <VideoCard VideoCardData={videoData} />
                        </Link>
                  </div>
                ))}
            </div>
          </div>




      <div className="justify-content-start aboutclass "></div>

          <div className="border-top"></div>
          <CustomButton title="suresh" className="btn1" />
          {/* <Button className="btn1">
              Group
          </Button> */}
          <Button className="btn2"> New row</Button>


    </>
  );
};

export default NewBuild;
