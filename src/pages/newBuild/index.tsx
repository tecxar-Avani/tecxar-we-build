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
import { Card, Col, Image, Row } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";
import { Router, useRouter } from "next/router";
import { Content } from "antd/lib/layout/layout";
import { Console } from "console";
import { addAbortSignal } from "stream";
import AddFlashCardModal from "@/components/AddFlashCardModal";
import { addBuild, buildSelector } from "../../store/reducers/build.reducer";


const NewBuild = () => {
  const router = useRouter();
  const flashCardData = useAppSelector(flashCardSelector);
  const BuildData = useAppSelector(buildSelector);
  const [arr, setArr] = useState([1]);
  const [videoType , setVideoType] = useState(false);
  const [polarisation , setPolarisation] = useState(false);
  const [difficulty , setDifficulty] = useState(false);

  useEffect(() => {
    dispatch(getFlashCardByBuildId(2));
  }, []);

useEffect(() => {
  dispatch(addBuild());
},[])
  const num = [
    {
      id: 1,
      boxData: "",
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

  const setNum = (data: any) => {
    num.push(data);
  };
  const dispatch = useAppDispatch();
  const BoxSize = 3;
  const flashCardArr = flashCardData?.flashCardList?.rows?.flashBuild?.build;
  const userArr = flashCardData?.flashCardList?.rows?.flashBuild?.users;
  const questionData = (userId: any, index?: number, questionId?: number) => {
    const filterArray = flashCardArr.filter((F: any) => F.user_id == userId);
    const findLastValue = filterArray.slice(-1)[0];
    const lastQuestionId = findLastValue.id;

    if (questionId == lastQuestionId) {
      setModal3Open({
        content: "Congratulations! You have finished your deck",
        footer: [],
        onOk: modal4Open,
      });
      setRevealAns(true);
    } else {
      setModal3Open({
        content: index ? filterArray[index].question : filterArray[0].question,
        footer: ["Reveal Answer"],
        userId: index ? filterArray[index].user_id : filterArray[0].user_id,
        questionId: index ? filterArray[index].id : filterArray[0].id,
        index: index ? index + 1 : 1,
        arrayLength: filterArray.length,
        onOk: modal4Open,
      });
      setRevealAns(true);
    }
  };

  const [addFlashCard, SetAddFlashcard] = useState(false);
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState({});
  const [modal4Open, setModal4Open] = useState(false);
  const [awarenessIndex, setAwarenessIndex] = useState(false);
  const [awarenessBoxId ,setAwarenessBoxId] = useState(false);
  let mapdata = Math.ceil(num.length / 3);

  const handleChange = (e: any) => {
    setAwarenessIndex(e.target.value);
    setAwarenessBoxId(e.target.id);
  };


  return (
    <>
      <div className="d-flex m-0 w-100">
        <NewBuildSideCard id={router.query.id} value={awarenessIndex} BoxId={awarenessBoxId}/>

        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          {[...Array(mapdata)].map((item, index) => {
            const currentSize = index * BoxSize;
            const remaningBox = num.length - currentSize;
            const finalSize = remaningBox > BoxSize ? BoxSize : remaningBox;
            let items;

            while (num.length > 0) {
              // if (arr.length > 20) {
              //   console.log("arr.length", arr.length);

              //   num.push({ id: arr.length + 1, message: "" });
              //   console.log("DDDDDDDDDDDnumDDDDDDDDDDD", num.length);
              // }
              items = num.splice(0, 3);
             
              return (
                <>
              
                  <NewBuildBoxes
                    setModal1Open={SetAddFlashcard}
                    item={items}
                    arr={arr}
                    setArr={setArr}
                    setNum={(data: any) => {
                      setNum(data);
                    }}
                    // setNum={(data: any) => {
                    //   console.log("DDDDDDDDDDDDD", data);
                    //   num.push(data);
                    //   setNewNumber([...newNumber, data]);
                    // }}
                    numOfBox={finalSize}
                    key={index}
                    onFocus={handleChange}
                  />
                </>
              );
            }
          })}
          <div className="position-absolute mkCard">
            {userArr?.length > 0 &&
              userArr?.map((data: any, index: number) => {
                return (
                  <Card
                    className="mt-3"
                    onClick={() => {
                      questionData(data.user_id);
                    }}
                  >
                    <Card.Body>
                      {data.user_name
                        .split(" ")
                        .map((a: any) => a.charAt(0).toUpperCase())}
                    </Card.Body>
                  </Card>
                );
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
        responseCallback={(
          data: any,
          userId: number,
          questionId: number,
          index: number,
          arrayLength: number,
        ) => {
          const filterArray = flashCardArr.filter(
            (F: any) => F.user_id == userId
          );
          const questionFilter = filterArray.filter(
            (F: any) => F.id == questionId
          );
          questionFilter.length > 0 &&
            questionFilter.map((ans: any) => {
              const newData = {
                content: ans.answer,
                footer: ["Again", "Hard", "Good", "Easy"],
                onOk: modal4Open,
                userId: userId,
                questionId: questionId,
                index: index,
                arrayLength: arrayLength,
              };
              setModal3Open(newData);
            });
        }}
        questionCallback={(
          userId: number,
          index: number,
          questionId: number
        ) => {
          questionData(userId, index, questionId);
        }}
      />
    </>
  );
};

export default NewBuild;
