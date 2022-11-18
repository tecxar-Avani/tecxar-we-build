import Link from "next/link";
import React, { useRef, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import CustomButton from "./Button";
import VideoCard from "./VideoCard";
import { MenuProps, Tooltip } from "antd";
import { Dropdown, Space, Typography } from "antd";
import { Input, Modal } from "antd";
const NewBuildSideCard = (props: any) => {
  const [polarisation, setPolarisation] = useState(false);
  const polarisations = useRef(null);
  const [difficulty, setDifficulty] = useState(false);
  const target2 = useRef(null);
  const [type, setType] = useState(false);
  const typeVideo = useRef(null);

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
      <TextArea
        placeholder="What is Video About?"
        autoSize={{ minRows: 3, maxRows: 5 }}
        className="py-0 newBuild"
      />
      <hr className="border-dark ms-2" />

      <div className="mx-4">
        <CustomButton title="Group" className="btn1 px-4 py-3" />
        <CustomButton title="New row" className="btn2  px-4 py-3 ms-3" />
      </div>
      <hr className="border-dark ms-2" />

      <div className="ms-2">
        <CustomButton title="Inspiration" className="inspirationButton " />
        <div>
          <Image src="../img/polygon 22.png" />
          <Image src="../img/polygon 24.png" className="blue" />
          <div>
            <CustomButton title="Acceptance" className="acceptanceButton " />
          </div>
        </div>
        <div className="redtraingle">
          <Image src="../img/polygon 23.png" />
        </div>
        <CustomButton title="Resistance" className="resistanceButton" />
      </div>

      <hr className="border-dark ms-2" />

      <div className="d-flex ml-2 ms-1 ">
        <Button variant="" ref={typeVideo} onClick={() => setType(!type)}>
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
        </Button>
        <Overlay target={typeVideo.current} show={type} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "black",
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              <button className="high-btn">Practical</button>
              <br></br>
              <button className="high-btn">Theoretical</button>
              <br></br>
            </div>
          )}
        </Overlay>
        <Button
          variant=""
          ref={polarisations}
          onClick={() => setPolarisation(!polarisation)}
        >
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
        </Button>
        <Overlay
          target={polarisations.current}
          show={polarisation}
          placement="right"
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "black",
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              <button className="high-btn">Low</button>
              <button className="high-btn">Medium</button>
              <br></br>
              <button className="high-btn">High</button>
              <button className="high-btn mt-0">
                Very <br></br>High
              </button>
            </div>
          )}
        </Overlay>
        <Button
          variant=""
          ref={target2}
          onClick={() => setDifficulty(!difficulty)}
        >
          <figure className="ms-3">
            <Image
              src="../img/difficulty.svg"
              height={40}
              width={40}
              className="mx-3"
            />

            <figcaption className="text-center mt-2">Difficulty</figcaption>
          </figure>
        </Button>
        <Overlay target={target2.current} show={difficulty} placement="left">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: "absolute",
                backgroundColor: "black",
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              <button className="high-btn">Low</button>
              <button className="high-btn">Medium</button>
              <br></br>
              <button className="high-btn">High</button>
              <button className="high-btn mt-0">
                Very <br></br>High
              </button>
            </div>
          )}
        </Overlay>
      </div>

      <hr className="border-dark  ms-2  " />
      <div className="d-flex owd bd-highlight">
        <Tooltip
          placement="topLeft"
          title="Please make an account to save your build - dont let all your hard work go to waste!Login via Google"
          arrowPointAtCenter
          color="#FAEFAF"


        >
          <div className="save bd-highlight  ">
            <Image src="../img/save.svg" className="ms-2" />
          </div>


        </Tooltip>
        {/* <div className="save bd-highlight  ">
          <Image src="../img/save.svg" className="ms-2" onClick={warning} />
        </div> */}

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
