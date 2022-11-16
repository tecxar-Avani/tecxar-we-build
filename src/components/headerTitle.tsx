import React from "react";
// interface IVideosCard {
//   VideoCardData: any;
// }

const HeaderTitle = (props: any) => {
  return (
    <div className={`${props.className} title mx-3`}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default HeaderTitle;
