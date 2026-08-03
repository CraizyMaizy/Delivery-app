import { DeliveryForm } from './DeliveryForm.tsx'
import hero from '../assets/hero.png'
import banner from '../assets/banner.png'

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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <img src={banner} alt="banner" className="w-full" />
        <div className="border rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Отследить посылку</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Номер заказа"
              className="flex-1 px-4 py-3 border rounded-xl outline-none focus:border-black transition-colors"
            />
            <button
              type="button"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Найти
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
