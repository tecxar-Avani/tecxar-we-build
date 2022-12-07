import HeaderTitle from "@/components/headerTitle";
import ProfileCard from "@/components/Profile";
import VideoCard from "@/components/VideoCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import {
  getFlashCardByUser,
  flashCardSelector,
  updateFlashCardId,
  flashCardData,
} from "../../store/reducers/flashCard.reducer";
import FlashCardModal from "@/components/FlashCardModal";
import AddFlashCardModal from "@/components/AddFlashCardModal";

import { Input, Modal, Button, Form } from "antd";
import {
  getUserByEmail,
  userSelector,updateUserById
} from "../../store/reducers/user.reducer";
import {
  buildSelector,
  getUserInteractedBuild,
} from "../../store/reducers/build.reducer";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelector);
  const editFlashCard = useAppSelector(flashCardSelector);
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState<any>({});
  const [modal4Open, setModal4Open] = useState(false);
  const [addFlashCard, setAddFlashcard] = useState(false);
  const [editFlashCardData, setEditFlashCardData] = useState({});
  const [editName, setEditName] = useState<any>();
  const [defaultQuestionIndex, setDefaultQuestionIndex] = useState(0);

  const { flashCardUserList } = useAppSelector(flashCardSelector);
  const { userBuildList } = useAppSelector(buildSelector);

  const flashCardArr: any = flashCardUserList ? flashCardUserList : [];

  useEffect(() => {}, [defaultQuestionIndex]);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getFlashCardByUser());
    dispatch(getUserByEmail());
  }, []);
  console.log("OOOOOOOOOOOOOOOOOO", userData.userData);
  const role = "admin";

  const profileData = {
    title: userData.userData.user_name,
    editIcon: "editIcon.svg",
    dateOfJoined: "Date joined: Oct 2022",
    boxLeftTitle: "Boxes",
    boxValueLeft: "4",
    profileImg: "Ellipse60.png",
    bottomTitle: "all the city with me",
    boxRightTitle: "Awareness",
    boxValueRight: "15",
    flashCardProfile: "flashCardProfile.svg",
    flashCardsNumber: 38,
  };
  const profileDatas = [
    {
      id: 1,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 2,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 3,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
    {
      id: 4,
      title: "Mazza Konny",
      dateOfJoined: "Date joined: Oct 2022",
      boxLeftTitle: "Boxes",
      boxValueLeft: "4",
      profileImg: "Ellipse60.png",
      bottomTitle: "all the city with me",
      boxRightTitle: "Awareness",
      boxValueRight: "15",
      blockIcon: "block.svg",
      UnBlockIcon: "unBlock.svg",
      deleteIcon: "delete.svg",
    },
  ];
  const onEdit = (e: any) => {
    const data = {
      id: userData.userData.id,
      user_name: e,
    };
    dispatch(updateUserById(data));
  };

  const showModal = () => {
    setEditName(true);
  };

  const handleCancel = () => {
    setEditName(false);
  };

   useEffect(() => {
     dispatch(getUserInteractedBuild());
   }, []);
   
  const questionData = (index?: number, questionId?: number) => {
    const findLastValue = flashCardArr[flashCardArr.length - 1];
    const lastQuestionId = findLastValue && findLastValue.id;
    // const editQuestion = index
    //   ? flashCardArr[index + 1].id
    //   : flashCardArr[0].id;

    if (defaultQuestionIndex == flashCardArr.length) {
      setModal3Open({
        content: "Congratulations! You have finished your deck",
        footer: [],
        onOk: modal4Open,
        qaData: flashCardArr,
      });
      setRevealAns(true);
    } else {
      const editQuestion = flashCardArr[defaultQuestionIndex]?.id;
      setDefaultQuestionIndex(defaultQuestionIndex + 1);
      /* setModal3Open({
        content: index
          ? flashCardArr[index]?.question
          : flashCardArr[0]?.question,
        footer: ["Reveal Answer"],
        questionId: index ? flashCardArr[index]?.id : flashCardArr[0].id,
        index: index ? index : 1,

        arrayLength: flashCardArr.length,
        onOk: modal4Open,
        editQuestion: editQuestion,
        qaData: flashCardArr,
      }); */
      setModal3Open({
        content: flashCardArr[defaultQuestionIndex]?.question,
        footer: ["Reveal Answer"],
        questionId: flashCardArr[defaultQuestionIndex]?.id,
        index: defaultQuestionIndex,
        arrayLength: flashCardArr.length,
        onOk: modal4Open,
        editQuestion: editQuestion,
        qaData: flashCardArr,
      });
      setRevealAns(true);
    }
  };

  const handleSubmit = (data: any) => {
    console.log("ffffffffffff",data)
    dispatch(updateFlashCardId(data));
  };
  return (
    <>
      <div className="profile-main">
        <ProfileCard
          className="pt-2"
          profile={profileData}
          flashCardUserList={flashCardUserList}
          questionData={questionData}
          showModal={showModal}
        />
        <div className="m-0 pb-2 overflow-x-scroll">
          <HeaderTitle
            title="Your builds"
            className="title-list-of-profile py-2 my-2"
          />
          <div className="builds-Main overflow-auto">
            <div className="d-flex overflow-auto">
             {userBuildList &&
              userBuildList.rows &&
              userBuildList.rows.length > 0 &&
              userBuildList.rows.map((videoData:any, index:number) => (
                <Col md={4} key={index} className="videoProfile">
                  <Link href={`/newBuild?id=${videoData.videoId}`}>
                    <a>
                      <VideoCard VideoCardData={videoData} />
                    </a>
                  </Link>
                </Col>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="pb-2">
          <HeaderTitle
            title="Builds you have interacted with"
            className="title-list-of-profile py-2 my-2"
          />
          <Row className="m-0">
            {userBuildList &&
              userBuildList.rows &&
              userBuildList.rows.length > 0 &&
              userBuildList.rows.map((videoData: any, index: number) => (
                <Col md={4} key={index} className="videoProfile">
                  <Link href={`/newBuild?id=${videoData.videoId}`}>
                    <a>
                      <VideoCard VideoCardData={videoData} />
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
        {userData.userData.role_id == 1 ? (
          <div className="pb-2">
            <HeaderTitle
              title="Total list of Profiles"
              className="title-list-of-profile py-2 mt-4 mb-3"
            />
            <Row className="m-0">
              {profileDatas.length > 0 &&
                profileDatas.map((profileDatas, index) => (
                  <Col md={3} key={index}>
                    <ProfileCard
                      className="AllProfile"
                      profile={profileDatas}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        ) : (
          []
        )}
      </div>

      <FlashCardModal
        modal={revealAns}
        flashCard={modal3Open}
        setmodalOpen={setRevealAns}
        modalVisible={revealAns}
        responseCallback={(
          questionId: number,
          index: number,
          arrayLength: number,
          title: any,
          editQuestion?: number
        ) => {
          const questionFilter = flashCardArr.filter(
            (F: any) => F.id == questionId
          );
          questionFilter.length > 0 &&
            questionFilter.map((ans: any) => {
              const newData = {
                content: ans.answer,
                footer: ["Again", "Hard", "Good", "Easy"],
                onOk: modal4Open,
                questionId: questionId,
                index: index ? index + 1 : 1,
                arrayLength: arrayLength,
                title: title,
                editQuestion: editQuestion,
              };
              setModal3Open(newData);
            });
        }}
        questionCallback={(index: number, questionId: number) => {
          // index = index -1;
          // alert(index)
          // const indexVal = index > 1 ? index - 1 : index;
          questionData(defaultQuestionIndex, questionId);
        }}
        setAddFlashcard={setAddFlashcard}
        setEditFlashCardData={(questionId: any) => {
          const questionFilter = flashCardArr.filter(
            (F: any) => F.id == Number(questionId.id)
          );

          questionFilter.length > 0 &&
            questionFilter.map((ans: any) => {
              const newData = {
                answer: ans.answer,
                question: ans.question,
              };

              setEditFlashCardData(newData);
            });
        }}
        flashCardArr={flashCardArr}
        addFlashCard={addFlashCard}
        editFlashCardData={editFlashCardData}
        handleSubmit={(data: any) => {
          handleSubmit(data);
        }}
        defaultQuestionIndex={defaultQuestionIndex}
      />
      {console.log("++++++++++++++++", editFlashCardData)}

      <Modal
        title="Edit Your Name"
        open={editName}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={
          <Button
            form="form"
            key="submit1"
            htmlType="submit"
            className="openmodal"
          >
            Submit
          </Button>
        }
      >
        <Form
          form={form}
          id="form"
          layout="vertical"
          autoComplete="off"
          onFinish={onEdit}
        >
          <Form.Item name="user_name" label="Name">
            <Input defaultValue={profileData.title}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
