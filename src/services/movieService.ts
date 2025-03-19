import { TMDB_API_ENDPOINT } from "../lib/const";
import fetchData from "../lib/fetchData";
import { getQueryParamString } from "../lib/getQueryParamString";
import { GetMovieResponse, GetMovieByIdResponse } from "./movieService.type";

function getMoviesByCategory({
  category,
}: {
  category: string;
}): Promise<GetMovieResponse> {
  const url = `${TMDB_API_ENDPOINT}/movie/${category}`;

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}

function getMoviesByQueryParam(
  params: Record<string, string | number>
): Promise<GetMovieResponse> {
  const url = `${TMDB_API_ENDPOINT}/search/movie?${getQueryParamString(
    params
  )}`;

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}

function discoverMovies(): Promise<GetMovieResponse> {
  const url = `${TMDB_API_ENDPOINT}/discover/movie`;

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}

export function getMovies(
  params: Record<string, string | number>
): Promise<GetMovieResponse> {
  const { category, query: searchQuery } = params;

  if (category) {
    return getMoviesByCategory({ category: category as string });
  } else if (searchQuery !== "") {
    return getMoviesByQueryParam(params);
  } else {
    return discoverMovies();
  }
}

export function getMovieById({
  id,
}: {
  id: string;
}): Promise<GetMovieByIdResponse> {
  const url = `${TMDB_API_ENDPOINT}/movie/${id}`;

  return fetchData(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
}
