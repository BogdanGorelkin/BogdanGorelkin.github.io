import React, { HashRouter, Route, Routes } from 'react-router-dom'
import MainPage from './features/MainPage'
import MainPdfView from './features/MainPdfView/MainPdfView'
import { ConfigProvider } from 'antd'

import './index.scss'

function App() {
  return (
    <ConfigProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPdfView />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
