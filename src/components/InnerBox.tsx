import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";

// interface IVideosCard {
//   VideoCardData: any;
// }
const numOfFields = 3;

const InnerBox = (props: any) => {
  const [form] = Form.useForm();
  console.log("inner box", props);
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
            <Form name="formTwo" className="textBoxInnerNone">
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
        <Form name="formTwo" className="textBoxInnerBlock">
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
    <Form form={form} name="formTwo" className="textBoxInner">
      <div className="position-relative position-relative-example">
        <TextArea
          name={`message${props.id}`}
          placeholder=""
          defaultValue={props.boxData}
          //value={props.boxData}
          autoSize={{ minRows: 5, maxRows: 5 }}
          // maxLength={15}
          onChange={handleChange}
          id={props.id}
        />
      </div>
    </Form>
  );
};

export default InnerBox;
