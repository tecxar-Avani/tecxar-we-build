import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

// interface IVideosCard {
//   VideoCardData: any;
// }

const OuterBox = (props: any) => {
  const [value, setValue] = useState("");
  const [changeCalss, setChangeCalss] = useState(false);

  const handleChange = (event: any) => {
    const shouldSetValue = value.length < 10;

    if (value.length <= 10) {
      setValue(event.target.value);
      setChangeCalss(true);
    }
  };

  const charAlert = (event: any) => {
    var textField = document.formTwo.text;

    if (textField.value.length > 5) {
      /* must be > 5, not == 5 or else the substring statement on the next line will cause the function to run again if the user dismisses the alert by pressing the 'enter' key rather than clicking 'OK'. */

      textField.value = textField.value.substring(0, 5);
      // set field's value equal to first five characters.

      textField.blur();
      /* move cursor out of form element to keep it from placing itself at position zero, causing an overwrite of the first character */

      alert("No more text can be entered");
    }
  };
  //   console.log("value", value);
  return (
    <Col sm={4} className="p-0">
      <div className="innerBoxs p-3 w-100">
        <Form name="formTwo">
          <TextArea
            name="text"
            //value={value}
            //onChange={e => setValue(e.target.value)}
            placeholder=""
            autoSize={{ minRows: 5, maxRows: 5 }}
            maxLength={15} 
            //   value={model.ServiceDescription}
            // onChange={handleChange}
            // onKeyDown={charAlert()}
            // onKeyDown={}
            //   onKeyUp={(e) => {
            //     console.log();
            //   }}
          />
        </Form>
      </div>
    </Col>
  );
};

export default OuterBox;
