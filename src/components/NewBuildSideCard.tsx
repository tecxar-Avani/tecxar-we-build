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
import AwarenessModal from "./AwarenessModal";


const NewBuildSideCard = (props: any) => {
  const [polarisation, setPolarisation] = useState(false);
  const polarisations = useRef(null);
  const [difficulty, setDifficulty] = useState(false);
  const target2 = useRef(null);
  const [type, setType] = useState(false);
  const typeVideo = useRef(null);
  const [awarenessModal, setAwarenessModal] = useState(false);

  const [accept, setAccept] = useState(false);
  const [inspiration, setInspiration] = useState(false)
  const [resistance, setResistance] = useState(false)
  const Acceptance = () => {
    setResistance(false)
    setInspiration(false)
    setAccept(true)
  };
  const Inspiration = () => {
    setAccept(false)
    setResistance(false)
    setInspiration(true)
  };
  const Resistance = () => {
    setAccept(false)
    setInspiration(false)
    setResistance(true)
  };

  const { TextArea } = Input;
  const videosData = [
    {
      id: "1",
      title: "",
      videoUrl: "img/RectangleVideoImg.png",
    },
  ];
  const awarenessModalData = {
    title: ["hello"],
    footer: ["save", "Reveal answer", "Delete"],
    textbox: [
      { header: "Back", box: "" },
    ],
  };

  return (
    <>

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


        <CustomButton title="Inspiration" className="inspirationButton" />

        <div className="ms-2">
          <span onClick={() => { setAwarenessModal(true) }}>
            <Image src="../img/polygon 22.png" onClick={Inspiration} /></span>
          <span onClick={() => { setAwarenessModal(true) }}>
            <Image src="../img/polygon 24.png" onClick={Acceptance} className="blue" /></span>

          <div >
            <CustomButton title="Acceptance" className="acceptanceButton " />
          </div>
        </div>

        <div className="redpolygon" >
        </div>

        <CustomButton title="Resistance" className="resistanceButton" />

        {/* <div className="ms-2"> */}
        {/* <CustomButton title="Inspiration" className="inspirationButton " />
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
        </div> */}

        <hr className="border-dark ms-2" />

        <div className="d-flex ml-2 ms-1 threeButton">
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
                <button className="high-btn2">Practical</button>
                <br></br>
                <button className="high-btn2">Theoretical</button>
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
                <button className="high-btn3 mt-0">
                  Very High
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
                <button className="high-btn3">Very High</button></div>
            )}
          </Overlay>
        </div>

        <hr className="border-dark  ms-2  " />
        <div className="d-flex owd bd-highlight">

          <Tooltip
            placement="topLeft"
            title={<><div className="d-flex  ">
              <Image src="../img/bulb.png" className="mx-n2 ms-2 pe-2" /> Please make an account to save your build - don't let all your hard work go to waste!
              Login via Google</div></>}
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
      <AwarenessModal
        awarenessModal={awarenessModal}
        awareness={awarenessModalData}
        setAwarenessModal={setAwarenessModal}
        visible={awarenessModal}
        className={`${accept ? 'accptanceModalBG' : inspiration ? 'inspirationModalBG' : resistance ? 'resistanceModalBG' : ''}`}
      />
    </>
  );
};

export default NewBuildSideCard;
