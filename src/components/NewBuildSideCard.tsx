import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import CustomButton from "./Button";
import { Modal, Tooltip } from "antd";
import Link from "next/link";
import GoogleButton from "react-google-button";

const NewBuildSideCard = (props: any) => {
  const [polarisation, setPolarisation] = useState(false);
  const polarisations = useRef(null);
  const [difficulty, setDifficulty] = useState(false);
  const target2 = useRef(null);
  const [type, setType] = useState(false);
  const typeVideo = useRef(null);
  const [videoType, setVideoType] = useState<any>("theory");
  const [polarisationLevel, setPolarisationLevel] = useState<any>("low");
  const [difficultyLevel, setDifficultyLevel] = useState<any>("low");
  const url = `https://www.youtube.com/watch?v=${props.id}`;

  const [modal5Open, setModal5Open] = useState(false);
  const togglemodal = () => {
    setModal5Open(!modal5Open);
  };
  const handleVideoTypeClick = (e: any) => {
    setVideoType(e.target.name);
  };
  const handlePolarisationClick = (e: any) => {
    setPolarisationLevel(e.target.name);
  };
  const handleDifficultyClick = (e: any) => {
    setDifficultyLevel(e.target.name);
  };
  
  return (
    <>
      <div>
        <div className="videoProfile">
          <iframe
            width="100%"
            height="215"
            src={`//www.youtube.com/embed/${props.videoId}?autoplay=1&mute=1`}
            name="youtube embed"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>

        <hr className="border-dark" />

        {/* <div className="mx-4">
          <CustomButton title="Group" className="btn1 px-4 py-3 " />
          <CustomButton title="New row" className="btn2  px-4 py-3 ms-2 " />
        </div>
        <hr className="border-dark" /> */}
        <div>
          <span
            onClick={() => {
              props.value == "" ? {} : props.setAwarenessModal(true);
            }}
          >
            <span onClick={props.Inspiration}>
              <CustomButton
                title="Inspiration"
                className="inspirationButton "
              />
            </span>
          </span>
          <div>
            <span
              onClick={() => {
                props.value == "" ? {} : props.setAwarenessModal(true);
              }}
            >
              <Image src="../img/polygon22.png" onClick={props.Inspiration} />
            </span>
            <span
              onClick={() => {
                props.value == "" ? {} : props.setAwarenessModal(true);
              }}
            >
              <Image
                src="../img/polygon24.png"
                onClick={props.Acceptance}
                className="blue"
              />
            </span>

            <div
              onClick={() => {
                props.value == "" ? {} : props.setAwarenessModal(true);
              }}
            >
              <span onClick={props.Acceptance}>
                <CustomButton title="Acceptance" className="acceptanceButton" />
              </span>
            </div>
          </div>

          <span
            onClick={() => {
              props.value == "" ? {} : props.setAwarenessModal(true);
            }}
          >
            <div className="redpolygon" onClick={props.Resistance} />
          </span>

          <span
            onClick={() => {
              props.value == "" ? {} : props.setAwarenessModal(true);
            }}
          >
            
              <CustomButton title="Resistance" className="resistanceButton" onClick={props.Resistance}/>
          
          </span>
        </div>
        <hr className="border-dark" />

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
                  ...props.style,
                }}
                className="tooltipOfImages"
              >
                <button
                  className="high-btn2"
                  name="Practical"
                  onClick={handleVideoTypeClick}
                >
                  Practical
                </button>
                <br></br>
                <button
                  className="high-btn2"
                  name="Theoretical"
                  onClick={handleVideoTypeClick}
                >
                  Theoretical
                </button>
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
                  ...props.style,
                }}
                className="tooltipOfImages"
              >
                <button
                  className="high-btn"
                  name="Low"
                  onClick={handlePolarisationClick}
                >
                  Low
                </button>
                <button
                  className="high-btn"
                  name="Medium"
                  onClick={handlePolarisationClick}
                >
                  Medium
                </button>
                <br></br>
                <button
                  className="high-btn"
                  name="High"
                  onClick={handlePolarisationClick}
                >
                  High
                </button>
                <button
                  className="high-btn3 mt-0"
                  name="VeryHigh"
                  onClick={handlePolarisationClick}
                >
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
                  ...props.style,
                }}
                className="tooltipOfImages"
              >
                <button
                  className="high-btn"
                  name="Low"
                  onClick={handleDifficultyClick}
                >
                  Low
                </button>
                <button
                  className="high-btn"
                  name="Medium"
                  onClick={handleDifficultyClick}
                >
                  Medium
                </button>
                <br></br>
                <button
                  className="high-btn"
                  name="High"
                  onClick={handleDifficultyClick}
                >
                  High
                </button>
                <button
                  className="high-btn3"
                  name="VeryHigh"
                  onClick={handleDifficultyClick}
                >
                  Very High
                </button>
              </div>
            )}
          </Overlay>
        </div>

        <hr className="border-dark  ms-2  " />
        <div className="d-flex owd bd-highlight">
          {props.isLoggedIn === true ? (
            <div
              className="save bd-highlight"
              onClick={() =>
                props.onSave(videoType, polarisationLevel, difficultyLevel, url)
              }
            >
              <Image src="/img/save.svg" className="ms-2" alt="no image" />
            </div>
          ) : (
            <Tooltip
              placement="topLeft"
              title={
                <>
                  <div className="d-flex  ">
                    <Image
                      src="../img/bulb.png"
                      className="mx-n2 ms-2 pe-2 bulb"
                    />
                    <p>
                      Please make an account to save your build - don't let all
                      your hard work go to waste!
                      <a href={`/api/google`}>Login via Google</a>
                    </p>
                  </div>
                </>
              }
              arrowPointAtCenter
              color="#FAEFAF"
            >
              <div className="save bd-highlight">
                <Image src="/img/save.svg" className="ms-2" alt="no image" />
              </div>
            </Tooltip>
          )}
          <div className="backward bd-highlight">
            <Image src="/img/backward.svg" className="ms-5 me-1" />
          </div>
          <div className=" forward bd-highlight">
            <Image src="/img/forward.svg" className="me-5" />
          </div>
          <Link href={`../`}>
            <div className=" delt bd-highlight">
              <Image src="/img/delt.svg" className="me-3" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewBuildSideCard;
