import { orderSteps } from '../config/orderSteps'

type Props = {
  currentStep: number
}

export function StepperProgress({ currentStep }: Props) {
  const totalSteps = orderSteps.length
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          Шаг {currentStep} из {totalSteps}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
