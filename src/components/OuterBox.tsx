import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";

const OuterBox = (props: any) => {
  const [form] = Form.useForm();

  const handleChange = (event: any) => {
    let textData = event.target.value;
    const value = props.id == 20 ? props.id + 2 : props.id + 1;
    console.log("props.id", props.id);
    if (props.arr.length > 20) {
      console.log("arr.length", props.arr.length);
      const data = { id: props.arr.length + 1, message: "" };
      props.setNum(data);
    }
    if (props.id > 20) {
      if (textData.length + 1 == 3 && !props.arr.includes(value)) {
        props.responseCallback(value);
      }
    } else {
      if (textData.length == 3 && !props.arr.includes(value)) {
        props.responseCallback(value);
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
                      defaultValue={props.boxData}
                      maxLength={3}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                      onInput={handleChange}
                      id={props.id}
                      onFocus={props.onFocus}
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
