import * as Popover from '@radix-ui/react-popover'
import { HelpCircle, X } from 'lucide-react'

type Props = {
  title: string
  text: string
}

export function InfoPopover({ title, text }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className="text-gray-400 hover:text-gray-600">
          <HelpCircle className="w-4 h-4" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white border rounded-xl shadow-lg p-4 w-74"
          side={'top'}
          sideOffset={8}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{title}</h3>
            <Popover.Close className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </Popover.Close>
          </div>
          <p className="text-sm text-gray-500">{text}</p>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
