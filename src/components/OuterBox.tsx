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
  const chageInput = (e: {
    target: { maxLength: any; value: any; id: any };
  }) => {
    const { maxLength, value, id } = e.target;
    const [fieldName, fieldIndex] = id;

    if (value.length >= maxLength) {
      const nextSibling = parseInt(id) + 1;
      if (nextSibling == null) {
        return (
          <>
            <Form
              name="formTwo"
              className="textBoxInner"
              style={{ display: "none" }}
            >
              <TextArea
                name={`message${props.id}`}
                placeholder=""
                defaultValue={props.boxData}
                //value={props.boxData}
                autoSize={{ minRows: 5, maxRows: 5 }}
                maxLength={15}
                onChange={chageInput}
                id={props.id}
              />
            </Form>
          </>
        );
      } else {
        <Form
          name="formTwo"
          className="textBoxInner"
          style={{ display: "block" }}
        >
          <TextArea
            name={`message${props.id}`}
            placeholder=""
            defaultValue={props.boxData}
            //value={props.boxData}
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={15}
            onChange={chageInput}
            id={props.id}
          />
        </Form>;
      }
    }
  };

  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100">
        <Form name="formTwo" className="textBoxInner">
          <div className="position-relative position-relative-example">
            <TextArea
              name={`message${props.id}`}
              placeholder=""
              defaultValue={props.boxData}
              //value={props.boxData}
              autoSize={{ minRows: 5, maxRows: 5 }}
              maxLength={15}
              onChange={chageInput}
              id={props.id}
            />
            <span className="position-absolute bg-primary px-2 py-1 rounded-pill text-white top-0 start-0 translate-middle">
              I
            </span>
            <span className="position-absolute bg-primary px-2 py-1 rounded-pill text-white top-0 start-100 translate-middle">
              A
            </span>
            <span className="position-absolute bg-primary px-2 py-1 rounded-pill text-white top-100 start-100 translate-middle">
              R
            </span>
          </div>
        </Form>
      </div>
    </Col>
  );
};

export default OuterBox;
