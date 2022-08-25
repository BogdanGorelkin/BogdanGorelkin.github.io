import React, {useState} from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image } from 'antd'
import './mainpage.scss'

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}))


function MainPage() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout
    style={{
      minHeight: '100vh',
    }}
    >
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      { !collapsed &&
        <>
        <img src="/favicon.png" alt="favicon" className='avatar'/>
        <div className="logo">
          <p className='text'>
            Bogdan Gorelkin
          </p>
        </div>
        </>
      }
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
        <p className='header-text'>
          Welcome to my personal page
        </p>
      </Header>
      <Content
        style={{
          margin: '1rem 1.25rem',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 360,
          }}
          >
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123
          <br/>123

        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
  )
}

export default MainPage


