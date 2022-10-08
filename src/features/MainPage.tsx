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

  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Input, Button } from 'antd'
import './mainpage.scss'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router'
const { Search } = Input
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
  onclick: console.log("eeee")
}))


function MainPage() {
  const navigate = useNavigate()
  const [videoLink, setVideoLink] = useState("/test.mp4")
  ///test.mp4
  //"https://youtu.be/nkH8fYdq80c"
  //"Духи огня (RMX).mp3"
  const [collapsed, setCollapsed] = useState(false)

  /* const [videoFilePath, setVideoFilePath] = useState<any>(null)


  const handleVideoUpload = (event: any) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]))
  } */

  return (
    <Layout
    style={{
      minHeight: '100vh',
    }}
    >
    <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth={0}>
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
      <Button onClick={() => navigate('/stack-overflow-answers/73821041')}> to SO</Button>
    </Sider>
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
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
        <Search
      placeholder="link to youtube"
      allowClear
      enterButton="to player"
      size="large"
      onSearch={(e) => setVideoLink("https://youtu.be/nkH8fYdq80c")} //set to `e`
    />
            <p>
              npm распознаватель эмоций + подбор музыки по настроению?
            </p>
              

            <ReactPlayer url={videoLink} controls={true} />
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


