import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeaderTitle from "@/components/headerTitle";
import VideoCard from "@/components/VideoCard";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { Spin } from 'antd';
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
    const build = useAppSelector(buildSelector);
  const [videosData, setVideosData] = useState([]);
  const [buildListData, setBuildListData] = useState([buildList?.box]);

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
    setBuildListData(buildList?.box);
  }, [buildList]);

   useEffect(() => {
      setBuildListData([]);

   }, [buildListByUrl]);

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
  useEffect(() => {
    try {
      if (
        (buildList?.box && buildList.box.length > 0 && buildListData?.length > 0) ||
        (buildListByUrl?.box && buildListByUrl.box.length > 0 && buildListData?.length > 0) ||
        (userBuilds && userBuilds.box?.length > 0 && buildListData?.length > 0) 
   

      ) {
        router && router.query.selfLearning
          ? userBuilds?.box?.length > 0
            ? setVideosData(userBuilds.box)
            : setVideosData(buildList.box)
          : setVideosData(buildList.box);
      } else if (buildListByUrl.data && buildListByUrl.data.length > 0 && buildListData?.length == 0) {
        setVideosData(buildListByUrl.data);
      }else if(buildListByUrl?.allBuilds?.length > 0 &&  buildListByUrl?.data?.length == 0){
        setVideosData(buildListByUrl.allBuilds);
      }else if ( buildListByUrl && buildListByUrl.results && buildListByUrl.results.length > 0){
        setVideosData(buildListByUrl.results);
      }
    } catch (error) {
      console.log(error);
    }
  }, [buildList, userBuilds,buildListByUrl,buildListData]);

  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );



  return (
    <>

   
    {build.loading ? <div className="w-100 d-flex justify-content-center mt-5 "><Spin delay={100}/></div> :

   
<div className="mx-4">
  <SearchBar searchResult={searchResult} />
  {router && router.query.selfLearning ? (
    <HeaderTitle
      title={
        buildListByUrl.allBuilds &&
        buildListByUrl.allBuilds.length > 0 &&
        buildListData?.length == 0
          ? <p className="mb-0"><div className="text-center my-2 headerSizeInsearch">We do not have anything matching your search. Please try another word.<br/>Otherwise, check out existing builds below </div><br></br> Existing Builds</p>
          : !buildListByUrl.allBuilds &&
            buildListByUrl?.box?.length == 0 &&
            buildListByUrl.data?.length > 0 &&
            buildListData?.length == 0
          ? <div className="text-center my-2 headerSizeInsearch">Lucky you! Nothing exists for this URL. To start your build, click the video below"</div>
          : buildListByUrl?.results?.length > 0 &&
            buildListData?.length == 0
          ? "Results"
          : "Learn something new about yourself"
      }
      className={`title-list-of-profile py-4 Search`}
    />
  ) : (
    <HeaderTitle
      title={
        buildListByUrl.allBuilds &&
        buildListByUrl.allBuilds.length > 0 &&
        buildListData?.length == 0
          ?  <p className="mb-0 "><div className="text-center my-2 headerSizeInsearch">We do not have anything matching your search. Please try another word.<br/>Otherwise, check out existing builds below </div><br></br> Existing Builds</p>
          : !buildListByUrl.allBuilds &&
            buildListByUrl?.box?.length == 0 &&
            buildListByUrl.data?.length > 0 &&              
            buildListData?.length == 0
          ? <div className="text-center my-2 headerSizeInsearch">Lucky you! Nothing exists for this URL. To start your build, click the video below"</div>
          : buildListByUrl?.results?.length > 0 &&
            buildListData?.length == 0
          ? "Results"
          : "Want to learn from others’ builds?"
      }
      className="title-list-of-profile py-4 Search"
    />
  )}

  <Row className="Search m-0">
    {buildListByUrl?.box?.length == 0 &&
    buildListByUrl.data?.length > 0 &&
    buildListByUrl?.data?.length < 2 && buildListData?.length == 0
      ? videosData.map((videoData: any, index: number) => {
          const videoId = videoData.newVideoId
            ? videoData.newVideoId
            : videoData.videoId
            ? videoData.videoId
            : videoData.id;

          const id = videoData.id;

          return (
            <div
              className="d-flex justify-content-center mt-4 pb-2"
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
          const videoId = videoData.new_video_id
            ? videoData.new_video_id
            : videoData.video_id
            ? videoData.video_id
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
</div> } 
    
   
    </>
  );
};

export default SearchPage;
