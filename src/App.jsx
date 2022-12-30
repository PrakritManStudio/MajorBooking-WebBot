import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Components
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
