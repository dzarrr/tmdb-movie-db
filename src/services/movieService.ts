import { TMDB_API_ENDPOINT } from "../lib/const";
import fetchData from "../lib/fetchData";
import { getQueryParamString } from "../lib/getQueryParamString";
import { GetMovieResponse } from "./movieService.type";

export function getMovies(
  params?: Record<string, string | number>
): Promise<GetMovieResponse> {
  // TODO: add logic to handle search
  let url = `${TMDB_API_ENDPOINT}/movie/now_playing`;

  if (params?.category !== "") {
    url = `${TMDB_API_ENDPOINT}/movie/${params?.category}`;
  }

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}
