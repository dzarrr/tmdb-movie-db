import { TMDB_API_ENDPOINT } from "../lib/const";
import fetchData from "../lib/fetchData";
import { getQueryParamString } from "../lib/getQueryParamString";
import { GetMovieResponse } from "./movieService.type";

export function getMovies(
  params: Record<string, string | number>
): Promise<GetMovieResponse> {
  const { category } = params;
  delete params["category"];

  // TODO: fix this api logic lol
  let url = `${TMDB_API_ENDPOINT}/movie/now_playing`;

  if (category !== "") {
    url = `${TMDB_API_ENDPOINT}/movie/${category}?${getQueryParamString(
      params
    )}`;
  }

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}
