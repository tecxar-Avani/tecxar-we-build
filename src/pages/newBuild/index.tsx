import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  flashCardSelector,
  getFlashCardByBuildId,
  createFlashCard,
  addUserFlashCardDeck,
  getFlashCardDeck,
} from "@/store/reducers/flashCard.reducer";
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
  build,
  buildSelector,
  getBuildById,
  UpdateUsersBuild,
} from "@/store/reducers/build.reducer";
import {
  addAwareness,
  addReviewResponse,
  awarenessSelector,
  getAwarenessByBoxId,
  updateBoxReviewResponseByAwarenessId,
} from "@/store/reducers/awareness.reducer";
import { Button, Form, Modal, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ChallengeModal from "@/components/ChallengeModal";
import { toast } from "react-toastify";
import { userSelector, getUserByEmail } from "@/store/reducers/user.reducer";
import Head from "next/head";
import moment from "moment";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
const cookieCutter = require("cookie-cutter");

import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import {
  createGroup,
  deleteGroupById,
  getGroupBoxesByBuild,
  groupSelector,
  UpdateGroup,
  UpdateGroupTitle,
} from "@/store/reducers/group.reducer";
import { ExclamationCircleFilled ,PlusOutlined} from "@ant-design/icons";
import _ from "lodash";
import LogInButton from "@/components/LogInButton";

const NewBuild = (props: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { flashCardList,flashCardDeck } = useAppSelector(flashCardSelector);
  const { awarenessList } = useAppSelector(awarenessSelector);
  const [open, setOpen] = useState(false);
  const { buildById, buildListByUrl, getBuildByUrlGroup } = useAppSelector(buildSelector);
  const builds = useAppSelector(buildSelector);
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
  const [boxId, setBoxId] = useState();
  const [boxAwarenessID, setBoxAwarenessID] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isRedo, setIsRedo] = useState(false);
  const [activeSelection, setActiveSelection] = useState(false);
  const [groupArray, setGroupArray] = useState<any>([]);
  const [groupTitle, setGroupTitle] = useState<any>("");
  const [isAdded, setIsAdded] = useState<boolean>();
  const [boxData, setBoxData] = useState([]);
  const [dataOfFlashCard, setDataOfFlashCard] = useState([]);
  const [modal5Open, setModal5Open] = useState(false);
  const [formDataOnUndo, setFormDataOnUndo] = useState([]);
  const [redoData, setRedoData] = useState<any>([]);
  const [uniqueArray, setUniqueArray] = useState([]);
  const [sourceGroup, setSourceGroup] = useState<any>([]);
  const [destinationGroup, setDestinationGroup] = useState<any>([]);
  const [sourceId, setSourceId] = useState<any>([]);
  const [destinationId, setDestinationId] = useState<any>([]);
  const [isSave , setIsSave] = useState(false);
  const [isEditSelect, setIsEditSelect] = useState(false);
   const [mergeArrayData,setMergedArrayData]= useState<any>([]);
   const [editGroupId,setEditGroupId] = useState<number>();
   const [unCheck,setUnCheck] = useState(false);
   const [undefinedData , setUndefinedData] = useState<any>([]);
   const [textEnter,setTextEnter] = useState(false)
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
      dispatch(getFlashCardDeck(buildId));
    }
  }, [buildId,router.asPath]);

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
  const questionData = (userId: any, index?: number, questionId?: any) => {
    if (questionId !== "Again") {
      setIsAdded(false);
    }

    // setIsAdded(false)
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
            ? filterArray[index]?.question
            : filterArray[0]?.question,
          footer: ["Reveal Answer"],
          userId: index ? filterArray[index].user_id : filterArray[0].user_id,
          questionId: index ? filterArray[index].id : filterArray[0].id,
          index: index ? index + 1 : 1,
          arrayLength: filterArray.length,
          onOk: modal4Open,
        });
        // const flashCardResponseData = {
        //   response_type : data,
        //   flash_card_id : questionId,
        //   build_id:buildId,
        // }
        // dispatch(createFlashCardResponse(flashCardResponseData))
        setRevealAns(true);
      }
    }
  };
  const onSave = async (
    videoType: any,
    polarisationLevel: any,
    difficultyLevel: any,
    url: string,
    videoDesc:string,
  ) => {
   
    const saveData = {
      type_of_video: videoType,
      potential_polarization: polarisationLevel,
      difficulty_level: difficultyLevel,
      boxes: boxData,
      video_url: url,
      video_description:videoDesc,
    };
    const editData = {
      type_of_video: videoType,
      potential_polarization: polarisationLevel,
      difficulty_level: difficultyLevel,
      boxes: { boxData: boxData },
      video_url: url,
      id: buildId,
      video_description:videoDesc
    };
    const buildCreatedBy = buildById?.data?.map((a: any) => a.created_by);
    if (
      buildCreatedBy &&
      buildCreatedBy.length > 0 &&
      buildCreatedBy[0] == userData.id
    ) {
      if(!editData.video_description){
        toast.warning("Please type the what is video about");
      }
      else{
        dispatch(UpdateUsersBuild(editData));
        setIsSave(true)
      }
    } else if (boxData.length > 19) {
      if(!saveData.video_description){
        toast.warning("Please type the what is video about");
      }
      else{
        const data = await cookieCutter.set("OrderData",  JSON.stringify(saveData), {expires: new Date(Date.now() + 300000)});
        props.isLoggedIn ? 
        dispatch(addBuild(saveData)) : 
        setModal5Open(true)
        setIsSave(true)
      }
    
    } else {
      toast.warning("You need to fill minimum 20 boxes");
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
        boxes: {
          draggedArray: draggedArray,
          boxData: boxData,
          destinationGroup: destinationGroup,
          sourceGroup: sourceGroup,
          sourceId: sourceId,
          destinationId: destinationId,
        },
        id: buildId,
      };
      dispatch(UpdateUsersBuild(editData));
    }
  }, [draggedArray]);
  const handleChange = (e: any) => {
    setAwarenessIndex(e.description);
    setBoxId(e.boxId);
  };

  const handleData = async (comment: any, review: any) => {
    const data = {
      comment: comment?.comment,
      review_type: review,
      box_id: Number(boxId),
      build_id: buildId,
    };
    if(data.comment && data.review_type){
      const dataA = await cookieCutter.set("awarenessData",  JSON.stringify(data), {expires: new Date(Date.now() + 300000)});
      props.isLoggedIn ? 
      dispatch(addAwareness(data)) : 
      setModal5Open(true)
      // setReview(review);
      setAwarenessModal(false);
    }
   
  };

  // for awarenessType modal

  const showModal = (id: any) => {
    setBoxAwarenessID(id);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    
  };
  const handleCancelFlashDeck = () => {
    setModal5Open(false);
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
                            // showCount
                            maxLength={500}
                            rows={5}
                            className="mb-0 AwareInputFirst"
                            value={data.comment}
                            readOnly={true}
                          ></TextArea>
                        </div>
                      </Form.Item>
                      {/* <Button
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
                      </Button> */}
                      {/* {data.challenge ? (
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
                      )} */}
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
    if (!destination) return;
    if (destination.index === source.index) return;

    const sourceGroups =
      groupList.rows.groupBox?.length > 0 &&
      groupList.rows.groupBox.filter((group: any) => group.id == source.index);
    const destinationGroups =
      groupList.rows.groupBox?.length > 0 &&
      groupList.rows.groupBox.filter(
        (group: any) => group.id == destination.index
      );

    dragg = dataArray.map((el) => {
      return el.id == source.index
        ? { ...el, id: destination.index }
        : el.id == destination.index
        ? { ...el, id: source.index }
        : el;
    });

    // setDataArray(dataArray.map(el => el.id == source.index ?  {...el, id: destination.index}:  el.id == destination.index ?{...el, id: source.index}: el)
    // )

    setDataArray(dragg);
    setDraggedArray(dragg);
    const sId: any = dataArray.filter((arr: any) => arr.id == source.index);
    const sourceData =
      sId?.length > 0 &&
      sId.map((arr: any) => {
        arr.group_id =
          destinationGroups?.length > 0 ? destinationGroups[0].group_id : null;
        arr.previous_group =
          sourceGroups?.length > 0 ? sourceGroups[0].group_id : null;
        return arr;
      });

    const destId: any = dataArray.filter(
      (arr: any) => arr.id == destination.index
    );
    const destinationData =
      destId?.length > 0 &&
      destId.map((arr: any) => {
        arr.group_id =
          sourceGroups?.length > 0 ? sourceGroups[0].group_id : null;
        arr.previous_group =
          destinationGroups?.length > 0 ? destinationGroups[0].group_id : null;

        return arr;
      });
    setSourceId(sourceData);
    setDestinationId(destinationData);
    setDestinationGroup(destinationGroups);
    setSourceGroup(sourceGroups);
  };

  // for grouping

  const groupSelect = () => {
    setActiveSelection(true);
    // groupList &&
    // groupList.rows &&
    // groupList.rows.groupBox &&
    // groupList.rows.groupBox.length > 0
    //   ? setIsSelectedGroupData(dataArray)
    //   : isSelectedGroupData.length === 0 && setActiveSelection(true);
  };

  const groupingSelection = (e: any) => {
    const groupId = e.target.value; 
 if(groupId && e.target.checked){
  setGroupArray([...groupArray, groupId]);  
  }
  else{
    groupArray && groupArray.length > 0 && groupArray?.pop(groupId)
  }
  ;}
  const submitGroup = (e: any) => {
    setIsEditSelect(false);
    setActiveSelection(false);
   
    const groupData = {
      title: groupTitle?.target?.value,
      boxes: groupArray,
      buildId: buildId,
    };
  
// const isTitleAlready = groupList?.rows?.groupBox?.map((A:any) => A.title)
// const Title = isTitleAlready.includes(groupData.title)
if(editGroupId && editGroupId !== undefined && groupTitle?.target?.value != ""){
  const groupData = {
    title: groupTitle?.target?.value,
    buildId: buildId,
    group_id:editGroupId,
  };
     dispatch(UpdateGroupTitle(groupData));
     setIsEditSelect(false)
     setEditGroupId(undefined)
}else if (editGroupId && !groupTitle?.target?.value && isEditSelect) {
  toast.warning("please add the group title");
}
 else if (!groupData.boxes || groupData?.boxes?.length == 0) {
    toast.warning("please select the boxes");
  }
  else if (!groupData.title || editGroupId) {
    toast.warning("please add the group title");
  } else {
    activeSelection && groupList?.rows?.groupBox?.length !== 0
      ? dispatch(UpdateGroup(groupData))
      : dispatch(createGroup(groupData));
    setGroupArray([]);
  }
  setGroupTitle("")
  setUnCheck(true)
};
  
  let arr2: any;
  arr2 =
    groupList.rows.groupBox && getBuildByUrlGroup.rows.length == 0
      ? groupList.rows.groupBox
      : [];

  useEffect(() => {
    arr2 =
      groupList.rows.groupBox && buildById?.rows?.length > 0
        ? groupList.rows.groupBox
        : [];
  }, [getBuildByUrlGroup]);

  const notGroupedArray = dataArray.filter((object1) => {
    return !arr2?.some((object2: { id: number }) => {
      return object1.id === object2.id;
    });
  });

  // for color palate

  const colorPallet = ['#E84D26','#A8CEFF','#99F155','#BC8FFF','#EF2A6B','#FFC65C',
  '#FAED00','#5EC200','#75FFF6','#C2007E','#FF734D','#E62E00','#57E22C','#F52EDB','#FEEB43'] 

  var groupIdArr = arr2?.length > 0 ? _.groupBy(arr2, "group_id") : [];
  var results = groupIdArr && _.toArray(groupIdArr).map((ele:any,index:number)=> ele.map((col:any) => { return  ({ ...col, color: colorPallet[index % 15] })}));


  // var resultsColor = results?.length>0 && results.map((ele:any,index:number)=> ele.map((col:any) => { return  ({ ...col, color: colorPallet[index % 15] })}))

  const mergedArrayData = [...results, notGroupedArray];

  
  // useEffect(() => {
  //   setMergedArrayData(mergedArray)
  // }, [ groupList.rows.groupBox]);

   


  const deleteGroup = () => {
    dispatch(deleteGroupById(buildId));
  };

  // const showConfirm = () => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete all Group?",
  //     icon: <ExclamationCircleFilled />,
  //     onOk() {
  //       deleteGroup();
  //     },
  //     onCancel() {},
  //   });
  // };
  const editGroupSelect = () => {
    setIsEditSelect(true);
    // setActiveUnGroup(true);
  };

  // for adding flashcard into user flashcards

  const addFlashDeck = (data:any) =>{
    const filterData = flashCardList?.rows.flashBuild.build.filter((a:any) => a.user_id == data)
    const deckData = filterData.map((b:any) => {return {"question":b.question,"answer": b.answer , "previous_user":data , "build_id": buildId , "created_by": userData.id}})   
    dispatch(addUserFlashCardDeck(deckData))
  }

  const isDeck = flashCardDeck && flashCardDeck.rows.flashDeck && flashCardDeck.rows.flashDeck.map((a:any) => a?.previous_user)
  const addFlashCardToUser = (data: any) => {
    const addData = {
      question: data.question,
      answer: data.answer,
      build_id: buildId,
    };
    dispatch(createFlashCard(addData));
    setIsAdded(true);
  };

  // for redo data
  const redoUniqueData = (data: any) => {
    if (data == true) {
      //   setMergedArrayData(uniqueArray)
      // }else{
        if(Number.isNaN(buildId) ){
          setDataArray(undefinedData)
        }
        else{
          if(uniqueArray.length > 1 || undefinedData.length > 0){
          setDataArray(uniqueArray);
          }
        }
      // }
      
    }
  };


  return (
    <Fragment>
      <Head>
        <title>New Build</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* {build.loading ? <div className="w-100 d-flex justify-content-center mt-5 "><Spin delay={100}/></div> :  */}
      {/* <Spin spinning={build.loading == true}/>  */}
      {/* { buildListByUrl.data.length == 0 ? (
      <div className="w-100 d-flex justify-content-center mt-5 ">
        <Spin delay={100} />
      </div>
    ) : */}
      <Fragment>
        <div className="row d-flex m-0 w-100">
          <div className="col-sm-4 col-md-5 col-lg-4 col-xl-3 sbn">
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
                url: string,
                videoDesc:string,
              ) => onSave(videoType, polarisationLevel, difficultyLevel, url , videoDesc)}
              isSave={isSave}
              setIsSave={setIsSave}
              buildId={buildId}
              isRefresh={isRefresh}
              setIsRefresh={setIsRefresh}
              isRedo={isRedo}
              setIsRedo={(data: any) => redoUniqueData(data)}
              groupSelect={groupSelect}
              activeSelection={activeSelection}
              submitGroup={submitGroup}
              groupList={
                buildListByUrl.data.length > 0 ? [] : groupList.rows.groupBox
              }
              isEditSelect={isEditSelect}
              editGroupSelect={editGroupSelect}
              mergedArray={mergedArrayData}
              textEnter={textEnter}
            />
          </div>
          {/* <Droppable droppableId="boxAll" >
            {
              (provided) => (<> */}
               {/* {build.loading ? <div className="w-100 d-flex justify-content-center mt-5 "><Spin delay={100}/></div> : 
       <Spin spinning={build.loading == true}/>   */}
       
     {/* { builds?.loading ? (
      <div className="w-100 d-flex justify-content-center mt-5 ">
        <Spin delay={100} />
      </div>
    ) :  */}
          <div className="col-sm-8 col-md-7 col-lg-8 col-xl-9 newBuildBoxsMain">
            <div className="w-100 px-4 pb-3 pt-4 mt-4 newBuildBoxs">
            {/* <button onClick={() => {router.back()}}>Back</button> */}
              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <NewBuildBoxes
                  setModal1Open={setAddFlashcard}
                  item={mergedArrayData?.length >= 2 ? [] : dataArray}
                  // mergedArray={mergedArray}
                  //  item={activeUnGroup ? dataArray : []}
                  mergedArray={mergedArrayData}
                  dataArrayForRedo={
                    dataArray?.length > 0 && dataArray
                  }
                  mergedArrayForRedo={mergedArrayData}
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
                  isRedo={isRedo}
                  setIsRedo={setIsRedo}
                  isRefresh={isRefresh}
                  setIsRefresh={(data: any, data1: any) => {
                    setUniqueArray(data1);
                    setIsRefresh(data);
                    if (buildById?.data) {
                      const buildData =
                        buildById.data &&
                        buildById.data.map((box: any) => {
                          return {
                            id: box.sorting_order,
                            message: box.description,
                            boxId: box.id,
                          };
                        });
                      setDataArray(buildData);
                      setArr(buildData.map((d: any) => d.id));
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
                  setFormDataOnUndo={(boxDataUndo: any) =>
                    setFormDataOnUndo(boxDataUndo)
                  }
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  activeSelection={activeSelection}
                  groupingSelection={groupingSelection}
                  // submitGroup={submitGroup}
                  groupTitle={setGroupTitle}
                  groupList={
                    buildListByUrl.data.length > 0
                      ? []
                      : groupList.rows.groupBox
                  }
                  setTextEnter={(a:any) => {setTextEnter(a)}}
                  groupedData={results && results.length > 0 && results}
                  notGroupedArray={notGroupedArray}
                  redoData={redoData}
                  setRedoData={setRedoData}
                  isEditSelect={isEditSelect}
                  editGroupId={setEditGroupId}
                  unCheck={unCheck}
                  buildId={buildId}
                  setUndefinedData={(d:any,data:any) => {
                    setUndefinedData(data)
                    setIsRedo(d);
                    setIsRefresh(d)
                  }}
                />
              </DragDropContext>

              {/* {provided.placeholder} */}
            </div>
          </div>
        </div>
        {/* </>)}
              </Droppable> */}

        {/* <div className="position-absolute mkCard">
          {userArr &&
            userArr?.length > 0 &&
            userArr?.map((data: any) => {
              return (
                <Fragment>
                <Card
                  className="mt-3 card1"
                  onClick={() => {
                    questionData(data.user_id);
                  }}
                >
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    {data.user_name.split(" ").map((a: any) => a.charAt(0))}
                  </Card.Body> </Card>
                  {data.user_id == userData.id ? "" : 
                  <Card className={`position-absolute card2 ${ isDeck && isDeck.length> 0 && isDeck?.includes(data.user_id) ? "backGroundAdd" : "backGroundPlus"} `} 
                  onClick={() => props.isLoggedIn || loggedInUser?.length > 0 ? addFlashDeck(data.user_id) : setModal5Open(true)}><Card.Body className="d-flex justify-content-center align-items-center">
                    <PlusOutlined />
                    </Card.Body>
                  </Card>}
                  </Fragment>
              );
            })}
        </div> */}
        {/* <div
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
            width="60px"
            height="60px"
            onClick={() => {
              setAddFlashcard(true);
            }}
          />
        </div> */}

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
                  title: "",
                };
                setModal3Open(newData);
                setDataOfFlashCard(ans);
              });
          }}
          questionCallback={(
            userId: number,
            index: number,
            questionId: number,
            data: any
          ) => {
            questionData(userId, index, questionId);
          }}
          againCallback={(
            data: any,
            userId: number,
            questionId: number,
            index: number
          ) => {
            questionData(userId, index, data);
          }}
          addFlashCardToUser={() => {
            addFlashCardToUser(dataOfFlashCard);
          }}
          isAdded={isAdded}
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
            <LogInButton
        title=""
        open={modal5Open}
        className="btnrv"
        handleCancel={handleCancelFlashDeck}
        isLoggedIn={props.isLoggedIn}
        // setAuth={(data: any) => {
        //   setAuth(data);
        //   setModal5Open(false);
        // }}
      />
      </Fragment>
      {/* } */}
  
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext | any) => {
  const ctx = context.req;
  if (ctx.session && ctx.session?.dbUser) {
    return {
      props: {
        user: ctx.session?.dbUser,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
export default NewBuild;
// export const getServerSideProps: GetServerSideProps = async () => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
//   return { props: { data: [] } };
// };
