import styled from "@emotion/styled";
import { Input, Button, Form } from "antd";
import Image from "next/image";
import React, { Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";
import OuterBox from "./OuterBox";

const TaskList = styled.div`
  display: flex;
`;

const NewBuildBoxes = (props: any) => {
  
  const group_Build_id = props?.groupList?.map((a:any) => a.title)
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
                          className="w-full"
                        >
                          <Input placeholder="type here..." onChange={props.groupTitle}/>
                        </Form.Item>
                       
                      </Form>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
                <div className={`m-0 row px-4 innerBoxMain ${subArray.length > 2 && !props.activeSelection && 'myCss'} ${props.activeSelection ? "activeSelection" : ""}`}>
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
                            groupList={props.groupList}
                          />
                        ))}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                  <div className="myArrowBottom">
                    <Image layout="fill" width={"100"} src={"/public/red-main.svg"} />
                  </div>
                </div>
              </div>
            );
          })
        : groupArray &&
          groupArray.length > 0 &&
          groupArray.map((data: any) => {
            const dataArrow = data?.length>0 && data?.map((a:any)=>{
              return a.id
              
            })

            
            return (
              data &&
              data.length > 0 &&
              [...Array(Math.ceil(data && data.length / 3))].map(
                (_rows, index) => {
                  const subArray:any = data
                    .sort((a: any, b: any) => a.id - b.id)
                    .slice(index * 3, index * 3 + 3);
              
const subArrayFilter = subArray?.length > 0 && ((props.notGroupedArray?.length > 0 && subArray.filter((a:any)=>a.id ==props.notGroupedArray[props?.notGroupedArray?.length-1].id)))
const groupArrayFilter = subArray?.length > 0 && ((props.groupedData.length>0 && subArray.filter((a:any) =>a.id == props.groupedData?.map((a:any) => {return a[a.length - 1].id}))))

return (
                    <div className={`boxesMain`}>
                      <div className={`h-30 border border-color-25 groupHeader hideTitle}`}>
                        {index == 0 && subArray[0].title ? subArray[0].title  : 
                        props.activeSelection ? (
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
                                <Input placeholder="type here..." onChange={props.groupTitle}/>
                              </Form.Item>
                             
                            </Form>
                          </Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                     
                      <Row className={`m-0 px-4 innerBoxMain ${props.activeSelection ? "activeSelection" : ""} ${subArrayFilter.length==0 && groupArrayFilter.length == 0 && !(subArray.length < 3) && !props.activeSelection && 'myCss'}`}>
                        <Droppable
                          droppableId={`${index}`}
                          direction="horizontal"
                        >
                          {(provided) => (
                            <TaskList
                              ref={provided.innerRef}
                              {...provided.droppableProps}
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
                                    groupList={props.groupList}
                                  />
                                );
                              })}

                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                        <div className="myArrowBottom">
                    <Image layout="fill" width={"100"} src={"/public/red-main.svg"} />
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
