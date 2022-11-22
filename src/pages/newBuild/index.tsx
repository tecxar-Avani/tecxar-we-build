import CustomButton from "@/components/Button";
import OuterBox from "@/components/OuterBox";
import ProfileCard from "@/components/Profile";
import Ractangle from "@/components/Ractangle";
import VideoCard from "@/components/VideoCard";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";
import { Router, useRouter } from "next/router";
import { Content } from "antd/lib/layout/layout";

const NewBuild = () => {
  const router = useRouter();
  console.log(" routerrouterrouterrouterv", router.query.id);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const BoxSize = 3;
  const { TextArea } = Input;
  const flashCardModalData = {
    footer: ["save"],
  };
  const flashCardModalData2={
    content:"question",
    footer:["Reveal Answer"],
  }
  const num = [
    {
      id: 1,
      message: "Testing Data 1",
    },
    {
      id: 2,
     message:"",
    },
    {
      id: 3,
      message: "",
    },
    {
      id: 4,
      message: "",
    },
    {
      id: 5,
      message: "",
    },
    {
      id: 6,
      message: "",
    },
    {
      id: 7,
      message: "",
    },
    {
      id: 8,
      message: "",
    },
    {
      id: 9,
      message: "",
    },
    {
      id: 10,
      message: "",
    },
    {
      id: 11,
      message: "",
    },
    {
      id: 12,
      message: "",
    },
    {
      id: 13,
      message: "",
    },
    {
      id: 14,
      message: "",
    },
    {
      id: 15,
      message: "",
    },
    {
      id: 16,
      message: "",
    },
    {
      id: 17,
      message: "",
    },
    {
      id: 18,
      message: "",
    },
    {
      id: 19,
      message: "",
    },
    {
      id: 20,
      message: "",
    },
  ];
  let mapdata = Math.ceil(num.length / 3);

  return (
    <>
      <div className="d-flex m-0 w-100">
        <NewBuildSideCard id={router.query.id} />
        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          {[...Array(mapdata)].map((item, index) => {
              const [arr, setArr] = useState(3);

            const currentSize = index * BoxSize;
            const remaningBox = num.length - currentSize;
            const finalSize = remaningBox > BoxSize ? BoxSize : remaningBox;
            let items;

            while (num.length > 0) {
               items = num.splice(0, );
              return (
                <NewBuildBoxes
                  setModal1Open={setModal1Open}
                  item={items}
                  numOfBox={finalSize}
                  key={index}
                  callback={(value: number) => {
                    setArr(value);
                  }}
                />
              );
            }
          })}
          <div className="position-absolute mkCard">
            <Image
              alt="flashCards"
              src="../../../img/mkCard.png"
              onClick={() => {
                setModal1Open(true);
              }}
            />
          </div>
          <div className="position-absolute flash">
            <Image
              alt="flashCards"
              src="../../../img/flashcardnewbuild.svg"
              onClick={() => {
                setModal2Open(true);
              }}
            />
          </div>
        </div>
      </div>
      <FlashCardModal
        modal2Open={modal2Open}
        flashCard={flashCardModalData}
        setModal2Open={setModal2Open}
        visible={modal2Open}
      />
      <FlashCardModal
      modal2Open={modal1Open}
      flashCard={flashCardModalData2}
      setModal2Open={setModal1Open}
      visible={modal1Open}
      />
    </>
  );
};

export default NewBuild;
