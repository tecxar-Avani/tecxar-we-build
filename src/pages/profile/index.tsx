import HeaderTitle from "@/components/headerTitle";
import ProfileCard from "@/components/Profile";
import VideoCard from "@/components/VideoCard";
import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const Profile = () => {
  // const videosData = {[
  //   {
  //     id
  //   }
  // ]};
  const videosData = [
    {
      id: "1",
      title: "",
      subTitle: "Therapist reacts to Big Ed",
      videoUrl: "img/RectangleVideoImg.png",
    },
    {
      id: "2",
      title: "",
      subTitle: "School of life: The body keeps score",
      videoUrl: "img/RectangleVideoImg2.png",
    },
    {
      id: "3",
      title: "",
      subTitle: "Andrew Marr on LBC: “The Tories are in a full-blown cival war",
      videoUrl: "img/RectangleVideoImg1.png",
    },
    {
      id: "4",
      title: "",
      subTitle: "Therapist reacts to Big Ed",
      videoUrl: "img/RectangleVideoImg.png",
    },
    {
      id: "5",
      title: "",
      subTitle: "Andrew Marr on LBC: “The Tories are in a full-blown cival war",
      videoUrl: "img/RectangleVideoImg1.png",
    },
    {
      id: "6",
      title: "",
      subTitle: "School of life: The body keeps score",
      videoUrl: "img/RectangleVideoImg2.png",
    },
  ];
  const profiledata = {
    title: "Mazza Konny",
    editIcon: "editIcon.svg",
    dateOfJoined: "Date joined: Oct 2022",
    boxLeftTitle: "Boxes",
    boxValueLeft: "4",
    profileImg: "Ellipse60.png",
    bottomTitle: "all the city with me",
    boxRightTitle: "Awareness",
    boxValueRight: "15",
    flashCardProfile: "flashCardProfile.svg",
  };

  return (
    <>
      <div className="profile-main">
        <ProfileCard className="pt-2" profile={profiledata} />
        {/* <div className="py-4"> */}
        <div className="m-0 pb-2 overflow-x-scroll">
          <HeaderTitle
            title="Your builds"
            className="title-list-of-profile py-2"
          />
          <div className="builds-Main overflow-auto">
            <div className="d-flex overflow-auto">
              {videosData.length > 0 &&
                videosData.map((videoData, index) => (
                  <Col lg={4} className="videoProfile px-2" key={index}>
                    <VideoCard VideoCardData={videoData} />
                  </Col>
                ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="pb-2">
          <HeaderTitle
            title="Builds you have interacted with"
            className="title-list-of-profile py-2"
          />
          <Row className="m-0">
            {videosData.length > 0 &&
              videosData.map((videoData, index) => (
                <Col md={3} key={index}>
                  <VideoCard VideoCardData={videoData} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Profile;
