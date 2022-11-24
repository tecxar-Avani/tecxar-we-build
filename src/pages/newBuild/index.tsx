import CustomButton from "@/components/Button";
import OuterBox from "@/components/OuterBox";
import ProfileCard from "@/components/Profile";
import Ractangle from "@/components/Ractangle";
import VideoCard from "@/components/VideoCard";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addFlashCard,
  flashCardSelector,
  getFlashCardByBuildId,
} from "../../store/reducers/flashCard.reducer";
import { Col, Image, Row } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";
import { Router, useRouter } from "next/router";
import { Content } from "antd/lib/layout/layout";
import { Console } from "console";
import { addAbortSignal } from "stream";
import AddFlashCardModal from "@/components/AddFlashCardModal";

const NewBuild = () => {
  const router = useRouter();
  const flashCardData = useAppSelector(flashCardSelector);
  const dispatch = useAppDispatch();
  const BoxSize = 3;
  const { TextArea } = Input;
  const flashCardArr = [
    {
      key: {
        AL: [
          { id: 1, question: "how are you?", answer: "fine" },
          { id: 2, question: "where do you live?", answer: "Ahmadabad" },
        ],

        AC: [
          { id: 3, question: "are you working?", answer: "yes" },
          { id: 4, question: "can you hear us?", answer: "no" },
        ],
      },
    },
  ];
  const userArr =[
    {id:1,name:"AL"},
    {id:2,name:"AC"}
  ]
  useEffect(() => {
    dispatch(getFlashCardByBuildId(2));
  }, []);
  const [addFlashCard, SetAddFlashcard] = useState(false);
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState({
    content: flashCardData?.flashCardList?.rows?.flashBuild?.map(
      (aa: any) => aa.question
    ),
    footer: ["Reveal Answer"],
  });
  const [modal4Open, setModal4Open] = useState(false);
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
  console.log("mapdata", mapdata);
  console.log("num", num);

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

            console.log("currentSize", currentSize);
            console.log("remaningBox", remaningBox);
            console.log("finalSize", finalSize);
            let items;

            while (num.length > 0) {
              items = num.splice(0, 3);
              return (
                <>
                  <NewBuildBoxes
                    setModal1Open={SetAddFlashcard}
                    item={items}
                    numOfBox={finalSize}
                    key={index}
                    callback={(value: number) => {
                      setArr(value);
                    }}
                  />
                </>
              );
            }
          })}
          <div className="position-absolute mkCard">
            {userArr.length > 0 &&
              userArr.map((data: any, index: number) => {
                console.log("DDDD", data.id);
                // <span>{data.name}</span>;
                <Image
                  alt="flashCards"
                  src="../../../img/mkCard.png"
                  onClick={() => {
                    setRevealAns(true);
                  }}
                />;
              })}
          </div>
          <div className="position-absolute flash">
            <Image
              alt="flashCards"
              src="../../../img/flashcardnewbuild.svg"
              onClick={() => {
                SetAddFlashcard(true);
              }}
            />
          </div>
        </div>
      </div>
      <AddFlashCardModal
        modal2Open={addFlashCard}
        setModal2Open={SetAddFlashcard}
        visible={addFlashCard}
      />
      <FlashCardModal
        modal={revealAns}
        flashCard={modal3Open}
        setmodalOpen={setRevealAns}
        modalVisible={revealAns}
        //onClick={modal3Open}
        responseCallback={(data: any) => {
          if (data == "Reveal Answer") {
            const newData = {
              content: flashCardData?.flashCardList?.rows?.flashBuild?.map(
                (aa: any) => aa.answer
              ),
              footer: ["Again", "Hard", "Good", "Easy"],
              onOk: modal4Open,
            };
            setModal3Open(newData);
          } else {
            const newData = {
              content: "Congratulations! You have finished your deck",
              footer: [],
              onOk: modal4Open,
            };
            setModal3Open(newData);
          }
        }}
      />
    </>
  );
};

export default NewBuild;
