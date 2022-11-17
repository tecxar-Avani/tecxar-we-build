import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Link from "next/link";
import React from "react";
import { Button, Card, CardImg, Col, Row } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const OuterBox = (props: any) => {
  
    return (
      
        <>
        {props.outer && props.outer.map((out: {length: any;}) => {return(
          
                <div className="outerbox">
                    <div>
                        {props.inner && props.inner.length > 0 && (
                            <TextArea
                                //value={value}
                                //onChange={e => setValue(e.target.value)}
                                placeholder=""
                                autoSize={{ minRows: 5, maxRows: 5 }}
                                maxLength={150}
                                className="innerBox"
                            />
                        )}
                    </div>
                </div>
                       ); })
        }     
        </>
    );
};

export default OuterBox;
