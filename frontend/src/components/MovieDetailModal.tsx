import {
  CalendarDays,
  Clock3,
  ExternalLink,
  Film,
  Globe2,
  LoaderCircle,
  Star,
  Users,
  X,
} from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMovieVideos } from '@/hooks/useMovieVideos'
import type { Movie } from '@/types/movie'

interface MovieDetailModalProps {
  movie: Movie
  onClose: () => void
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/original'

function formatMoney(value: number) {
  if (!value) return 'No disponible'
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function getRatingStyles(rating: number) {
  if (rating < 5) {
    return 'border-red-500/40 bg-red-500/15 text-red-300'
  }

  if (rating < 7) {
    return 'border-yellow-500/40 bg-yellow-500/15 text-yellow-300'
  }

  return 'border-green-500/40 bg-green-500/15 text-green-300'
}

function DetailItem({ label, value, icon: Icon }: { label: string; value: string; icon: typeof CalendarDays }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        <Icon className="size-3.5 text-red-400" />
        {label}
      </div>
      <p className="mt-1.5 break-words text-sm text-zinc-200">{value}</p>
    </div>
  )
}

export function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  const { data, isLoading, isError } = useMovieVideos(movie.id)
  const video = data?.results.find((item) => item.site === 'YouTube' && item.key)
  const genres = Array.isArray(movie.genres) ? movie.genres : []
  const companies = Array.isArray(movie.production_companies) ? movie.production_companies : []
  const countries = Array.isArray(movie.production_countries) ? movie.production_countries : []
  const languages = Array.isArray(movie.spoken_languages) ? movie.spoken_languages : []
  const originCountries = Array.isArray(movie.origin_country) ? movie.origin_country : []

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="movie-modal-overlay fixed inset-0 z-[100] overflow-y-auto bg-[#050609]/85 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-10" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`movie-title-${movie.id}`}
        onClick={(event) => event.stopPropagation()}
        className="movie-modal-panel mx-auto min-w-0 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[#14161c] shadow-2xl shadow-black/70"
      >
        <div className="relative aspect-video w-full max-h-[72vh] min-h-64 overflow-hidden bg-black">
          {movie.backdrop_path ? (
            <img src={`${imageBaseUrl}${movie.backdrop_path}`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          ) : null}
          {isLoading ? (
            <div className="relative flex h-full items-center justify-center text-zinc-400"><LoaderCircle className="mr-2 size-6 animate-spin" />Cargando tráiler...</div>
          ) : video ? (
            <iframe
              className="relative block h-full w-full border-0"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`}
              title={video.name || `Video de ${movie.title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative flex h-full items-center justify-center px-6 text-center text-zinc-400">
              {isError ? 'No se pudo cargar el video.' : 'No hay tráiler disponible para esta película.'}
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14161c] via-[#14161c]/80 to-transparent px-6 pb-6 pt-20 sm:px-10 sm:pb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-400">Movie detail</p>
            <h2 id={`movie-title-${movie.id}`} className="max-w-3xl text-3xl font-black tracking-tight text-white drop-shadow-lg sm:text-5xl">{movie.title}</h2>
            {movie.tagline ? <p className="mt-2 text-sm italic text-zinc-300">{movie.tagline}</p> : null}
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar detalles" className="absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:scale-105 hover:bg-red-600">
            <X className="size-5" />
          </button>
        </div>

        <div className="movie-detail-scroll min-w-0 w-full max-h-[55vh] overflow-x-hidden overflow-y-auto px-6 pb-10 pt-6 sm:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-bold ${getRatingStyles(movie.vote_average)}`}>
              <Star className="size-4 fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
            {movie.release_date ? <span className="text-sm text-zinc-400">{movie.release_date.slice(0, 4)}</span> : null}
            {movie.runtime ? <span className="text-sm text-zinc-400">{movie.runtime} min</span> : null}
          </div>
          <p className="mt-6 w-full break-words text-base leading-8 text-zinc-300">{movie.overview || 'Sin descripción disponible.'}</p>

          <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="Estreno" value={movie.release_date || 'No disponible'} icon={CalendarDays} />
            <DetailItem label="Duración" value={movie.runtime ? `${movie.runtime} minutos` : 'No disponible'} icon={Clock3} />
            <DetailItem label="Popularidad" value={movie.popularity.toFixed(1)} icon={Users} />
            <DetailItem label="Idioma original" value={movie.original_language.toUpperCase()} icon={Globe2} />
          </div>

          <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white"><Film className="size-4 text-red-400" />Géneros</h3>
              <div className="flex flex-wrap gap-2">{genres.length ? genres.map((genre) => <span key={genre.id} className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-zinc-300">{genre.name}</span>) : <span className="text-sm text-zinc-500">No disponibles</span>}</div>
            </div>
            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Producción</h3>
              <p className="break-words text-sm leading-6 text-zinc-400">{companies.length ? companies.map((company) => company.name).join(' · ') : 'No disponible'}</p>
            </div>
          </div>

          <div className="mt-8 grid min-w-0 gap-8 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Países</h3>
              <p className="break-words text-sm text-zinc-400">{countries.length ? countries.map((country) => country.name).join(', ') : originCountries.join(', ') || 'No disponibles'}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Idiomas</h3>
              <p className="break-words text-sm text-zinc-400">{languages.length ? languages.map((language) => language.english_name).join(', ') : 'No disponibles'}</p>
            </div>
          </div>

          <div className="mt-8 flex min-w-0 flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500">
            <span>Votos: {movie.vote_count.toLocaleString('es-CO')}</span>
            <span>·</span>
            <span>Presupuesto: {formatMoney(movie.budget)}</span>
            <span>·</span>
            <span>Recaudación: {formatMoney(movie.revenue)}</span>
            {movie.homepage ? <a href={movie.homepage} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-2 text-red-400 hover:text-red-300"><ExternalLink className="size-4" />Sitio oficial</a> : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
