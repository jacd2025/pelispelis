import { Clapperboard, Heart, Home, LogIn, Users } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MovieSearch } from '@/components/MovieSearch'

const navigation = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Favoritos', to: '/favoritos', icon: Heart },
  { label: 'Comunidad', to: '/comunidad', icon: Users },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111318]/90 px-4 text-white shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Ir a Pelis Pelis">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-800 shadow-lg shadow-red-950/40">
            <Clapperboard className="size-5" aria-hidden="true" />
          </span>
          <span className="hidden text-lg font-black tracking-tight sm:inline">
            Pelis <span className="text-red-500">Pelis</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-zinc-400 transition-colors hover:bg-white/5 hover:text-white sm:px-3 sm:text-sm',
                  isActive && 'bg-red-950/60 text-red-400',
                )
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="hidden md:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-w-40 max-w-56 flex-1 md:flex">
          <MovieSearch />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" className="hidden border-red-500/30 bg-gradient-to-r from-red-950/70 to-black sm:inline-flex">
            <LogIn className="size-4" aria-hidden="true" />
            Iniciar sesión
          </Button>
          <Button size="sm" className="cursor-pointer bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400">
            Registrar usuario
          </Button>
        </div>
      </div>
    </header>
  )
}
