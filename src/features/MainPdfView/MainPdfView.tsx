import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import './main-pdf-view.scss'



export default function MainPdfView() {
  return (
    <div className="main-pdf-view">
        <Sidebar/>
        <Content/>
    </div>
  )
}
