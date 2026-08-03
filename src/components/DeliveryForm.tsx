import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Select from '@radix-ui/react-select'
import {
  CalculateSchema,
  type CalculateFormData,
} from '../schemas/CalculateSchema'
import { useDeliveryPoints } from '../hooks/useDeliveryPoints.ts'
import { ParcelSizeSelector } from './ParcelSizeSelector.tsx'
import { useOrderStore } from '../store/orderStore.ts'
import { useNavigate } from 'react-router-dom'
import { useCalculateDelivery } from '../hooks/useCalculateDelivery.ts'

export function DeliveryForm() {
  const navigate = useNavigate()
  const {
    mutate: calculate,
    isPending,
    error: calcError,
  } = useCalculateDelivery()
  const setCalculatedData = useOrderStore((state) => state.setCalculatedData)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculateFormData>({
    resolver: zodResolver(CalculateSchema),
    defaultValues: {
      fromCity: '',
      toCity: '',
      parcelSize: null,
    },
  })

  const {
    data: pointsData,
    isLoading: pointsLoading,
    error: pointsError,
  } = useDeliveryPoints()

  const points = pointsData ?? []

  if (pointsLoading) return <div>Загрузка...</div>
  if (pointsError) return <div>Не удалось загрузить данные</div>

  const onSubmit = (data: CalculateFormData) => {
    const fromPoint = points.find((p) => p.id === data.fromCity)
    const toPoint = points.find((p) => p.id === data.toCity)

    if (!fromPoint || !toPoint || !data.parcelSize) return

    calculate(
      {
        package: {
          length: data.parcelSize.length,
          width: data.parcelSize.width,
          height: data.parcelSize.height,
          weight: data.parcelSize.weight,
        },
        senderPoint: {
          latitude: fromPoint.latitude,
          longitude: fromPoint.longitude,
        },
        receiverPoint: {
          latitude: toPoint.latitude,
          longitude: toPoint.longitude,
        },
      },
      {
        onSuccess: (options) => {
          setCalculatedData({
            fromPoint,
            toPoint,
            parcelSize: data.parcelSize!,
            deliveryOptions: options,
          })
          navigate('/order/step-1')
        },
      }
    )
  }

  return (
    <div className="border rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">Рассчитать доставку</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Город отправки
          </label>
          <Controller
            name="fromCity"
            control={control}
            render={({ field }) => (
              <>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="w-full flex justify-between items-center px-4 py-3 border rounded-xl">
                    <Select.Value placeholder="Выберите город" />
                    <Select.Icon>▼</Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border rounded-xl shadow-lg">
                      <Select.Viewport>
                        {points.map((point) => (
                          <Select.Item
                            key={point.id}
                            value={point.id}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer outline-none"
                          >
                            <Select.ItemText>{point.name}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <div className="flex gap-4 mt-2">
                  {points
                    .filter((point) => point.id !== field.value)
                    .slice(0, 3)
                    .map((point) => (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => field.onChange(point.id)}
                        className="text-sm text-gray-500 underline underline-offset-4 hover:text-black transition-colors"
                      >
                        {point.name}
                      </button>
                    ))}
                </div>
              </>
            )}
          />
          {errors.fromCity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fromCity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Город назначения
          </label>
          <Controller
            name="toCity"
            control={control}
            render={({ field }) => (
              <>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="w-full flex justify-between items-center px-4 py-3 border rounded-xl">
                    <Select.Value placeholder="Выберите город" />
                    <Select.Icon>▼</Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white border rounded-xl shadow-lg">
                      <Select.Viewport>
                        {points.map((point) => (
                          <Select.Item
                            key={point.id}
                            value={point.id}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer outline-none"
                          >
                            <Select.ItemText>{point.name}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <div className="flex gap-4 mt-2">
                  {points
                    .filter((point) => point.id !== field.value)
                    .slice(0, 3)
                    .map((point) => (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => field.onChange(point.id)}
                        className="text-sm text-gray-500 underline underline-offset-4 hover:text-black transition-colors"
                      >
                        {point.name}
                      </button>
                    ))}
                </div>
              </>
            )}
          />
          {errors.toCity && (
            <p className="text-red-500 text-sm mt-1">{errors.toCity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Размер посылки
          </label>
          <Controller
            name="parcelSize"
            control={control}
            render={({ field }) => (
              <ParcelSizeSelector
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.parcelSize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parcelSize.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white rounded-xl py-3"
        >
          {isPending ? 'Считаем...' : 'Рассчитать'}
        </button>

        {calcError && (
          <p className="text-red-500 text-sm mt-2">
            Не удалось рассчитать стоимость доставки
          </p>
        )}
      </form>
    </div>
  )
}
