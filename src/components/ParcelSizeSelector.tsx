import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import * as Tabs from '@radix-ui/react-tabs'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useParcelTypes } from '../hooks/useParcelTypes'
import type { PackageSize } from '../types/delivery'

type Props = {
  value: PackageSize | null
  onChange: (value: PackageSize) => void
}

export function ParcelSizeSelector({ value, onChange }: Props) {
  const { data, isLoading } = useParcelTypes()
  const parcelTypes = data ?? []

  const [manualSize, setManualSize] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
  })

  const handleManualSubmit = () => {
    onChange({
      length: Number(manualSize.length),
      width: Number(manualSize.width),
      height: Number(manualSize.height),
      weight: Number(manualSize.weight),
    })
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="w-full flex justify-between items-center px-4 py-3 border rounded-xl">
        {value
          ? (value.name ??
            `${value.length}x${value.width}x${value.height} см, ${value.weight} кг`)
          : 'Выберите размер'}
        <span>▼</span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white border rounded-2xl shadow-lg p-4 w-[380px]"
          sideOffset={8}
        >
          <Tabs.Root defaultValue="approx">
            <Tabs.List className="flex bg-gray-100 rounded-full p-1 mb-4">
              <Tabs.Trigger
                value="approx"
                className="flex-1 py-2 rounded-full text-sm data-[state=active]:bg-white data-[state=active]:font-medium"
              >
                Примерные
              </Tabs.Trigger>
              <Tabs.Trigger
                value="exact"
                className="flex-1 py-2 rounded-full text-sm data-[state=active]:bg-white data-[state=active]:font-medium"
              >
                Точные
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="approx">
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <RadioGroup.Root
                  value={value?.name}
                  onValueChange={(name) => {
                    const selected = parcelTypes.find((p) => p.name === name)
                    if (selected) {
                      onChange({
                        id: selected.id,
                        length: selected.length,
                        width: selected.width,
                        height: selected.height,
                        weight: selected.weight,
                        name: selected.name,
                      })
                    }
                  }}
                  className="max-h-[320px] overflow-y-auto"
                >
                  {parcelTypes.map((pkg) => (
                    <RadioGroup.Item
                      key={pkg.id}
                      value={pkg.name}
                      className="w-full border rounded-xl p-3 mb-2 flex justify-between items-center text-left"
                    >
                      <div>
                        <div className="font-bold">{pkg.name}</div>
                        <div className="text-gray-500 text-sm">
                          {pkg.length}x{pkg.width}x{pkg.height} см
                        </div>
                      </div>
                      <RadioGroup.Indicator className="w-4 h-4 rounded-full bg-black" />
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )}
            </Tabs.Content>

            <Tabs.Content value="exact" className="space-y-3">
              <input
                type="number"
                placeholder="Длина, см"
                value={manualSize.length}
                onChange={(e) =>
                  setManualSize({ ...manualSize, length: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
              />
              <input
                type="number"
                placeholder="Ширина, см"
                value={manualSize.width}
                onChange={(e) =>
                  setManualSize({ ...manualSize, width: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
              />
              <input
                type="number"
                placeholder="Высота, см"
                value={manualSize.height}
                onChange={(e) =>
                  setManualSize({ ...manualSize, height: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
              />
              <input
                type="number"
                placeholder="Вес, кг"
                value={manualSize.weight}
                onChange={(e) =>
                  setManualSize({ ...manualSize, weight: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
              />
              <button
                type="button"
                onClick={handleManualSubmit}
                className="w-full bg-black text-white rounded-xl py-2"
              >
                Применить
              </button>
            </Tabs.Content>
          </Tabs.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
