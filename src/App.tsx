import Home from './pages/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import { OrderStep1 } from './pages/OrderStep1.tsx'
import { OrderStep2 } from './pages/OrderStep2.tsx'
import { OrderStep3 } from './pages/OrderStep3.tsx'
import { OrderStep5 } from './pages/OrderStep5.tsx'
import { OrderStep4 } from './pages/OrderStep4.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order/step-1" element={<OrderStep1 />} />
      <Route path="/order/step-2" element={<OrderStep2 />} />
      <Route path="/order/step-3" element={<OrderStep3 />} />
      <Route path="/order/step-4" element={<OrderStep4 />} />
      <Route path="/order/step-5" element={<OrderStep5 />} />
    </Routes>
  )
}

export default App
