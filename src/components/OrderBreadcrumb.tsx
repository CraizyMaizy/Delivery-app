import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { orderSteps } from '../config/orderSteps.ts'

type Props = {
  currentStep: number
}

export function OrderBreadcrumb({ currentStep }: Props) {
  const visibleSteps = orderSteps.slice(0, currentStep)

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5 ml-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Link to="/" className="hover:text-black transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4" />
      </div>

      {visibleSteps.map((step, index) => {
        const isLast = index === visibleSteps.length - 1
        return (
          <div key={step.path} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-black font-medium">{step.label}</span>
            ) : (
              <Link
                to={step.path}
                className="hover:text-black transition-colors"
              >
                {step.label}
              </Link>
            )}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </div>
        )
      })}
    </nav>
  )
}
