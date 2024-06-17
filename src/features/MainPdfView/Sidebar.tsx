import React from 'react'
import { Typography, Avatar, Row, Col } from 'antd'
const { Title } = Typography
import './main-pdf-view.scss'

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Me/>
      </div>
    </>
  )
}


function Me(){
    return(
        <>
            <Avatar src="images/favicon.png" size={200}/>
            {/* <Title level={2}>Bogdan Gorelkin</Title> */}
        </>
    )
}