import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '@/services/movieService.js'

export function useMovieDetails(id: number, enabled = true) {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieById(id),
    enabled: enabled && Boolean(id),
    staleTime: 5 * 60_000,
  })
}
