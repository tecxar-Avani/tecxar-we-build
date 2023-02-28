import { userData, userSelector } from "@/store/reducers/user.reducer";
import styled from "@emotion/styled";
import { Input, Button, Form } from "antd";
import { useAppSelector } from "../hooks";
import Image from "next/image";
import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";
import OuterBox from "./OuterBox";

const TaskList = styled.div`
  display: flex;
`;

const NewBuildBoxes = (props: any) => {
  const { userData } = useAppSelector(userSelector);
  const groupArray =
    props.mergedArray &&
    props.mergedArray.length > 0 &&
    props.mergedArray?.map((merge: any) => merge);
  return (
    <Fragment>
      {props.item && props.item.length > 0
        ? [...Array(Math.ceil(props.item.length / 3))].map((_rows, index) => {
            const subArray = props.item
              .sort((a: any, b: any) => a.id - b.id)
              .slice(index * 3, index * 3 + 3);
            const subArrayFilter =
              subArray?.length > 0 &&
              props.item?.length > 0 &&
              subArray.filter(
                (a: any) => a.id == props.item[props?.item?.length - 1].id
              );
            const blankArray = props?.item?.map((a: any) => a?.message);
            return (
              <div className={`boxesMain`}>
                <div className="h-30 border border-color-25">
                  {props.activeSelection && index == 0 ? (
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
                          className="w-full"
                        >
                          <Input
                            placeholder="type here..."
                            onChange={props.groupTitle}
                          />
                        </Form.Item>
                      </Form>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={`m-0 row px-4 innerBoxMain ${
                    subArray.length > 2 &&
                    !props.activeSelection &&
                    subArrayFilter.length == 0 &&
                    blankArray[0] != "" &&
                    "myCss"
                  } ${props.activeSelection ? "activeSelection" : ""} ${props.isRedo && props.buildId && "myCss"}`}
                >
                  <Droppable
                    droppableId={`${
                      props?.buildById?.data?.length > 0 &&
                      props?.buildById?.data[0]?.created_by == userData?.id &&
                      index
                    }`}
                    direction="horizontal"
                  >
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
                              const filteredIndex = props.boxData.findIndex(
                                (box: any) =>
                                  box.sorting_order === data.sorting_order
                              );
                              if (filteredIndex > -1) {
                                props.boxData[filteredIndex] = data;
                                props.setBoxData([...props.boxData]);
                              } else {
                                props.setBoxData([...props.boxData, data]);
                              }
                            }}
                            description={itemData.message}
                            boxId={itemData.boxId}
                            isRefresh={props.isRefresh}
                            setIsRefresh={props.setIsRefresh}
                            isRedo={props.setIsRedo}
                            setIsRedo={props.setIsRedo}
                            completedTodos={props.completedTodos}
                            activeSelection={props.activeSelection}
                            groupingSelection={props.groupingSelection}
                            groupList={props.groupList}
                            setFormDataOnUndo={(redoData: any) =>
                              props.setFormDataOnUndo(redoData)
                            }
                            redoData={props.redoData}
                            setRedoData={props.setRedoData}
                            dataArrayForRedo={props.dataArrayForRedo}
                            // mergedArrayForRedo={props.mergedArrayForRedo}
                            // isEditSelect={props.isEditSelect}
                            unCheck={props.unCheck}
                            buildId={props.buildId}
                            setUndefinedData={props.setUndefinedData}
                          />
                        ))}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                  {props.buildId ? 
                  <div className="myArrowBottom">
                    <Image
                      layout="fill"
                      width={"100"}
                      src={"/public/red-main.svg"}
                    />
                  </div>
                  : <div></div>
      }
                </div>
              </div>
            );
          })
        : groupArray &&
          groupArray.length > 0 &&
          groupArray.map((data: any, index1: any) => {
            return (
              data &&
              data.length > 0 &&
              [...Array(Math.ceil(data && data.length / 3))].map(
                (_rows, index) => {
                  const subArray: any = data
                    .sort((a: any, b: any) => a.id - b.id)
                    .slice(index * 3, index * 3 + 3);

                  const subArrayFilter =
                    subArray?.length > 0 &&
                    props.notGroupedArray?.length > 0 &&
                    subArray.filter(
                      (a: any) =>
                        a.id ==
                        props.notGroupedArray[
                          props?.notGroupedArray?.length - 1
                        ].id
                    );
                  const groupedDataArray = props.groupedData?.map((b: any) => {
                    return b[b.length - 1].id;
                  });

                  const groupArrayFilter =
                    subArray?.length > 0 &&
                    props.groupedData.length > 0 &&
                    subArray.filter((a: any) => {
                      const data = groupedDataArray.includes(a.id);
                      return data;
                    });
                  return (
                    <div className={`boxesMain`}>
                      <div
                        className={`border border-color-25 ${
                          index == 0 && subArray[0].title && !props.isEditSelect
                            ? "groupHeader"
                            : subArray[0].title && !props.isEditSelect
                            ? "h-30 headerGroup"
                            : props.isEditSelect && index == 0
                            ? "editGroupHeader"
                            : props.isEditSelect && index !== 0
                            ? "headerGroup h-30"
                            : "noneGroup h-30"
                        } ${
                          props.isEditSelect ||
                          (props.activeSelection && index !== 0)
                            ? "hideTitle"
                            : props.activeSelection && index == 0
                            ? "hideTitle1"
                            : ""
                        }`}
                        style={
                          index != 0 ? { background: `${data[0].color}` } : {}
                        }
                      >
                        {index == 0 &&
                        subArray[0].title &&
                        !props.isEditSelect ? (
                          subArray[0].title
                        ) : (props.activeSelection && index == 0) ||
                          (props.isEditSelect && index == 0) ? (
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
                                <Input
                                  placeholder="type here..."
                                  onChange={props.groupTitle}
                                  defaultValue={
                                    props.isEditSelect && subArray[0].title
                                      ? subArray[0].title
                                      : ""
                                  }
                                  onClick={() => {
                                    props.editGroupId(subArray[0].group_id);
                                  }}
                                />
                              </Form.Item>
                            </Form>
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </div>

                      <Row
                        className={`m-0 px-4 innerBoxMain ${
                          props.activeSelection &&
                          !subArray[0].title &&
                          index !== 0
                            ? "activeSelection"
                            : ""
                        } ${
                          subArrayFilter.length == 0 &&
                          groupArrayFilter.length == 0 &&
                          !(subArray.length < 3) &&
                          "myCss"
                        }`}
                      >
                        <Droppable
                          droppableId={`${props?.buildById?.data?.length > 0 &&
                            props?.buildById?.data[0]?.created_by == userData?.id && index1}`}
                          direction="horizontal"
                        >
                          {(provided) => (
                            <TaskList
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{ background: `${data[0].color}` }}
                            >
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
                                      // console.log("data", data);
                                      // const box = props.boxData.find((box) => {
                                      //   console.log(box);
                                      // });
                                      // console.log("box", box);
                                      props.setBoxData([
                                        ...props.boxData,
                                        data,
                                      ]);
                                    }}
                                    description={itemData.message}
                                    boxId={itemData.boxId}
                                    isRefresh={props.isRefresh}
                                    setIsRefresh={props.setIsRefresh}
                                    isRedo={props.setIsRedo}
                                    setIsRedo={props.setIsRedo}
                                    completedTodos={props.completedTodos}
                                    activeSelection={props.activeSelection}
                                    groupingSelection={props.groupingSelection}
                                    groupList={props.groupList}
                                    setFormDataOnUndo={(redoData: any) =>
                                      props.setFormDataOnUndo(redoData)
                                    }
                                    redoData={props.redoData}
                                    setRedoData={props.setRedoData}
                                    dataArrayForRedo={props.dataArrayForRedo}
                                    // mergedArrayForRedo={
                                    //   props.mergedArrayForRedo
                                    // }
                                    // isEditSelect={props.isEditSelect}
                                    unCheck={props.unCheck}
                                    buildId={props.buildId}

                                  />
                                );
                              })}

                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                        <div className="myArrowBottom">
                          <Image
                            layout="fill"
                            width={"100"}
                            src={"/public/red-main.svg"}
                          />
                        </div>
                      </Row>
                    </div>
                  );
                }
              )
            );
          })}
    </Fragment>
  );
};

export default NewBuildBoxes;
