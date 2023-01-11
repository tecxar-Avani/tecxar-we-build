import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  flashCardSelector,
  getFlashCardByBuildId,
  createFlashCard,
} from "../../store/reducers/flashCard.reducer";
import { Card, Image } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";
import { useRouter } from "next/router";
import AwarenessTypeModal from "@/components/AwarenessTypeModal";
import AddFlashCardModal from "@/components/AddFlashCardModal";
import {
  addBuild,
  buildSelector,
  getBuildById,
  getBuildByUrl,
  UpdateUsersBuild,
} from "../../store/reducers/build.reducer";
import {
  addAwareness,
  addReviewResponse,
  awarenessSelector,
  getAwarenessByBoxId,
  updateBoxReviewResponseByAwarenessId,
} from "../../store/reducers/awareness.reducer";
import { Button, Form, Result } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ChallengeModal from "@/components/ChallengeModal";
import { toast } from "react-toastify";
import {
  userSelector,
  getUserByEmail,
} from "../../store/reducers/user.reducer";
import Head from "next/head";
import moment from "moment";
import { GetServerSideProps } from "next";
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import {
  createGroup,
  getGroupBoxesByBuild,
  groupSelector,
} from "@/store/reducers/group.reducer";
import { IGroup } from "../../../@types/common";

const NewBuild = (props: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { flashCardList } = useAppSelector(flashCardSelector);
  const { awarenessList } = useAppSelector(awarenessSelector);
  const [open, setOpen] = useState(false);
  const { buildById, buildListByUrl, boxes } = useAppSelector(buildSelector);
  const { userData, loggedInUser } = useAppSelector(userSelector);
  const { groupList } = useAppSelector(groupSelector);
  const [arr, setArr] = useState([1]);
  const [awarenessModal, setAwarenessModal] = useState(false);
  const [accept, setAccept] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const [resistance, setResistance] = useState(false);
  const [review, setReview] = useState<string>("");
  const [addFlashCardData, setAddFlashcard] = useState(false);
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState({});
  const [modal4Open, setModal4Open] = useState(false);
  const [awarenessIndex, setAwarenessIndex] = useState(false);
  const [challengeModal, setChallengeModal] = useState(false);
  const [challengeData, setChallengeData] = useState([]);
  const [challengeTitle, setChallengeTitle] = useState();
  const [awarenessBoxId, setAwarenessBoxId] = useState<number>(1);
  const [boxId, setBoxId] = useState();
  const [boxAwarenessID, setBoxAwarenessID] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  const [activeSelection, setActiveSelection] = useState(false);
  const [groupArray, setGroupArray] = useState<any>([]);

  const [boxData, setBoxData] = useState([]);
  const init = [...Array(20)];
  const [dataArray, setDataArray] = useState(
    init.map((i, index) => {
      return {
        id: Number(index + 1),
        message: "",
      };
    })
  );
  const [draggedArray, setDraggedArray] = useState([]);
  let dragg: any;
  const [completedTodos, setCompletedTodos] = useState([]);
  //Create Flash card
  const handleSubmit = (data: any) => {
    const flashCardData = {
      question: data.question,
      answer: data.answer,
      build_id: buildId,
    };
    dispatch(createFlashCard(flashCardData));
  };

  const Acceptance = () => {
    setResistance(false);
    setInspiration(false);
    setAccept(true);
  };

  const Inspiration = () => {
    setAccept(false);
    setResistance(false);
    setInspiration(true);
  };

  const Resistance = () => {
    setAccept(false);
    setInspiration(false);
    setResistance(true);
  };
  const buildId = Number(router.query.id);
  const buildIdForFlash = router.query.id;

  useEffect(() => {
    if (buildId) {
      dispatch(getBuildById(buildId));
      dispatch(getUserByEmail());
      dispatch(getGroupBoxesByBuild(buildId));
    }
  }, [buildId]);

  useEffect(() => {
    dispatch(getAwarenessByBoxId(buildId));
    dispatch(getFlashCardByBuildId(buildId));
  }, [buildId]);

  useEffect(() => {
    if (router.query.id == undefined) {
      setDataArray([]);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (buildById.data) {
      const data =
        buildById.data &&
        buildById.data.map((box: any) => {
          return {
            id: box.sorting_order,
            message: box.description,
            boxId: box.id,
          };
        });
      setDataArray(data);
      setArr(data.map((d: any) => d.id));
    }
  }, [buildById]);

  useEffect(() => {
    if (buildListByUrl.data) {
      setArr([1]);
      setDataArray(
        init.map((i, index) => {
          return {
            id: Number(index + 1),
            message: "",
          };
        })
      );
    }
  }, [buildListByUrl]);

  const dispatch = useAppDispatch();
  const flashCardArr = flashCardList?.rows?.flashBuild?.build;
  const userArr = flashCardList?.rows?.flashBuild?.users;

  const questionData = (userId: any, index?: number, questionId?: number) => {
    const filterArray = flashCardArr?.filter((F: any) => F.user_id == userId);
    const findLastValue = filterArray?.slice(-1)[0];
    const lastQuestionId = findLastValue?.id;
    if (filterArray && filterArray.length > 0) {
      if (questionId == lastQuestionId) {
        setModal3Open({
          content: "Congratulations! You have finished your deck",
          footer: [],
          onOk: modal4Open,
        });
        setRevealAns(true);
      } else {
        setModal3Open({
          content: index
            ? filterArray[index].question
            : filterArray[0].question,
          footer: ["Reveal Answer"],
          userId: index ? filterArray[index].user_id : filterArray[0].user_id,
          questionId: index ? filterArray[index].id : filterArray[0].id,
          index: index ? index + 1 : 1,
          arrayLength: filterArray.length,
          onOk: modal4Open,
        });
        setRevealAns(true);
      }
    }
  };
  const onSave = (
    videoType: any,
    polarisationLevel: any,
    difficultyLevel: any,
    url: string
  ) => {
    const saveData = {
      type_of_video: videoType,
      potential_polarization: polarisationLevel,
      difficulty_level: difficultyLevel,
      boxes: boxData,
      video_url: url,
    };
    const editData = {
      type_of_video: videoType,
      potential_polarization: polarisationLevel,
      difficulty_level: difficultyLevel,
      boxes: { boxData: boxData },
      video_url: url,
      id: buildId,
    };
    const buildCreatedBy = buildById?.data?.map((a: any) => a.created_by);
    if (
      buildCreatedBy &&
      buildCreatedBy.length > 0 &&
      buildCreatedBy[0] == userData.id
    ) {
      dispatch(UpdateUsersBuild(editData));
    } else if (boxData.length > 19) {
      dispatch(addBuild(saveData));
    } else {
      toast.error("You need to fill minimum 20 boxes");
    }
    // buildCreatedBy &&
    // buildCreatedBy.length > 0 &&
    // buildCreatedBy[0] == userData.id
    //   ? dispatch(UpdateUsersBuild(editData))
    //   : boxData.length > 1
    //   ?( dispatch(addBuild(saveData)))
    //   : toast.error("You need to fill minimum 20 boxes");
  };
  useEffect(() => {
    if (draggedArray && draggedArray.length > 0) {
      const editData = {
        boxes: { draggedArray: draggedArray, boxData: boxData },
        id: buildId,
      };
      dispatch(UpdateUsersBuild(editData));
    }
  }, [draggedArray]);
  const handleChange = (e: any) => {
    setAwarenessIndex(e.description);
    setAwarenessBoxId(e.id);
    setBoxId(e.boxId);
  };

  const handleData = (comment: any, review: any) => {
    const data = {
      comment: comment.comment,
      review_type: review,
      box_id: Number(boxId),
      build_id: buildId,
    };
    dispatch(addAwareness(data));
    setReview(review);
    setAwarenessModal(false);
  };

  // for awarenessType modal

  const showModal = (id: any) => {
    setBoxAwarenessID(id);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const challengeClose = () => {
    setChallengeModal(false);
  };

  //boxReviewResponse

  const isAccepted = (challenge_id: any) => {
    const data = {
      is_accepted: 1,
      id: challenge_id,
      build_id: buildId,
    };
    dispatch(updateBoxReviewResponseByAwarenessId(data));
  };

  const buildCreatedBy = buildById?.data?.map((a: any) => a.created_by);
  const content = (title: any) => {
    const titleLowerCase = title.toLowerCase();
    return (
      <>
        {awarenessList &&
          awarenessList.length > 0 &&
          awarenessList.map((data: any) => {
            const formatDate =
              data.acceptance_time &&
              moment(data.acceptance_time).startOf("date").fromNow();
            const formatHour = formatDate && formatDate.split(" ");
            const formatDateReviewResponse =
              data.review_time &&
              moment(data.review_time).startOf("date").fromNow();
            const formatHourReviewResponse =
              formatDateReviewResponse && formatDateReviewResponse.split(" ");
            return (
              <>
                {boxAwarenessID == data.sorting_order &&
                  titleLowerCase == data.review_type && (
                    <Form
                      className={`${
                        data.challenge && "challenge-textbox-main"
                      }`}
                    >
                      <div className="header mt-1">
                        {data.acceptance_user}'s {data.review_type}
                        &nbsp;&nbsp;
                        {formatHour?.length > 0 &&
                        formatDate == "a few seconds ago" &&
                        "a minute ago"
                          ? "Now"
                          : (formatHour[0] &&
                              formatHour[0] < "25" &&
                              formatHour[1] == "hours") ||
                            (formatHour[0] < "61" && formatHour[1] == "minutes")
                          ? "Today"
                          : formatHour[0] > "24" ||
                            (formatHour[0] < "48" &&
                              formatHour[1] == "hours") ||
                            formatDate == "a day ago"
                          ? //  : (formatHour[0] > "24" ||formatHour[0] < "48" )
                            "yesterday"
                          : moment(data.acceptance_time)
                              .startOf("date")
                              .fromNow()}
                      </div>

                      <Form.Item name="comment" className="input-arrow">
                        <div className={`awarenessModal mb-2 header`}>
                          <TextArea
                            showCount
                            maxLength={500}
                            rows={5}
                            className="mb-0 AwareInputFirst"
                            value={data.comment}
                            readOnly={true}
                          ></TextArea>
                        </div>
                      </Form.Item>
                      <Button
                        key="submit"
                        type="primary"
                        className={` ${
                          data.review_type == "resistance" ? "yellowBtn" : ""
                        }`}
                        style={
                          props.isLoggedIn || loggedInUser?.length > 0
                            ? {}
                            : { pointerEvents: "none", opacity: 0.4 }
                        }
                        onClick={() => {
                          const button =
                            data.review_type == "acceptance"
                              ? "Challenge"
                              : data.review_type == "resistance"
                              ? "Resolve"
                              : "";
                          challenge(data, button);
                        }}
                      >
                        {data.review_type == "acceptance"
                          ? "Challenge"
                          : data.review_type == "resistance"
                          ? "Resolve"
                          : ""}
                      </Button>
                      {data.challenge ? (
                        <>
                          <div className="AwareInputChallengeHeader">
                            {data.challenge_user}'s {data.response_review}
                            &nbsp;&nbsp;
                            {formatHourReviewResponse?.length > 0 &&
                            formatDateReviewResponse == "a few seconds ago" &&
                            "a minute ago"
                              ? "Now"
                              : (formatHourReviewResponse[0] < "25" &&
                                  formatHourReviewResponse[1] == "hours") ||
                                (formatHourReviewResponse[0] < "61" &&
                                  formatHourReviewResponse[1] == "minutes")
                              ? "Today"
                              : formatHourReviewResponse[0] > "24" ||
                                (formatHourReviewResponse[0] < "48" &&
                                  formatHourReviewResponse[1] == "hours") ||
                                formatDateReviewResponse == "a day ago"
                              ? "yesterday"
                              : moment(data.review_time)
                                  .startOf("date")
                                  .fromNow()}
                          </div>
                          <TextArea
                            maxLength={500}
                            rows={3}
                            className="mb-1 AwareInputChallenge"
                            value={data.challenge}
                            readOnly={true}
                          ></TextArea>

                          <Button
                            key="submit"
                            type="primary"
                            className="mt-0 challengeAcceptBtn"
                            style={
                              buildCreatedBy &&
                              buildCreatedBy[0] &&
                              buildCreatedBy[0] == userData.id &&
                              data.is_accepted == 0
                                ? {}
                                : { pointerEvents: "none", opacity: -0.6 }
                            }
                            onClick={
                              () => isAccepted(data.challenge_id)
                              // toast.success(
                              //   `You accepted the ${data.review_type}`
                              // )
                            }
                          >
                            {data.review_type == "acceptance"
                              ? "acceptance"
                              : data.review_type == "resistance"
                              ? "resistance"
                              : ""}
                          </Button>
                        </>
                      ) : (
                        []
                      )}
                    </Form>
                  )}
              </>
            );
          })}
      </>
    );
  };
  const challenge = (data: any, e: any) => {
    setChallengeModal(true);
    setChallengeData(data);
    setChallengeTitle(e);
  };
  const challengeContent = (data: any) => {
    data = challengeData;
    const formatDate =
      data.acceptance_time &&
      moment(data.acceptance_time).startOf("date").fromNow();
    const formatHour = formatDate && formatDate.split(" ");
    return (
      <>
        <Form
          form={form}
          onFinish={(review_response: any) =>
            onChallengeClick(data, review_response)
          }
        >
          <div className="header mt-2">
            {data.acceptance_user}'s {data.review_type}
            &nbsp;&nbsp;
            {formatHour?.length > 0 &&
            formatDate == "a few seconds ago" &&
            "a minute ago"
              ? "Now"
              : (formatHour &&
                  formatHour[0] &&
                  formatHour[0] < "25" &&
                  formatHour[1] == "hours") ||
                (formatHour &&
                  formatHour[0] &&
                  formatHour[0] < "61" &&
                  formatHour[1] == "minutes")
              ? "Today"
              : (formatHour && formatHour[0] && formatHour[0] > "24") ||
                (formatHour &&
                  formatHour[0] &&
                  formatHour[0] < "48" &&
                  formatHour[1] == "hours") ||
                formatDate == "a day ago"
              ? "yesterday"
              : moment(data.review_time).startOf("date").fromNow()}
          </div>
          <Form.Item name="comment">
            <div className={`awarenessModal header`}>
              <TextArea
                maxLength={500}
                rows={5}
                className="mb-2 AwareInputFirst"
                id={data.id}
                value={data.comment}
                readOnly={true}
              ></TextArea>
            </div>
          </Form.Item>
          <div className="header mt-2">
            {userData.user_name}'s {challengeTitle} &nbsp;&nbsp; Now
          </div>
          <Form.Item name="comment">
            <div className={`awarenessModal header`}>
              <TextArea
                showCount
                maxLength={500}
                rows={5}
                className="mb-2 AwareInputFirst"
              ></TextArea>
            </div>
          </Form.Item>
          <Button key="submit" htmlType="submit" onClick={challengeClose}>
            Add
          </Button>
        </Form>
      </>
    );
  };

  const onChallengeClick = (e: any, review_response: any) => {
    const data = {
      review_type: challengeTitle,
      comment: review_response.comment,
      boxReview_id: e.id,
      build_id: buildId,
    };
    dispatch(addReviewResponse(data));
  };
  //for drag and drop

  const onDragEnd = (Result: DropResult) => {
    const { source, destination } = Result;
    const val = dataArray.map((a) => a.id);

    if (!destination) return;
    if (destination.index === source.index) return;

    let addBox;
    let active = val;

    // if(source.droppableId === "boxesAll"){
    //   addBox = active[source.index]
    //   active.splice(source.index,1)

    // }

    // if(destination.droppableId === "boxesAll"){
    //   active.splice(destination.index, 0, addBox)

    // }

    dragg = dataArray.map((el) =>
      el.id == source.index
        ? { ...el, id: destination.index }
        : el.id == destination.index
        ? { ...el, id: source.index }
        : el
    );

    // setDataArray(dataArray.map(el => el.id == source.index ?  {...el, id: destination.index}:  el.id == destination.index ?{...el, id: source.index}: el)
    // )
    setDataArray(dragg);
    setDraggedArray(dragg);
  };

  // for grouping

  const groupSelect = () => {
    setActiveSelection(true);
  };

  const groupingSelection = (e: any) => {
    const groupId = e.target.value;
    // groupArray.push(groupId)
    setGroupArray([...groupArray, groupId]);
  };
  const submitGroup = (e: any) => {
    const groupData = {
      title: e.groupName,
      boxes: groupArray,
    };
    dispatch(createGroup(groupData));
  };
  const newGroupArray = [];
  const arr2 = groupList.rows.groupBox;
  const arr3 = dataArray.filter((object1) => {
    return !arr2?.some((object2: { id: number }) => {
      return object1.id === object2.id;
    });
  });

  var results =
    arr2 &&
    arr2.length > 0 &&
    arr2.reduce(function (results: any, org: any) {
      (results[org.group_id] = results[org.group_id] || []).push(org);
      return results;
    }, []);
  results && results.length > 0 && results.shift();
  const mergedArray = results && results.length > 0 && [...results, arr3];

  newGroupArray.push(mergedArray);

  return (
    <Fragment>
      <Head>
        <title>New Build</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="d-flex m-0 w-100">
        <NewBuildSideCard
          id={router.query.id}
          videoId={router.query.videoId}
          value={awarenessIndex}
          Resistance={Resistance}
          Acceptance={Acceptance}
          Inspiration={Inspiration}
          setAwarenessModal={setAwarenessModal}
          isLoggedIn={props.isLoggedIn}
          onSave={(
            videoType: any,
            polarisationLevel: any,
            difficultyLevel: any,
            url: string
          ) => onSave(videoType, polarisationLevel, difficultyLevel, url)}
          buildId={buildId}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
          groupSelect={groupSelect}
        />
        {/* <Droppable droppableId="boxAll" >
            {
              (provided) => (<> */}
        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <NewBuildBoxes
              setModal1Open={setAddFlashcard}
              item={mergedArray && mergedArray.length > 0 ? [] : dataArray}
              mergedArray={
                mergedArray && mergedArray.length > 0 ? mergedArray : []
              }
              arr={arr}
              setArr={(value: any) => {
                setArr(value);
                if (value.length > 20) {
                  setDataArray([
                    ...dataArray,
                    {
                      id: value.length,
                      message: "",
                    },
                  ]);
                }
              }}
              onFocus={(data: any) => handleChange(data)}
              awarenessList={awarenessList}
              Acceptance={Acceptance}
              Resistance={Resistance}
              Inspiration={Inspiration}
              boxData={boxData}
              setBoxData={setBoxData}
              buildById={buildById}
              modalDot={(id: any) => showModal(id)}
              isRefresh={isRefresh}
              setIsRefresh={(data: any) => {
                setIsRefresh(data);
                if (buildById?.data) {
                  const data =
                    buildById.data &&
                    buildById.data.map((box: any) => {
                      return {
                        id: box.sorting_order,
                        message: box.description,
                        boxId: box.id,
                      };
                    });
                  setDataArray(data);
                  setArr(data.map((d: any) => d.id));
                } else {
                  setBoxData([]);
                  setArr([1]);
                  setDataArray(
                    init.map((i, index) => {
                      return {
                        id: Number(index + 1),
                        message: "",
                      };
                    })
                  );
                }
              }}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              activeSelection={activeSelection}
              groupingSelection={groupingSelection}
              submitGroup={submitGroup}
            />
          </DragDropContext>
          {/* {provided.placeholder} */}
        </div>
        {/* </>)}
              </Droppable> */}

        <div className="position-absolute mkCard">
          {userArr &&
            userArr?.length > 0 &&
            userArr?.map((data: any) => {
              return (
                <Card
                  className="mt-3"
                  onClick={() => {
                    questionData(data.user_id);
                  }}
                >
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    {data.user_name.split(" ").map((a: any) => a.charAt(0))}
                  </Card.Body>
                </Card>
              );
            })}
        </div>
        <div
          className="position-absolute flash"
          style={
            buildIdForFlash == "undefined"
              ? { pointerEvents: "none", opacity: 0.4 }
              : {}
          }
        >
          <Image
            alt="flashCards"
            src="../../../img/flashcardnewbuild.svg"
            onClick={() => {
              setAddFlashcard(true);
            }}
          />
        </div>
      </div>

      <AddFlashCardModal
        modal2Open={addFlashCardData}
        setModal2Open={setAddFlashcard}
        visible={addFlashCardData}
        handleSubmit={handleSubmit}
        isLoggedIn={props.isLoggedIn}
      />

      <FlashCardModal
        isLoggedIn={props.isLoggedIn}
        modal={revealAns}
        flashCard={modal3Open}
        setmodalOpen={setRevealAns}
        modalVisible={revealAns}
        responseCallback={(
          data: any,
          userId: number,
          questionId: number,
          index: number,
          arrayLength: number
        ) => {
          const filterArray = flashCardArr?.filter(
            (F: any) => F.user_id == userId
          );
          const questionFilter = filterArray?.filter(
            (F: any) => F.id == questionId
          );
          questionFilter &&
            questionFilter.length > 0 &&
            questionFilter.map((ans: any) => {
              const newData = {
                content: ans.answer,
                footer: ["Again", "Hard", "Good", "Easy"],
                onOk: modal4Open,
                userId: userId,
                questionId: questionId,
                index: index,
                arrayLength: arrayLength,
              };
              setModal3Open(newData);
            });
        }}
        questionCallback={(
          userId: number,
          index: number,
          questionId: number
        ) => {
          questionData(userId, index, questionId);
        }}
        againCallback={(
          data: any,
          userId: number,
          questionId: number,
          index: number
        ) => {
          questionData(userId, index);
        }}
      />
      <AwarenessModal
        awarenessModal={awarenessModal}
        setAwarenessModal={(type: boolean) => {
          setAwarenessIndex(false);
          setAwarenessModal(type);
        }}
        visible={awarenessModal}
        textValue={awarenessIndex}
        handleSubmit={(comment: any, review: any) => {
          handleData(comment, review);
        }}
        footer="Add"
        id={awarenessIndex}
        title={`${
          accept
            ? "Acceptance"
            : inspiration
            ? "Inspiration"
            : resistance
            ? "Resistance"
            : ""
        }`}
        header={`${
          props.isLoggedIn || loggedInUser?.length > 0
            ? `${userData.user_name}'s`
            : ""
        } ${
          accept
            ? "Acceptance"
            : inspiration
            ? "Inspiration"
            : resistance
            ? "Resistance"
            : ""
        }`}
        className={`${
          accept
            ? "accptanceModalBG"
            : inspiration
            ? "inspirationModalBG"
            : resistance
            ? "resistanceModalBG"
            : ""
        } `}
        isLoggedIn={props.isLoggedIn}
      />
      <AwarenessTypeModal
        open={open}
        content={(title: any) => content(title)}
        handleCancel={handleCancel}
        handleOk={handleCancel}
        btn="challenge"
        title={`${
          accept
            ? "Acceptance"
            : inspiration
            ? "Inspiration"
            : resistance
            ? "Resistance"
            : ""
        }`}
        className={`${
          accept
            ? "accptanceModalBG"
            : inspiration
            ? "inspirationModalBG"
            : resistance
            ? "resistanceModalBG"
            : ""
        } `}
      />
      <ChallengeModal
        challengeModal={challengeModal}
        content={challengeContent}
        setChallengeModal={challengeClose}
        btn="Add"
        title={challengeTitle}
        className={`${
          accept
            ? "accptanceModalBG"
            : inspiration
            ? "inspirationModalBG"
            : resistance
            ? "resistanceModalBG"
            : ""
        } `}
      />
    </Fragment>
  );
};

export default NewBuild;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return { props: { data: [] } };
};
