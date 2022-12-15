import React from "react";
// interface IVideosCard {
//   VideoCardData: any;
// }

const HeaderTitle = (props: any) => {
  console.log("dddddddd",props)
  return (
    <div className={` ${props.title == "Lucky you! Nothing exists for this URL. To start your build, click the video below" && "We do not have anything matching your search. Please try another word. Otherwise, check out existing builds below" ? "centerHeader" : props.className} title mx-3`}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default HeaderTitle;
