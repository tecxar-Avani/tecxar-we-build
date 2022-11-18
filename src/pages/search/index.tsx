import ProfileCard from "@/components/Profile";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeaderTitle from "@/components/headerTitle";
import VideoCard from "@/components/VideoCard";
import { Col, Row } from "react-bootstrap";
import { title } from "process";
import { useRouter } from "next/router";
import {
  buildSelector,
  getBuildByUrl,
} from "../../store/reducers/build.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SearchPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { buildList} = useAppSelector(buildSelector);

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

  const searchResult = (url: string) => {
    if (url !== "") {
      dispatch(getBuildByUrl(url));
    }
  };

  return (
    <>
      <SearchBar searchResult={searchResult} />
      {router && router.query.selfLearning ? (
        <HeaderTitle
          title="Learn something new about yourself"
          className="title-list-of-profile py-4 Search"
        />
      ) : (
        <HeaderTitle
          title="Want to learn from others’ builds?"
          className="title-list-of-profile py-4 Search"
        />
      )}
      <Row className="Search m-0">
        {videosData.length > 0 &&
          videosData.map((videoData, index) => (
            <Col lg={4} className="videoProfile pb-2" key={index}>
              <VideoCard VideoCardData={videoData} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default SearchPage;
