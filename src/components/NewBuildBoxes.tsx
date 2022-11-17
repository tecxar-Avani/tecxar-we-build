import React, { useState } from "react";
import AwarenessModal from "./AwarenessModal";

import OuterBox from "./OuterBox";
import Ractangle from "./Ractangle";
// interface IVideosCard {
//   VideoCardData: any;
// }
const NewBuildBoxes = (props: any) => {
  return (
    <>
    {props.boxes &&  props.boxes.length > 0 &&  props.boxes[0].data && (
    <div className="mt-3 mx-4">
    <div className=" ms-3">
      <Ractangle ractBox={props.ract}/>
      <div className="ms-4 d-flex">
        <OuterBox outer={props.outBox} inner={props.inbox} setAwarenessModal={props.setAwarenessModal}/>
      </div>
    </div>
    
    
    
    </div>
    )}
    </>
  );
};

export default NewBuildBoxes;
