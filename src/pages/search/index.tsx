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
} from "../../store/reducers/build.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Link from "next/link";
import Head from "next/head";

const SearchPage = (props: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { buildList, buildListByUrl, userBuilds } =
    useAppSelector(buildSelector);
  const [videosData, setVideosData] = useState([]);
  
  useEffect(() => {
    try {
      if (buildListByUrl.data && buildListByUrl.data.length > 0) {
        setVideosData(buildListByUrl.data);
      } else if (buildList?.box && buildList.box.length>0) {
        router && router.query.selfLearning
          ? userBuilds.data
            ? setVideosData(userBuilds.data)
            : setVideosData(buildList.box)
          : setVideosData(buildList.box);
      }
    } catch (error) {
      console.log(error);
    }
  }, [buildListByUrl, buildList, userBuilds]);
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
        : dispatch(getBuilds());
    }
  }, [router]);

  return (
    <>     <Head>
    <title>Search</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
      <SearchBar searchResult={searchResult} />
      {router && router.query.selfLearning ? (
        <HeaderTitle
          title={
            buildListByUrl.data
              ? "Results"
              : "Learn something new about yourself"
          }
          className={`title-list-of-profile py-4 Search`}
        />
       
      ) : (
        <HeaderTitle
          title={
            buildListByUrl.allBuilds && buildListByUrl.allBuilds.length > 0
              ? "We do not have anything matching your search. Please try another word. Otherwise, check out existing builds below"
              : !buildListByUrl.allBuilds &&
                buildListByUrl?.box?.length == 0 &&
                buildListByUrl.data?.length > 0
              ? "Lucky you! Nothing exists for this URL. To start your build, click the video below"
              : buildListByUrl.data
              ? "Results"
              : "Want to learn from others’ builds?"
          }
        
          className="title-list-of-profile py-4 Search"
        />
      )}

      <Row className="Search m-0">
        {videosData &&
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
    </>
  );
};

export default SearchPage;
