import TextArea from "antd/lib/input/TextArea";
import React, { Fragment, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Checkbox, Form } from "antd";
import Image from "next/image";
import { useAppSelector } from "../hooks";
import { buildSelector } from "@/store/reducers/build.reducer";
import { userSelector } from "@/store/reducers/user.reducer";
import { Draggable } from "react-beautiful-dnd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import DisabledContext from "antd/lib/config-provider/DisabledContext";
import _ from "lodash";
import lodash from "lodash";
import { DiffieHellman } from "crypto";

const OuterBox = (props: any) => {
  const { buildById } = useAppSelector(buildSelector);
  const { userData } = useAppSelector(userSelector);
  const [boxDataForRedo, setBoxDataForRedo] = useState<any>();
  const [redoValue, setRedoValue] = useState<any>([]);
  const [checked, setChecked] = useState(false);

  const [form] = Form.useForm();
  var redoArray = [];
  var BoxData: any;
  const handleChange = (event: any,nextId:any) => {
    const { value, id } = event.target;
    value.length > 0 && props.setTextEnter(true)
    const propsId = Number(props.id + 1);
    BoxData = { sorting_order: id, description: value };
let wsRegex = /^\s+|\s+$/g; 
let result = value.replace(wsRegex, "");
    if (BoxData.description) {
      setBoxDataForRedo(BoxData);
      const val = boxDataForRedo != undefined && boxDataForRedo;
      if (val) {
        setRedoValue([...redoValue, val]);
        const a = lodash.concat(arrValue, val);

        props.setRedoData([...props.redoData, val]);
      }
    }

    props.setBoxData(BoxData);
    if (result.length > 0 && !props.arr.includes(propsId) && !props.boxId) {
      props.responseCallback(propsId, value, id);
    } else if (props.boxId && result.length === 150) {
      props.setBoxData(BoxData);
      props.responseCallback(propsId, value, id);
    }
    if(nextId != null){
       document.getElementById(nextId)?.focus()
    }
  };
  const userId = buildById?.data?.map((a: any) => a.created_by);
  const boxIdForArrow = Number(props.id) % 3 == 0;
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // background: isDragging ? "#D9DDDC" : "",
    // position: "fixed",
    ...draggableStyle,
  });

  let arrValue: Array<any> = [];

  useEffect(() => {
    if (props.isRefresh) {
      // const mergedArray = props.mergedArrayForRedo.map((a: any) =>
      //   a.map((b: any) => {
      //     return { id: b.id, message: b.message, boxId: a.boxId };
      //   })
      // );
      const redoDataArray: any = _.groupBy(props.redoData, "sorting_order");
      const objArr = _.values(redoDataArray);
      const redoLastValue = objArr.map((a: any) => _.last(a));
      const arr1 = props.dataArrayForRedo.map((a: any) => {
        return { id: a.id, message: a.message, boxId: a.boxId };
      });

      const arr2 = redoLastValue.map((a: any) => {
        return { id: parseInt(a.sorting_order), message: a.description };
      });
      const dataArrayUn = _.unionWith(arr2, arr1, _.isEqual);
      const uniqueArrayUn = _.uniqBy(dataArrayUn, "id");
      if (props?.mergedArrayForRedo) {
        // const arr3 = mergedArray.map((a: any) => {
        //   const uniqueArrayMerge = a.map((item: any) => {
        //     const findItem = arr2.find((a2Item) => a2Item.id === item.id);
        //     if (findItem) {
        //       item.message = findItem.message;
        //     }
        //     return item;
        //   });

        //   return uniqueArrayMerge;
        // });
        // const uniqueArrayMerge = _.uniqBy(arr3, 'id');
        // props.setIsRefresh(false, arr3);
        form.resetFields();
      } else {
        if(Number.isNaN(props.buildId)){
          props.setUndefinedData(false, uniqueArrayUn);
        }else{
          const dataArray = _.unionWith(arr2, arr1, _.isEqual);
          const uniqueArray = _.uniqBy(dataArray, "id");
          props.setIsRefresh(false, uniqueArray);
        }
      
      }
      form.resetFields();
    }
  }, [props.isRefresh]);
  // redoArray.push(boxDataForRedo)
  useEffect(() => {
    if (props.isRedo) {
      props.setFormDataOnUndo(boxDataForRedo);
    }
    props.setIsRedo(false);
  }, [props.isRedo]);
  const group_Build_id = props?.groupList?.map((a: any) => a.id);
  const groupById: any = _.groupBy(props.groupList, "group_id");
  const objArrrr = _.values(groupById);
  const groupedData =
    objArrrr.length > 0 &&
    objArrrr?.map((a: any) =>
      a.map((b: any) => {
        return {
          sorting_order: b.id,
          group_id: b.group_id,
          boxId: b.boxId,
          build_id: b.build_id,
        };
      })
    );
  // const dataOfGroup = groupedData.length > 0 && groupedData.map((b:any) => {return {"sorting_order":b.id,"group_id":b.group_id,"boxId":b.boxId,"build_id":b.build_id}})
  const checkedBox = (e: { target: { checked: any } }) => {
    props.activeSelection &&
    setChecked(e.target.checked);
  };
  useEffect(() => {
    props.unCheck && setChecked(false);
  }, [props.unCheck]);
  return (
    <Fragment>
      <Col
        sm={4}
        className={`p-0 position-relative ${
          props.id && props.boxId ? "side-Arrow" : ""
        }`}
      >
        {/* <Draggable
          key={props.id}
          draggableId={props.id.toString()}
          index={props.index}
        >
          {(provided, snapshot) => ( */}
        <div
          className={`${
            props.activeSelection ? "innerBoxsSelected" : "innerBoxs"
          } p-3`}
          // style={{ height: "200px" }}
          // {...provided.draggableProps}
          // {...provided.dragHandleProps}
          // ref={provided.innerRef}
          // style={getItemStyle(
          //   snapshot.isDragging,
          //   provided.draggableProps.style
          // )}
        >
          <Draggable
            key={props.id}
            draggableId={props?.id?.toString()}
            index={props.index}
          >
            {(provided, snapshot) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Checkbox
                  className={`${
                    props.activeSelection || props.isEditSelect
                      ? "groupSelection"
                      : "groupSelectionNot"
                  } ${
                    group_Build_id?.includes(props.id) &&
                    props.activeSelection &&
                    !props.isEditSelect &&
                    "dis"
                  }`}
                  disabled={
                    group_Build_id?.includes(props.id) &&
                    props.activeSelection &&
                    !props.isEditSelect &&
                    true
                  }
                  value={props.boxId}
                  onClick={props.groupingSelection}
                  onChange={checkedBox}
                  defaultChecked={
                    !props.isEditSelect
                      ? group_Build_id?.includes(props.id)
                      : null
                  }
                  //  {filteredArray ? indeterminate : []}
                >
                  <Form form={form} name="formTwo" className="textBoxInner">
                    {props.visible && (
                      <Fragment>
                        <div
                          className={`position-relative position-relative-example dragHover ${
                            boxIdForArrow
                              ? ""
                              : props.arr.length == props.id
                              ? "arrow-red"
                              : ""
                          }`}
                        >
                          <Form.Item
                            name={`message${props.id}`}
                            noStyle={false}
                            className={`position-relative position-relative-example textfont`}
                            // rules={[{pattern: new RegExp(/^/S+$/i),message: "No Space Allowed"}]}
                            required
                          >
                            <TextArea
                              //  value={props?.description}
                              key={props.description ? props.description : ""}
                              maxLength={150}
                              autoSize={{ minRows: 7, maxRows: 7 }}
                              defaultValue={
                                props.description ? props.description : ""
                              }
                              //onInput for add new boxes properly
                              // onChange={}
                              // onInput={handleChange}
                              onPressEnter={(e) => {handleChange(e,`${props.id + 1}`)}}
                              // onMouseEnter={handleChange}
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
                              style={checked ? { background: "#e7edf3" } : {}}
                              name={`${props.id}`}
                            />
                          </Form.Item>

                          {props.awarenessList &&
                            props.awarenessList.length > 0 &&
                            props.awarenessList.map((data: any) => {
                              return data.review_type == "inspiration" &&
                                data.sorting_order == props.id ? (
                                <span onClick={() => props.modalDot(props.id)}>
                                  <span
                                    className="dotSize position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-0 start-0 translate-middle inspirationDotBg"
                                    onClick={props.Inspiration}
                                  >
                                    I
                                  </span>
                                </span>
                              ) : data.review_type == "acceptance" &&
                                data.sorting_order == props.id ? (
                                <span onClick={() => props.modalDot(props.id)}>
                                  <span
                                    className="dotSize position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-0 start-100 translate-middle acceptDotBg"
                                    onClick={props.Acceptance}
                                  >
                                    A
                                  </span>
                                </span>
                              ) : data.review_type == "resistance" &&
                                data.sorting_order == props.id ? (
                                <span onClick={() => props.modalDot(props.id)}>
                                  <span
                                    className="dotSize position-absolute cursor-pointer px-2 py-1 rounded-pill text-white top-100 start-100 translate-middle resistanceDotBg"
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
        </div>
        {/* //   )}
        // </Draggable> */}
        {props.boxId && (
          <div className="arrowRight">
            <Image layout="fill" width={"100"} src={"/public/redArrow.svg"} />
          </div>
        )}
      </Col>
    </Fragment>
  );
};

export default OuterBox;
