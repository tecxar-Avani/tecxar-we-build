import React from "react";
import { Card, CardImg, Col, Image, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const ProfileCard = (props: any) => {
  console.log("props", props);
  return (
    <div
      className={`${props.className} profile text-center border-bottom pb-3 position-relative`}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div>
          {props.profile && props.profile.title && (
            <h4 className="title">{props.profile.title}</h4>
          )}
          {props.profile && props.profile.dateOfJoined && (
            <h5 className="subTitle py-1">{props.profile.dateOfJoined}</h5>
          )}
        </div>
        {props.profile && props.profile.editIcon && (
          <Image className="px-2 mb-2" src={`/img/${props.profile.editIcon}`} />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center py-2">
        <div className="px-4">
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
            src={`/img/${props.profile && props.profile.profileImg}`}
          />
          <p className="cityWithMe mb-0 mt-2">
            “{props.profile && props.profile.bottomTitle}”
          </p>
        </div>
        <div className="px-4">
          <p className="boxes-heading m-0">
            {props.profile && props.profile.boxRightTitle}
          </p>
          <p className="boxes-number m-0">
            {props.profile && props.profile.boxValueRight}
          </p>
        </div>
      </div>
      {props.profile && props.profile.flashCardProfile && (
        <div className="flashCards">
          <Image
            alt="flashCards"
            src={`/img/${props.profile.flashCardProfile}`}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
