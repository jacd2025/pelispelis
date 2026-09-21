import { useQuery } from '@tanstack/react-query'
import { getMovieVideos } from '@/services/movieService.js'

export function useMovieVideos(id: number, enabled = true) {
  return useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => getMovieVideos(id),
    enabled: enabled && Boolean(id),
  })
}