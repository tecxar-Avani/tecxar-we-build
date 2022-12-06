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
  const videosData: any = [];
  buildList.rows &&
    buildList.rows.length > 0 &&
    buildList.rows.map((video: any) => {
      videosData.push({
        subTitle: video.title,
        videoUrl: video.url,
      });
    });

    
 
  const searchResult = (url: string) => {
    if (url !== "") {
      dispatch(getBuildByUrl(url));
    
    }
  };
  console.log("userBuildListuserBuildList", buildListByUrl);
  useEffect(() => {
    dispatch(getBuilds());
  }, []);

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
        {buildList &&
          buildList.rows &&
          buildList.rows.length > 0 &&
          buildList.rows.map(
            (videoData: any, index: number) =>
              index < 9 &&
              videoData.videoId && (
                <Col lg={4} className="videoProfile pb-2" key={index}>
                  <Link
                    href={`/newBuild?id=${videoData.videoId}&&videoId=${videoData.id}`}
                  >
                    <a>
                      <VideoCard VideoCardData={videoData} />
                    </a>
                  </Link>
                </Col>
              )
          )}
      </Row>
    </>
  );
};

export default SearchPage;
