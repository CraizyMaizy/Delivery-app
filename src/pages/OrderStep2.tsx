import { PersonForm } from '../components/PersonForm.tsx'

export function OrderStep2() {
  return <PersonForm step={2} title={'Получатель'} role={'receiver'} />
}
