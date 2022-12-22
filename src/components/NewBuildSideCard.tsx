import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import CustomButton from "./Button";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../hooks";
import { userSelector } from "@/store/reducers/user.reducer";
import {
  buildSelector,
  deleteBuildId,
  getBuildById,
} from "@/store/reducers/build.reducer";
import LogInButton from "./LogInButton";

const NewBuildSideCard = (props: any) => {
  const [polarisation, setPolarisation] = useState(false);
  const { buildById } = useAppSelector(buildSelector);
  const { userData } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const polarisations = useRef(null);
  const [difficulty, setDifficulty] = useState(false);
  const target2 = useRef(null);
  const [type, setType] = useState(false);
  const typeVideo = useRef(null);
  const [videoType, setVideoType] = useState<any>("theory");
  const [polarisationLevel, setPolarisationLevel] = useState<any>("low");
  const [difficultyLevel, setDifficultyLevel] = useState<any>("low");
  const url = `https://www.youtube.com/watch?v=${props.videoId}`;
  const [modal5Open, setModal5Open] = useState(false);

  useEffect(() => {
    dispatch(getBuildById(props.id));
  }, []);

  const handleCancel = () => {
    setModal5Open(false);
  };

  const deleteBuild = () => {
    dispatch(deleteBuildId(props.id));
  };
  
  const userId = buildById?.data?.map((a: any) => a.created_by);
  
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
        <div
          style={
            props.id == "undefined"
              ? { pointerEvents: "none", opacity: 0.4 }
              : {}
          }
        >
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
            <CustomButton
              title="Resistance"
              className="resistanceButton"
              onClick={props.Resistance}
            />
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
                  onClick={(e:any) => {
                     setVideoType(e.target.name);
                    setType(false);
                  }}
                >
                  Practical
                </button>
                <br></br>
                <button
                  className="high-btn2"
                  name="Theoretical"
                  onClick={(e:any) => {
                     setVideoType(e.target.name);
                    setType(false);
                  }}
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
                  onClick={(e: any) => {
                    setPolarisationLevel(e.target.name);
                    setPolarisation(false);
                  }}
                >
                  Low
                </button>
                <button
                  className="high-btn"
                  name="Medium"
                  onClick={(e: any) => {
                    setPolarisationLevel(e.target.name);
                    setPolarisation(false);
                  }}
                >
                  Medium
                </button>
                <br></br>
                <button
                  className="high-btn"
                  name="High"
                  onClick={(e: any) => {
                    setPolarisationLevel(e.target.name);
                    setPolarisation(false);
                  }}
                >
                  High
                </button>
                <button
                  className="high-btn3 mt-0"
                  name="VeryHigh"
                  onClick={(e: any) => {
                    setPolarisationLevel(e.target.name);
                    setPolarisation(false);
                  }}
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
                  onClick={(e: any) => {
                    setDifficultyLevel(e.target.name);
                    setDifficulty(false);
                  }}
                >
                  Low
                </button>
                <button
                  className="high-btn"
                  name="Medium"
                  onClick={(e: any) => {
                    setDifficultyLevel(e.target.name);
                    setDifficulty(false);
                  }}
                >
                  Medium
                </button>
                <br></br>
                <button
                  className="high-btn"
                  name="High"
                  onClick={(e: any) => {
                    setDifficultyLevel(e.target.name);
                    setDifficulty(false);
                  }}
                >
                  High
                </button>
                <button
                  className="high-btn3"
                  name="VeryHigh"
                  onClick={(e: any) => {
                    setDifficultyLevel(e.target.name);
                    setDifficulty(false);
                  }}
                >
                  Very High
                </button>
              </div>
            )}
          </Overlay>
        </div>

        <hr className="border-dark  ms-2  " />
        <div className="d-flex owd bd-highlight">
          {/* {props.isLoggedIn === true ? ( */}
          <div
            className="save bd-highlight cursor-pointer"
            onClick={() =>
              props.isLoggedIn === true
                ? props.onSave(
                    videoType,
                    polarisationLevel,
                    difficultyLevel,
                    url
                  )
                : setModal5Open(true)
            }
            style={
              props.id == undefined ||
              props.id == "undefined" ||
              (userId && userId.length > 0 && userId[0] == userData.id)
                ? {}
                : { pointerEvents: "none", opacity: 0.4 }
            }
          >
            <Image src="/img/save.svg" className="ms-2" alt="no image" />
          </div>
          <div className="backward bd-highlight cursor-pointer">
            <Image src="/img/backward.svg" className="ms-5 me-1" />
          </div>
          <div className=" forward bd-highlight cursor-pointer">
            <Image src="/img/forward.svg" className="me-5" />
          </div>
          {/* <Link href={`../`}> */}
          <div
            className="delt bd-highlight cursor-pointer"
            onClick={deleteBuild}
            style={
              userId && userId.length > 0 && userId[0] == userData.id
                ? {}
                : { pointerEvents: "none", opacity: 0.4 }
            }
          >
            <Image src="/img/delt.svg" className="me-3" />
          </div>
          {/* </Link> */}
        </div>
      </div>
      <LogInButton
        title=""
        open={modal5Open}
        className="btnrv"
        handleCancel={handleCancel}
      />
    </>
  );
};

export default NewBuildSideCard;
