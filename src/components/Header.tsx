import { History, User, LogOut, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="mt-4">
      <div className="container mx-auto flex items-center justify-between border rounded-full px-3 py-2">
        <Link to={'/'} className="flex items-center gap-2">
          <Package className="size-6" />
          <h1 className="text-xl font-bold">DELIVERY</h1>
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-8">
            <button className="flex justify-center items-center size-8 rounded-full bg-gray-100">
              <History className="size-5" />
            </button>
            <button className="flex justify-center items-center size-8 rounded-full bg-gray-100">
              <User className="size-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#0B0B0B] px-4 py-2 text-white ">
            Выйти
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
