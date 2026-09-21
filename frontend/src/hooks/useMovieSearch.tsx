import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '@/services/movieService.js'

export function useMovieSearch(query: string) {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: ['movieSearch', normalizedQuery],
    queryFn: () => searchMovies(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 60_000,
  })
}
