import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import CustomButton from "./Button";
import VideoCard from "./VideoCard";
import { Button, Input } from "antd";
const NewBuildSideCard = (props: any) => {

  const { TextArea } = Input;
  const videosData = [
    {
      id: "1",
      title: "",
      videoUrl: "img/RectangleVideoImg.png",
    },
  ];
  return (
    <div>
      {videosData.length > 0 &&
        videosData.map((videoData, index) => (
          <div className="videoProfile" key={index}>
            <Link href="/newBuild">
              <VideoCard VideoCardData={videoData} />
            </Link>
          </div>
        ))}
      <TextArea placeholder="What is Video About?" autoSize={{ minRows: 3, maxRows: 5 }} className="py-0 newBuild" />
      <hr className="border-dark" />

      <div className="mx-4">
        <CustomButton title="Group" className="btn1 px-4 py-3" />
        <CustomButton title="New row" className="btn2  px-4 py-3 ms-2" />
      </div>
      <hr className="border-dark" />


      <CustomButton title="Inspiration" className="inspirationButton px-1" />
      <div>
        <Image src="../img/polygon 22.png" className="hover" />
        <Image src="../img/polygon 24.png" className="hover" />
        <CustomButton title="Acceptance" className="acceptanceButton px-1" />
        <Image src="../img/polygon 23.png" className="redTriangle hoverRedTriangle" />
      </div>


      <CustomButton title="Resistance" className="resistanceButton px-1" />












      <hr className="border-dark" />

      <div className="d-flex ml-2 ms-1 ">
        <figure className="ms-3">
          <Image
            src="../img/typeof.svg "
            height={40}
            width={40}
            className="mx-2"
          />
          <figcaption className="text-center mt-2">
            Type of <br></br>Video
          </figcaption>
        </figure>

        <figure className="ms-3">
          <Image
            src="../img/polarisation.svg"
            height={40}
            width={40}
            className="mx-3"
          />
          <figcaption className="text-center mt-2">
            Polarisation <br></br>potental
          </figcaption>
        </figure>

        <figure className="ms-3">
          <Image
            src="../img/difficulty.svg"
            height={40}
            width={40}
            className="mx-3"
          />

          <figcaption className="text-center mt-2">Difficulty</figcaption>
        </figure>
      </div>

      <hr className="border-dark mb-3  " />
      <div className="d-flex owd bd-highlight">
        <div className="save bd-highlight  ">
          <Image src="../img/save.svg" className="ms-2" />
        </div>
        <div className="backward bd-highlight">
          <Image src="../img/backward.svg" className="ms-5 me-1" />
        </div>
        <div className=" forward bd-highlight">
          <Image src="../img/forward.svg" className="me-5" />
        </div>
        <div className=" delt bd-highlight">
          <Image src="../img/delt.svg" className="me-3" />
        </div>
      </div>
    </div>
  );
};

export default NewBuildSideCard;
