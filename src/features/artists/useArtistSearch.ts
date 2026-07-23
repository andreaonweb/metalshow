import { useQuery } from '@tanstack/react-query'
import { searchArtists } from '../../api/ticketmaster'
import { useDebouncedValue } from '../../utils/useDebouncedValue'

export function useArtistSearch(keyword: string) {
  const debouncedKeyword = useDebouncedValue(keyword.trim(), 350)

  return useQuery({
    queryKey: ['artist-search', debouncedKeyword],
    queryFn: () => searchArtists(debouncedKeyword),
    enabled: debouncedKeyword.length >= 2,
    staleTime: 5 * 60 * 1000,
  })
}
