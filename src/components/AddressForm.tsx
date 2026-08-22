import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { OrderBreadcrumb } from './OrderBreadcrumb'
import { StepperProgress } from './StepperProgress'
import { useOrderStore } from '../store/orderStore'
import { useStepperNavigation } from '../hooks/useStepperNavigation'
import { OrderCard } from './OrderCard.tsx'
import {
  type AddressFormData,
  AddressSchema,
} from '../schemas/AddressSchema.tsx'
import { InfoPopover } from './InfoPopover.tsx'

type Props = {
  step: number
  title: string
  role: 'sender' | 'receiver'
}

export function AddressForm({ step, title, role }: Props) {
  const navigate = useNavigate()
  const { goToNextStep } = useStepperNavigation(step)

  const currentAddress = useOrderStore((state) =>
    role === 'sender' ? state.senderAddress : state.receiverAddress
  )
  const setSenderAddress = useOrderStore((state) => state.setSenderAddress)
  const setReceiverAddress = useOrderStore((state) => state.setReceiverAddress)
  const setAddress = role === 'sender' ? setSenderAddress : setReceiverAddress

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      street: currentAddress?.street ?? '',
      house: currentAddress?.house ?? '',
      apartment: currentAddress?.apartment ?? '',
      isNonContact: currentAddress?.isNonContact ?? false,
      comment: currentAddress?.comment ?? '',
    },
  })

  const onSubmit = (data: AddressFormData) => {
    setAddress(data)
    goToNextStep()
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-[1fr_400px] gap-6 items-start">
        <div>
          <OrderBreadcrumb currentStep={step} />

          <h1 className="text-2xl font-bold mb-4">{title}</h1>

          <div className="mb-6">
            <StepperProgress currentStep={step} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Улица</label>
              <input
                {...register('street')}
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.street.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Дом</label>
              <input
                {...register('house')}
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.house && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.house.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Квартира</label>
              <input
                {...register('apartment')}
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.apartment.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Заметка для курьера
              </label>
              <input
                {...register('comment')}
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.comment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>
            {role === 'receiver' && (
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isNonContact')}
                    className="w-4 h-4"
                  />
                  Оставить заказ у двери
                  <InfoPopover
                    title={'Бесконтактная доставка'}
                    text={
                      'Курьер привозит заказ, оставляет его у двери и' +
                      ' уходит, а вам приходит уведомление на телефон о том, что заказ доставлен'
                    }
                  />
                </label>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-100 rounded-xl py-3 hover:bg-gray-200 transition-colors"
              >
                Назад
              </button>
              <button
                type="submit"
                className="flex-1 bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition-colors"
              >
                Продолжить
              </button>
            </div>
          </form>
        </div>

        <OrderCard step={step} />
      </div>
    </div>
  )
}
