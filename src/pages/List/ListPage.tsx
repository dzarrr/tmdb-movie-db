import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Button, Skeleton } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import ListItem from "../List/component/ListItem";
import { getMovies } from "../../services/movieService";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(20em, auto));
  gap: 2.5em;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minMax(10em, auto));
    gap: 1em;
  }
`;

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
      <ListContainer>
        {loading && <Skeleton />}
        {movieData?.results?.map((movie) => (
          <ListItem key={movie.id} movieData={movie} />
        ))}
      </ListContainer>
    </div>
  );
}
