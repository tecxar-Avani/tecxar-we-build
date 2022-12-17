import React, { useEffect, useState } from "react";
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
  UpdateUsersBuild,
} from "../../store/reducers/build.reducer";
import {
  addAwareness,
  addReviewResponse,
  awarenessSelector,
  getAwarenessByBoxId,
  getReviewResponseByAwarenessId,
} from "../../store/reducers/awareness.reducer";
import { Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ChallengeModal from "@/components/ChallengeModal";
import { toast } from "react-toastify";
import { userSelector } from "../../store/reducers/user.reducer";
import Head from "next/head";

const NewBuild = (props: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { flashCardList } = useAppSelector(flashCardSelector);
  const { awarenessList, reviewResponseList } =
    useAppSelector(awarenessSelector);
  const [open, setOpen] = useState(false);
  const { buildById } = useAppSelector(buildSelector);
  const { userData } = useAppSelector(userSelector);
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
  const { buildList, buildListByUrl, userBuilds } =
    useAppSelector(buildSelector);
  const videoList =
    // buildList && buildList.box?.length > 0
    //   ? buildList.box
    // :
    buildListByUrl && buildListByUrl.data?.length > 0
      ? buildListByUrl.data
      : [];
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
      dispatch(getFlashCardByBuildId(buildId));
      dispatch(getBuildById(buildId));
    }
  }, [buildId]);

  useEffect(() => {
    dispatch(getAwarenessByBoxId(buildId));
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
    const videoId = url && url.split("=").pop();

    const videoDataFilter =
      videoList &&
      videoList.length > 0 &&
      videoList.filter((F: any) => F.newVideoId == videoId);
    if (videoDataFilter && videoDataFilter.length > 0) {
      const saveData = {
        type_of_video: videoType,
        potential_polarization: polarisationLevel,
        difficulty_level: difficultyLevel,
        boxes: boxData,
        video_url: url,
        description: videoDataFilter[0].description,
        duration: videoDataFilter[0].duration,
        new_video_id: videoDataFilter[0].newVideoId,
        published_at: videoDataFilter[0].publishedAt,
        thumbnails: videoDataFilter[0].thumbnails,
        title: videoDataFilter[0].title,
        embed_url: videoDataFilter[0].url,
        video_id: videoDataFilter[0].videoId,
      };

      const editData = {
        type_of_video: videoType,

        potential_polarization: polarisationLevel,

        difficulty_level: difficultyLevel,

        boxes: boxData,

        video_url: url,

        id: buildId,
      };

      const buildCreatedBy = buildById?.data?.map((a: any) => a.created_by);

      buildCreatedBy &&
      buildCreatedBy.length > 0 &&
      buildCreatedBy[0] == userData.id
        ? dispatch(UpdateUsersBuild(editData))
        : boxData.length > 20
        ? dispatch(addBuild(saveData))
        : toast.error("You need to fill minimum 20 boxes");
    }
  };

  const handleChange = (e: any) => {
    setAwarenessIndex(e.target.value);
    setAwarenessBoxId(e.target.id);
  };
  const handleData = (comment: any, review: any) => {
    const data = {
      comment: comment.comment,
      review_type: review,
      box_id: Number(awarenessBoxId),
      build_id: buildId,
    };
    dispatch(addAwareness(data));
    setReview(review);
    setAwarenessModal(false);
  };

  // for awarenessType modal

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const challengeClose = () => {
    setChallengeModal(false);
  };
  const content = (title: any) => {
    return (
      <>
        {awarenessList &&
          awarenessList.length > 0 &&
          awarenessList.map((data: any) => {
            return (
              <>
                {title == data.review_type ? (
                  <Form
                    className={`${data.challenge && "challenge-textbox-main"}`}
                  >
                    <div className="header mt-1">
                      {data.acceptance_user}'s {data.review_type}
                    </div>
                    <Form.Item name="comment" className="input-arrow">
                      <div className={`awarenessModal mb-2 header`}>
                        <TextArea
                          showCount
                          maxLength={500}
                          rows={5}
                          className="mb-0 AwareInputFirst"
                          value={data.comment}
                        ></TextArea>
                      </div>
                    </Form.Item>
                    <Button
                      key="submit"
                      type="primary"
                      className={` ${
                        data.review_type == "resistance" ? "yellowBtn" : ""
                      }`}
                      // style={props.isLoggedIn == true ?  {pointerEvents:"none",opacity:0.4} : {}}
                      onClick={(e: any) => {
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
                        </div>
                        <TextArea
                          maxLength={500}
                          rows={3}
                          className="mb-1 AwareInputChallenge"
                          value={data.challenge}
                        ></TextArea>
                        <Button
                          key="submit"
                          type="primary"
                          className="mt-0 challengeAcceptBtn"
                        >
                          {" "}
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
                ) : (
                  []
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
          </div>
          <Form.Item name="comment">
            <div className={`awarenessModal header`}>
              <TextArea
                maxLength={500}
                rows={5}
                className="mb-2 AwareInputFirst"
                id={data.id}
                value={data.comment}
              ></TextArea>
            </div>
          </Form.Item>
          <div className="header mt-2">Challenge</div>
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
          <Button key="submit" htmlType="submit">
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
    };
    dispatch(addReviewResponse(data));
  };

  return (
    <>
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
        />

        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          <NewBuildBoxes
            setModal1Open={setAddFlashcard}
            item={dataArray}
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
            onFocus={handleChange}
            awarenessList={awarenessList}
            Acceptance={Acceptance}
            Resistance={Resistance}
            Inspiration={Inspiration}
            boxData={boxData}
            setBoxData={setBoxData}
            buildById={buildById}
            modalDot={showModal}
          />
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
      </div>
      <AddFlashCardModal
        modal2Open={addFlashCardData}
        setModal2Open={setAddFlashcard}
        visible={addFlashCardData}
        handleSubmit={handleSubmit}
        isLoggedIn={props.isLoggedIn}
      />

      <FlashCardModal
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
        header={`${userData.user_name}'s  ${
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
      <AwarenessTypeModal
        open={open}
        content={(title: any) => content(title)}
        handleCancel={handleCancel}
        btn="challenge"
        title={`${
          accept
            ? "acceptance"
            : inspiration
            ? "inspiration"
            : resistance
            ? "resistance"
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
    </>
  );
};

export default NewBuild;
