import { OrderReview } from '../components/OrderReview'
import { useOrderStore } from '../store/orderStore.ts'

export function OrderSuccess() {
  const orderNumber = useOrderStore((state) => state.orderNumber)

  return (
    <div className="container mx-auto mt-6">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Заявка создана!</h1>
        <OrderReview orderNumber={orderNumber ?? undefined} />
      </div>
    </div>
  )
}
