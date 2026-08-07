import { useNavigate } from 'react-router-dom'
import { getNextStepPath } from '../config/orderSteps.ts'

export const useStepperNavigation = (currentStep: number) => {
  const navigate = useNavigate()

  const goToNextStep = () => {
    const nextPath = getNextStepPath(currentStep)
    if (nextPath) navigate(nextPath)
  }
  return { goToNextStep }
}
