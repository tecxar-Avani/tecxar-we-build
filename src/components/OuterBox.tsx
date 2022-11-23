import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }
const numOfFields = 3;



const OuterBox = (props: any) => {
  const handleChange = (event: any) => {
    let textData = event.target.value;
    if (textData.length > 100) {
      textData = textData.substring(0, 100);
      alert("No more text can be entered");
    }
  };
  const chageInput = (e: { target: { maxLength: any; value: any; id: any; }; }) => {
    const { maxLength, value, id } = e.target;
    const [fieldName, fieldIndex] = id;
  
    // Check if they hit the max character length
    // if (value.length >= maxLength) {
      
      
    //     // Get the next input field
    //     const nextSibling = document.querySelector(
    //       `Input.Textarea[id=${parseInt(fieldIndex, 10) + 1}]`
    //     );
        
    //     // If found, focus the next field
    //     if (nextSibling !== null) {
    //       nextSibling.focus();
    //     }
    //   }
      
    }
  
  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100">
        <Form name="formTwo" className="textBoxInner">
          <TextArea
           // name={`message${props.id}`}
            placeholder=""
            //defaultValue={props.boxData}
            // value={props.boxData}
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={15}
            //onChange={chageInput}
            //id={props.id}
            
          />
        </Form>
      </div>
    </Col>
  );
};

export default OuterBox;
