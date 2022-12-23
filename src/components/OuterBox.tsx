import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { Button, Form } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks";
import { buildSelector, getBuildById } from "@/store/reducers/build.reducer";
import { useRouter } from "next/router";
import { getUserByEmail, userSelector } from "@/store/reducers/user.reducer";

const OuterBox = (props: any) => {
  const { buildById } = useAppSelector(buildSelector);
  const { userData } = useAppSelector(userSelector);
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.isRefresh) {
      form.resetFields();
      props.setIsRefresh(false);
    }
  }, [props.isRefresh]);

  const handleChange = (event: any) => {
    const { value, id } = event.target;
    const propsId = Number(props.id + 1);
    let BoxData = { sorting_order: id, description: value };
    if (value.length === 150 && !props.arr.includes(propsId) && !props.boxId) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    } else if (
      props.boxId &&
      value.length === 150
      // &&
      // !props.arr.includes(propsId)
    ) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    }
  };
  const userId = buildById?.data?.map((a: any) => a.created_by);
  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100 " style={{ height: "170px" }}>
        {props.visible && (
          <Form form={form} name="formTwo" className="textBoxInner">
            <div className="position-relative position-relative-example">
              <Form.Item name={`message${props.id}`}>
                <TextArea
                  //  value={props?.description}
                  key={props.description ? props.description : ""}
                  maxLength={150}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  defaultValue={props.description ? props.description : ""}
                  onInput={handleChange}
                  id={props.id}
                  onFocus={() => {
                    const data = {
                      id: props.id,
                      boxId: props.boxId,
                      description: props.description,
                    };
                    props.onFocus(data);
                  }}
                  readOnly={
                    props.description &&
                    userId &&
                    userId.length > 0 &&
                    userId[0] != userData.id
                      ? true
                      : false
                  }
                />
              </Form.Item>
              <Form.Item></Form.Item>
              {props.awarenessList &&
                props.awarenessList.length > 0 &&
                props.awarenessList.map((data: any) => {
                  return data.review_type == "inspiration" &&
                    data.sorting_order == props.id ? (
                    <span onClick={() => props.modalDot(props.id)}>
                      <span
                        className="position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-0 start-0 translate-middle inspirationDotBg"
                        onClick={props.Inspiration}
                      >
                        I
                      </span>
                    </span>
                  ) : data.review_type == "acceptance" &&
                    data.sorting_order == props.id ? (
                    <span onClick={() => props.modalDot(props.id)}>
                      <span
                        className="position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-0 start-100 translate-middle acceptDotBg"
                        onClick={props.Acceptance}
                      >
                        A
                      </span>
                    </span>
                  ) : data.review_type == "resistance" &&
                    data.sorting_order == props.id ? (
                    <span onClick={() => props.modalDot(props.id)}>
                      <span
                        className="position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-100 start-100 translate-middle resistanceDotBg"
                        onClick={props.Resistance}
                      >
                        R
                      </span>
                    </span>
                  ) : (
                    []
                  );
                })}
            </div>
          </Form>
        )}
      </div>
    </Col>
  );
};

export default OuterBox;
