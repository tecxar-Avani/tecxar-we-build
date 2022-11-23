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
  const flashCardModalData2 = {
    content: "question",
    footer: ["Reveal Answer"],
  }
  const awarenessModalData = {
    title: ["hello"],
    footer: ["save", "Reveal answer", "Delete"],
    textbox: [{ header: "Back", box: "" }],
  };
  const BoxData = [
    {
      data: "1",
    },
    {
      data: "1",
    },
  ];
  const outBoxData = [
    {
      outer: "1",
    },
    {
      outer: "1",
    },
    {
      outer: "1",
    },
  ];
  const inBoxData = [
    {
      inner: "1",
    },
  ];
  const ractangleData = [
    {
      ractBox: "1",
    },
  ];
  const num = [
    {
      id: 1,
      message: "Testing Data 1",
    },
    {
      id: 2,
      message: "",
    },
    {
      id: 3,
      message: "Testing Data 3",
    },
    {
      id: 4,
      message: "Testing Data 4",
    },
    {
      id: 5,
      message: "Testing Data 5",
    },
    {
      id: 6,
      message: "Testing Data 6",
    },
    {
      id: 7,
      message: "Testing Data 7",
    },
    {
      id: 8,
      message: "Testing Data 8",
    },
    {
      id: 9,
      message: "Testing Data 9",
    },
    {
      id: 10,
      message: "Testing Data 10",
    },
    {
      id: 11,
      message: "Testing Data 11",
    },
    {
      id: 12,
      message: "Testing Data 12",
    },
    {
      id: 13,
      message: "Testing Data 13",
    },
    {
      id: 14,
      message: "Testing Data 14",
    },
    {
      id: 15,
      message: "Testing Data 15",
    },
    {
      id: 16,
      message: "Testing Data 16",
    },
    {
      id: 17,
      message: "Testing Data 17",
    },
    {
      id: 18,
      message: "Testing Data 18",
    },
    {
      id: 19,
      message: "Testing Data 19",
    },
    {
      id: 20,
      message: "Testing Data 20",
    },
  ];
  let mapdata = Math.ceil(num.length / 3);

  return (
    <>
      <div className="d-flex m-0 w-100">
        <NewBuildSideCard id={router.query.id} />
        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          {[...Array(mapdata)].map((item, index) => {
            const currentSize = index * BoxSize;
            const remaningBox = num.length - currentSize;
            const finalSize = remaningBox > BoxSize ? BoxSize : remaningBox;
            let items;
            while (num.length > 0) {
              items = num.splice(0, 3);
              return (
                <NewBuildBoxes
                  setModal1Open={setModal1Open}
                  item={items}
                  numOfBox={finalSize}
                  key={index}
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
