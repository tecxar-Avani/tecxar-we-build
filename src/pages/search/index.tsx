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
  getBuilds,
  getBuildByUrl,
} from "../../store/reducers/build.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Link from "next/link";
import build from "next/dist/build";
import { IVideoBuild } from "../../../@types/common";

const SearchPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState();
  const dispatch = useAppDispatch();
  const { buildList, buildListByUrl } = useAppSelector(buildSelector);
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    try {
      if (buildListByUrl.data && buildListByUrl.data.length > 0) {
        setVideosData(buildListByUrl.data);
      } else if (buildList.rows) {
        setVideosData(buildList.rows);
      }
    } catch (error) {
      console.log(error);
    }
  }, [buildListByUrl, buildList]);

  const searchResult = (url: string) => {
    if (url.trim().length > 0) {
      dispatch(getBuildByUrl(url));
    }
  };
  useEffect(() => {
    dispatch(getBuilds());
  }, []);
  return (
    <>
      <SearchBar searchResult={searchResult} />
      {router && router.query.selfLearning ? (
        <HeaderTitle
          title={buildListByUrl.data ? "Results" ? buildListByUrl.data=="error" ? "we don't" : "Learn something new about yourself" :"Learn something new about yourself" : "Learn something new about yourself"}
          className="title-list-of-profile py-4 Search"
        />
      ) : (
        <HeaderTitle
          title="Want to learn from others’ builds?"
          className="title-list-of-profile py-4 Search"
        />
      )}

      <Row className="Search m-0">
        {videosData.map((videoData: any, index: number) => {
          const videoId = videoData.newVideoId
            ? videoData.newVideoId
            : videoData.videoId
            ? videoData.videoId
            : videoData.id;
          const id = videoData.id;
          return (
            <Col lg={4} className="videoProfile pb-2" key={index}>
              <Link href={`/newBuild?id=${id}&&videoId=${videoId}`}>
                <a>
                  <VideoCard VideoCardData={videoData} />
                </a>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default SearchPage;
