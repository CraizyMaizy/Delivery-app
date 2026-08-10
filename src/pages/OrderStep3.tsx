import { PersonForm } from '../components/PersonForm.tsx'

export function OrderStep3() {
  return <PersonForm step={3} title={'Отправитель'} role={'sender'} />
}
