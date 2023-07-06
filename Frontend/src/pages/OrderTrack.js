import React, { useState, useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

const { Item } = Menu;

const OrderTrack = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [paymentStatus, setPaymentStatus] = useState('processing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentStatus('complete');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Meta title="Delivery Status" />
      <BreadCrumb title="Delivery Status" />

      <Steps
        style={{ width: '50%' }}
        items={[
          {
            title: 'Login',
            status: 'finish',
            icon: <CheckOutlined />,
          },
          {
            title: 'Verification',
            status: 'finish',
            icon: <CheckOutlined />,
          },
          {
            title: 'Pay',
            status: paymentStatus === 'complete' ? 'finish' : 'processing',
            icon: paymentStatus === 'complete' ? (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#52c41a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <CheckOutlined />
              </div>
            ) : (
              <LoadingOutlined />
            ),
          },
          {
            title: 'Done',
            status: 'wait',
            icon: null,
          },
        ]}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 480,
          background: colorBgContainer,
        }}
      >
        <h1>Thank you for your order!</h1>
      </Content>
    </>
  );
};

export default OrderTrack;
