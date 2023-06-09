import React, { Fragment, useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import CustomButton from "./Button";
import { useAppSelector, useAppDispatch } from "../hooks";
import { userSelector } from "@/store/reducers/user.reducer";
import {
  buildSelector,
  deleteBuildId,
  getBuildById,
} from "@/store/reducers/build.reducer";
import LogInButton from "./LogInButton";
import { Form, Modal, Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const NewBuildSideCard = (props: any) => {
  const [polarisation, setPolarisation] = useState(false);
  const { buildById } = useAppSelector(buildSelector);
  const { userData, loggedInUser } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const polarisations = useRef(null);
  const [difficulty, setDifficulty] = useState(false);
  const target2 = useRef(null);
  const [type, setType] = useState(false);
  const typeVideo = useRef(null);
  const [videoType, setVideoType] = useState<any>("theory");
  const [hoverEffect, setHoverEffect] = useState<boolean>(false);
  const [polarisationLevel, setPolarisationLevel] = useState<any>("low");
  const [difficultyLevel, setDifficultyLevel] = useState<any>("low");
  const [undoClick, setUndoClick] = useState(false);

  const url = `https://www.youtube.com/watch?v=${props.videoId}`;
  const [modal5Open, setModal5Open] = useState(false);
  const { confirm } = Modal;
  const [form] = Form.useForm();
  const [videoDesc, setVideoDesc] = useState("");

  useEffect(() => {
    dispatch(getBuildById(props.id));
  }, []);
  useEffect(() => {
    setVideoDesc(buildById &&
      buildById.data &&
      buildById.data.length > 0 &&
      buildById.data[0].video_description)
  }, [buildById]);

  useEffect(() => {
    setTimeout(() => {
      setHoverEffect(false);
    }, 5000);
  }, [hoverEffect]);

  const handleCancel = () => {
    setModal5Open(false);
  };

  const deleteBuild = () => {
    dispatch(deleteBuildId(props.id));
  };

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to delete build?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteBuild();
      },
      onCancel() {},
    });
  };
  const userId = buildById?.data?.map((a: any) => a.created_by);
  const groupSelect = () => {
    props.groupSelect();
    props.setIsSelectedGroupData;
  };
  const videoDescription = (e: any) => 
  {
      setVideoDesc(e.target.value);
  };

  const backGroundChange = (e:any) =>{
  }
  return (
    <Fragment>
      <div className="newBuildSideCard">
        <div className="videoProfile">
          <iframe
            width="100%"
            height="215"
            src={`//www.youtube.com/embed/${props.videoId}?autoplay=1&mute=1`}
            name="youtube embed"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
        {
          <div className="mb-2">
           
            <TextArea
              placeholder="What is video about?"
              onChange={videoDescription}
              readOnly={
                userId && userId.length > 0 && userId[0] !== userData.id && true
              }
              defaultValue={
                buildById &&
                buildById.data &&
                buildById.data.length > 0 &&
                buildById.data[0].video_description
              }
              key={
                buildById &&
                buildById.data &&
                buildById.data.length > 0 &&
                buildById.data[0].video_description
              }
              autoSize={{ minRows: 4, maxRows: 4 }}
              required
            ></TextArea>
            
          </div>
        }
        {/* <div className="d-flex align-items-center border-top border-bottom border-dark p-2 justify-content-center">
          <div
            className="mx-1 buttons"
            onClick={groupSelect}
            style={
              userId && userId.length > 0 && userId[0] == userData.id
                ? {}
                : { pointerEvents: "none", opacity: 0.4 }
            }
          >
            <Button className="">Group</Button>
          </div>
          <div
            className="mx-1 buttons"
            onClick={props.editGroupSelect}
            style={
              userId &&
              userId.length > 0 &&
              userId[0] == userData.id &&
              props.mergedArray?.length >= 2
                ? {}
                : { pointerEvents: "none", opacity: 0.4 }
            }
          >
            <Button className="">EditGroup</Button>
          </div>
          {(props.activeSelection || props.isEditSelect) && (
            <div className="mx-1 buttonSubmit">
              <Button
                type="submit"
                className="submitButton"
                onClick={props.submitGroup}
              >
                Submit
              </Button>
            </div>
          )}
        </div> */}

        <div
          style={
            props.id == "undefined"
              ? { pointerEvents: "none", opacity: 0.4 }
              : {}
          }
          className="triangle align-items-center border-bottom border-dark"
        >
          <div className="mt-3 mb-0 triangle1 ms-1">
            <span
              onClick={() => {
                props.value == "" ? {} : props.setAwarenessModal(true);
              }}
            >
              <span onClick={props.Inspiration}>
                <CustomButton
                  title="Inspiration"
                  className="inspirationButton"
                />
              </span>
            </span>
            <div>
              <span onClick={props.Inspiration} className="mb-0 mt-0">
                <div
                  className="purplePolygon cursor-pointer"
                  onClick={() => {
                    props.value == "" ? {} : props.setAwarenessModal(true);
                  }}
                />
                {/* <Image src="../img/polygon22.png" onClick={props.Inspiration} /> */}
              </span>
              <span onClick={props.Acceptance} className="mb-0 mt-0">
                {/* <Image
                src="../img/polygon24.png"
                onClick={props.Acceptance}
                className="blue"
              /> */}
                <div
                  className="bluePolygon cursor-pointer"
                  onClick={() => {
                    props.value == "" ? {} : props.setAwarenessModal(true);
                  }}
                />
              </span>

              <div
                onClick={() => {
                  props.value == "" ? {} : props.setAwarenessModal(true);
                }}
              >
                <span onClick={props.Acceptance}>
                  <CustomButton
                    title="Acceptance"
                    className="acceptanceButton"
                  />
                </span>
              </div>
            </div>

            <span onClick={props.Resistance}>
              <div
                className="redpolygon cursor-pointer"
                onClick={() => {
                  props.value == "" ? {} : props.setAwarenessModal(true);
                }}
              />
            </span>

            <div
              onClick={() => {
                props.value == "" ? {} : props.setAwarenessModal(true);
              }}
            >
              <span onClick={props.Resistance}>
                <CustomButton
                  title="Resistance"
                  className="resistanceButton"
                  onClick={props.Resistance}
                />
              </span>
            </div>
          </div>
        </div>

        {/* <div className="px-2 threeButton align-items-center border-bottom border-dark ">
          <div className="d-flex mt-4 justify-content-between">
            <div className="text-center">
              <Button variant="" ref={typeVideo} onClick={() => {setType(!type); setPolarisation(false); setDifficulty(false)} }>
                <figure className="m-0">
                  <Image src="../img/typeof.svg " height={40} className="" />
                  <figcaption className="text-center mt-2">
                    Type of <br></br>Video
                  </figcaption>
                </figure>
              </Button>
              <Overlay
               target={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && typeVideo.current} 
              show={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && type} placement="right">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style, 
                    }}
                    className={`tooltipOfImages`}
                  >
                    <button
                      className={`high-btn2 ${videoType && videoType == "Practical" && "bg-info text-dark"}`}
                      name="Practical"
                      onClick={(e: any) => {
                        setVideoType(e.target.name);
                        setType(false);
                        setHoverEffect(true);
                      }
                    }
                    >
                      Practical
                    </button>
                    <br></br>
                    <button
                      className={`high-btn2 ${videoType && videoType == "Theoretical" && "bg-info text-dark"}`}
                      name="Theoretical"
                      onClick={(e: any) => {
                        setVideoType(e.target.name);
                        setType(false);
                        setHoverEffect(true);
                      }}                     
                    >
                      Theoretical
                    </button>
                    <br></br>
                  </div>
                )}
              </Overlay>
            </div>
            <div>
              <Button
                variant=""
                ref={polarisations}
                onClick={() => {setPolarisation(!polarisation); setType(false); setDifficulty(false)}}
              >
                <figure className="m-0">
                  <Image
                    src="../img/polarisation.svg"
                    height={40}
                    className=""
                  />
                  <figcaption className="text-center mt-2">
                    Polarisation<br></br> potential
                  </figcaption>
                </figure>
              </Button>
              <Overlay
                target={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && polarisations.current}
                show={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && polarisation}
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
                      className={`high-btn ${polarisationLevel && polarisationLevel == "Low" && "bg-info text-dark"}`}
                      name="Low"
                      onClick={(e: any) => {
                        setPolarisationLevel(e.target.name);
                        setPolarisation(false);
                        setHoverEffect(true);
                      }}
                    >
                      Low
                    </button>
                    <button
                      className={`high-btn ${polarisationLevel && polarisationLevel == "Medium" && "bg-info text-dark"}`}
                      name="Medium"
                      onClick={(e: any) => {
                        setPolarisationLevel(e.target.name);
                        setPolarisation(false);
                        setHoverEffect(true);
                      }}
                    >
                      Medium
                    </button>
                    <br></br>
                    <button
                      className={`high-btn ${polarisationLevel && polarisationLevel == "High" && "bg-info text-dark"}`}
                      name="High"
                      onClick={(e: any) => {
                        setPolarisationLevel(e.target.name);
                        setPolarisation(false);
                        setHoverEffect(true);
                      }}
                    >
                      High
                    </button>
                    <button
                      className={`high-btn3 mt-0 ${polarisationLevel && polarisationLevel == "VeryHigh" && "bg-info text-dark"}`}
                      name="VeryHigh"
                      onClick={(e: any) => {
                        setPolarisationLevel(e.target.name);
                        setPolarisation(false);
                        setHoverEffect(true);
                      }}
                    >
                      Very High
                    </button>
                  </div>
                )}
              </Overlay>
            </div>
            <div>
              <Button
                variant=""
                ref={target2}
                onClick={() => {setDifficulty(!difficulty); setType(false); setPolarisation(false)}}
              >
                <figure className="m-0 difficult">
                  <Image
                    src="../img/difficulty.svg"
                    height={50}
                    width={40}
                    className=""
                  />

                  <figcaption className="text-center mt-2">
                    Difficulty
                  </figcaption>
                </figure>
              </Button>
              <Overlay
                target={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && target2.current}
                show={((props.id == "undefined") || (userId && userId.length > 0 && userId[0] == userData.id)) && difficulty}
                placement="left"
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
                      className={`high-btn ${difficultyLevel && difficultyLevel == "Low" && "bg-info text-dark"}`}
                      name="Low"
                      onClick={(e: any) => {
                        setDifficultyLevel(e.target.name);
                        setDifficulty(false);
                        setHoverEffect(true);
                      }}
                    >
                      Low
                    </button>
                    <button
                      className={`high-btn ${difficultyLevel && difficultyLevel == "Medium" && "bg-info text-dark"}`}
                      name="Medium"
                      onClick={(e: any) => {
                        setDifficultyLevel(e.target.name);
                        setDifficulty(false);
                        setHoverEffect(true);
                      }}
                    >
                      Medium
                    </button>
                    <br></br>
                    <button
                      className={`high-btn ${difficultyLevel && difficultyLevel == "High" && "bg-info text-dark"}`}
                      name="High"
                      onClick={(e: any) => {
                        setDifficultyLevel(e.target.name);
                        setDifficulty(false);
                        setHoverEffect(true);
                      }}
                    >
                      High
                    </button>
                    <button
                      className={`high-btn3 ${difficultyLevel && difficultyLevel == "VeryHigh" && "bg-info text-dark"}`}
                      name="VeryHigh"
                      onClick={(e: any) => {
                        setDifficultyLevel(e.target.name);
                        setDifficulty(false);
                        setHoverEffect(true);
                      }}
                    >
                      Very High
                    </button>
                  </div>
                )}
              </Overlay>
            </div>
          </div>
        </div> */}
        <div className="px-3 mt-4 py-1">
          <div className="d-flex owd bd-highlight justify-content-between align-items-center">
            {/* {props.isLoggedIn === true ? ( */}
            <div
              id={`${hoverEffect && "blink"}`}
              className={`save bd-highlight cursor-pointer`}
              onClick={() => {
                // props.isLoggedIn === true || loggedInUser?.length > 0
                //   ?
                   props.isSave === false &&
                    props.onSave(
                      videoType,
                      polarisationLevel,
                      difficultyLevel,
                      url,
                      videoDesc  
                    )
                  // : setModal5Open(true);
              }}
              style={
                props.id == undefined ||
                props.id == "undefined" ||
                (userId && userId.length > 0 && userId[0] == userData.id)
                  ? {}
                  : { pointerEvents: "none", opacity: 0.4 }
              }
            >
              {hoverEffect ? (
                <Tooltip
                  placement="bottom"
                  title={"Click me to save your data"}
                >
                  <Image src="/img/save.svg" alt="no image" />
                </Tooltip>
              ) : (
                <Image src="/img/save.svg" alt="no image" />
              )}
            </div>
            {/* <div className="d-flex">
              <div className="backward bd-highlight cursor-pointer">
                <Image
                  src="/img/backward.svg"
                  className="me-1"
                  onClick={() => {
                    setDifficultyLevel("low");
                    setPolarisationLevel("low");
                    setVideoType("theory");
                    props?.setIsRefresh(true);
                    setUndoClick(true)
                  }}
                  style={
                     props.textEnter
                      ? {}
                      : { pointerEvents: "none", opacity: 0.4 }
                  }
                />
              </div>
              <div className=" forward bd-highlight cursor-pointer">
                <Image
                  src="/img/forward.svg"
                  className=""
                  onClick={() => {
                    setDifficultyLevel("low"),
                      setPolarisationLevel("low"),
                      setVideoType("theory"),
                      // props?.setIsRefresh(true);
                      props?.setIsRedo(true);
                  }}
                   style={
                   undoClick 
                      ? {}
                      : { pointerEvents: "none", opacity: 0.4 }
                  }
                />
              </div>
            </div> */}
            {/* <Link href={`../`}> */}
            <div
              className="delt bd-highlight cursor-pointer"
              onClick={showConfirm}
              style={
                userId && userId.length > 0 && userId[0] == userData.id
                  ? {}
                  : { pointerEvents: "none", opacity: 0.4 }
              }
            >
              <Image src="/img/delt.svg" />
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <LogInButton
        title=""
        open={modal5Open}
        className="btnrv"
        handleCancel={handleCancel}
        isLoggedIn={props.isLoggedIn}
        // setAuth={(data: any) => {
        //   setAuth(data);
        //   setModal5Open(false);
        // }}
      />
    </Fragment>
  );
};

export default NewBuildSideCard;
