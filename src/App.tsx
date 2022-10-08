import React, { HashRouter, Route, Routes } from 'react-router-dom'
import MainPage from './features/MainPage'
import ObjectsFilter from './features/stack-overflow-answers/73821041'
import './App.css';

function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="stack-overflow-answers/73821041" element={<ObjectsFilter />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  </HashRouter>
  )
}

export default App;
