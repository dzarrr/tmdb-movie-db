import { useRequest } from "ahooks";
import { useEffect } from "react";
import { getPopularMovies } from "../../services/movieService";

export default function ListPage() {
  const { data: movieData, loading } = useRequest(() => getPopularMovies(), {
    onError: (e) => {
      alert(e);
    },
    onSuccess: (data) => console.log(data),
  });

  useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  return (
    <div>
      {"this is the list fpage"}
      <span>{loading && "loading..."}</span>
    </div>
  );
}
