import { TMDB_API_ENDPOINT } from "../lib/const";
import fetchData from "../lib/fetchData";
import { getQueryParamString } from "../lib/getQueryParamString";
import { GetMovieResponse } from "./movieService.type";

export function getPopularMovies(
  params?: Record<string, string | number>
): Promise<GetMovieResponse> {
  const url = params
    ? `${TMDB_API_ENDPOINT}/movie/now_playing?${getQueryParamString(params)}`
    : `${TMDB_API_ENDPOINT}/movie/now_playing`;

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}
