import React from 'react'
import {HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Album from './components/pages/Album'
import Mapa from './components/pages/Mapa'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album" element={<Album />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
    </>        
  )
}

export default App