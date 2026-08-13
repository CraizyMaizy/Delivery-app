import { AddressForm } from '../components/AddressForm.tsx'

export function OrderStep5() {
  return <AddressForm step={5} title={'Куда доставить'} role={'receiver'} />
}
