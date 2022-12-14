import { updateUserById, userSelector } from "@/store/reducers/user.reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import { Image } from "react-bootstrap";

interface profileProps {
  className: string;
  profile: {
    title: string;
    dateOfJoined: Date;
    editIcon: string;
  };
  showModal: Function;
}

const ProfileCard = (props: any) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelector);
  const onBlock = (data:any) => {
    const userData = {
      id: data,
      is_blocked:1
    };
    dispatch(updateUserById(userData));
  }
  const onUnBlock = (data:any) => {
    const userData = {
      id: data,
      is_blocked:0
    };
    dispatch(updateUserById(userData));
  }
  const onDelete = (data:any) => {
    const userData = {
      id: data,
      is_blocked:2
    };
    dispatch(updateUserById(userData));
  }
  return (
    <>
      <div
        className={`${props.className} profile text-center border-bottom pb-3 position-relative`}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <h4 className="title">{props.profile.title}</h4>
            {props.profile && props.profile.dateOfJoined && (
              <h5 className="subTitle py-1">{props.profile.dateOfJoined}</h5>
            )}
          </div>
          {props.profile && props.profile.editIcon && (
            <Image
              className="px-2 mb-2"
              src={`/img/${props.profile.editIcon}`}
              onClick={() => {
                props.showModal();
              }}
            />
          )}
        </div>
        <div className="d-flex justify-content-center align-items-center py-2">
          <div className={`${props.leftBoxClass}`}>
            <p className="boxes-heading m-0">
              {props.profile && props.profile.boxLeftTitle}
            </p>
            <p className="boxes-number m-0">
              {props.profile && props.profile.boxValueLeft}
            </p>
          </div>
          <div className="mx-4">
            <Image
              alt="profile"
              src={`/profile/${props.profile.profileImg}`}
              className="img-fluid img-rounded"
            />
          {  props.profile.bottomTitle ? 
            <p className="cityWithMe mb-0 mt-2">
            “{props.profile && props.profile.bottomTitle}”
            </p>
            : []}
          </div>
          <div className={`${props.rightBoxClass}`}>
            <p className="boxes-heading m-0">
              {props.profile && props.profile.boxRightTitle}
            </p>
            <p className="boxes-number m-0">
              {props.profile && props.profile.boxValueRight}
            </p>
          </div>
        </div>
        {props.profile && props.profile.flashCardsNumber && (
          <div className="flashCardsContent">
            {props.profile.flashCardsNumber} Cards
          </div>
        )}
        {props.profile && props.profile.flashCardProfile && (
          <div
            className="flashCards"
            onClick={() => {
              props.setmodalOpen;
            }}
          >
            {props.profile.flashCardsNumber > 0 ? (
              <Image
                alt="flashCards"
                src={`/img/${props.profile.flashCardProfile}`}
                onClick={() => {
                  props.questionData();
                }}
              />
            ) : (
              <Image
                alt="flashCards"
                src={`/img/${props.profile.flashCardProfile}`}
                // onClick={() => {
                //   props.questionData();
                // } }
              />
            )}
          </div>
        )}
        <div className="button justify-content-center d-flex">
          {props.profile && props.profile.blockIcon && (
            <figure>
              <Image
                src={`/img/${props.profile && props.profile.blockIcon}`}
                height="41"
                width="41"
                className="mx-2 button"
                onClick={()=>onBlock(props.profile.id)}
              />{" "}
              <figcaption> Block </figcaption>
            </figure>
          )}
          {props.profile && props.profile.UnBlockIcon && (
            <figure>
              <Image
                src={`/img/${props.profile && props.profile.UnBlockIcon}`}
                height="41"
                width="41"
                className="mx-2 button"
                onClick={()=>onUnBlock(props.profile.id)}
              />{" "}
              <figcaption> Unblock </figcaption>
            </figure>
          )}
          {props.profile && props.profile.deleteIcon && (
            <figure>
              <Image
                src={`/img/${props.profile && props.profile.deleteIcon}`}
                height="41"
                width="41"
                className="mx-2 button"
                onClick={()=>onDelete(props.profile.id)}
              />{" "}
              <figcaption> Delete </figcaption>
            </figure>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
