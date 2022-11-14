import CustomButton from "@/components/Button";
import OuterBox from "@/components/OuterBox";
import ProfileCard from "@/components/Profile";
import Ractangle from "@/components/Ractangle";
import VideoCard from "@/components/VideoCard";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";


const NewBuild = () => {
    const videosData = [
        {
            id: "1",
            title: "",
            subTitle: "Therapist reacts to Big Ed",
            videoUrl: "img/RectangleVideoImg.png",
        },]
    return (
        <>
            <div className="d-flex">
                <div>

                    {videosData.length > 0 &&
                        videosData.map((videoData, index) => (
                            <div className="videoProfile" key={index}>

                                <Link href="/newBuild">
                                    <VideoCard VideoCardData={videoData} />
                                </Link>
                            </div>
                        ))}


                    <hr className="border-dark mt-5 ms-3   " />


                    <div className="mx-5">
                        <CustomButton title="Group" className="btn1 px-4 py-3" />
                        <CustomButton title="New row" className="btn2  px-4 py-3 ms-2" />
                    </div>
                    <hr className="border-dark ms-3  " />
                    <h2> Traingle</h2>

                    <hr className="border-dark mt-5 ms-3 " />


                    <div className="d-flex ml-2 my-2 ms-1 ">
                        <figure className="ms-3">
                            <Image
                                src="../img/typeof.svg "
                                height={37}
                                width={37}
                                className="mx-2"
                            />
                            <figcaption className="text-center tpof">
                                Type of <br></br>Video
                            </figcaption>
                        </figure>


                        <figure className="ms-5">
                            <Image
                                src="../img/polarisation.svg"
                                height={40}
                                width={40}
                                className="mx-3"
                            />
                            <figcaption className="text-center tpof">
                                Polarisation <br></br>potental
                            </figcaption>
                        </figure>

                        <figure className="ms-5">
                            <Image
                                src="../img/difficulty.svg"
                                height={34}
                                width={35}
                                className="mx-3"
                            />

                            <figcaption className="text-center tpof">Difficulty</figcaption>
                        </figure>
                    </div>


                    <hr className="border-dark mb-3 ms-3  " />
                    <div className="d-flex owd bd-highlight mx-3  ">
                        <div className="save bd-highlight  "><Image src="../img/save.svg" className="" /></div>
                        <div className="backward bd-highlight"><Image src="../img/backward.svg" className="ms-5" /></div>
                        <div className=" forward bd-highlight"><Image src="../img/forward.svg" className="ms-2" /></div>
                        <div className=" delt bd-highlight"><Image src="../img/delt.svg" className="ms-5" /></div>

                    </div>
                </div>
                <div className="mt-3 ms-3">
                    <Ractangle />
                    <div className="ms-2">
                        <OuterBox />
                    </div>

                </div>

            </div>


        </>
    );
};

export default NewBuild;
