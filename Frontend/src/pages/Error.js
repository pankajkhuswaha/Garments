import React from 'react'
import { Result } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
export default function Error() {
    return (
        <>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="error"
        title="Payment failed"
        subTitle="Sorry, we were unable to process your payment."
        icon={<CloseCircleOutlined />}
      />
    </div>
        </>
    )
}
