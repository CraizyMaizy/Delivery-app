import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { OrderBreadcrumb } from './OrderBreadcrumb'
import { StepperProgress } from './StepperProgress'
import { useOrderStore } from '../store/orderStore'
import { useStepperNavigation } from '../hooks/useStepperNavigation'
import { PersonSchema, type PersonFormData } from '../schemas/PersonSchema'
import { OrderCard } from './OrderCard.tsx'

type Props = {
  step: number
  title: string
  role: 'sender' | 'receiver'
}

export function PersonForm({ step, title, role }: Props) {
  const navigate = useNavigate()
  const { goToNextStep } = useStepperNavigation(step)

  const currentPerson = useOrderStore((state) => state[role])
  const setSender = useOrderStore((state) => state.setSender)
  const setReceiver = useOrderStore((state) => state.setReceiver)
  const setPerson = role === 'sender' ? setSender : setReceiver

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(PersonSchema),
    defaultValues: {
      lastName: currentPerson?.lastName ?? '',
      firstName: currentPerson?.firstName ?? '',
      middleName: currentPerson?.middleName ?? '',
      phone: currentPerson?.phone ?? '',
    },
  })

  const onSubmit = (data: PersonFormData) => {
    setPerson(data)
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
              <label className="block text-sm font-medium mb-1">Фамилия</label>
              <input
                {...register('lastName')}
                placeholder="Иванов"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <input
                {...register('firstName')}
                placeholder="Иван"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Отчество</label>
              <input
                {...register('middleName')}
                placeholder="Иванович"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.middleName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.middleName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Телефон</label>
              <input
                {...register('phone')}
                placeholder="+7"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

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
