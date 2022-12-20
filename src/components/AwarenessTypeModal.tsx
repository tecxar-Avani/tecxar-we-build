import React from 'react'
import { Button, Modal } from 'antd';

const AwarenessTypeModal = (props: any) => {
  
    return(
        <Modal
        open={props.open}
        title={props.title}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button key="submit" type="primary" loading={props.loading} onClick={props.handleOk}>
           {props.btn}
          </Button>,
        ]}
        className={`awarenessDotModal ${props.className}`}
       bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
      >
      <div>{props.content(props.title)}</div>
      </Modal>
    )

}
export default AwarenessTypeModal