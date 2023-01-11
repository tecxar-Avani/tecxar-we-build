import TextArea from "antd/lib/input/TextArea";
import React, { Fragment, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Checkbox, Form } from "antd";
import { useAppSelector } from "../hooks";
import { buildSelector } from "@/store/reducers/build.reducer";
import { userSelector } from "@/store/reducers/user.reducer";
import { Draggable } from "react-beautiful-dnd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const OuterBox = (props: any) => {
  const { buildById } = useAppSelector(buildSelector);
  const { userData } = useAppSelector(userSelector);
  const [form] = Form.useForm();
  let BoxData: any;
  useEffect(() => {
    if (props.isRefresh) {
      form.resetFields();
      props.setIsRefresh(false);
    }
  }, [props.isRefresh]);
  const handleChange = (event: any) => {
    const { value, id } = event.target;
    const propsId = Number(props.id + 1);
    BoxData = { sorting_order: id, description: value };
    if (value.length === 150 && !props.arr.includes(propsId) && !props.boxId) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    } else if (props.boxId && value.length === 150) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    }
  };
  const userId = buildById?.data?.map((a: any) => a.created_by);
  const boxIdForArrow = Number(props.id) % 3 == 0;
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    background: isDragging ? "#D9DDDC" : "",
    // position: "fixed",
    ...draggableStyle,
  });
  return (
    <Fragment>
      <Col sm={4} className="p-0 side-Arrow position-relative">
        <Draggable
          key={props.id}
          draggableId={props.id.toString()}
          index={props.index}
        >
          {(provided, snapshot) => (
            <div
              className={`${
                props.activeSelection ? "innerBoxsSelected" : "innerBoxs"
              } p-3`}
              // style={{ height: "200px" }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {" "}
              <Checkbox
                className={`${
                  props.activeSelection ? "groupSelection" : "groupSelectionNot"
                }`}
                value={props.boxId}
                //  checked={check}
                onChange={props.groupingSelection}
              >
                <Form form={form} name="formTwo" className="textBoxInner">
                  {props.visible && (
                    <Fragment>
                      <div
                        className={`position-relative position-relative-example dragHover ${
                          boxIdForArrow
                            ? "arrow-big-red"
                            : props.arr.length == props.id
                            ? "arrow-red"
                            : ""
                        }`}
                      >
                        <Form.Item
                          name={`message${props.id}`}
                          noStyle={false}
                          className={`position-relative position-relative-example `}
                        >
                          <TextArea
                            //  value={props?.description}
                            key={props.description ? props.description : ""}
                            maxLength={150}
                            autoSize={{ minRows: 7, maxRows: 7 }}
                            defaultValue={
                              props.description ? props.description : ""
                            }
                            onChange={handleChange}
                            id={props.id}
                            className="textFontSize"
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
                    </Fragment>
                  )}
                </Form>
              </Checkbox>
            </div>
          )}
        </Draggable>
      </Col>
    </Fragment>
  );
};

export default OuterBox;
