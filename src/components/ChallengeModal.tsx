import React,{ useState } from 'react'
import { Button, Modal } from 'antd';

const ChallengeModal = (props: any) => {
    return(
        <Modal
        open={props.challengeModal}
        title={props.title}
        onOk={props.handleOk}
        onCancel={props.setChallengeModal}
        footer={[
          <Button key="submit" type="primary" loading={props.loading} onClick={props.handleOk}>
           {props.btn}
          </Button>,
        ]}
        className={`awarenessTypeModal awarenessDotModal ${props.className}`}
       bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
      >
      <div>{props.content()}</div>
      </Modal>
    )

}
export default ChallengeModal