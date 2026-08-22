import Home from './pages/Home.tsx'
import { Route, Routes } from 'react-router-dom'
import { OrderStep1 } from './pages/OrderStep1.tsx'
import { OrderStep2 } from './pages/OrderStep2.tsx'
import { OrderStep3 } from './pages/OrderStep3.tsx'
import { OrderStep5 } from './pages/OrderStep5.tsx'
import { OrderStep4 } from './pages/OrderStep4.tsx'
import { OrderStep6 } from './pages/OrderStep6.tsx'
import { OrderStep7 } from './pages/OrderStep7.tsx'
import { OrderSuccess } from './pages/OrderSuccess.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order/step-1" element={<OrderStep1 />} />
      <Route path="/order/step-2" element={<OrderStep2 />} />
      <Route path="/order/step-3" element={<OrderStep3 />} />
      <Route path="/order/step-4" element={<OrderStep4 />} />
      <Route path="/order/step-5" element={<OrderStep5 />} />
      <Route path="/order/step-6" element={<OrderStep6 />} />
      <Route path="/order/step-7" element={<OrderStep7 />} />
      <Route path="/order/success" element={<OrderSuccess />} />
    </Routes>
  )
}

export default App
