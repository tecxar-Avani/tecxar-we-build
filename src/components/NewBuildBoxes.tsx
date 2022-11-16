import React, { useState } from "react";
import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";
// interface IVideosCard {
//   VideoCardData: any;
// }


const NewBuildBoxes = (props: any) => {
  return (
    <div className="mt-3 mx-4">
    <div className=" ms-3">
      <Ractangle />
      <div className="ms-4 d-flex">
        <OuterBox />
        <OuterBox />
        <OuterBox />
      </div>
    </div>
    <div className=" ms-3">
      <Ractangle />
      <div className="ms-4 d-flex" >
        <OuterBox />
        <OuterBox />
        <OuterBox />
      </div>
    </div>
    <div className=" ms-3">
      <Ractangle />
      <div className="ms-4 d-flex">
        <OuterBox />
        <OuterBox />
        <OuterBox />
      </div>
    </div>
    
    </div>
  );
};

export default NewBuildBoxes;
