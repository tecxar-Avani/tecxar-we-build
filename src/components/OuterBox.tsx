import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Col } from "react-bootstrap";
import { Form } from "antd";
import { text } from "node:stream/consumers";

const OuterBox = (props: any) => {
  const [form] = Form.useForm();

  const handleChange = (event: any) => {
   const { value,id } = event.target;
   const propsId= Number(props.id + 1);
   let BoxData = {id , value}

   if (value.length === 150 && !props.arr.includes(propsId)) {
     props.responseCallback(propsId);
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
           
          }
      </div>
    </Col>
  );
};

export default OuterBox;
