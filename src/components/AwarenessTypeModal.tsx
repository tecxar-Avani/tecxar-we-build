import React,{ useState } from 'react'
import { Button, Modal } from 'antd';

const AwarenessTypeModal = (props: any) => {
    const [loading, setLoading] = useState(false);
  
   
  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        props.setOpen(false);
      }, 3000);
    };
  
    const handleCancel = () => {
      props.setOpen(false);
    };

    return(
        <Modal
        open={props.open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )

}
export default AwarenessTypeModal