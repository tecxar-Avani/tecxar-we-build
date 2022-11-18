import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const OuterBox = (props: any) => {
  const handleChange = (event: any) => {
    let textData = event.target.value;
    if (textData.length > 100) {
      textData = textData.substring(0, 100);
      alert("No more text can be entered");
    }
  };

  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100">
        <Form name="formTwo">
          <TextArea
            name={`message${props.id}`}
            placeholder=""
            defaultValue={props.boxData}
            // value={props.boxData}
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={15}
            onChange={handleChange}
          />
        </Form>
      </div>
    </Col>
  );
};

export default OuterBox;
