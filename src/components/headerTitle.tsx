import React from "react";
// interface IVideosCard {
//   VideoCardData: any;
// }

const HeaderTitle = (props: any) => {
  return (
    <div className={`${props.className} title`}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default HeaderTitle;
