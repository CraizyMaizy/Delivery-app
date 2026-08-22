import { useNavigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import { OrderBreadcrumb } from '../components/OrderBreadcrumb'
import { StepperProgress } from '../components/StepperProgress'
import { OrderReview } from '../components/OrderReview'
import { useCreateOrder } from '../hooks/useCreateOrder'

export function OrderStep7() {
  const navigate = useNavigate()

  const payer = useOrderStore((state) => state.payer)
  const selectedDeliveryOption = useOrderStore(
    (state) => state.selectedDeliveryOption
  )
  const fromPoint = useOrderStore((state) => state.fromPoint)
  const toPoint = useOrderStore((state) => state.toPoint)
  const senderAddress = useOrderStore((state) => state.senderAddress)
  const receiverAddress = useOrderStore((state) => state.receiverAddress)
  const sender = useOrderStore((state) => state.sender)
  const receiver = useOrderStore((state) => state.receiver)
  const parcelSize = useOrderStore((state) => state.parcelSize)
  const setOrderNumber = useOrderStore((state) => state.setOrderNumber)

  const { mutate: submitOrder, isPending, error: orderError } = useCreateOrder()

  const handleSubmit = () => {
    if (
      !parcelSize?.id ||
      !fromPoint ||
      !toPoint ||
      !senderAddress ||
      !receiverAddress ||
      !sender ||
      !receiver ||
      !payer ||
      !selectedDeliveryOption
    ) {
      return
    }

    submitOrder(
      {
        packageId: parcelSize.id,
        optionType: selectedDeliveryOption.type,
        senderPointId: fromPoint.id,
        senderAddress: {
          street: senderAddress.street,
          house: senderAddress.house,
          apartment: senderAddress.apartment,
          comment: senderAddress.comment,
        },
        sender: {
          firstname: sender.firstname,
          lastname: sender.lastname,
          middlename: sender.middlename,
          phone: sender.phone,
        },
        receiverPointId: toPoint.id,
        receiverAddress: {
          street: receiverAddress.street,
          house: receiverAddress.house,
          apartment: receiverAddress.apartment,
          comment: receiverAddress.comment,
          isNonContact: receiverAddress.isNonContact,
        },
        receiver: {
          firstname: receiver.firstname,
          lastname: receiver.lastname,
          middlename: receiver.middlename,
          phone: receiver.phone,
        },
        payer,
      },
      {
        onSuccess: (orderId) => {
          setOrderNumber(orderId)
          navigate('/order/success')
        },
      }
    )
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="max-w-4xl">
        <OrderBreadcrumb currentStep={7} />
        <h1 className="text-2xl font-bold mb-5">Проверка данных</h1>

        <div className="mb-6">
          <StepperProgress currentStep={7} />
        </div>

        <OrderReview />

        <button
          type="button"
          onClick={() => navigate('/order/step-2')}
          className="flex w-full items-center justify-center bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors mt-4"
        >
          Редактировать данные
        </button>

        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!payer || isPending}
            className="flex-1 bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Оформляем...' : 'Продолжить'}
          </button>
        </div>

        {orderError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Не удалось оформить заказ. Попробуйте ещё раз
          </p>
        )}
      </div>
    </div>
  )
}
