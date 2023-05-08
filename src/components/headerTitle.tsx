import React from "react";
// interface IVideosCard {
//   VideoCardData: any;
// }

const HeaderTitle = (props: any) => {
  return (
    <div
      className={` ${
        props.title ==
          "Lucky you! Nothing exists for this URL. To start your build, click the video below"
          ? "centerHeader"
          : props.className
      } mx-2 fixTitle`}
    >
      <h1>{props.title}</h1>
    </div>
  );
};

export default HeaderTitle;
