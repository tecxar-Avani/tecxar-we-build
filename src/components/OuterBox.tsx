import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";
import InnerBox from "./InnerBox";

// interface IVideosCard {
//   VideoCardData: any;
// }
const numOfFields = 3;

const OuterBox = (props: any) => {
  const [form] = Form.useForm();

  const handleChange = (event: any) => {
    let textData = event.target.value;
    if (textData.length == 20) {
      const value = props.id + 1;
      props.responseCallback(value);
    }
  };
  // const chageInput = (e: {
  //   target: { maxLength: any; value: any; id: any };
  // }) => {
  //   const { maxLength, value, id } = e.target;
  //   const [fieldName, fieldIndex] = id;

  //   if (value.length >= maxLength) {
  //     const nextSibling = parseInt(id) + 1;
  //     if (nextSibling == null) {
  //       return (
  //         <>
  //           <Form name="formTwo" className="textBoxInnerNone">
  //             <TextArea
  //               name={`message${props.id}`}
  //               placeholder=""
  //               defaultValue={props.boxData}
  //               //value={props.boxData}
  //               autoSize={{ minRows: 5, maxRows: 5 }}
  //               maxLength={15}
  //               onChange={chageInput}
  //               id={props.id}
  //             />
  //           </Form>
  //         </>
  //       );
  //     } else {
  //       <Form name="formTwo" className="textBoxInnerBlock">
  //         <TextArea
  //           name={`message${props.id}`}
  //           placeholder=""
  //           defaultValue={props.boxData}
  //           //value={props.boxData}
  //           autoSize={{ minRows: 5, maxRows: 5 }}
  //           //maxLength={15}
  //           onChange={handleChange}
  //           id={props.id}
  //         />
  //       </Form>;
  //     }
  //   }
  // };

  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100 " style={{ height: "170px" }}>
        {props.arr &&
          props.arr.map((ar: any) => {
            return (
               props.id == ar && (
                <Form form={form} name="formTwo" className="textBoxInner">
                  <div className="position-relative position-relative-example">
                    <TextArea
                      name={`message${props.id}`}
                      placeholder=""
                      defaultValue={props.boxData}
                      maxLength={20}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      onInput={handleChange}
                      id={props.id}
                    />
                  </div>
                </Form>
              )
            );
          })}
      </div>
    </Col>
  );
};

export default OuterBox;
