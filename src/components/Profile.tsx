import { updateUserById, userSelector } from "@/store/reducers/user.reducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Button } from "antd";
const cookieCutter = require("cookie-cutter");
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { delay } from "@reduxjs/toolkit/dist/utils";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userSelector);
  const onBlock = (data: any) => {
    const userData = {
      id: data,
      is_blocked: 1,
    };
    dispatch(updateUserById(userData));
  };
  const onUnBlock = (data: any) => {
    const userData = {
      id: data,
      is_blocked: 0,
    };
    dispatch(updateUserById(userData));
  };
  const onDelete = (data: any) => {
    const userData = {
      id: data,
      is_blocked: 2,
    };
    dispatch(updateUserById(userData));
  };

  const logout =  async() => {
    await router.push("/")
    await  toast.success("You logged out successfully"); 
   cookieCutter.set("authorization", "", { expires: new Date(0)})
  };

  return (
    <> {props?.profile?.id == props?.adminFilter?.map((a:any) => a.id)  ?
       <div
      className={`${props.className} profile text-center pb-3 position-relative mt-4`}
    >
      <div className="d-flex" style={{padding:"28px"}}>
     <div>
      <div className={`d-flex justify-content-center align-items-center ms-4${props.profile.boxLeftTitle == "Boxes mapped" ? "ms-5" : ""}`}>
        <div>
          <h4 className="title">{props.profile.title}</h4>
          {props.profile && props.profile.dateOfJoined && (
            <h5 className="subTitle py-1">{props.profile.dateOfJoined}</h5>
          )}
        </div>
       
      </div>
      {/* <Button className="logOut">Log out</Button> */}

      <div className="py-2">
      
        <div className="ms-4">
          <Image
            alt="profile"
            src={`/profileImg/${props.profile.profileImg}`}
            className="img-fluid img-rounded"
          />
         
        </div>
        <div className="d-flex justify-content-center align-items-center ms-4 mt-1">
        <div className={`${props.leftBoxClass} mx-2`}>
          <p className="boxes-heading m-0">
            {props.profile && props.profile.boxLeftTitle}
          </p>
          <p className="boxes-number1 m-0">
            {props.profile && props.profile.boxValueLeft}
          </p>
        </div>
        <div className={`${props.rightBoxClass} mx-2`}>
          <p className="boxes-heading m-0">
            {props.profile && props.profile.boxRightTitle}
          </p>
          <p className="boxes-number1 m-0">
            {props.profile && props.profile.boxValueRight}
          </p>
        </div>
        </div>
      </div>
     </div>
      <div className="button1 justify-content-center mt-5">
        {props.profile && props.profile.blockIcon && (
          <figure>
            <Image
              src={`/img/${props.profile && props.profile.blockIcon}`}
              height="41"
              width="41"
              className="mx-2 button1"
              onClick={() => onBlock(props.profile.id)}
              style={
                props.profile?.userRole && props.profile.userRole == 1
                  ? { pointerEvents: "none", opacity: 0.4 }
                  : {}
              }
            />
            <figcaption> Block </figcaption>
          </figure>
        )}
        {props.profile && props.profile.UnBlockIcon && (
          <figure>
            <Image
              src={`/img/${props.profile && props.profile.UnBlockIcon}`}
              height="41"
              width="41"
              className="mx-2 button1"
              onClick={() => onUnBlock(props.profile.id)}
              style={
                props.profile?.userRole && props.profile.userRole == 1
                  ? { pointerEvents: "none", opacity: 0.4 }
                  : {}
              }
            />
            <figcaption> Unblock </figcaption>
          </figure>
        )}
        {props.profile && props.profile.deleteIcon && (
          <figure>
            <Image
              src={`/img/${props.profile && props.profile.deleteIcon}`}
              height="41"
              width="41"
              className="mx-2 button1"
              onClick={() => onDelete(props.profile.id)}
              style={
                props.profile?.userRole && props.profile.userRole == 1
                  ? { pointerEvents: "none", opacity: 0.4 }
                  : {}
              }
            />
            <figcaption> Delete </figcaption>
          </figure>
        )}
      </div>
      </div>
    </div> :
      <div
        className={`${props.className} profile text-center ${props.profile.boderBottom ? "border-bottom" : ""} pb-3 position-relative`}
      >
        <div className="d-flex justify-content-end align-items-center py-2 px-4">
          <Button
            className="logOut"
            type="primary"
            onClick={() => logout()}
            href={`/`}
          >
            {props.profile.logout}
          </Button>
        </div>
        <div className={`d-flex justify-content-center align-items-center ${props.profile.boxLeftTitle == "Boxes mapped" ? "ms-5" : ""}`}>
          <div>
            <h4 className="title">{props.profile.title}</h4>
            {props.profile && props.profile.dateOfJoined && (
              <h5 className="subTitle py-1">{props.profile.dateOfJoined}</h5>
            )}
          </div>
          {props.profile && props.profile.editIcon && (
            <Image
              className="px-2 mb-3"
              src={`/img/${props.profile.editIcon}`}
              onClick={() => {
                props.showModal();
              }}
            />
          )}
        </div>
        {/* <Button className="logOut">Log out</Button> */}
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
              src={`/profileImg/${props.profile.profileImg}`}
              className="img-fluid img-rounded"
            />
            {props.profile.bottomTitle ? (
              <p className="cityWithMe mb-0 mt-2">
                “{props.profile && props.profile.bottomTitle}”
              </p>
            ) : (
              []
            )}
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
                onClick={() => onBlock(props.profile.id)}
                style={
                  props.profile?.userRole && props.profile.userRole == 1
                    ? { pointerEvents: "none", opacity: 0.4 }
                    : {}
                }
              />
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
                onClick={() => onUnBlock(props.profile.id)}
                style={
                  props.profile?.userRole && props.profile.userRole == 1
                    ? { pointerEvents: "none", opacity: 0.4 }
                    : {}
                }
              />
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
                onClick={() => onDelete(props.profile.id)}
                style={
                  props.profile?.userRole && props.profile.userRole == 1
                    ? { pointerEvents: "none", opacity: 0.4 }
                    : {}
                }
              />
              <figcaption> Delete </figcaption>
            </figure>
          )}
        </div>
      </div>}
    </>
  );
};

export default ProfileCard;
