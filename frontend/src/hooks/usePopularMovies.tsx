import { useQuery } from '@tanstack/react-query'
import { getPopularMovies } from '@/services/movieService.js'

export function usePopularMovies() {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  })
}
