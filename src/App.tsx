import Home from './pages/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import { OrderStep1 } from './pages/OrderStep1.tsx'
import { OrderStep2 } from './pages/OrderStep2.tsx'
import { OrderStep3 } from './pages/OrderStep3.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order/step-1" element={<OrderStep1 />} />
      <Route path="/order/step-2" element={<OrderStep2 />} />
      <Route path="/order/step-3" element={<OrderStep3 />} />
    </Routes>
  )
}

export default App
