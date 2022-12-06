import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";
import { text } from "node:stream/consumers";

const OuterBox = (props: any) => {
  const [form] = Form.useForm();
  console.log("WWWWWWWWWWWW", props.buildById?.data);
  const handleChange = (event: any) => {
    const { value, id } = event.target;
    const propsId = Number(props.id + 1);
    let BoxData = { sorting_order: id, description: value };

    if (value.length === 150 && !props.arr.includes(propsId)) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    }
  };

  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100 " style={{ height: "170px" }}>
        {props.visible && (
          <Form form={form} name="formTwo" className="textBoxInner">
            <div className="position-relative position-relative-example">
              <TextArea
                name={`message${props.id}`}
                placeholder="Enter text here..."
                maxLength={150}
                autoSize={{ minRows: 5, maxRows: 5 }}
                onInput={handleChange}
                id={props.id}
                onFocus={props.onFocus}
              />
              {props.review == "inspiration" ? (
                <span onClick={props.modalDot}>
                  <span
                    className="position-absolute bg-primary px-2 py-1 rounded-pill text-white top-0 start-0 translate-middle inspirationDotBg"
                    onClick={props.Inspiration}
                  >
                    I
                  </span>
                </span>
              ) : props.acceptanceData &&
                props.acceptanceData.length > 0 &&
                props.id == 1 ? (
                <span onClick={props.modalDot}>
                  <span
                    className="position-absolute px-2 py-1 rounded-pill text-white top-0 start-100 translate-middle acceptDotBg"
                    onClick={props.Acceptance}
                  >
                    A
                  </span>
                </span>
              ) : props.review == "resistance" ? (
                <span onClick={props.modalDot}>
                  <span
                    className="position-absolute bg-warning px-2 py-1 rounded-pill text-white top-100 start-100 translate-middle resistanceDotBg"
                    onClick={props.Resistance}
                  >
                    R
                  </span>
                </span>
              ) : (
                []
              )}
            </div>
          </Form>
        )}
      </div>
    </Col>
  );
};

export default OuterBox;
