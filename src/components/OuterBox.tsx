import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";
import { text } from "node:stream/consumers";

const OuterBox = (props: any) => {
  const [form] = Form.useForm();

  const handleChange = (event: any) => {
    let textData = event.target.value;
   let textBoxId = event.target.id;
   let BoxData = {textBoxId , textData}
    const value = props.id == 20 ? props.id + 2 : props.id + 1;
    if (props.arr.length > 20) {
   
      const data = { id: props.arr.length + 1, message: "" };
      props.setNum(data);
    }
  

    if (props.id > 20) {
      if (textData.length + 1 == 3 && !props.arr.includes(value)) {
        props.responseCallback(value,BoxData);
      }
    } else {
      if (textData.length == 3 && !props.arr.includes(value)) {
        props.responseCallback(value,BoxData);
        // if (props.arr.length == 21) {
        //   console.log("^^^^^^^^^^^^^^^^^^^^");
        //   setArr([...arr, arr.length + 1]);
        //   console.log("^^^^^^^^^^^^^^^^^^^^", arr);
        // }
      }
    }
  };

 
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
                      placeholder="Enter text here..."
                      maxLength={3}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      onInput={handleChange}
                      id={props.id}
                      onFocus={props.onFocus}
                    />
                  { props.review == "inspiration" ? (<span className="position-absolute bg-primary px-2 py-1 rounded-pill text-white top-0 start-0 translate-middle">
              I
            </span>) : props.acceptanceData && props.acceptanceData.length>0 && props.id == 1 ?(<span className="position-absolute bg-danger px-2 py-1 rounded-pill text-white top-0 start-100 translate-middle" onClick={props.modalDot}>
              A
            </span>): props.review == "resistance" ?(<span className="position-absolute bg-warning px-2 py-1 rounded-pill text-white top-100 start-100 translate-middle">
              R
            </span>):[]
          
              }
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
