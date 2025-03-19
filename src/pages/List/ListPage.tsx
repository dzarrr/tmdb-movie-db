import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { getMovies } from "../../services/movieService";

export default function ListPage() {
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();

  const { data: movieData, loading } = useRequest(
    () =>
      getMovies({
        category,
      }),
    {
      onError: (e) => {
        alert(e);
      },
      onSuccess: (data) => console.log(data),
      refreshDeps: [category],
    }
  );

  function handleCategoryBtnClick(
    category: "top_rated" | "now_playing" | "popular" | "upcoming"
  ) {
    const currentParams = new URLSearchParams(location.search);

    currentParams.set("category", category);

    navigate(`?${currentParams.toString()}`);
  }

  useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQueryParam = params.get("category");

    if (categoryFromQueryParam) {
      setCategory(categoryFromQueryParam);
    }
  }, [location.search]);

  return (
    <div>
      {"this is the list fpage"}
      <span>{loading && "loading..."}</span>
      <div>
        <Button onClick={(e) => handleCategoryBtnClick("now_playing")}>
          Now Playing
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("popular")}>
          Popular
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("top_rated")}>
          Top Rated
        </Button>
        <Button onClick={(e) => handleCategoryBtnClick("upcoming")}>
          Upcoming
        </Button>
      </div>
    </div>
  );
}
