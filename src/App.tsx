import Home from './pages/home/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import { OrderStep1 } from './pages/OrderStep1.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order/step-1" element={<OrderStep1 />} />
    </Routes>
  )
}

export default App
