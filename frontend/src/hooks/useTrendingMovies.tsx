import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { getTrendingMovies } from '@/services/movieService.js'

export function useTrendingMovies() {
  const query = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: getTrendingMovies,
  })

  const movies = query.data?.slice(0, 5) ?? []
  const isNotFound = isAxiosError(query.error) && query.error.response?.status === 404
  const hasNoData = !query.isLoading && !query.isError && movies.length === 0

  return {
    ...query,
    movies,
    isNotFound,
    hasNoData,
  }
}
