import { useRequest } from "ahooks";
import { getPopularMovies } from "../../services/movieService";

export default function ListPage() {
  const { data: movieData, loading } = useRequest(() => getPopularMovies(), {
    onError: (e) => {
      alert(e);
    },
    onSuccess: (data) => console.log(data),
  });

  return <div>this is the list fpage</div>;
}
