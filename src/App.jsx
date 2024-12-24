import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  
  return (
    <>
    <BrowserRouter>
    <div className="container-fluid overflow-x-hidden">
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
