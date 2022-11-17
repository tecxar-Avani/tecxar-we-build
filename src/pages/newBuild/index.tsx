import CustomButton from "@/components/Button";
import OuterBox from "@/components/OuterBox";
import ProfileCard from "@/components/Profile";
import Ractangle from "@/components/Ractangle";
import VideoCard from "@/components/VideoCard";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";

const NewBuild = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
    const { TextArea } = Input;
  const flashCardModalData = {
    // title:["hello"],
    headerIcon:["deleteFlash.svg","edit.svg"],
    footer:['save','Reveal answer','Delete'],
    textbox:[{'header':'Front','box':''},{'header':'Back','box':''}],
  }
  const awarenessModalData = {
    title:["hello"],
    footer:['save','Reveal answer','Delete'],
    textbox:[{'header':'Front','box':''},{'header':'Back','box':''}],
  }
const BoxData =[
  {
    data:"1"
  },
  {
    data:"1"
  }
]
const outBoxData =[
  {
    outer:"1"
  },
  {
    outer:"1"
  },
  {
    outer:"1"
  },
  {
    outer:"1"
  },

]
const inBoxData = [
  {
    inner:"1"
  },
 
]
const ractangleData = [
  {
    ractBox:"1"
  },
]
  return (
    <>
      <div className="d-flex m-0">
        <NewBuildSideCard/>
        <NewBuildBoxes setModal1Open={setModal1Open} boxes={BoxData} outBox={outBoxData} inbox={inBoxData} ract={ractangleData}/>
        <div className="flash mb-1 me-1">
        <Image
            alt="flashCards"
            src="../../../img/flashcardnewbuild.svg"
            onClick= {() => {setModal2Open(true)}}
          />
          </div>
      </div>
      <FlashCardModal modal2Open={modal2Open} flashCard={flashCardModalData} setModal2Open={setModal2Open} visible={modal2Open}/>
      <AwarenessModal modal1Open={modal1Open} awareness={awarenessModalData} setModal1Open={setModal1Open} visible={modal1Open}/>
    </>
  );
};

export default NewBuild;
