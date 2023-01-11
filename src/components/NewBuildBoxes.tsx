import styled from "@emotion/styled";
import { Input, Button, Form } from "antd";
import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";
import OuterBox from "./OuterBox";

const TaskList = styled.div`
  display: flex;
`;

const NewBuildBoxes = (props: any) => {
  const groupArray =
    props.mergedArray &&
    props.mergedArray.length > 0 &&
    props.mergedArray?.map((merge: any) => merge);

  // groupArray&& groupArray.length>0 && groupArray.shift()
  return (
    <Fragment>
      {props.item && props.item.length > 0
        ? [...Array(Math.ceil(props.item.length / 3))].map((_rows, index) => {
            const subArray = props.item
              .sort((a: any, b: any) => a.id - b.id)
              .slice(index * 3, index * 3 + 3);

            return (
              <div className={`boxesMain`}>
                <div className="h-30 border border-color-25">
                  {props.activeSelection ? (
                    <Fragment>
                      <Form
                        name="basic"
                        onFinish={props.submitGroup}
                        className="d-flex group"
                      >
                        <Form.Item
                          name="groupName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your Group name!",
                            },
                          ]}
                        >
                          <Input placeholder="type here..." />
                        </Form.Item>
                        <Form.Item>
                          <Button htmlType="submit">Submit</Button>
                        </Form.Item>
                      </Form>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <Row className="m-0 px-4 innerBoxMain">
                  <Droppable droppableId={`${index}`} direction="horizontal">
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {subArray.map((itemData: any, index: string) => (
                          <OuterBox
                            index={itemData.id}
                            key={index}
                            id={itemData.id}
                            counter={props.counter}
                            arr={props.arr}
                            onFocus={(data: any) => props.onFocus(data)}
                            visible={props.arr.includes(itemData.id)}
                            awarenessList={props.awarenessList}
                            Acceptance={props.Acceptance}
                            Inspiration={props.Inspiration}
                            Resistance={props.Resistance}
                            modalDot={(id: any) => props.modalDot(id)}
                            responseCallback={(value: number) =>
                              props.setArr([...props.arr, value])
                            }
                            setBoxData={(data: any) => {
                              props.setBoxData([...props.boxData, data]);
                            }}
                            description={itemData.message}
                            boxId={itemData.boxId}
                            isRefresh={props.isRefresh}
                            setIsRefresh={props.setIsRefresh}
                            completedTodos={props.completedTodos}
                            activeSelection={props.activeSelection}
                            groupingSelection={props.groupingSelection}
                          />
                        ))}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                </Row>
              </div>
            );
          })
        : groupArray &&
          groupArray.length > 0 &&
          groupArray.map((data: any) => {
            return (
              data &&
              data.length > 0 &&
              [...Array(Math.ceil(data && data.length / 3))].map(
                (_rows, index) => {
                  const arr = [...groupArray];
                  const subArray = data
                    .sort((a: any, b: any) => a.id - b.id)
                    .slice(index * 3, index * 3 + 3);
                  return (
                    <Droppable droppableId={`${index}`} direction="horizontal">
                      {(provided) => (
                        <Fragment>
                          <div
                            className={`boxesMain`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <div className="h-30 border border-color-25">
                              {props.activeSelection ? (
                                <Fragment>
                                  <Form
                                    name="basic"
                                    onFinish={props.submitGroup}
                                    className="d-flex group"
                                  >
                                    <Form.Item
                                      name="groupName"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please input your Group name!",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="type here..." />
                                    </Form.Item>
                                    <Form.Item>
                                      <Button htmlType="submit">Submit</Button>
                                    </Form.Item>
                                  </Form>
                                </Fragment>
                              ) : (
                                ""
                              )}
                            </div>
                            <Row className="m-0 px-4 innerBoxMain">
                              {subArray.map((itemData: any, index: string) => {
                                return (
                                  <OuterBox
                                    index={itemData.id}
                                    key={index}
                                    id={itemData.id}
                                    counter={props.counter}
                                    arr={props.arr}
                                    onFocus={(data: any) => props.onFocus(data)}
                                    visible={props.arr.includes(itemData.id)}
                                    awarenessList={props.awarenessList}
                                    Acceptance={props.Acceptance}
                                    Inspiration={props.Inspiration}
                                    Resistance={props.Resistance}
                                    modalDot={(id: any) => props.modalDot(id)}
                                    responseCallback={(value: number) =>
                                      props.setArr([...props.arr, value])
                                    }
                                    setBoxData={(data: any) => {
                                      props.setBoxData([
                                        ...props.boxData,
                                        data,
                                      ]);
                                    }}
                                    description={itemData.message}
                                    boxId={itemData.boxId}
                                    isRefresh={props.isRefresh}
                                    setIsRefresh={props.setIsRefresh}
                                    completedTodos={props.completedTodos}
                                    activeSelection={props.activeSelection}
                                    groupingSelection={props.groupingSelection}
                                  />
                                );
                              })}
                            </Row>
                          </div>
                          {provided.placeholder}
                        </Fragment>
                      )}
                    </Droppable>
                  );
                }
              )
            );
          })}
    </Fragment>
  );
};

export default NewBuildBoxes;
