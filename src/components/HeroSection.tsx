import { DeliveryForm } from './DeliveryForm.tsx'

export default function HeroSection() {
  return (
    <section className="container mx-auto mt-6">
      <div className="grid grid-cols-2 gap-4">
        <DeliveryForm />
      </div>
    </section>
  )
}
