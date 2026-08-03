import { DeliveryForm } from './DeliveryForm.tsx'
import hero from '../assets/hero.png'

export default function HeroSection() {
  return (
    <section className="container mx-auto mt-6">
      <div className="grid grid-cols-2 gap-4 items-start">
        <DeliveryForm />
        <img
          src={hero}
          alt="hero"
          className="rounded-2xl object-cover object-center w-full h-[500px]"
        />
      </div>
    </section>
  )
}
