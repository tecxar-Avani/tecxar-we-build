import React, { Dispatch, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeaderTitle from "@/components/headerTitle";
import VideoCard from "@/components/VideoCard";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  buildSelector,
  getBuilds,
  getBuildByUrl,
  getUsersBuild,
  getOthersBuilds,
} from "../../store/reducers/build.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Link from "next/link";

const SearchPage = (props: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { buildList, buildListByUrl, userBuilds } =
    useAppSelector(buildSelector);
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    try {
      if (
        (buildList?.box && buildList.box.length > 0) ||
        (userBuilds && userBuilds.box?.length > 0)
      ) {
        router && router.query.selfLearning
          ? userBuilds?.box?.length > 0
            ? setVideosData(userBuilds.box)
            : setVideosData(buildList.box)
          : setVideosData(buildList.box);
      } else if (buildList.data && buildList.data.length > 0) {
        setVideosData(buildList.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [buildList, userBuilds]);
  

  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  const searchResult = (url: string) => {
    const validUrl = pattern.test(url);

    const searchData = {
      url: validUrl ? url : undefined,
      search: !validUrl ? url : undefined,
    };
    if (url.trim().length > 0) {
      dispatch(getBuildByUrl(searchData));
    }
  };
  useEffect(() => {
    {
      router && router?.query?.selfLearning
        ? props.isLoggedIn == true
          ? dispatch(getUsersBuild())
          : dispatch(getBuilds())
        : props.isLoggedIn == true
        ? dispatch(getOthersBuilds())
        : dispatch(getBuilds());
    }
  }, [router]);

  return (
    <>
      <div className="mx-4">
        <SearchBar searchResult={searchResult} />
        {router && router.query.selfLearning ? (
          <HeaderTitle
            title={
              buildList.allBuilds && buildList.allBuilds.length > 0
                ? "We do not have anything matching your search. Please try another word. Otherwise, check out existing builds below"
                : !buildListByUrl.allBuilds &&
                  buildListByUrl?.box?.length == 0 &&
                  buildList?.box?.length == 0 &&
                  buildListByUrl.data?.length > 0
                ? "Lucky you! Nothing exists for this URL. To start your build, click the video below"
                : buildListByUrl.data
                ? "Results"
                : "Learn something new about yourself"
            }
            className={`title-list-of-profile py-4 Search`}
          />
        ) : (
          <HeaderTitle
            title={
              buildList.allBuilds && buildList.allBuilds.length > 0
                ? "We do not have anything matching your search. Please try another word. Otherwise, check out existing builds below"
                : buildList?.box?.length == 0 && buildList.data?.length > 0
                ? "Lucky you! Nothing exists for this URL. To start your build, click the video below"
                : buildListByUrl.data
                ? "Results"
                : "Want to learn from others’ builds?"
            }
            className="title-list-of-profile py-4 Search"
          />
        )}

        <Row className="Search m-0">
          {buildList?.box?.length == 0 &&
          buildList.data?.length > 0 &&
          buildList?.data?.length < 2
            ? videosData.map((videoData: any, index: number) => {
                const videoId = videoData.newVideoId
                  ? videoData.newVideoId
                  : videoData.videoId
                  ? videoData.videoId
                  : videoData.id;

                const id = videoData.id;

                return (
                  <div
                    className="d-flex justify-content-center videoProfile1 pb-2"
                    key={index}
                  >
                    <Link href={`/newBuild?id=${id}&&videoId=${videoId}`}>
                      <a>
                        <div className="content mt-2">
                          Start Building!
                          <VideoCard VideoCardData={videoData} />
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })
            : videosData &&
              videosData.length > 0 &&
              videosData.map((videoData: any, index: number) => {
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
      </div>
    </>
  );
};

export default SearchPage;
