import React, { HashRouter, Route, Routes } from 'react-router-dom'
import MainPage from './features/MainPage'
import './App.css';

function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  </HashRouter>
  )
}

export default App;
