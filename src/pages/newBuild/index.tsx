import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  flashCardSelector,
  getFlashCardByBuildId,
} from "../../store/reducers/flashCard.reducer";
import { Card, Image } from "react-bootstrap";
import NewBuildSideCard from "@/components/NewBuildSideCard";
import NewBuildBoxes from "@/components/NewBuildBoxes";
import FlashCardModal from "@/components/FlashCardModal";
import AwarenessModal from "@/components/AwarenessModal";
import { useRouter } from "next/router";

import AddFlashCardModal from "@/components/AddFlashCardModal";
import { buildSelector } from "../../store/reducers/build.reducer";
import { addAwareness, awarenessSelector, getAwarenessByBoxId } from "../../store/reducers/awareness.reducer";
import AwarenessDotModal from "@/components/AwarenessDotModal";


const NewBuild = () => {
  const router = useRouter();
  const flashCardData = useAppSelector(flashCardSelector);
  const BuildData = useAppSelector(buildSelector);
  const awarenessList = useAppSelector(awarenessSelector);
  const [arr, setArr] = useState([1]);
  const [awarenessModal, setAwarenessModal] = useState(false);
  const [awarenessDotModal ,setAwarenessDotModal] = useState(false);
  const [accept, setAccept] = useState(false);
  const [inspiration, setInspiration] = useState(false);
  const [resistance, setResistance] = useState(false);
  const [modalChallenge , setModalChallenge] = useState({});
  const [review , setReview] = useState<string>("");
  const [addFlashCard, SetAddFlashcard] = useState(false);
  const [revealAns, setRevealAns] = useState(false);
  const [modal3Open, setModal3Open] = useState({});
  const [modal4Open, setModal4Open] = useState(false);
  const [awarenessIndex, setAwarenessIndex] = useState(false);
  const [awarenessBoxId ,setAwarenessBoxId] = useState<number>(0);
  const [dataArray, setDataArray] = useState([
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
  ]);

  {console.log("@@@@@@@ssssssssss@@@@@@",awarenessList) 
  const Acceptance = () => {
    setResistance(false);
    setInspiration(false);
    setAccept(true);
  };
  const Inspiration = () => {
    setAccept(false);
    setResistance(false);
    setInspiration(true);
  };
  const Resistance = () => {
    setAccept(false);
    setInspiration(false);
    setResistance(true);
  };

  useEffect(() => {
    dispatch(getFlashCardByBuildId(2));
  }, []);
useEffect(() => {
  const boxData={
    boxId:awarenessBoxId,
    reviewType:review
  }
  dispatch(getAwarenessByBoxId(boxData));
},[])


  const dispatch = useAppDispatch();
  const flashCardArr = flashCardData?.flashCardList?.rows?.flashBuild?.build;
  const userArr = flashCardData?.flashCardList?.rows?.flashBuild?.users;

  const questionData = (userId: any, index?: number, questionId?: number) => {
    const filterArray = flashCardArr?.filter((F: any) => F.user_id == userId);
    const findLastValue = filterArray?.slice(-1)[0];
    const lastQuestionId = findLastValue?.id;

   if(filterArray && filterArray.length > 0 ){ if (questionId == lastQuestionId) {
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
    }}
  };



  const handleChange = (e: any) => {
    setAwarenessIndex(e.target.value);
    setAwarenessBoxId(e.target.id);
  };

  const handleData = (comment:any,review:any) =>{
    const data = {
      comment:comment.comment,
      review_type:review,
      box_id:Number(awarenessBoxId)
    }
    dispatch(addAwareness(data))
    setReview(review)
   }
   const acceptanceData = [
    {
  "id":1,
  "description":"hello",
  "boxId":1,
    },
    {"id":2,
    "description":"hello world",
    "boxId":1,
    },
    {"id":3,
    "description":"hello tecxar",
    "boxId":1,
    },
    {"id":4,
    "description":"hello tecxar",
    "boxId":1,
    },
    {"id":5,
    "description":"hello tecxar",
    "boxId":1,
    }
  ]
const acceptanceValue = acceptanceData.filter((A) => A.description)
  return (
    <>
      <div className="d-flex m-0 w-100">
        <NewBuildSideCard id={router.query.id} value={awarenessIndex} Resistance={Resistance} Acceptance={Acceptance} Inspiration={Inspiration} setAwarenessModal={setAwarenessModal} />
      
        <div className="w-100 px-4 pb-3 pt-4 mt-4">
          <NewBuildBoxes
            setModal1Open={SetAddFlashcard}
            item={dataArray}
            arr={arr}
            setArr={(value:any) => {
              setArr(value);
              if (value.length > 20) {
                setDataArray([
                  ...dataArray,
                  {
                    id: value.length,
                    boxData: "",
                  },
                ]);
              }
            }}
            onFocus={handleChange}
            modalDot={setAwarenessDotModal}
            acceptanceData={acceptanceData}
            Acceptance={Acceptance}
            Resistance={Resistance}
            Inspiration={Inspiration}
          />

          <div className="position-absolute mkCard">
            {userArr && userArr?.length > 0 &&
              userArr?.map((data: any, index: number) => {
                return (
                  <Card
                    className="mt-3"
                    onClick={() => {
                      questionData(data.user_id);
                    }}
                  >
                    <Card.Body className="d-flex justify-content-center align-items-center">
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
          const filterArray = flashCardArr?.filter(
            (F: any) => F.user_id == userId
          );
          const questionFilter = filterArray?.filter(
            (F: any) => F.id == questionId
          );
          questionFilter && questionFilter.length > 0 &&
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
       <AwarenessModal
        awarenessModal={awarenessModal}
        setAwarenessModal={setAwarenessModal}
        visible={awarenessModal}
        textValue={awarenessIndex}
        handleSubmit={(comment:any,review:any)=>{handleData(comment,review)}}
        footer= "Add"
        id={awarenessIndex}
        title={`${accept
          ? "Acceptance"
          : inspiration
            ? "Inspiration"
            : resistance
              ? "Resistance"
              : ""
          }`}
        header={`Maria's ${accept
          ? "Acceptance"
          : inspiration
            ? "Inspiration"
            : resistance
              ? "Resistance"
              : ""
          }`}
        className={`${accept
          ? "accptanceModalBG"
          : inspiration
            ? "inspirationModalBG"
            : resistance
              ? "resistanceModalBG"
              : ""
          } `}
      />
       <AwarenessDotModal
        awarenessModal={awarenessDotModal}
        challenge={modalChallenge}
        setAwarenessModal={setAwarenessDotModal}
        visible={awarenessDotModal}
        btnName="challenge"     
        id={awarenessIndex}
        acceptanceValue={acceptanceValue}
        title={`${accept
          ? "Acceptance"
          : inspiration
            ? "Inspiration"
            : resistance
              ? "Resistance"
              : ""
          }`}
        // setModalChallenge ={setModalChallenge}
        callBack={(title:any ,content:any,header:any,awareLabel:any,challengeLabel:any,awareValue:any,id:any) =>
         { const newData = {
            title : `${title == "challenge" ? "challenge" : title == "Resolve" ? "Resolve" : title}`,
            content:content,
            header:header,
             awareLabel:"maria's acceptance",
            challengeLabel:"maria's challenge",
            awareValue:"hello"
          }
            setModalChallenge(newData);
            // setModalChallenge(true)
          }}
         
        
        header={`Maria's ${accept
          ? "Acceptance"
          : inspiration
            ? "Inspiration"
            : resistance
              ? "Resistance"
              : ""
          }`}
        className={`${accept
          ? "accptanceModalBG"
          : inspiration
            ? "inspirationModalBG"
            : resistance
              ? "resistanceModalBG"
              : ""
          } `}
      />
    </>
  );
};
}
export default NewBuild;
